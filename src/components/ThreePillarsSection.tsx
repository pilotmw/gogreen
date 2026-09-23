"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";

const pillars = [
  {
    number: "01",
    title1: "Clean Energy",
    title2: "& Resource Recovery",
    description:
      "We develop practical clean-energy and resource-recovery solutions that convert underused resources and waste streams into useful energy and productive outputs.",
    whatWeDo: [
      "Renewable energy and solar electrification projects",
      "Sustainable mobility and EV infrastructure",
      "Clean cooking and bioenergy solutions",
      "Turning waste streams into energy and productive outputs",
    ],
    explore: { label: "Explore Solution", href: "/solutions#clean-energy" },
    note: "Renewable energy, mobility, clean cooking and resource-to-energy.",
  },
  {
    number: "02",
    title1: "Materials Recycling",
    title2: "& Circular Supply Chains",
    description:
      "We support the recovery, processing and circulation of materials, helping businesses and communities reduce waste while keeping valuable resources in productive use.",
    whatWeDo: [
      "Recovery, collection and aggregation of recyclable materials",
      "Aluminium can recycling and materials processing",
      "Circular supply-chain partnerships for businesses and communities",
      "Keeping materials in productive circulation, not landfill",
    ],
    explore: { label: "Explore Solution", href: "/solutions#materials-recovery" },
    note: "Collection, recycling and circular supply-chain solutions.",
  },
  {
    number: "03",
    title1: "Inclusive",
    title2: "Green Livelihoods",
    description:
      "We create opportunities for people and communities to participate in the green economy through skills, enterprise, employment and sustainable livelihood opportunities.",
    whatWeDo: [
      "Skills development and training in green enterprises",
      "Supporting community-based green businesses and employment",
      "Enabling people to earn from recycling and collection",
      "Creating livelihood opportunities across the circular economy",
    ],
    explore: { label: "Explore Solution", href: "/solutions#livelihoods" },
    note: "Skills, enterprises and livelihoods linked to the green economy.",
  },
];

/* ── Card visual treatments per pillar ─────────────── */

const cardStyles = [
  {
    card: "bg-[linear-gradient(155deg,#16a34a_0%,#15803d_58%,#14532d_100%)]",
    border: "border-white/20",
    shadow:
      "shadow-[0_40px_80px_-48px_rgba(20,83,45,0.55)] hover:shadow-[0_52px_100px_-42px_rgba(20,83,45,0.6)]",
    glow: "bg-[radial-gradient(130%_90%_at_16%_0%,rgba(255,255,255,0.16),transparent_55%)]",
    number: "text-[#bbf7d0] group-hover:text-white",
    rule: "bg-white/20 group-hover:bg-white/45",
    title: "text-white",
    desc: "text-[#d1fae5]/85",
    hairline: "bg-white/15",
    explore: "text-[#bbf7d0] group-hover:text-white",
    arrowBox: "bg-white/15 group-hover:bg-white/25",
    tone: "dark" as const,
    activeRing: "ring-2 ring-[#86efac]/70",
    strip: "bg-gradient-to-r from-[#16a34a] to-[#14532d]",
  },
  {
    card: "bg-[linear-gradient(155deg,#ffffff_0%,#f0fdf4_45%,#dcfce7_100%)]",
    border: "border-primary/15",
    shadow:
      "shadow-[0_40px_80px_-50px_rgba(22,163,74,0.3)] hover:shadow-[0_52px_100px_-46px_rgba(22,163,74,0.35)]",
    glow: "bg-[radial-gradient(130%_90%_at_16%_0%,rgba(34,197,94,0.13),transparent_55%)]",
    number: "text-primary-dark group-hover:text-primary",
    rule: "bg-primary/25 group-hover:bg-primary/55",
    title: "text-gray-900",
    desc: "text-gray-600",
    hairline: "bg-primary/15",
    explore: "text-primary-dark group-hover:text-primary",
    arrowBox: "bg-primary/10 group-hover:bg-primary/20",
    tone: "light" as const,
    activeRing: "ring-2 ring-primary/60",
    strip: "bg-gradient-to-r from-white via-primary-light to-primary",
  },
  {
    card: "bg-[linear-gradient(155deg,#14532d_0%,#166534_52%,#16a34a_100%)]",
    border: "border-white/20",
    shadow:
      "shadow-[0_40px_80px_-48px_rgba(8,38,20,0.65)] hover:shadow-[0_52px_100px_-40px_rgba(8,38,20,0.7)]",
    glow: "bg-[radial-gradient(130%_90%_at_16%_0%,rgba(255,255,255,0.13),transparent_55%)]",
    number: "text-[#bbf7d0] group-hover:text-[#a7f3d0]",
    rule: "bg-white/20 group-hover:bg-white/45",
    title: "text-white",
    desc: "text-[#d1fae5]/85",
    hairline: "bg-white/15",
    explore: "text-[#bbf7d0] group-hover:text-white",
    arrowBox: "bg-white/15 group-hover:bg-white/25",
    tone: "dark" as const,
    activeRing: "ring-2 ring-[#bbf7d0]/70",
    strip: "bg-gradient-to-r from-[#14532d] to-[#16a34a]",
  },
];

