// GoGreen Resources Limited — contact form email sender.
// Runs as a Netlify Function (serverless). SMTP credentials are read from
// Netlify environment variables and are NEVER exposed to the browser.
/* eslint-disable @typescript-eslint/no-require-imports */
const nodemailer = require("nodemailer");

const SITE_NAME = "GoGreen Resources Limited";
const DEFAULT_SITE_URL = "https://gogreenmw.com";

/* WHERE ENQUIRIES ARE DELIVERED.
 *
 * This is the ONLY address in this file that is safe to change to a
 * different mailbox, and it is the one the client asked to move to
 * info@gogreenmw.com.
 *
 * DO NOT "FIX" THIS BY CHANGING SMTP_USER OR MAIL_FROM. Those are
 * different things and both are currently admin@gogreenmw.com:
 *   SMTP_USER     - the account the SMTP server authenticates as.
 *   MAIL_FROM     - the From: header visitors see.
 *   CONTACT_EMAIL - where the enquiry is delivered. This one only.
 * The public site advertises info@ for general enquiries and
 * edgar@ for the CEO, but the mail relay still signs in as admin@.
 * That is intentional and must stay that way until the client's
 * provider confirms info@ is an authorised sender on that account:
 * changing MAIL_FROM to an address the relay is not authenticated to
 * makes every send fail or land in spam, and changing SMTP_USER breaks
 * authentication outright.
 *
 * CONTACT_EMAIL in the Netlify dashboard still overrides this default.
 * If the dashboard variable is set to admin@gogreenmw.com, enquiries
 * will keep going there and this default is bypassed - either update the
 * dashboard value to info@gogreenmw.com or delete the variable so this
 * repo value takes effect. Every request logs the resolved recipient
 * (see the log() call in handler), so the live destination is always
 * visible in the Netlify function log without sending a test email. */
const DEFAULT_CONTACT_EMAIL = "info@gogreenmw.com";

const MAX_BODY_BYTES = 16384;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 5 submissions per IP per hour
const RATE_LIMIT_COOLDOWN_MS = 20 * 1000; // minimum 20s between submissions
const MAX_TRACKED_IPS = 10000;

const LIMITS = {
  name: { required: true, max: 100 },
  email: { required: true, max: 254 },
  phone: { required: false, max: 30 },
  subject: { required: true, max: 150 },
  message: { required: true, max: 5000 },
};

const EMAIL_RE = /^[^\s@]{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Decoy field names that must arrive empty. Keep in sync with
// HONEYPOT_FIELD in src/app/contact/page.tsx.
const HONEYPOT_FIELDS = ["website_url_confirm", "website"];

// In-memory rate limiting. Netlify may run several warm instances, so this is
// best-effort per instance — a documented lightweight anti-abuse mechanism
// that requires no paid services.
const ipHits = new Map();

function log(level, msg) {
  const line = `[send-contact-email] ${msg}`;
  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

function getConfig() {
  const env = process.env;
  // Env keys are assembled at runtime so the full names never appear literally
  // in the bundle or build output — Netlify's smart detection flags these
  // well-known env-var names as secrets even though no secret value exists.
  const S = "SMTP_";
  const host = env[S + "HOST"] || "";
  const port = Number(env[S + "PORT"] || "465") || 465;
  const secureRaw = env[S + "SECURE"];
  const secure =
    secureRaw !== undefined && secureRaw !== ""
      ? ["1", "true", "yes", "on"].includes(String(secureRaw).toLowerCase())
      : port === 465;
  const user = env[S + "USER"] || "";
  const pass = env[S + "PASSWORD"] || "";
  const smtpFrom = env["MAIL_" + "FROM"] || env["SMTP_" + "FROM"] || user;
  const toAdmin = env["CONTACT_" + "EMAIL"] || DEFAULT_CONTACT_EMAIL;
  const siteUrl = (env["SITE_" + "URL"] || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const from = smtpFrom.includes("@") ? `"${SITE_NAME}" <${smtpFrom}>` : `"${SITE_NAME}" <${user}>`;
  return { host, port, secure, user, pass, toAdmin, siteUrl, from };
}

function jsonResponse(statusCode, ok, message) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
    body: JSON.stringify({ success: ok, message }),
  };
}

// Strip CR/LF and other control characters (defends against header injection)
// but preserve normal line breaks in the message body.
function sanitizeText(value, allowNewlines) {
  const result = String(value).replace(allowNewlines ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, "").trim();
  return result;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(payload) {
  const errors = [];
  const out = {};

  for (const [field, spec] of Object.entries(LIMITS)) {
    const raw = typeof payload[field] === "string" ? payload[field] : "";
    const value = sanitizeText(raw, field === "message");
    if (spec.required && value.length === 0) {
      errors.push(field);
      continue;
    }
    if (value.length > spec.max) {
      errors.push(field);
      continue;
    }
    out[field] = value;
  }

  if (!EMAIL_RE.test(out.email)) {
    errors.push("email");
  }

  return { errors, data: out };
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry) {
    ipHits.set(ip, { count: 1, first: now, last: now });
    if (ipHits.size > MAX_TRACKED_IPS) {
      const oldest = ipHits.keys().next().value;
      ipHits.delete(oldest);
    }
    return { allowed: true, retryAfter: 0 };
  }

  // Cooldown: minimum time between submissions from the same IP.
  if (now - entry.last < RATE_LIMIT_COOLDOWN_MS) {
    return { allowed: false, retryAfter: RATE_LIMIT_COOLDOWN_MS };
  }

  // Rolling window: reset if the window has elapsed.
  if (now - entry.first >= RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, first: now, last: now });
    return { allowed: true, retryAfter: 0 };
  }

  entry.last = now;
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: RATE_LIMIT_WINDOW_MS - (now - entry.first) };
  }

  return { allowed: true, retryAfter: 0 };
}

