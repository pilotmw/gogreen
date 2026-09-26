"use client";

/* ───────────────────────────────────────────────────────────────
   SIMPLIFICATION SUMMARY — for client review

   5-STEP FLOW REBUILT
   - The circular ring diagram (numbered circle nodes, dashed track,
     progress fill, node click-to-select, 4.2s autoplay, scroll-linked
     progress, centre "active stage" readout and progress dots) is
     replaced by the approved mockup: 5 icon cards joined by 4 arrow
     connectors in a single row, stacking vertically below 820px.
   - All of the ring's geometry, SVG gradients, motion values and state
     were deleted with it — no dead code or leftover CSS remains.

   THE FLOW IS NOW A SHARED COMPONENT
   The step diagram itself now lives in <CircularModelFlow />, which
   this section renders with `level="phrase"`. /how-it-works renders
   the same component with the fuller "detail" copy. The step data
   (names, order, count, icons, all three copy tiers) moved to
   src/data/circularModel.ts, which the About page also reads. That
   fixes a site-wide inconsistency: /how-it-works previously described
   a 4-step model with no "Create Value". The cards rendered below are
   unchanged from the approved design.

   KEPT
   - The same five stages, in the same order, as a semantic <ol>
   - The photograph band and the single "Explore Our Solutions" CTA
   - "Returns to Recover" — a slogan, not a step list
   ─────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import CircularModelFlow from "@/components/CircularModelFlow";

/* DRAFT COPY — confirm final wording with client. */
const intro = "We turn waste and underused resources into energy, materials, and opportunity.";

export default function ResponseSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const closingInView = useInView(closingRef, { once: true, amount: 0.35 });

  return (
    <section
      id="our-response"
      ref={sectionRef}
      className="relative bg-[#fbfbfa]/80 overflow-hidden scroll-mt-28"
    >
      {/* ── SECTION BACKDROP ──────────────────────────
          Full-bleed by design: the 5-step flow, the loop note and the
          CTA replaced a tall square diagram, so the wash and the wide
          lower field below extend edge to edge and top to bottom to
          cover the whole of the space they left behind. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* full-section wash — no bare off-white left anywhere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9f3] via-[#eaf7ef] to-[#f5fbf7]" />

        {/* wide field behind the flow row, loop note and CTA */}
        <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[radial-gradient(58%_42%_at_50%_74%,rgba(187,247,208,0.5),rgba(255,255,255,0)_72%)]" />

        <div className="absolute -right-48 top-[-10rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.10),transparent_65%)]" />
        <div className="absolute -left-52 top-1/3 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.28),transparent_65%)]" />
        <div className="absolute -bottom-56 right-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.07),transparent_60%)]" />

        {/* faint flow curves, spanning the full section height */}
        <svg
          className="absolute inset-y-0 right-[6%] h-full w-[52rem] max-w-none text-primary/[0.06]"
          viewBox="0 0 200 200"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 20 150 C 60 70, 130 110, 176 30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 8"
          />
          <path
            d="M 30 160 C 80 85, 145 120, 186 55"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1 9"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-14 pt-20 md:pt-28 lg:pt-32 pb-24 md:pb-28 lg:pb-32">
        {/* ── 1. INTRODUCTION ─────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : undefined}
            transition={{ duration: d ?? 0.7, ease: "easeOut" }}
            className="flex items-center justify-center gap-4"
          >
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50"
            />
            <p className="text-xs font-bold tracking-[0.28em] uppercase text-primary">
              Our Response
            </p>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.08, ease: "easeOut" }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.08] tracking-tight"
          >
            Turning Challenges Into Opportunity
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.16, ease: "easeOut" }}
            className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed"
          >
            {intro}
          </motion.p>
        </div>

        {/* ── 2. PHOTO BAND ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.9, ease: "easeOut" }}
            className="relative mt-10 md:mt-14"
        >
          <div className="group relative aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-primary/10 shadow-[0_40px_90px_-55px_rgba(22,163,74,0.45)]">
            <Image
              src="/Image_2.png"
              alt="Aerial view of GoGreen's integrated waste-to-resource facility"
              fill
              sizes="(min-width: 1024px) 1536px, 100vw"
              priority={false}
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#14532d]/35 via-transparent to-transparent"
            />
            <div className="absolute bottom-4 left-5 right-5 md:bottom-6 md:left-8 flex items-end justify-between gap-4">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.28em] text-white/90">
                From waste to resources — one connected chain
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 3. THE FIVE-STEP FLOW ──────────────────────
            Shared component, rendering the "phrase" copy tier. Row of
            5 equal-width icon cards joined by 4 arrow connectors from
            820px up; one column below, arrows rotated to point down. */}
        <div className="mt-12 md:mt-16">
          <CircularModelFlow level="phrase" showLoopNote delay={0.16} />
        </div>

        {/* ── 4. SINGLE CTA ─────────────────────────────
            The closing statement ("A greener economy is not one solution. It is
            a connected system." + "GoGreen Resources builds those connections.")
            was removed — it only restated the section opening. This is the
            section's one and only CTA. */}
        <div ref={closingRef} className="mx-auto mt-14 max-w-4xl text-center md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={closingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.6, delay: d ?? 0.1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/25 transition-[background-position,box-shadow] duration-300 hover:from-primary-light hover:to-primary hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore Our Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
