"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";
import { solutionVisuals } from "./SolutionVisuals";

interface Solution {
  number: string;
  title1: string;
  title2: string;
  short: string;
  description: string;
  keyLabel: string;
  keyAreas: string[];
  objective?: string;
  explore: string | null;
  glow: string;
}

const solutions: Solution[] = [
  {
    number: "01",
    title1: "Circular Economy",
    title2: "& Resource Recovery",
    short: "Circular economy",
    description:
      "GoGreen moves beyond conventional waste disposal by recovering materials and organic resources and converting them into productive environmental and economic value.",
    keyLabel: "What this involves",
    keyAreas: [
      "Collection and aggregation",
      "Recycling and resource recovery",
      "Organic waste recovery",
      "Resource-to-energy systems",
      "Circular value chains",
    ],
    explore: "/solutions#materials-recovery",
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(34,197,94,0.20), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(22,163,74,0.16), transparent 58%)",
  },
  {
    number: "02",
    title1: "Renewable Energy",
    title2: "& Solar Electrification",
    short: "Renewable energy",
    description:
      "GoGreen develops renewable energy solutions designed to improve access to reliable, affordable and low-carbon electricity, including rooftop, carport, commercial and distributed solar opportunities.",
    keyLabel: "Key areas",
    keyAreas: [
      "Rooftop solar PV",
      "Commercial solar",
      "Solar carports",
      "Distributed solar",
      "Solar for businesses, institutions and communities",
    ],
    explore: "/solutions#clean-energy",
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(163,230,53,0.22), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(34,197,94,0.14), transparent 58%)",
  },
  {
    number: "03",
    title1: "Sustainable Mobility",
    title2: "& EV Infrastructure",
    short: "Mobility & EV",
    description:
      "GoGreen is exploring the transition toward cleaner electric mobility through solar-powered EV charging infrastructure and integrated clean-energy mobility solutions.",
    keyLabel: "Key areas",
    keyAreas: [
      "Solar-powered EV charging",
      "Solar carports with charging",
      "Commercial EV charging",
      "Clean-energy mobility partnerships",
    ],
    explore: null,
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(34,197,94,0.16), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(148,163,184,0.18), transparent 58%)",
  },
  {
    number: "04",
    title1: "Clean Cooking",
    title2: "& Bioenergy Solutions",
    short: "Clean cooking",
    description:
      "GoGreen develops clean cooking solutions that address the environmental, health and economic impacts of dependence on charcoal and traditional biomass.",
    keyLabel: "Key areas",
    keyAreas: [
      "Community biogas",
      "Clean cooking technologies",
      "Modern cooking fuels",
      "Cylinder-exchange models",
      "Institutional and bulk-user distribution",
      "Bio-slurry recovery",
    ],
    explore: "/solutions#organic-waste",
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(22,163,74,0.22), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(74,222,128,0.16), transparent 58%)",
  },
  {
    number: "05",
    title1: "Aluminium Can Recycling",
    title2: "& Circular Economy",
    short: "Can recycling",
    description:
      "GoGreen is establishing a structured aluminium used beverage can collection and recycling network that connects community collection with formal regional recycling markets.",
    keyLabel: "Key areas",
    keyAreas: [
      "Community collection",
      "Sorting",
      "Crushing",
      "Baling",
      "Regional recycling markets",
    ],
    explore: "/solutions#materials-recovery",
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(34,197,94,0.18), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(45,212,191,0.14), transparent 58%)",
  },
  {
    number: "06",
    title1: "Climate-Smart",
    title2: "Waste Management",
    short: "Climate-smart waste",
    description:
      "GoGreen develops climate-smart approaches to waste management that prioritise source segregation, collection, recovery, recycling, organic waste utilisation and resource-to-energy conversion.",
    keyLabel: "Key areas",
    keyAreas: [
      "Source segregation",
      "Collection",
      "Recovery",
      "Recycling",
      "Organic waste utilisation",
      "Resource-to-energy conversion",
    ],
    objective:
      "Reduce environmental pollution while turning waste streams into productive inputs for new economic activities.",
    explore: "/solutions#organic-waste",
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(20,83,45,0.22), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(187,247,208,0.26), transparent 58%)",
  },
  {
    number: "07",
    title1: "Community Livelihood",
    title2: "Development",
    short: "Livelihoods",
    description:
      "GoGreen integrates economic empowerment into its green operations, creating opportunities across its value chains for youth, women, informal waste collectors and community-based entrepreneurs.",
    keyLabel: "Key participants",
    keyAreas: [
      "Youth groups",
      "Women-led enterprises",
      "Informal waste collectors",
      "Community-based entrepreneurs",
      "Local aggregators",
      "Environmental service providers",
    ],
    explore: "/solutions#livelihoods",
    glow:
      "radial-gradient(90% 90% at 12% 8%, rgba(34,197,94,0.17), transparent 62%), radial-gradient(80% 80% at 88% 90%, rgba(251,191,36,0.13), transparent 58%)",
  },
];

