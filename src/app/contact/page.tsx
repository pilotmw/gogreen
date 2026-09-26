"use client";

/* ───────────────────────────────────────────────────────────────
   CONTACT PAGE — WHAT WAS FIXED (client review)

   1. THE "WEBSITE" FIELD — it IS an anti-spam honeypot, now
      bulletproof. It was never meant to be a real input, but the
      hiding was fragile and the field name was dangerous:
        - the wrapper relied on `position:absolute; left:-9999px`
          with no positioned ancestor, so its visibility depended on
          no ancestor ever gaining a transform/filter/contain;
        - it was named `website`, a name browsers AND password
          managers do autofill. A real visitor whose browser filled
          that field hit `if (honeypot) { showSuccess(); return; }` —
          they were shown "Message Sent Successfully" and the email
          was NEVER sent. Same silent discard server-side. That is
          silent data loss with a false confirmation, and it is the
          most important thing fixed on this page.
      Now: `display:none` (which browsers skip entirely, so autofill
      is no longer possible), `aria-hidden`, `tabIndex={-1}`, and a
      decoy name `website_url_confirm` that no browser will ever fill
      but a naive bot will. The server accepts a set of honeypot names
      so the old and new keys are both caught.

   2. EMAILS LABELLED BY PURPOSE, AND THE CEO IDENTIFIED.
      `admin@` is "General Enquiries". `edgar@gogreenmw.com` was an
      unexplained address: the local part "edgar" matched nobody on the
      site, so it had been labelled only "Alternate Contact" and flagged
      for the client. CONFIRMED BY THE CLIENT: it is the Chief Executive
      Officer, whose full name has been corrected to
      "Thokozani Edgar Kamangira" throughout the site (About page team
      list, homepage team preview, and here). The address itself is
      unchanged — only the display name and this label were wrong.

   3. SUBJECT DROPDOWN EXPANDED. Added "General Enquiry" and
      "Media / Press" alongside the existing five. The function does
      not enum-check `subject`, so no backend change was needed.

   4. SUCCESS STATE STRENGTHENED. An auto-reply was ALREADY wired up
      server-side (ackMailHtml/ackMailText in
      netlify/functions/send-contact-email.js) and fires after the
      admin notification is delivered, with loop prevention for the
      org's own addresses. No new service or env var is needed. The
      on-screen banner now states the 24-hour response commitment and
      carries role="status" + aria-live so it is announced to screen
      readers instead of appearing silently.

   ⚠ NOT CHANGED — NEEDS CLIENT INPUT
   - Address: still "Specific address available upon request". No
      street or area detail has been supplied, so none was invented.
      Confirm with the client that withholding it is deliberate.
   - Map: still a city-wide view of Lilongwe with no pin, because no
      office coordinates have been provided. Flagged as a placeholder
      — supply a latitude/longitude or Google Maps place URL and the
      embed can be repointed in one line (see MAP below).
   - Social links: NONE ADDED, deliberately. No LinkedIn, Facebook, X
      or Instagram profile for the company exists anywhere in this
      codebase, and the brief forbids inventing them. LeadershipSection
      already accepts an optional `linkedin` URL per person, so those
      can be wired up as soon as the client supplies real profile URLs.
   ─────────────────────────────────────────────────────────────── */

