"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import type { TeamPreviewMember } from "@/data/homeContent";

interface TeamPreviewProps {
  members: TeamPreviewMember[];
  title?: string;
  subtitle?: string;
  linkLabel?: string;
  linkHref?: string;
}

export default function TeamPreview({
  members,
  title = "The people behind Go Green",
  subtitle = "Operations, finance, environment and digital — the team delivering our circular economy work on the ground.",
  linkLabel = "Meet the full team",
  linkHref = "/about",
}: TeamPreviewProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      aria-label="Leadership preview"
      className="relative overflow-hidden bg-white/75 py-20 md:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 h-[26rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.36),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.10),transparent_70%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.6, ease: "easeOut" }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
          >
            Our Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.7, delay: d ?? 0.08, ease: "easeOut" }}
            className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: d ?? 0.6, delay: d ?? 0.16, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 text-pretty md:text-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* 4-up desktop, 2-up tablet, 1-up mobile */}
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {members.map((member, i) => (
            <motion.li
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: d ?? 0.6,
                delay: d ?? 0.1 + i * 0.1,
                ease: "easeOut",
              }}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-primary/10 bg-white/85 p-6 text-center shadow-[0_20px_45px_-35px_rgba(20,83,45,0.4)] backdrop-blur-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.55)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12),transparent_70%)]"
              />

              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/15 ring-offset-2 ring-offset-white transition-transform duration-500 group-hover:scale-[1.03]">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.title} at GoGreen Resources`}
                  fill
                  sizes="96px"
                  className="object-cover object-center"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-tight text-gray-900 md:text-xl">
                {member.name}
              </h3>
              <p className="mt-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-primary md:text-[0.7rem]">
                {member.title}
              </p>

              <span
                aria-hidden="true"
                className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300 group-hover:w-14"
              />

              <p className="mt-4 text-[0.9rem] leading-relaxed text-gray-600">
                {member.bio}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: d ?? 0.6, delay: d ?? 0.3, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <Link
            href={linkHref}
            className="group/cta inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {linkLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
