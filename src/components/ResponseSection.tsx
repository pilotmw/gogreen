"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  AnimatePresence,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, RotateCcw } from "lucide-react";

const stages = [
  {
    number: "01",
    name: "RECOVER",
    description:
      "Recover value from waste and underused resources.",
  },
  {
    number: "02",
    name: "CONVERT",
    description:
      "Transform recovered resources into useful materials, clean energy and productive outputs.",
  },
  {
    number: "03",
    name: "DISTRIBUTE",
    description:
      "Connect clean energy, recovered materials and green services with people, businesses and markets.",
  },
  {
    number: "04",
    name: "CREATE VALUE",
    description:
      "Generate environmental, social and economic value.",
  },
  {
    number: "05",
    name: "REINVEST",
    description:
      "Strengthen communities, green businesses and future circular opportunities.",
  },
];

const CX = 320;
const CY = 320;
const R = 230;

const degrees = Math.PI / 180;
const polar = (r: number, a: number) => ({
  x: CX + r * Math.cos(a * degrees),
  y: CY + r * Math.sin(a * degrees),
});

const stageAngles = [-90, -18, 54, 126, 198];
const nodes = stageAngles.map((a) => polar(R, a));
const nodeOuter = stageAngles.map((a) => polar(252, a));
const numberPos = stageAngles.map((a) => polar(260, a));
const labelOuter = stageAngles.map((a) => polar(292, a));
const midAngles = [-54, 18, 90, 162, 234];

const arcSegment = (p: { x: number; y: number }, n: { x: number; y: number }) =>
  `A ${R} ${R} 0 0 1 ${n.x.toFixed(1)} ${n.y.toFixed(1)}`;

const closedPath = `M ${nodes[0].x} ${nodes[0].y} ${nodes
  .slice(1)
  .map((n) => arcSegment(nodes[0], n))
  .join(" ")} ${arcSegment(nodes[nodes.length - 1], nodes[0])}`;

const textAnchor: ("middle" | "start" | "end")[] = [
  "middle",
  "start",
  "start",
  "end",
  "end",
];

