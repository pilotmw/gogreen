"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import type { PartnerSlot } from "@/data/homeContent";

interface PartnerLogosProps {
  partners: PartnerSlot[];
  /** Label above the strip. */
  label?: string;
  /** Optional supporting line under the label. */
  note?: string;
}

export default function PartnerLogos({
  partners,
  label = "In partnership with",
  note = "We work with government institutions, development partners, funders and private-sector clients.",
}: PartnerLogosProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      aria-label="Partners and funders"
      className="border-y border-primary/10 bg-[#f6faf7]/70 py-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.6, ease: "easeOut" }}
          className="text-center text-[0.68rem] font-bold uppercase tracking-[0.3em] text-primary"
        >
          {label}
        </motion.p>

        {note && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.6, delay: d ?? 0.08, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-gray-600 md:text-[0.95rem]"
          >
            {note}
          </motion.p>
        )}

        {/* Horizontal scroll on mobile, evenly spaced row from tablet up */}
        <motion.ul
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.6, delay: d ?? 0.14, ease: "easeOut" }}
          className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
        >
          {partners.map((partner, i) => (
            <li
              key={partner.name || `partner-slot-${i}`}
              className="w-40 shrink-0 snap-center sm:w-auto"
            >
              <div
                className={[
                  "group flex h-20 items-center justify-center rounded-2xl border border-primary/15 bg-white/80 px-4",
                  "grayscale transition-[filter,box-shadow] duration-300 hover:grayscale-0 hover:shadow-[0_18px_40px_-32px_rgba(20,83,45,0.5)]",
                ].join(" ")}
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.logoAlt ?? `${partner.name} logo`}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto object-contain"
                  />
                ) : (
                  /* PLACEHOLDER SLOT — bordered box, no fabricated partner
                     name or mark. Replace with approved logo artwork. */
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gray-400">
                    {partner.name || "Logo"}
                  </span>
                )}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
