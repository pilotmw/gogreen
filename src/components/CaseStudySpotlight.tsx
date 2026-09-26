"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Package, Recycle, Users, Zap, type LucideIcon } from "lucide-react";
import { useRef } from "react";

import type { FeaturedProject, WorkIconName } from "@/data/homeContent";
import { WorkVisual } from "@/components/WorkTeaserCard";

const workIcons: Record<WorkIconName, LucideIcon> = {
  recycle: Recycle,
  energy: Zap,
  materials: Package,
  people: Users,
};

interface CaseStudySpotlightProps {
  project: FeaturedProject;
  /** Optional section label. */
  label?: string;
  /** Optional section heading. Omit to let the project name lead. */
  title?: string;
  subtitle?: string;
}

/* Large single-project feature. Reusable: pass any FeaturedProject-shaped
   object (e.g. from /projects) to feature a different case study later. */
export default function CaseStudySpotlight({
  project,
  label = "Case Study",
  title,
  subtitle,
}: CaseStudySpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      aria-label="Featured case study"
      className="relative overflow-hidden bg-[#f7fbf8]/80 py-20 md:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.34),transparent_70%)]" />
        <div className="absolute bottom-[-12rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.10),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.6, ease: "easeOut" }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.08, ease: "easeOut" }}
            className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            {title ?? (
              <>
                A closer look at{" "}
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  the work on the ground
                </span>
                .
              </>
            )}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: d ?? 0.6, delay: d ?? 0.16, ease: "easeOut" }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 text-pretty md:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.8, delay: d ?? 0.12, ease: "easeOut" }}
          className={[
            "mt-12 grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-[2rem] md:mt-16",
            "border border-primary/10 bg-[linear-gradient(140deg,#ffffff_0%,#f5faf6_55%,#eef7f0_100%)]",
            "shadow-[0_40px_90px_-55px_rgba(20,83,45,0.45)]",
            "lg:grid-cols-2",
          ].join(" ")}
        >
          {/* visual panel — photograph when supplied, branded abstract
              treatment otherwise (no stock photo stands in for a real project) */}
          {project.image ? (
            <div className="relative min-h-[260px] overflow-hidden lg:min-h-[420px]">
              <Image
                src={project.image}
                alt={
                  project.imageAlt ??
                  `${project.name} in ${project.location}`
                }
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
              />
            </div>
          ) : (
            <div className="relative min-h-[260px] overflow-hidden lg:min-h-[420px]">
              <WorkVisual
                icon={workIcons[project.icon]}
                gradient={project.gradient}
                caption={`${project.location} — ${project.date}`}
                tall
              />
            </div>
          )}

          {/* text panel */}
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {project.location}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-primary/25 sm:block"
              />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gray-500">
                {project.date}
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-extrabold leading-[1.15] tracking-tight text-gray-900 md:text-3xl">
              {project.name}
            </h3>

            <p className="mt-4 text-[1rem] leading-[1.75] text-gray-700">
              {project.summary}
            </p>

            <div
              aria-hidden="true"
              className="mt-8 h-px w-16 bg-gradient-to-r from-primary/60 to-transparent"
            />

            <Link
              href={project.href}
              className="group/cta mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read full story
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