/* ── Abstract SVG visuals (subtle, no icons) ────────── */

type Tone = "dark" | "light";
const palette = {
  dark: {
    stroke: "rgba(255,255,255,0.42)",
    dim: "rgba(255,255,255,0.22)",
    flow: "rgba(187,247,208,0.9)",
    node: "#bbf7d0",
    bright: "#f0fdf4",
    label: "rgba(255,255,255,0.78)",
  },
  light: {
    stroke: "rgba(22,163,74,0.40)",
    dim: "rgba(22,163,74,0.20)",
    flow: "#15803d",
    node: "#16a34a",
    bright: "#16a34a",
    label: "rgba(55,65,81,0.80)",
  },
};

function VisualEnergy({ tone, reduced }: { tone: Tone; reduced: boolean }) {
  const s = palette[tone];
  const path =
    "M34 118 C 92 112 92 92 128 84 C 168 75 168 64 202 62 C 246 57 262 45 330 36";
  return (
    <svg
      viewBox="0 0 360 150"
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        id="pillar-energy-path"
        d={path}
        fill="none"
        stroke={s.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        strokeDasharray="0.5 0.5"
        d={path}
        fill="none"
        stroke={s.flow}
        strokeWidth="1.7"
        strokeLinecap="round"
        className="pillar-flow"
      />
      <path
        d="M28 132 C 120 130 202 118 334 112"
        fill="none"
        stroke={s.dim}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {!reduced && (
        <g>
          <circle r="7" fill={s.bright} opacity="0.3">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              begin="0s"
              rotate="0"
            >
              <mpath href="#pillar-energy-path" />
            </animateMotion>
          </circle>
          <circle r="3.2" fill={s.bright}>
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              begin="0s"
              rotate="0"
            >
              <mpath href="#pillar-energy-path" />
            </animateMotion>
          </circle>
        </g>
      )}
      <g fill={s.node}>
        <circle cx="34" cy="118" r="3.2" />
        <circle cx="128" cy="84" r="3.2" />
        <circle cx="202" cy="62" r="3.2" />
        <circle cx="330" cy="36" r="3.2" />
      </g>
      <g
        fill={s.label}
        fontSize="9"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.5"
      >
        <text x="34" y="138" textAnchor="middle">
          RESOURCE
        </text>
        <text x="128" y="70" textAnchor="middle">
          RECOVERY
        </text>
        <text x="202" y="48" textAnchor="middle">
          ENERGY
        </text>
        <text x="330" y="22" textAnchor="middle">
          VALUE
        </text>
      </g>
    </svg>
  );
}

function VisualCirculation({ tone, reduced }: { tone: Tone; reduced: boolean }) {
  const s = palette[tone];
  const cx = 180;
  const cy = 90;
  const r = 52;
  return (
    <svg
      viewBox="0 0 360 180"
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id={`pillar-arrow-${tone}`}
          viewBox="0 0 8 8"
          markerWidth="5"
          markerHeight="5"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 z" fill={s.node} />
        </marker>
      </defs>

      <circle
        id="pillar-ring-path"
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={s.stroke}
        strokeWidth="1"
        strokeDasharray="2 7"
        className="pillar-spin"
      />

      {!reduced && (
        <g>
          <circle r="6.5" fill={s.bright} opacity="0.3">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              begin="0s"
              rotate="0"
            >
              <mpath href="#pillar-ring-path" />
            </animateMotion>
          </circle>
          <circle r="3" fill={s.bright}>
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              begin="0s"
              rotate="0"
            >
              <mpath href="#pillar-ring-path" />
            </animateMotion>
          </circle>
        </g>
      )}

      <g fill="none" stroke={s.node} strokeWidth="1.1">
        <path d="M180 46 A44 44 0 0 1 224 90" markerEnd={`url(#pillar-arrow-${tone})`} />
        <path d="M224 90 A44 44 0 0 1 180 134" markerEnd={`url(#pillar-arrow-${tone})`} />
        <path d="M180 134 A44 44 0 0 1 136 90" markerEnd={`url(#pillar-arrow-${tone})`} />
        <path d="M136 90 A44 44 0 0 1 180 46" markerEnd={`url(#pillar-arrow-${tone})`} />
      </g>

      <g fill={s.node}>
        <circle cx={cx} cy={cy} r="3" />
        <circle cx={cx} cy={cy} r="9" fill={s.node} opacity="0.18" />
      </g>
      <g fill={s.node}>
        <circle cx="180" cy="26" r="3.2" />
        <circle cx="240" cy="90" r="3.2" />
        <circle cx="180" cy="154" r="3.2" />
        <circle cx="120" cy="90" r="3.2" />
      </g>
      <g
        fill={s.label}
        fontSize="9"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.5"
      >
        <text x="180" y="16" textAnchor="middle">
          USE
        </text>
        <text x="258" y="94" textAnchor="start">
          RECOVER
        </text>
        <text x="180" y="175" textAnchor="middle">
          PROCESS
        </text>
        <text x="102" y="94" textAnchor="end">
          REUSE
        </text>
      </g>
    </svg>
  );
}

function VisualLivelihoods({ tone, reduced }: { tone: Tone; reduced: boolean }) {
  const s = palette[tone];
  const center = { x: 180, y: 86 };
  const satellites = [
    { x: 66, y: 46, label: "PEOPLE", delay: 0 },
    { x: 294, y: 46, label: "SKILLS", delay: 0.9 },
    { x: 66, y: 126, label: "ENTERPRISE", delay: 1.8 },
    { x: 294, y: 126, label: "INCOME", delay: 2.7 },
  ];
  return (
    <svg
      viewBox="0 0 360 180"
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={s.stroke} strokeWidth="1.2" opacity="0.6">
        {satellites.map((n) => (
          <line key={n.label} x1={center.x} y1={center.y} x2={n.x} y2={n.y} />
        ))}
      </g>

      {!reduced && (
        <g>
          <circle
            cx={center.x}
            cy={center.y}
            r="11"
            fill="none"
            stroke={s.flow}
            strokeWidth="1"
            className="pillar-ring"
          />
          <circle
            cx={center.x}
            cy={center.y}
            r="11"
            fill="none"
            stroke={s.flow}
            strokeWidth="1"
            className="pillar-ring"
            style={{ animationDelay: "2.2s" }}
          />
        </g>
      )}

      <g fill={s.node}>
        <circle cx={center.x} cy={center.y} r="4" />
        <circle cx={center.x} cy={center.y} r="8" fill={s.node} opacity="0.16" />
        {satellites.map((n) => (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={n.y}
              r="3.2"
              className={reduced ? undefined : "pillar-pulse"}
              style={reduced ? undefined : { animationDelay: `${n.delay}s` }}
            />
          </g>
        ))}
      </g>

      <g
        fill={s.label}
        fontSize="9"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.2"
      >
        <text x="66" y="34" textAnchor="middle">
          PEOPLE
        </text>
        <text x="294" y="34" textAnchor="middle">
          SKILLS
        </text>
        <text x="66" y="144" textAnchor="middle">
          ENTERPRISE
        </text>
        <text x="294" y="144" textAnchor="middle">
          INCOME
        </text>
        <text x="180" y="112" textAnchor="middle">
          OPPORTUNITY
        </text>
      </g>
    </svg>
  );
}

const visuals = [VisualEnergy, VisualCirculation, VisualLivelihoods];

/* ── Section ───────────────────────────────────────── */

export default function ThreePillarsSection() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const [selected, setSelected] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="focus"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fafaf7]/75 py-20 md:py-28 lg:py-32 scroll-mt-28"
    >
      {/* ── ambient backdrop: atmosphere, not decoration ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/2 h-[36rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.32),transparent_70%)]" />
        <div className="absolute -left-44 bottom-[-8rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.09),transparent_70%)]" />
        <div className="absolute -right-40 top-1/4 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.28),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[-10rem] left-[6%] h-[26rem] w-[26rem] rounded-[45%_55%_60%_40%/52%_40%_60%_48%] bg-green-100/45 blur-3xl" />
        <svg
          className="absolute -top-24 -right-48 h-[46rem] w-[46rem] text-primary/[0.05]"
          viewBox="0 0 400 400"
          fill="none"
        >
          {[60, 110, 160, 210].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
        <svg
          className="absolute top-1/2 left-[-7rem] h-[20rem] w-[26rem] text-primary/[0.07]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M 10 170 C 60 140, 120 150, 190 90"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 11"
          />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_55%,rgba(255,255,255,0.55)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Our Focus
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Three Connected{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Areas of Action
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 text-pretty md:text-lg">
            GoGreen Resources works across clean energy and resource recovery,
            circular materials and supply chains, and inclusive green
            livelihoods—connecting environmental solutions with economic
            opportunity.
          </p>
        </motion.div>

        {/* ── cards + connecting flow line ── */}
        <div className="relative mt-14 md:mt-16 lg:mt-20">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 inset-x-0 z-0 hidden h-24 w-full text-[#15803d]/20 md:block"
            viewBox="0 0 1200 96"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              pathLength={1}
              strokeDasharray="0.45 0.55"
              d="M0 62 C 240 20, 440 92, 620 56 S 990 22, 1200 50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="pillar-flow"
            />
          </svg>

          <div className="relative z-[1] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {pillars.map((pillar, i) => {
              const style = cardStyles[i];
              const Visual = visuals[i];
              const isActive = selected === i;
              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: d ?? 0.7,
                    delay: d ?? 0.1 + i * 0.14,
                    ease: "easeOut",
                  }}
                  className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(isActive ? null : i)}
                    aria-expanded={isActive}
                    aria-controls={isActive ? `pillar-details-${pillar.number}` : undefined}
                    className={[
                      "group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border px-7 pb-6 pt-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                      "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2",
                      style.card,
                      style.border,
                      style.shadow,
                      isActive ? style.activeRing : "",
                    ].join(" ")}
                  >
                    {/* soft internal glow */}
                    <div
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute inset-0 transition-opacity duration-500",
                        style.glow,
                        isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100",
                      ].join(" ")}
                    />

                    <div className="relative z-10 flex h-full flex-col">
                      {/* number + rule */}
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "text-sm font-black tracking-[0.3em] transition-colors duration-500",
                            style.number,
                          ].join(" ")}
                        >
                          {pillar.number}
                        </span>
                        <span
                          aria-hidden="true"
                          className={[
                            "h-px flex-1 transition-colors duration-500",
                            style.rule,
                          ].join(" ")}
                        />
                      </div>

                      {/* title */}
                      <h3
                        className={[
                          "mt-6 text-2xl font-extrabold uppercase leading-[1.08] tracking-tight lg:text-[1.6rem]",
                          style.title,
                        ].join(" ")}
                      >
                        {pillar.title1}
                        <span className="block opacity-90">{pillar.title2}</span>
                      </h3>

                      {/* description */}
                      <p
                        className={[
                          "mt-4 text-[0.94rem] leading-relaxed",
                          style.desc,
                        ].join(" ")}
                      >
                        {pillar.description}
                      </p>

                      {/* abstract visual */}
                      <div className="mt-6 h-36 sm:h-40">
                        <Visual tone={style.tone} reduced={!!prefersReducedMotion} />
                      </div>

                      {/* explore */}
                      <div className="mt-auto pt-7">
                        <div
                          aria-hidden="true"
                          className={[
                            "h-px transition-colors duration-500",
                            style.hairline,
                          ].join(" ")}
                        />
                        <div className="mt-5 flex items-center justify-between">
                          <span
                            className={[
                              "text-[0.7rem] font-bold uppercase tracking-[0.26em] transition-colors duration-500",
                              style.explore,
                            ].join(" ")}
                          >
                            {isActive ? "Close" : "Explore"}
                          </span>
                          <span
                            className={[
                              "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500",
                              style.arrowBox,
                            ].join(" ")}
                          >
                            {isActive ? (
                              <ArrowUp
                                className={[
                                  "h-4 w-4",
                                  style.tone === "light" ? "text-primary" : "text-white",
                                ].join(" ")}
                              />
                            ) : (
                              <ArrowRight
                                className={[
                                  "h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5",
                                  style.tone === "light" ? "text-primary" : "text-white",
                                ].join(" ")}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* ── expansion panel ── */}
          <AnimatePresence initial={false}>
            {selected !== null && (
              <motion.div
                key={`details-${pillars[selected].number}`}
                id={`pillar-details-${pillars[selected].number}`}
                role="region"
                aria-label={`${pillars[selected].title1} ${pillars[selected].title2} — what we do`}
                initial={{ height: 0, opacity: 0, y: -6 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -6 }}
                transition={{ duration: d ?? 0.45, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 md:mt-8">
                  <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white/90 shadow-[0_36px_80px_-48px_rgba(20,40,20,0.35)]">
                    <div
                      aria-hidden="true"
                      className={["h-1.5 w-full", cardStyles[selected].strip].join(" ")}
                    />
                    <div className="grid gap-8 p-7 md:grid-cols-[230px_1fr_auto] md:items-start md:p-10">
                      <div>
                        <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-primary">
                          What We Do
                        </p>
                        <p className="mt-4 text-5xl font-black leading-none tabular-nums text-primary/90">
                          {pillars[selected].number}
                        </p>
                        <h4 className="mt-3 text-xl font-extrabold uppercase leading-snug tracking-tight text-gray-900">
                          {pillars[selected].title1}
                          <span className="block text-primary">
                            {pillars[selected].title2}
                          </span>
                        </h4>
                      </div>
                      <ul className="space-y-3.5">
                        {pillars[selected].whatWeDo.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-gray-700"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="md:pt-1">
                        <Link
                          href={pillars[selected].explore.href}
                          className="group/btn inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {pillars[selected].explore.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                        <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-gray-500">
                          {pillars[selected].note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── transition into the seven-solution showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.7, delay: d ?? 0.2, ease: "easeOut" }}
          className="mx-auto mt-20 max-w-3xl text-center md:mt-28"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            What We Deliver
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            From Focus Areas to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Practical Solutions
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 text-pretty md:text-lg">
            Within these three connected areas, GoGreen develops and operates
            practical solutions that respond to real energy, resource,
            environmental and livelihood needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}