/* ───────────────────────────────────────────────────────────────
   FOOTER — WHAT CHANGED (client review)

   CONTACT EMAILS NOW LABELLED BY PURPOSE. The footer listed two
   addresses with no labels, so "edgar@gogreenmw.com" read as a stray
   second admin mailbox. The client confirmed it belongs to the Chief
   Executive Officer, so both now carry a purpose label:
     General enquiries      -> admin@gogreenmw.com
     Chief Executive Officer -> edgar@gogreenmw.com
   This matches the labelling on the Contact page. The addresses
   themselves are unchanged; only the labels were added.

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
              Go Green Resources Limited is a Malawian environmental enterprise building circular economy solutions that transform waste and underused resources into clean energy, recovered materials, and sustainable livelihoods.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
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
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-light flex-shrink-0" />
                <span>Lilongwe, Republic of Malawi, Central Africa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-primary-light flex-shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-[0.14em] text-gray-400">General enquiries</span>
                  <a href="mailto:admin@gogreenmw.com" className="hover:text-primary-light transition-colors block">admin@gogreenmw.com</a>
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
