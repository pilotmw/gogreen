"use client";

/* ───────────────────────────────────────────────────────────────
   SIMPLIFICATION SUMMARY — for client review

   REMOVED
   - Two-paragraph intro (thesis + "full story") → one intro line
   - The wrapping panel (border / gradient / shadow) and its
     scroll-linked green wash → plain section, items separated by
     spacing and a single hairline only
   - Per-item 01–04 numbering, 2–3 sentence descriptions, the
     hover-dimming interaction and the "Waste / Pollution / Clean
     Energy / Climate Pressure / Livelihoods" tag cluster
   - The closing paragraph ("These challenges require more than
     isolated interventions...") and its "Our Response" jump button
     — both only restated the section opening

   KEPT
   - The "01 / The Challenge" marker, the "Challenges We Face" h2
     and the Stage_1 photograph
   - Heading order h2 → h3, one format per item (icon + label +
     phrase), and the existing green palette / spacing scale
   ─────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Leaf,
  Recycle,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface Challenge {
  icon: LucideIcon;
  label: string;
  phrase: string;
}

/* DRAFT COPY — labels and phrases are a suggested trim of the previous
   two-to-three sentence descriptions. Confirm final wording with client. */
const challenges: Challenge[] = [
  {
    icon: Recycle,
    label: "Waste & Pollution",
    phrase: "Recoverable resources are lost to dumpsites",
  },
  {
    icon: Zap,
    label: "Energy Access",
    phrase: "Communities need cleaner, reliable power",
  },
  {
    icon: Leaf,
    label: "Climate Pressure",
    phrase: "Emissions and degradation are rising",
  },
  {
    icon: Users,
    label: "Livelihoods",
    phrase: "Green jobs remain out of reach for many",
  },
];

export default function ChallengesSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white/60 py-20 md:py-28"
    >
      {/* subtle ambient layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-[26rem] w-[52rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.28),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── heading + one intro line ── */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: d ?? 0.6, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-primary">
              01 / The Challenge
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.08, ease: "easeOut" }}
            className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            Challenges{" "}
            <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
              We Face
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.16, ease: "easeOut" }}
            className="mt-5 text-base text-gray-700 md:text-lg"
          >
            {/* DRAFT COPY — confirm final wording with client */}
            Malawi&apos;s environmental and economic challenges are connected.
          </motion.p>
        </div>

        {/* ── photograph ── */}
        <motion.figure
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.9, delay: d ?? 0.1, ease: "easeOut" }}
          className="mt-12 overflow-hidden rounded-[1.5rem] border border-primary/10 md:mt-16 md:rounded-[2rem]"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src="/Stage_1.png"
              alt="Scene from Malawi reflecting the environmental and economic challenges GoGreen addresses"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1280px, 100vw"
              priority
              quality={85}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent"
            />
          </div>
        </motion.figure>

        {/* ── four challenges: one format, no card chrome ── */}
        <ul className="mt-12 grid grid-cols-1 gap-10 border-t border-primary/10 pt-10 sm:grid-cols-2 md:mt-16 md:pt-12 lg:grid-cols-4 lg:gap-8">
          {challenges.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: d ?? 0.6,
                delay: d ?? 0.12 + i * 0.08,
                ease: "easeOut",
              }}
              className="group"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105"
              >
                <item.icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-gray-900 md:text-xl">
                {item.label}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-gray-600">
                {item.phrase}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
