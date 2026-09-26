/* ───────────────────────────────────────────────────────────────
   FOOTER — WHAT CHANGED (client review)

   COLUMN HEADINGS PROMOTED h3 -> h2. "Quick Links" and "Contact" were
   <h3>, which made them look like subsections of whatever preceded
   them. On the seven content pages that read fine, but the 404 page has
   only an <h1> and no content sections, so the outline ran h1 -> h3,
   a skipped level. Inside the <footer> contentinfo landmark these two
   are the top-level headings, so h2 is the correct level. No visual
   change: the styling comes from explicit Tailwind classes on each
   element, not from the heading tag. Verified no page gained a skip.

   CONTACT EMAILS NOW LABELLED BY PURPOSE. The footer listed two
   addresses with no labels, so "edgar@gogreenmw.com" read as a stray
   second admin mailbox. The client confirmed it belongs to the Chief
   Executive Officer, so both now carry a purpose label:
     General enquiries       -> info@gogreenmw.com
     Chief Executive Officer -> edgar@gogreenmw.com
   This matches the labelling on the Contact page.

   The general address was also changed at the client's request:
   `admin@gogreenmw.com` is replaced by `info@gogreenmw.com` here and
   on the Contact page. ⚠ The contact form's notification recipient is
   a separate thing — it comes from the CONTACT_EMAIL environment
   variable in the Netlify dashboard, not from this repo. It must be
   updated there to match, or the form will keep delivering to the old
   address while the site advertises the new one.

   NOTE: the CEO's display name was corrected to
   "Thokozani Edgar Kamangira" on the About page and homepage. His
   photo asset is still the old filename
   "Thokozani Kamangira_Chief Executive Officer.png" — the file was
   not renamed, as that is internal only and not shown to visitors.
   ─────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src="/go-green-logo.png"
                alt="Go Green Resources Limited Logo"
                width={180}
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
              <p className="text-gray-300 text-sm max-w-md">
                {/* PRE-OPERATIONAL REFRAME (Priority 2). ORIGINAL: "…is a
                    Malawian environmental enterprise BUILDING circular
                    economy solutions THAT TRANSFORM waste and underused
                    resources into…". An earlier pass corrected the
                    "develops" wording but left "that transform", which is
                    still a claim that the transformation is happening -
                    this was missed by the first site-wide audit. ->
                    "designed to turn". The three outputs UNCHANGED.
                    Registration number COY-4A4SKYK is deliberately NOT in
                    the footer: the About page carries it prominently, and
                    repeating it here adds nothing. */}
                Go Green Resources Limited is a Malawian environmental
                enterprise building circular economy solutions designed to
                turn waste and underused resources into clean energy,
                recovered materials, and sustainable livelihoods.
              </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Solutions", href: "/solutions" },
                { label: "Impact", href: "/impact" },
                { label: "Projects", href: "/projects" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-light text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-light flex-shrink-0" />
                <span>Lilongwe, Republic of Malawi, Central Africa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-primary-light flex-shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-[0.14em] text-gray-400">General enquiries</span>
                  <a href="mailto:info@gogreenmw.com" className="hover:text-primary-light transition-colors block">info@gogreenmw.com</a>
                  <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-gray-400">Chief Executive Officer</span>
                  <a href="mailto:edgar@gogreenmw.com" className="hover:text-primary-light transition-colors block">edgar@gogreenmw.com</a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-primary-light flex-shrink-0" />
                <a href="tel:+265996466547" className="hover:text-primary-light transition-colors">+265 996 466 547</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <a
                  href="https://wa.me/265996466547"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary-light transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-primary-light flex-shrink-0" />
                  WhatsApp: +265 996 466 547
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Go Green Resources Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