export default function ResponseSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const ringInView = useInView(ringRef, { once: true, amount: 0.2 });
  const closingInView = useInView(closingRef, { once: true, amount: 0.35 });

  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(activeStage);
  useEffect(function keepActiveStageInSync() {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  const { scrollYProgress } = useScroll({
    target: ringRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const ringFill = useMotionValue(
    prefersReducedMotion ? 1 : 1 / stages.length,
  );
  const bgScale = useTransform(ringFill, [0, 1], [1, 1.045]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReducedMotion) return;
    const clamped = Math.min(1, Math.max(0, v));
    ringFill.jump(clamped);
    setActiveStage(Math.min(4, Math.floor(clamped * 5)));
  });

  const selectStage = (index: number) => {
    setActiveStage(index);
    if (!prefersReducedMotion) {
      animate(ringFill, (index + 1) / stages.length, {
        duration: 0.6,
        ease: "easeInOut",
      });
    }
  };

  useEffect(function autoCycle() {
    if (prefersReducedMotion) return;
    const tick = window.setInterval(() => {
      const next = (activeStageRef.current + 1) % stages.length;
      setActiveStage(next);
      animate(ringFill, (next + 1) / stages.length, {
        duration: 0.8,
        ease: "easeInOut",
      });
    }, 4200);
    return () => window.clearInterval(tick);
  }, [prefersReducedMotion, ringFill]);

  return (
    <section
      id="our-response"
      ref={sectionRef}
      className="relative bg-[#fbfbfa]/80 overflow-hidden scroll-mt-28"
    >
      {/* ── SECTION BACKGROUND DEPTH ─────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-48 top-[-10rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.10),transparent_65%)]" />
        <div className="absolute -left-52 top-1/3 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.28),transparent_65%)]" />
        <div className="absolute -bottom-56 right-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.07),transparent_60%)]" />

        {/* faint flow curves */}
        <svg
          className="absolute right-[8%] top-[14%] h-[46rem] w-[46rem] text-primary/[0.06]"
          viewBox="0 0 200 200"
          fill="none"
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
            We connect resources, energy, technology and people to create
            practical green solutions that generate environmental, social and
            economic value.
          </motion.p>
        </div>

        {/* ── 2. EDITORIAL STATEMENT ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.9, delay: d ?? 0.2, ease: "easeOut" }}
          className="relative mx-auto mt-12 md:mt-16 max-w-6xl overflow-hidden rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-[#16a34a]/[0.08] via-[#a7f3d0]/[0.22] to-white px-6 py-12 sm:px-10 md:px-16 md:py-14 text-center"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.14),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.45),transparent_70%)]"
          />

          <p className="text-[0.68rem] font-bold tracking-[0.3em] uppercase text-primary">
            What we do
          </p>
          <p className="relative mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.98] tracking-tight text-gray-900">
            Turning Resources
            <br />
            Into{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Opportunity.
            </span>
          </p>
        </motion.div>

        {/* ── 3. PHOTO BAND ───────────────────────────── */}
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

        {/* ── 4. MODEL STATEMENT — two lines ──────────── */}
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.8, ease: "easeOut" }}
          className="mt-10 md:mt-14 text-center text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black uppercase leading-[1.12] tracking-tight text-gray-900"
        >
          We don&apos;t just manage waste.
          <br />
          We create{" "}
          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            value
          </span>{" "}
          from it.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.8, delay: d ?? 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-3xl text-center text-base md:text-lg leading-relaxed text-gray-600 text-pretty"
        >
          Nothing valuable should be wasted. Our approach keeps resources, energy
          and opportunity circulating—transforming environmental challenges into
          practical solutions, sustainable livelihoods and lasting economic value.
        </motion.p>

        {/* ── 5. MAIN ZONE: THE CIRCULAR SYSTEM ─────────── */}
        <div className="relative mt-12 md:mt-16">
          <div ref={ringRef} className="relative" style={{ position: "relative" }}>
            {/* pale-green radial field behind the ring */}
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden="true"
                style={{ scale: bgScale }}
                className="pointer-events-none absolute -inset-8 md:-inset-12 hidden lg:block"
              >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.5),rgba(255,255,255,0)_68%)]" />
              </motion.div>
            )}

            {/* Mobile vertical journey */}
            <div className="relative lg:hidden">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={ringInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: d ?? 0.7, ease: "easeOut" }}
                className="pb-6 text-center text-xs font-bold tracking-[0.24em] uppercase text-gray-500 md:hidden"
              >
                How the system moves
              </motion.p>
              <div className="mx-auto max-w-sm">
                {stages.map((stage, i) => (
                  <div key={stage.name} className="relative text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={ringInView ? { opacity: 1, y: 0 } : undefined}
                      transition={{
                        duration: d ?? 0.5,
                        delay: d ?? (i + 1) * 0.08,
                        ease: "easeOut",
                      }}
                      className="relative z-10 inline-flex flex-col items-center gap-1"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-[0.65rem] font-bold tracking-widest text-primary">
                          {stage.number}
                        </span>
                        <span
                          className="h-2.5 w-2.5 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                          {stage.name}
                        </h3>
                      </div>
                      <p className="mt-1 max-w-[15rem] text-xs leading-relaxed text-gray-600">
                        {stage.description}
                      </p>
                    </motion.div>

                    {i < stages.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-full z-0 mt-1 h-8 w-px -translate-x-1/2 bg-primary/30"
                      />
                    )}
                    {i === stages.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={ringInView ? { opacity: 1 } : undefined}
                        transition={{ duration: d ?? 0.5, delay: d ?? 0.6 }}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-primary"
                      >
                        <RotateCcw className="h-3 w-3" aria-hidden="true" />
                        Returns to Recover
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop / tablet ring */}
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={ringInView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: d ?? 0.9, ease: "easeOut" }}
                className="relative mx-auto w-full max-w-[1000px]"
              >
                <div className="relative aspect-square">
                  {/* main diagram */}
                  <svg
                    className="absolute inset-0 h-full w-full overflow-visible"
                    viewBox="-160 -160 960 960"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient
                        id="gogreen-center-glow"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.16" />
                        <stop offset="70%" stopColor="#22c55e" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="gogreen-node-glow"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient
                        id="gogreen-ring-grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                      <linearGradient
                        id="gogreen-label-grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>

                    {/* centre — one clean circle + soft glow */}
                    <circle
                      cx={CX}
                      cy={CY}
                      r={150}
                      stroke="#eef4ef"
                      strokeWidth="1"
                    />
                    <circle
                      cx={CX}
                      cy={CY}
                      r={190}
                      fill="url(#gogreen-center-glow)"
                    />

                    {/* inner active ring — GoGreen green progress */}
                    <motion.path
                      d={closedPath}
                      stroke="url(#gogreen-ring-grad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      style={{
                        pathLength: prefersReducedMotion ? 1 : ringFill,
                      }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.02 }}
                    />

                    {/* directional chevrons */}
                    {midAngles.map((a) => {
                      const p = polar(R, a);
                      return (
                        <path
                          key={a}
                          d="M -7 -9 L 8 0 L -7 9"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          opacity="0.55"
                          transform={`translate(${p.x} ${p.y}) rotate(${a + 90})`}
                        />
                      );
                    })}

                    {/* stage nodes + labels */}
                    {stages.map((stage, i) => {
                      const n = nodes[i];
                      const no = nodeOuter[i];
                      const np = numberPos[i];
                      const lo = labelOuter[i];
                      const isActive =
                        prefersReducedMotion ? i === 0 : activeStage === i;
                      const isDimmed =
                        !prefersReducedMotion && activeStage !== i;

                      return (
                        <g
                          key={stage.name}
                          role="button"
                          tabIndex={0}
                          aria-label={`Stage ${stage.number}: ${stage.name}`}
                          onClick={() => selectStage(i)}
                          onMouseEnter={() => selectStage(i)}
                          onFocus={() => selectStage(i)}
                          className={[
                            "cursor-pointer outline-none",
                            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                          ].join(" ")}
                        >
                          {/* connector to number */}
                          <line
                            x1={n.x}
                            y1={n.y}
                            x2={no.x}
                            y2={no.y}
                            stroke={isActive ? "#16a34a" : "#dfe6e1"}
                            strokeWidth="2"
                            opacity="0.8"
                          />

                          {/* node glow when active */}
                          <motion.circle
                            cx={n.x}
                            cy={n.y}
                            r="30"
                            fill="url(#gogreen-node-glow)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ duration: d ?? 0.5, ease: "easeOut" }}
                          />

                          {/* white gap so the node sits on the track */}
                          <circle cx={n.x} cy={n.y} r="11" fill="#fbfbfa" />

                          {/* active pulse */}
                          {isActive && !prefersReducedMotion && (
                            <motion.circle
                              cx={n.x}
                              cy={n.y}
                              fill="#34d399"
                              initial={{ r: 6, opacity: 0.5 }}
                              animate={{ r: 18, opacity: 0 }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                              }}
                            />
                          )}

                          {/* node dot */}
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={isActive ? 7 : 4.5}
                            fill={isActive ? "#16a34a" : "#c2cbc4"}
                            style={
                              isActive
                                ? {
                                    filter:
                                      "drop-shadow(0 0 5px rgba(22,163,74,0.5))",
                                  }
                                : undefined
                            }
                          />

                          {/* number — small and muted */}
                          <text
                            x={np.x}
                            y={np.y - 9}
                            textAnchor={textAnchor[i]}
                            className={[
                              "text-[10px] font-bold",
                              isActive ? "fill-primary" : "fill-[#b8c0ba]",
                            ].join(" ")}
                            style={{ letterSpacing: "0.14em" }}
                          >
                            {stage.number}
                          </text>

                          {/* stage name */}
                          <text
                            x={lo.x}
                            y={lo.y}
                            textAnchor={textAnchor[i]}
                            className={[
                              "uppercase font-extrabold",
                              isActive
                                ? "text-[19px]"
                                : "text-[15px]",
                            ].join(" ")}
                            style={{
                              letterSpacing: "0.06em",
                              fill: isActive
                                ? "url(#gogreen-label-grad)"
                                : "#aeb6af",
                              filter: isActive
                                ? "drop-shadow(0 2px 8px rgba(22,163,74,0.35))"
                                : undefined,
                              opacity: isDimmed ? 0.7 : 1,
                            }}
                          >
                            {stage.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* centre — animated active-stage engine */}
                  <div
                    aria-live="polite"
                    className="pointer-events-none absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 text-center"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStage}
                        initial={{ opacity: 0, y: 14, scale: 0.97, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -14, scale: 0.97, filter: "blur(8px)" }}
                        transition={{ duration: d ?? 0.55, ease: "easeOut" }}
                        className="flex flex-col items-center"
                      >
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.34em] text-primary">
                          Stage {stages[activeStage].number}
                        </p>
                        <h4 className="mt-2 text-2xl font-black uppercase tracking-tight">
                          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                            {stages[activeStage].name}
                          </span>
                        </h4>
                        <span
                          aria-hidden="true"
                          className="mx-auto mt-2.5 block h-px w-14 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                        />
<p className="mx-auto mt-2.5 max-w-[19rem] text-[0.92rem] leading-relaxed text-gray-600 text-pretty">
  {stages[activeStage].description}
</p>
                        {activeStage === 4 && !prefersReducedMotion && (
                          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-widest text-primary">
                            <RotateCcw className="h-3 w-3" aria-hidden="true" />
                            Returns to Recover
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* stage progress markers */}
                    <div
                      className="mt-5 flex items-center justify-center gap-1.5"
                      aria-hidden="true"
                    >
                      {stages.map((s, i) => (
                        <span
                          key={s.name}
                          className={[
                            "h-1.5 rounded-full transition-all duration-300",
                            i === activeStage
                              ? "w-6 bg-primary"
                              : "w-1.5 bg-[#d4dcd6]",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── 6. CLOSING STATEMENT ────────────────────── */}
        <div ref={closingRef} className="mx-auto mt-12 md:mt-16 max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={closingInView ? { opacity: 1 } : undefined}
            transition={{ duration: d ?? 0.7, ease: "easeOut" }}
            aria-hidden="true"
            className="mx-auto mb-7 block h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={closingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-gray-900"
          >
            A{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              greener economy
            </span>{" "}
            is not one solution.
            <br />
            It is a connected system.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={closingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.15, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-gray-600"
          >
            GoGreen Resources builds those connections.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={closingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.6, delay: d ?? 0.3, ease: "easeOut" }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Explore Our Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}