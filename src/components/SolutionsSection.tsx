"use client";

/* ───────────────────────────────────────────────────────────────
   SIMPLIFICATION SUMMARY — for client review

   REMOVED
   - The interactive tablist + mobile accordion: per item this mixed a
     paragraph, a "What this involves / Key areas" bullet list AND an
     abstract tag-word visual (RESOURCE / RECOVERY / PROCESS / VALUE)
     — three formats in one item
   - All bullet sub-lists (keyAreas), the keyLabel headings, the
     per-solution objective callout and the "Coming Soon" placeholder
     state
   - The closing "Lasting value" block — its idea ("one circular
     purpose") is now folded into the single intro line
   - The auto-advance timer, keyboard tab handling and the abstract
     SVG visuals (SolutionVisuals is no longer used here)

   ALSO FIXED
   - The duplicated header bug: this file always had one header, but
     ThreePillarsSection rendered a second "What We Deliver / From
     Focus Areas to Practical Solutions" block immediately above it.
     That duplicate was removed in an earlier pass and its bridging
     line folded into the intro below, so the section now has exactly
     ONE header and ONE intro line.

   KEPT
   - The "What We Deliver" label, the "Practical Solutions for a
     Circular Future" h2, section id/anchor behaviour, the green
     palette and ambient backdrop, and the existing
     `/solutions#[anchor]` link pattern (now the only place the
     per-solution detail lives)
   ─────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Car,
  Flame,
  Package,
  Recycle,
  Sun,
  Trash,
  Users,
  type LucideIcon,
} from "lucide-react";

interface Solution {
  number: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  href: string;
}

/* DRAFT COPY — each summary is a one-sentence trim of the previous
   paragraph, and each title drops the redundant trailing word. Detail that
   used to sit in the bullet lists now lives behind the card link. Confirm
   final wording with client. */
const solutions: Solution[] = [
  {
    number: "01",
    icon: Recycle,
    title: "Circular Economy & Resource Recovery",
    summary:
      // PRE-OPERATIONAL REFRAME (Priority 2). ORIGINAL WORDING, flagged
      // for client review — each of these claimed present-tense delivery:
      //   "We RECOVER materials and organic resources from waste and
      //    CONVERT them into productive … value."  -> "are designed to
      //    recover … and convert": nothing has been recovered.
      //   "We DEVELOP renewable energy solutions that IMPROVE access…"
      //    -> "are developing … designed to improve".
      //   "We DEVELOP clean cooking solutions that ADDRESS…" ->
      //    "are developing … designed to address".
      //   "We ARE ESTABLISHING a structured collection network…"
      //    -> unchanged tense, but "that CONNECTS" -> "intended to
      //    connect": the network does not exist to connect anything.
      //   "We PRIORITISE source segregation…" -> "Our approach
      //    prioritises": a stated method, not an activity performed.
      //   "We CREATE economic opportunity across our value chains…"
      //    -> "Our model is designed to create": no opportunity has
      //    been created for anyone.
      // The solar-EV entry was already correctly framed ("are
      // exploring") and is left unchanged.
      // All technical specificity — energy, mobility, clean cooking,
      // segregation, recycling markets, value chains — is preserved.
      "Our model is designed to recover materials and organic resources from waste and convert them into productive environmental and economic value.",
    href: "/solutions#materials-recovery",
  },
  {
    number: "02",
    icon: Sun,
    title: "Renewable Energy & Solar",
    summary:
      "We are developing renewable energy solutions designed to improve access to reliable, affordable and low-carbon electricity.",
    href: "/solutions#clean-energy",
  },
  {
    number: "03",
    icon: Car,
    title: "Sustainable Mobility & EVs",
    summary:
      "We are exploring cleaner electric mobility through solar-powered EV charging and clean-energy mobility solutions.",
    href: "/solutions",
  },
  {
    number: "04",
    icon: Flame,
    title: "Clean Cooking & Bioenergy",
    summary:
      "We are developing clean cooking solutions designed to address the health, environmental and economic impacts of charcoal and traditional biomass.",
    href: "/solutions#organic-waste",
  },
  {
    number: "05",
    icon: Package,
    title: "Aluminium Can Recycling",
    summary:
      "We are establishing a structured collection network intended to connect community collectors with formal regional recycling markets.",
    href: "/solutions#materials-recovery",
  },
  {
    number: "06",
    icon: Trash,
    title: "Climate-Smart Waste Management",
    summary:
      "Our approach prioritises source segregation, collection, recovery, recycling and resource-to-energy conversion to reduce pollution.",
    href: "/solutions#organic-waste",
  },
  {
    number: "07",
    icon: Users,
    title: "Community Livelihoods",
    summary:
      "Our model is designed to create economic opportunity across our value chains for youth, women-led enterprises, informal waste collectors and local entrepreneurs.",
    href: "/solutions#livelihoods",
  },
];

export default function SolutionsSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f9f6]/75 py-20 md:py-28 lg:py-32 scroll-mt-28"
    >
      {/* ── ambient backdrop ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[38rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.32),transparent_70%)]" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.10),transparent_70%)]" />
        <svg
          className="absolute bottom-[-10rem] left-1/2 h-[38rem] w-[70rem] -translate-x-1/2 text-primary/[0.05]"
          viewBox="0 0 1200 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 0 430 C 300 320, 520 520, 760 400 S 1040 250, 1200 320"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="go-green-flow"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── ONE header + ONE intro line ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            What We Deliver
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Practical Solutions for a{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Circular Future
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 text-pretty md:text-lg">
            {/* DRAFT COPY — the former "Lasting value" closing line is folded
                in here. Confirm final wording with client. */}
            Seven practical solutions, one circular purpose.
          </p>
        </motion.div>

        {/* ── seven solutions: icon + title + one sentence ── */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {solutions.map((solution, i) => (
            <motion.li
              key={solution.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: d ?? 0.55,
                delay: d ?? 0.1 + i * 0.07,
                ease: "easeOut",
              }}
              className="h-full"
            >
              <Link
                href={solution.href}
                aria-label={`${solution.title} — explore solution`}
                className={[
                  "group flex h-full flex-col rounded-2xl border border-primary/10 bg-white/85 p-6 md:p-7",
                  "shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)] backdrop-blur-sm",
                  "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.5)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-105"
                  >
                    <solution.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs font-bold tabular-nums tracking-[0.28em] text-primary/50"
                  >
                    {solution.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-extrabold leading-snug tracking-tight text-gray-900">
                  {solution.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-gray-600">
                  {solution.summary}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-6 inline-flex items-center gap-2 pt-5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary"
                >
                  Explore solution
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
