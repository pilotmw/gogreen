"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const challenges = [
  {
    number: "01",
    heading: "Waste & Pollution",
    text: "Materials and organic resources that could be recovered and reused are often lost to dumpsites, drainage systems and the wider environment. This creates pollution while valuable resources and economic opportunities are wasted.",
  },
  {
    number: "02",
    heading: "Energy Access",
    text: "Households, institutions and businesses need reliable, affordable and cleaner energy. Expanding access to renewable energy and cleaner cooking can reduce dependence on more polluting energy sources while supporting productive activity.",
  },
  {
    number: "03",
    heading: "Climate & Environmental Pressure",
    text: "Reducing pollution, greenhouse-gas emissions, deforestation pressure and environmental degradation requires practical systems that can operate sustainably at community and commercial scale.",
  },
  {
    number: "04",
    heading: "Livelihoods",
    text: "Environmental solutions can also create economic opportunity. Communities, youth, women-led enterprises, informal waste collectors and local entrepreneurs can participate in collection, recovery, processing and distribution value chains.",
  },
];

const focusTags = [
  "Waste",
  "Pollution",
  "Clean Energy",
  "Climate Pressure",
  "Livelihoods",
];

export default function ChallengesSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const instant = prefersReducedMotion ? 0 : undefined;

  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const panelRef = useRef<HTMLDivElement>(null);
  const panelInView = useInView(panelRef, { once: true, amount: 0.1 });

  const imageInView = useInView(panelRef, { once: true, amount: 0.2 });

  const rowsInView = useInView(panelRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const greenDeepen = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v)),
  );

  return (
    <section className="relative bg-white/60 py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-28">
      {/* very subtle ambient layer behind the panel */}
      <div
        ref={sectionRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 h-[30rem] w-[60rem] max-w-full rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.25),transparent_70%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── STORY PANEL ─────────────────────────────── */}
        <motion.div
          ref={panelRef}
          style={{ position: "relative" }}
          initial={{ opacity: 0, y: 28 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: instant ?? 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[1.25rem] md:rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-white via-[#f6fbf7] to-[#eaf6ee] shadow-[0_40px_90px_-55px_rgba(22,163,74,0.5)]"
        >
          {/* ── LAYER 1: abstract environmental background ── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* soft radial energy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={panelInView ? { opacity: 1 } : undefined}
              transition={{ duration: instant ?? 1, ease: "easeOut" }}
              className="absolute -right-40 -top-52 h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.10),transparent_65%)]"
            />
            <div className="absolute -left-44 top-1/3 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.40),transparent_65%)]" />

            {/* faint concentric circular forms */}
            <svg
              className="absolute -right-20 -top-24 h-[30rem] w-[30rem] text-primary/[0.08]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* faint resource-flow arc */}
            <svg
              className="absolute -bottom-28 -left-24 h-[32rem] w-[32rem] text-primary/[0.09]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <path
                d="M 30 170 C 60 90, 130 110, 168 30"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="2 7"
              />
              <path
                d="M 40 180 C 80 110, 150 120, 178 55"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="1 9"
              />
            </svg>
          </div>

          {/* ── LAYER 2: problem → opportunity deepen (scroll) ── */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{ opacity: greenDeepen }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-primary/[0.12] via-primary/[0.04] to-transparent"
            />
          )}

          {/* thin green hairline at the very bottom edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          />

          <div className="relative px-5 sm:px-8 md:px-12 lg:px-14 pt-10 md:pt-16 pb-10 md:pb-14">
            {/* ── MARKER + HEADING + STORY | PHOTO ─────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* LEFT — story */}
              <div>
                {/* marker */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={panelInView ? { opacity: 1 } : undefined}
                  transition={{ duration: instant ?? 0.7, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-primary">
                    01 / The Challenge
                  </p>
                </motion.div>

                {/* heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 22 }}
                  animate={panelInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: instant ?? 0.7, delay: instant ?? 0.1, ease: "easeOut" }}
                  className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.08]"
                >
                  Challenges{" "}
                  <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                    We Face
                  </span>
                </motion.h2>

                {/* thesis */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={panelInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: instant ?? 0.7, delay: instant ?? 0.18, ease: "easeOut" }}
                  className="mt-6 text-gray-700 md:text-lg leading-relaxed"
                >
                  Waste, energy access, pollution, climate pressure and livelihoods
                  are not separate challenges. They are connected—and solving them
                  requires connected solutions.
                </motion.p>

                {/* full story */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={panelInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: instant ?? 0.7, delay: instant ?? 0.26, ease: "easeOut" }}
                  className="mt-5 text-gray-700 md:text-lg leading-[1.85]"
                >
                  Across Malawi, environmental and economic challenges often
                  reinforce one another. Waste that could become a{" "}
                  <span className="font-medium text-primary underline decoration-primary/30 decoration-[1.5px] underline-offset-[5px]">
                    resource
                  </span>{" "}
                  is lost, communities need{" "}
                  <span className="font-medium text-primary underline decoration-primary/30 decoration-[1.5px] underline-offset-[5px]">
                    cleaner and more reliable energy
                  </span>
                  ,{" "}
                  <span className="font-medium text-primary underline decoration-primary/30 decoration-[1.5px] underline-offset-[5px]">
                    pollution
                  </span>{" "}
                  and greenhouse-gas emissions place pressure on the environment,
                  and many people need greater access to{" "}
                  <span className="font-medium text-primary underline decoration-primary/30 decoration-[1.5px] underline-offset-[5px]">
                    dignified economic opportunities
                  </span>
                  .
                </motion.p>

                {/* key concepts */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={panelInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: instant ?? 0.6, delay: instant ?? 0.34, ease: "easeOut" }}
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {focusTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/15 bg-white/70 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — documentary photograph */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={imageInView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: instant ?? 1.1, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-primary/10"
              >
                <div className="relative w-full aspect-[16/10] lg:aspect-[4/5]">
                  <Image
                    src="/Stage_1.png"
                    alt="Scene from Malawi reflecting the environmental and economic challenges GoGreen addresses"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                    quality={85}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent"
                  />
                </div>
              </motion.div>
            </div>

            {/* ── FOUR CHALLENGES ───────────────────────── */}
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-primary/10 pt-10 md:pt-12">
              {challenges.map((item, i) => {
                const isActive = activeIndex === i;
                const isDimmed = activeIndex !== null && !isActive;

                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 18 }}
                    animate={rowsInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      duration: instant ?? 0.6,
                      delay: instant ?? i * 0.08,
                      ease: "easeOut",
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex(null)}
                    tabIndex={0}
                    role="article"
                    aria-label={`Challenge: ${item.heading}`}
                    className={[
                      "relative outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary transition-opacity duration-300 cursor-default",
                      isDimmed ? "opacity-55" : "opacity-100",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={[
                          "text-[0.7rem] font-bold tracking-[0.2em] text-primary transition-colors duration-300",
                          isActive ? "text-primary-dark" : "text-primary",
                        ].join(" ")}
                      >
                        {item.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className={[
                          "h-px bg-primary/25 transition-all duration-300",
                          isActive ? "w-10" : "w-5",
                        ].join(" ")}
                      />
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-gray-900 leading-snug">
                      {item.heading}
                    </h3>
                    <p className="mt-2.5 text-sm md:text-[0.9375rem] text-gray-600 leading-relaxed text-justify">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* ── TRANSITION TOWARD OUR RESPONSE ────────── */}
            <div className="mt-12 md:mt-16 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={rowsInView ? { opacity: 1 } : undefined}
                transition={{ duration: instant ?? 0.8, delay: instant ?? 0.3, ease: "easeOut" }}
                aria-hidden="true"
                className="mx-auto mb-8 block h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={rowsInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: instant ?? 0.7, delay: instant ?? 0.36, ease: "easeOut" }}
                className="mx-auto max-w-2xl text-base md:text-lg text-gray-700 leading-relaxed"
              >
                These challenges require more than isolated interventions. They
                require systems that connect resources, energy, people and economic
                value.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={rowsInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: instant ?? 0.6, delay: instant ?? 0.44, ease: "easeOut" }}
                className="mt-8"
              >
                <Link
                  href="#our-response"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Our Response
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}