const CONTENT_DURATION = 0.5;

export default function SolutionsSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  const [activeIndex, setActiveIndex] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);
  const hasInteractedRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const select = useCallback((i: number) => {
    hasInteractedRef.current = true;
    setActiveIndex(i);
  }, []);

  /* auto-progression — 6s per solution while visible, paused once the
     visitor interacts manually, and disabled under reduced motion. */
  useEffect(() => {
    if (!inView || prefersReducedMotion || hasInteractedRef.current) return;
    const id = window.setTimeout(() => {
      setActiveIndex((a) => (a + 1) % solutions.length);
    }, 6000);
    return () => window.clearTimeout(id);
  }, [inView, activeIndex, prefersReducedMotion]);

  const onTabKey =
    (index: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const len = solutions.length;
      let next: number | null = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % len;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + len) % len;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = len - 1;
      if (next !== null) {
        e.preventDefault();
        select(next);
      }
    };

  const active = solutions[activeIndex];
  const ActiveVisual = solutionVisuals[activeIndex];

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
        <div className="absolute top-1/3 left-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.26),transparent_70%)] blur-2xl" />
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
          <path
            d="M 0 470 C 360 380, 600 560, 840 440 S 1120 300, 1200 360"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 12"
          />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_60%,rgba(255,255,255,0.5)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── section introduction ── */}
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
          <p className="mt-5 text-base leading-relaxed text-gray-600 text-pretty md:text-lg">
            From clean energy and sustainable mobility to resource recovery,
            recycling and inclusive livelihoods, GoGreen develops practical
            solutions that connect environmental progress with economic
            opportunity.
          </p>
        </motion.div>

        {/* ── DESKTOP: TIMELINE + ACTIVE PANEL ────────── */}
        <div className="mt-14 hidden items-stretch gap-10 lg:grid lg:grid-cols-[236px_1fr] xl:mt-16 xl:grid-cols-[260px_1fr] xl:gap-14">
          {/* timeline navigation */}
          <motion.nav
            role="tablist"
            aria-label="GoGreen solution areas"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.1, ease: "easeOut" }}
            className="lg:flex lg:flex-none"
          >
            <div className="relative flex flex-col py-1">
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-[5px] top-2 w-px rounded bg-gray-200"
              />
              <div
                aria-hidden="true"
                className="absolute left-[5px] top-2 w-px rounded bg-gradient-to-b from-primary-light to-primary transition-[height] duration-500 ease-out"
                style={{ height: `${((activeIndex + 1) / solutions.length) * 100}%` }}
              />
              {solutions.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={s.number}
                    type="button"
                    role="tab"
                    id={`solution-tab-${s.number}`}
                    aria-selected={isActive}
                    aria-controls="solution-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={onTabKey(i)}
                    className={[
                      "group relative flex items-center gap-4 py-3.5 pr-4 text-left outline-none",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute left-[5px] h-[9px] w-[9px] -translate-x-1/2 rounded-full transition-all duration-300",
                        isActive
                          ? "bg-primary shadow-[0_0_0_5px_rgba(34,197,94,0.15)]"
                          : "bg-gray-300 group-hover:bg-gray-400",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "pl-4 font-black tabular-nums tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-2xl text-primary"
                          : "text-lg text-gray-400 group-hover:text-gray-600",
                      ].join(" ")}
                    >
                      {s.number}
                    </span>
                    <span
                      className={[
                        "text-[0.7rem] font-bold uppercase tracking-[0.16em] leading-tight transition-colors duration-300",
                        isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600",
                      ].join(" ")}
                    >
                      {s.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.nav>

          {/* active solution panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div
              id="solution-panel"
              role="tabpanel"
              aria-labelledby={`solution-tab-${active.number}`}
              className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(140deg,#ffffff_0%,#f5faf6_55%,#eef7f0_100%)] shadow-[0_40px_90px_-55px_rgba(20,83,45,0.45)]"
            >
              {/* solution-specific gradient backdrop */}
              <div aria-hidden="true" className="absolute inset-0">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: CONTENT_DURATION, ease: "easeOut" }}
                    className="absolute inset-0"
                    style={{ backgroundImage: `linear-gradient(140deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%), ${active.glow}` }}
                  />
                </AnimatePresence>
              </div>

              <div className="relative z-[1] flex flex-1 flex-col p-7 md:p-10">
                {/* animated content */}
                <div className="relative flex-1">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 28, y: 16 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -20, y: -6 }}
                      transition={{ duration: CONTENT_DURATION, ease: "easeOut" }}
                    >
                      <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-10">
                        {/* text column */}
                        <div>
                          <p className="text-sm font-black tabular-nums tracking-[0.3em] text-primary/80">
                            {active.number}
                          </p>
                          <h3 className="mt-3 text-[1.6rem] font-black uppercase leading-[1.06] tracking-tight text-gray-900 xl:text-[1.85rem]">
                            {active.title1}
                            <span className="block text-primary">{active.title2}</span>
                          </h3>
                          <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-gray-700">
                            {active.description}
                          </p>

                          <p className="mt-7 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gray-400">
                            {active.keyLabel}
                          </p>
                          <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                            {active.keyAreas.map((area) => (
                              <li
                                key={area}
                                className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-gray-700"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                                />
                                {area}
                              </li>
                            ))}
                          </ul>

                          {active.objective && (
                            <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4">
                              <p className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-primary">
                                The objective
                              </p>
                              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-gray-800">
                                {active.objective}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* visual column */}
                        <div className="flex min-h-[320px] flex-col">
                          <div className="relative flex flex-1 overflow-hidden rounded-2xl border border-primary/10 bg-white/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <div className="h-full min-h-[240px] w-full">
                              <ActiveVisual reduced={!!prefersReducedMotion} ns={`d${activeIndex}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* bottom: enterprise statement + CTA */}
                <div className="mt-8 pt-6">
                  <div
                    aria-hidden="true"
                    className="h-px w-full bg-gradient-to-r from-primary/15 via-primary/25 to-primary/15"
                  />
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-primary">
                        One connected green enterprise
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Different solutions. One circular purpose.
                      </p>
                    </div>

                    <div className="relative">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={active.explore ?? "none"}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {active.explore ? (
                            <Link
                              href={active.explore}
                              className="group/cta inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              Explore this solution
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                            </Link>
                          ) : (
                            <span className="inline-flex flex-col items-end gap-1.5">
                              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary/70">
                                <Clock
                                  aria-hidden="true"
                                  className="h-4 w-4"
                                />
                                Coming Soon
                              </span>
                              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gray-400">
                                Detailed solution page coming soon
                              </span>
                            </span>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE: VERTICAL TIMELINE ACCORDION ─────── */}
        <div className="mt-12 space-y-3 lg:hidden">
          {solutions.map((s, i) => {
            const isOpen = i === openMobile;
            const Visual = solutionVisuals[i];
            return (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: d ?? 0.5, ease: "easeOut" }}
                className={[
                  "overflow-hidden rounded-2xl border transition-colors duration-300",
                  isOpen
                    ? "border-primary/25 bg-white shadow-[0_22px_50px_-40px_rgba(20,83,45,0.5)]"
                    : "border-primary/10 bg-white/70",
                ].join(" ")}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-solution-${s.number}`}
                  onClick={() => setOpenMobile(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="text-xl font-black tabular-nums text-primary">
                    {s.number}
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-extrabold uppercase leading-tight tracking-tight text-gray-900">
                      {s.title1}
                      <span className="block text-primary">{s.title2}</span>
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={[
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-180 text-primary" : "text-gray-400",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`mobile-solution-${s.number}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: d ?? 0.4, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 px-5 pb-7">
                        <p className="text-[0.95rem] leading-relaxed text-gray-700">
                          {s.description}
                        </p>

                        <div className="h-44 overflow-hidden rounded-2xl border border-primary/10 bg-[#eef7f0] p-3">
                          <Visual reduced={!!prefersReducedMotion} ns={`m${s.number}`} />
                        </div>

                        <div>
                          <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gray-400">
                            {s.keyLabel}
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {s.keyAreas.map((area) => (
                              <li
                                key={area}
                                className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-gray-700"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                                />
                                {area}
                              </li>
                            ))}
                          </ul>
                          {s.objective && (
                            <p className="mt-4 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-gray-800">
                              <span className="font-bold uppercase tracking-wider text-primary">
                                Objective —{" "}
                              </span>
                              {s.objective}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
                          <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-primary">
                            Different solutions. One circular purpose.
                          </p>
                          {s.explore ? (
                            <Link
                              href={s.explore}
                              className="group/cta inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
                            >
                              Explore
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                            </Link>
                          ) : (
                            <span className="flex flex-col items-end gap-1.5">
                              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/30 bg-primary/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary/70">
                                <Clock
                                  aria-hidden="true"
                                  className="h-4 w-4"
                                />
                                Coming Soon
                              </span>
                              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gray-400">
                                Detailed solution page coming soon
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── closing statement → next section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: d ?? 0.7, ease: "easeOut" }}
          className="mx-auto mt-20 max-w-3xl text-center md:mt-28"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Lasting value
          </p>
          <p className="mt-4 text-2xl font-black leading-snug tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Solutions are only meaningful when they create{" "}
            <span className="text-primary">lasting value</span>.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            That means cleaner energy, healthier communities, stronger circular
            value chains and sustainable economic opportunity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}