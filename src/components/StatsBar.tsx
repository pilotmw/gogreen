"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import type { HomeStat } from "@/data/homeContent";

interface StatsBarProps {
  stats: HomeStat[];
  /** Small label above the figures. */
  label?: string;
  /** Optional line under the figures — used on /impact for the reporting
      period and a placeholder notice. Omitted on the homepage. */
  note?: string;
  /** How many figures sit per row from `lg` up. Defaults to 4 (the
      homepage's 4-up layout). Pass 3 for a 6-figure grid that divides
      evenly. */
  columns?: 3 | 4;
}

export default function StatsBar({
  stats,
  label = "Our progress so far",
  note,
  columns = 4,
}: StatsBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    /* Distinct band colour: hero is photographic, Challenges is white/60,
       Response is #fbfbfa — this deep green band separates all three. */
    <section
      ref={sectionRef}
      aria-label="GoGreen Resources at a glance"
      className="relative overflow-hidden bg-[linear-gradient(to_right,rgba(6,95,70,0.94),rgba(30,58,95,0.94))] py-14 md:py-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[24rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.28),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.6, ease: "easeOut" }}
          className="text-center text-xs font-bold uppercase tracking-[0.3em] text-primary-light"
        >
          {label}
        </motion.p>

        {/* 2x2 on mobile, then `columns` per row */}
        <dl
          className={[
            "mt-8 grid grid-cols-2 gap-x-6 gap-y-9 md:mt-10",
            columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          ].join(" ")}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: d ?? 0.6,
                delay: d ?? 0.1 + i * 0.1,
                ease: "easeOut",
              }}
              className="flex flex-col items-center text-center"
            >
              <dd className="text-3xl font-black leading-none tabular-nums tracking-tight text-white sm:text-4xl md:text-5xl">
                {/* An empty value means the figure has not been supplied
                    yet, so render a dash rather than a blank. Matches the
                    placeholder-stat treatment on /solutions. */}
                {stat.value.trim() || "—"}
              </dd>
              <span
                aria-hidden="true"
                className="mt-4 h-px w-10 bg-gradient-to-r from-transparent via-primary-light to-transparent"
              />
              <dt className="mt-3 max-w-[14rem] text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-green-100/90 sm:text-sm">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </dl>

        {note && (
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-green-100/80">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
