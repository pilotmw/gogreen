"use client";

import { useState, useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_API = "/.netlify/functions/send-contact-email";
const SUBMIT_COOLDOWN_MS = 20000;

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
        body: JSON.stringify({ ...formData, website: honeypot }),
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/50 text-green-100 p-4 rounded-md mb-6"
                >
                  Message Sent Successfully — Thank you for contacting us.
                  We&apos;ll get back to you soon.
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
<div
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    opacity: 0,
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
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
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Services">Service Inquiry</option>
                    <option value="Investment">Investment Opportunity</option>
                    <option value="Community">Community Participation</option>
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
                    <p className="text-white/90">
                      Lilongwe, Malawi
                      <br />
                      <span className="text-sm text-white/70">(Specific address available upon request)</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-800 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <a href="mailto:admin@gogreenmw.com" className="text-white/90 hover:text-primary-light transition-colors block">admin@gogreenmw.com</a>
                    <a href="mailto:edgar@gogreenmw.com" className="text-white/90 hover:text-primary-light transition-colors block">edgar@gogreenmw.com</a>
                    <p className="text-sm text-white/70">We respond within 24 hours</p>
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
          </div>
        </div>
      </section>
    </>
  );
}