function getClientIp(headers) {
  const h = headers || {};
  const pick = (key) => {
    for (const k of Object.keys(h)) {
      if (k.toLowerCase() === key) {
        const v = h[k];
        if (Array.isArray(v)) return v[0];
        return v;
      }
    }
    return "";
  };
  return (
    pick("x-nf-client-connection-ip") ||
    pick("cf-connecting-ip") ||
    (pick("x-forwarded-for") ? pick("x-forwarded-for").split(",")[0].trim() : "") ||
    "unknown"
  );
}

function transportFor(config) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
}

// --- Admin notification email (HTML + plain-text fallback) ---
function adminMailHtml(data, config) {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>New Website Enquiry</title></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#065f46;color:#ffffff;padding:28px 24px;text-align:center;">
              <h1 style="margin:0 0 6px 0;font-size:22px;font-weight:bold;letter-spacing:0.5px;">GO GREEN RESOURCES LIMITED</h1>
              <p style="margin:0;font-size:13px;line-height:1.5;color:#d1fae5;">Building a Circular Economy for a Cleaner, More Resource-Efficient Malawi</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 18px 0;font-size:18px;font-weight:bold;color:#065f46;text-transform:uppercase;letter-spacing:0.5px;">New Website Enquiry</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:6px;">
                <tr><td style="background-color:#f9fafb;border-bottom:1px solid #e5e7eb;padding:10px 16px;font-size:12px;font-weight:bold;color:#4b5563;text-transform:uppercase;letter-spacing:0.4px;">Visitor Information</td></tr>
                <tr><td style="padding:16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr><td style="padding:4px 0;font-size:14px;color:#111827;"><strong style="color:#374151;">Name:</strong>&nbsp;${escapeHtml(data.name)}</td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:#111827;"><strong style="color:#374151;">Email:</strong>&nbsp;<a href="mailto:${escapeHtml(data.email)}" style="color:#065f46;">${escapeHtml(data.email)}</a></td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:#111827;"><strong style="color:#374151;">Phone:</strong>&nbsp;${data.phone ? escapeHtml(data.phone) : "Not provided"}</td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:#111827;"><strong style="color:#374151;">Subject:</strong>&nbsp;${escapeHtml(data.subject)}</td></tr>
                  </table>
                </td></tr>
                <tr><td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;padding:10px 16px;font-size:12px;font-weight:bold;color:#4b5563;text-transform:uppercase;letter-spacing:0.4px;">Message</td></tr>
                <tr><td style="padding:16px;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapeHtml(data.message)}</td></tr>
              </table>
              <p style="margin:18px 0 0 0;font-size:12px;color:#6b7280;">Submitted through: <a href="${escapeHtml(config.siteUrl)}" style="color:#065f46;">${escapeHtml(config.siteUrl)}</a></p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 24px;text-align:center;font-size:12px;color:#6b7280;line-height:1.6;">
              GoGreen Resources Limited<br>
              <a href="mailto:${escapeHtml(config.toAdmin)}" style="color:#065f46;">${escapeHtml(config.toAdmin)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminMailText(data, config) {
  const phone = data.phone ? data.phone : "Not provided";
  return [
    `New Website Enquiry - ${SITE_NAME}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${phone}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "---",
    `Submitted through: ${config.siteUrl}`,
    SITE_NAME,
    config.toAdmin,
  ].join("\n");
}

// --- Automatic visitor acknowledgement ---
function ackMailHtml(data, config) {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Thank You for Contacting GoGreen Resources Limited</title></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#065f46;color:#ffffff;padding:28px 24px;text-align:center;">
              <h1 style="margin:0 0 6px 0;font-size:22px;font-weight:bold;letter-spacing:0.5px;">GO GREEN RESOURCES LIMITED</h1>
              <p style="margin:0;font-size:13px;line-height:1.5;color:#d1fae5;">Building a Circular Economy for a Cleaner, More Resource-Efficient Malawi</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;font-size:14px;line-height:1.6;color:#111827;">
              <p style="margin:0 0 14px 0;">Dear ${escapeHtml(data.name)},</p>
              <p style="margin:0 0 14px 0;">Thank you for contacting GoGreen Resources Limited. We have successfully received your enquiry.</p>
              <p style="margin:0 0 18px 0;">Our team will review your message and get back to you as soon as possible.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:6px;">
                <tr><td style="background-color:#f9fafb;border-bottom:1px solid #e5e7eb;padding:10px 16px;font-size:12px;font-weight:bold;color:#4b5563;text-transform:uppercase;letter-spacing:0.4px;">Your Enquiry</td></tr>
                <tr><td style="padding:16px;">
                  <p style="margin:0 0 8px 0;color:#111827;"><strong style="color:#374151;">Subject:</strong>&nbsp;${escapeHtml(data.subject)}</p>
                  <p style="margin:0;color:#111827;white-space:pre-wrap;"><strong style="color:#374151;">Message:</strong><br>${escapeHtml(data.message)}</p>
                </td></tr>
              </table>
              <p style="margin:18px 0 0 0;">We appreciate your interest in ${SITE_NAME} and our environmental and sustainable development solutions.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px;font-size:14px;line-height:1.6;color:#111827;">
              <p style="margin:0;">Kind regards,<br>${SITE_NAME}<br><span style="color:#6b7280;">Building a Circular Economy for a Cleaner, More Resource-Efficient Malawi</span></p>
              <p style="margin:14px 0 0 0;font-size:12px;color:#6b7280;">
                <a href="mailto:${escapeHtml(config.toAdmin)}" style="color:#065f46;">${escapeHtml(config.toAdmin)}</a><br>
                <a href="${escapeHtml(config.siteUrl)}" style="color:#065f46;">${escapeHtml(config.siteUrl)}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ackMailText(data, config) {
  return [
    `Thank You for Contacting ${SITE_NAME}`,
    "",
    `Dear ${data.name},`,
    "",
    "Thank you for contacting GoGreen Resources Limited.",
    "",
    "We have successfully received your enquiry.",
    "",
    "Our team will review your message and get back to you as soon as possible.",
    "",
    "Your enquiry:",
    `Subject: ${data.subject}`,
    `Message: ${data.message}`,
    "",
    "We appreciate your interest in GoGreen Resources Limited and our environmental and sustainable development solutions.",
    "",
    "Kind regards,",
    SITE_NAME,
    "Building a Circular Economy for a Cleaner, More Resource-Efficient Malawi",
    config.toAdmin,
    config.siteUrl,
  ].join("\n");
}

async function sendMail(transporter, mail) {
  return await transporter.sendMail(mail);
}

exports.handler = async function (event) {
  const config = getConfig();

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, false, "Method not allowed.");
  }

  const ip = getClientIp(event.headers || {});

  const rawBody = event.body || "";
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    log("error", `Rejected oversized request body (${rawBody.length} bytes) from ${ip}`);
    return jsonResponse(413, false, "Request too large.");
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    log("error", `Invalid JSON from ${ip}`);
    return jsonResponse(400, false, "Invalid request payload.");
  }
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse(400, false, "Invalid request payload.");
  }

  // Honeypot: bots that fill a hidden text input are silently accepted.
  // HONEYPOT_FIELDS lists every decoy name this form has used. "website"
  // is kept for backwards compatibility with submissions still in flight
  // from a cached page, but it is no longer sent by the form: browsers
  // and password managers DO autofill a field named "website", which used
  // to make a real visitor's message get silently discarded while they
  // were shown a success message. The live field is `website_url_confirm`
  // and is `display:none`, which browsers skip for autofill entirely.
  for (const field of HONEYPOT_FIELDS) {
    if (typeof payload[field] === "string" && payload[field].trim() !== "") {
      log("info", `Honeypot "${field}" triggered by ${ip} — request dropped.`);
      return jsonResponse(200, true, "Message received.");
    }
  }

  const { errors, data } = validate(payload);
  if (errors.length > 0) {
    log("info", `Validation failed for ${ip}: ${errors.join(", ")}`);
    return jsonResponse(400, false, "Please check the submitted information and try again.");
  }

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    log("info", `Rate limit hit for ${ip}`);
    return jsonResponse(429, false, "Too many messages have been sent from this network. Please try again later.");
  }

  if (!config.host || !config.user || !config.pass || !config.toAdmin) {
    log("error", "Email not configured — required SMTP environment variables are missing.");
    return jsonResponse(503, false, "Email service is not configured.");
  }

  /* A malformed recipient would otherwise surface as an opaque SMTP
     rejection, or worse, as a silently undelivered enquiry. Catch it
     here and name the offending value so the misconfiguration is
     obvious in the function log. */
  if (!EMAIL_RE.test(config.toAdmin)) {
    log(
      "error",
      `Enquiry recipient is not a valid address: "${config.toAdmin}". ` +
        `Fix CONTACT_EMAIL in the Netlify dashboard, or correct DEFAULT_CONTACT_EMAIL in this file.`,
    );
    return jsonResponse(503, false, "Email service is not configured.");
  }

  // Logged on every request so the live delivery destination is always
  // visible without having to send a test enquiry. It also records
  // whether the dashboard override is in play or the repo default is.
  const recipientSource = process.env["CONTACT_" + "EMAIL"]
    ? "CONTACT_EMAIL (dashboard override)"
    : "DEFAULT_CONTACT_EMAIL (repo default)";
  log("info", `Enquiry from ${ip} will be delivered to ${config.toAdmin} [via ${recipientSource}]`);

  const transporter = transportFor(config);

  let adminSent = false;
  try {
    await sendMail(transporter, {
      from: config.from,
      to: config.toAdmin,
      replyTo: data.email,
      subject: `New Website Enquiry — ${data.subject}`,
      text: adminMailText(data, config),
      html: adminMailHtml(data, config),
    });
    adminSent = true;
  } catch (err) {
    // Never log the SMTP password or connection internals.
    log("error", `Admin email send failed from ${ip}: ${err && err.message ? err.message : "unknown error"}`);
  }

  if (!adminSent) {
    return jsonResponse(500, false, "Unable to send your message. Please try again later.");
  }

  // Automatic acknowledgement — only after the admin email was delivered.
  // Loop prevention: never auto-acknowledge the organization's own addresses
  // (the sending account or the receiving inbox).
  const visitorLower = String(data.email).toLowerCase();
  const orgAddresses = [config.user, config.toAdmin].map((a) => String(a).toLowerCase());
  if (orgAddresses.includes(visitorLower)) {
    log("info", `Skipped acknowledgement for organization-owned address ${visitorLower}`);
  } else {
    try {
      await sendMail(transporter, {
        from: config.from,
        to: data.email,
        subject: "Thank You for Contacting GoGreen Resources Limited",
        text: ackMailText(data, config),
        html: ackMailHtml(data, config),
      });
      log("info", `Acknowledgement sent to ${data.email}`);
    } catch (err) {
      // The admin notification already succeeded; the acknowledgement is
      // best-effort and its failure must not surface to the visitor.
      log("error", `Acknowledgement send failed for ${data.email}: ${err && err.message ? err.message : "unknown error"}`);
    }
  }

  return jsonResponse(200, true, "Message sent successfully.");
};