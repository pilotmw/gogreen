"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface WorkVisualProps {
  icon: LucideIcon;
  gradient: string;
  /** Optional overlay line inside the gradient, e.g. "Lilongwe — 2025". */
  caption?: string;
  tall?: boolean;
}

/* Gradient + icon visual treatment.
   Repurposed from the removed "Our Work in Action" homepage teaser so the
   existing brand treatment lives on for the case study spotlight and any
   future project teasers. Purely decorative — the accessible text lives in
   the surrounding markup. */
export function WorkVisual({ icon: Icon, gradient, caption, tall }: WorkVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={[
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        tall ? "h-full min-h-[240px] w-full" : "h-44",
      ].join(" ")}
    >
      <div className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute -right-2 -top-4 h-24 w-24 rounded-full bg-white/15" />
      <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-black/10" />
      <div className="absolute left-6 top-6 h-11 w-11 rounded-full border border-white/30" />
      <div className="absolute left-8 top-8 h-5 w-5 rounded-full border border-white/40" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Icon className="h-24 w-24 text-white/95 drop-shadow-lg" strokeWidth={1.3} />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      {caption && (
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pb-4 pt-10 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-white/90">
          {caption}
        </p>
      )}
    </div>
  );
}

interface WorkTeaserCardProps extends WorkVisualProps {
  title: string;
  description: string;
}

/* Reusable work card: brand visual + title + short description. */
export default function WorkTeaserCard({
  title,
  description,
  tall,
  ...visual
}: WorkTeaserCardProps) {
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white",
        "shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)]",
        "transition-[transform,box-shadow] duration-300",
        "hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.5)]",
      ].join(" ")}
    >
      <WorkVisual {...visual} tall={tall} />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </article>
  );
}