import { useState, useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_API = "/.netlify/functions/send-contact-email";
const SUBMIT_COOLDOWN_MS = 20000;

/* Honeypot field name. Deliberately NOT "website": that is a name
   browsers and password managers autofill, which made a real visitor's
   message get silently discarded while they were told it had sent.
   Paired with `display:none`, which browsers skip for autofill. */
const HONEYPOT_FIELD = "website_url_confirm";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const lastSubmitRef = useRef<number | null>(null);

  const showSuccess = () => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setHoneypot("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      // Bot. Show the same success state and send nothing, so the bot
      // gets no signal that it was caught. Unreachable for real users:
      // the field is `display:none`, so it can never be filled by hand
      // or by a browser's autofill.
      showSuccess();
      return;
    }

    const now = Date.now();
    if (lastSubmitRef.current && now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      setSubmitError("Please wait a moment before sending another message.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, [HONEYPOT_FIELD]: honeypot }),
      });

      if (res.ok) {
        showSuccess();
        return;
      }

      if (res.status === 400) {
        setSubmitError("Please check the submitted information and try again.");
      } else if (res.status === 429) {
        setSubmitError(
          "Too many messages have been sent from this network. Please try again later."
        );
      } else {
        setSubmitError("Unable to send your message. Please try again later.");
      }
    } catch {
      setSubmitError("Unable to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
      lastSubmitRef.current = Date.now();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Let's Build a Circular Future Together"
            subtitle="Get in touch to explore partnerships, project enquiries, clean energy opportunities, recycling partnerships, or advisory engagements."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                  {isSubmitted && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/50 text-green-100 p-4 rounded-md mb-6"
                >
                  <p className="font-semibold">Message sent — thank you for contacting us.</p>
                  <p className="mt-1">
                    We&apos;ve emailed you a copy of your message and we&apos;ll
                    respond within 24 hours.
                  </p>
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/50 text-red-100 p-4 rounded-md mb-6"
                >
                  {submitError}
                </motion.div>
              )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                {/* ── ANTI-SPAM HONEYPOT ──────────────────────
                    Not a real field — do not relabel, reposition or
                    remove it. `display:none` keeps it away from real
                    visitors AND stops browsers autofilling it (the
                    previous off-screen `website` field could be filled
                    by a password manager, which silently threw the
                    visitor's message away). Bots fill every text input
                    they find, so this still catches them; the function
                    drops those requests silently. */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor={HONEYPOT_FIELD}>
                    Leave this field empty
                  </label>
                  <input
                    type="text"
                    id={HONEYPOT_FIELD}
                    name={HONEYPOT_FIELD}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                    Phone <span className="text-white/50">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={30}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+265..."
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="General">General Enquiry</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Services">Service Inquiry</option>
                    <option value="Investment">Investment Opportunity</option>
                    <option value="Community">Community Participation</option>
                    <option value="Media">Media / Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-800 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Location</h3>
                    <p className="text-white/90">Lilongwe, Malawi</p>
                    {/* ⚠ PLACEHOLDER — no street or area detail has been
                        supplied by the client, so none was invented.
                        Confirm that withholding the address is a
                        deliberate choice and not an oversight. */}
                    <p className="text-sm text-white/70">
                      Office address available on request
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-800 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                          General enquiries
                        </dt>
                        <dd>
                          <a
                            href="mailto:admin@gogreenmw.com"
                            className="text-white/90 hover:text-primary-light transition-colors"
                          >
                            admin@gogreenmw.com
                          </a>
                        </dd>
                      </div>
                      {/* The client confirmed this address belongs to the
                          Chief Executive Officer, so the name is shown
                          next to it rather than the earlier neutral
                          "Alternate contact" label. */}
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                          Chief Executive Officer
                        </dt>
                        <dd>
                          <a
                            href="mailto:edgar@gogreenmw.com"
                            className="text-white/90 hover:text-primary-light transition-colors"
                          >
                            edgar@gogreenmw.com
                          </a>
                          <span className="block text-sm text-white/70">
                            Thokozani Edgar Kamangira
                          </span>
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-sm text-white/70">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-800 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                    <a href="tel:+265996466547" className="text-white/90 hover:text-primary-light transition-colors">+265 996 466 547</a>
                    <p className="text-sm text-white/70">Mon-Fri, 8:00-17:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <a
                    href="https://wa.me/265996466547"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-800 rounded-lg flex-shrink-0 hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-primary-light" />
                  </a>
                  <div>
                    <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/265996466547"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-primary-light transition-colors"
                    >
                      Chat with us
                    </a>
                    <p className="text-sm text-white/70">+265 996 466 547</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Get Involved</h3>
                <ul className="space-y-2 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Partner with us as an organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Join our community collection network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Invest in sustainable solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────
          ⚠ PLACEHOLDER — this is still a city-wide view of Lilongwe
          with no marker, because no office coordinates have been
          supplied. To repoint it, replace the `src` below with a Google
          Maps embed for the office (or general area) and set
          `title` to match. The caption is worded so it stays accurate
          while the pin is city-level. */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124424.49955944912!2d33.7048!3d-13.9626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921cfd564a2390b%3A0x3a91c38d0f53259e!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lilongwe, Malawi Map"
              className="rounded-md"
            />
            <p className="mt-3 px-1 text-sm text-white/70">
              Our office is in Lilongwe, Malawi. Contact us for the exact
              location and directions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
