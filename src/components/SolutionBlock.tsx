/* ───────────────────────────────────────────────────────────────
   SOLUTION BLOCK — WHAT WAS ADDED (client review)

   One reusable template now renders all five solutions on
   /solutions, replacing five separately hand-coded blocks that each
   had a different structure (benefits panel / services panel /
   nothing at all).

   Props follow the agreed shape: { icon, title, description,
   benefits, image?, ctaLabel, ctaHref }, plus id, stat, benefitsLabel,
   flip and tone.

   READ-ORDER GUARANTEE (the bug this replaces)
   The content column is always FIRST in the DOM and always renders
   icon → h2 title → intro → h3 "Key Benefits" chips → per-section CTA.
   Left/right alternation is achieved with `order` on the MEDIA column
   only, so the visual swap can never push a benefits list above its
   own heading again.

   NOT YET SUPPLIED — see src/data/solutionsContent.ts
   - `image.src` is undefined for all five, so a clearly labelled
     dashed PLACEHOLDER box is drawn instead of a photo. Add `src`
     and the same block renders a real next/image with the existing
     `image.alt` text.
   - `stat.value` is undefined for all five, so the stat renders "—"
     behind a PLACEHOLDER STAT flag rather than a made-up number.
   ─────────────────────────────────────────────────────────────── */

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ImageOff,
  Recycle,
  ShieldCheck,
  Sprout,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type {
  Solution,
  SolutionIconName,
} from "@/data/solutionsContent";

const ICONS: Record<SolutionIconName, LucideIcon> = {
  zap: Zap,
  recycle: Recycle,
  sprout: Sprout,
  users: Users,
  shield: ShieldCheck,
};

interface SolutionBlockProps {
  id: string;
  icon: SolutionIconName;
  title: string;
  description: string[];
  benefits: string[];
  /** Defaults to "Key Benefits". */
  benefitsLabel?: string;
  image: Solution["image"];
  stat: Solution["stat"];
  ctaLabel: string;
  ctaHref: string;
  /** Show the media column on the left instead of the right. */
  flip?: boolean;
  /** Alternating section background, as on the original page. */
  tone?: "white" | "tint";
}

export default function SolutionBlock({
  id,
  icon: iconName,
  title,
  description,
  benefits,
  /* PRE-OPERATIONAL REFRAME (this brief, Priority 2). Was "Key Benefits",
     which read as benefits already delivered. The chips themselves are
     outcome-phrased ("Reduced dependence on charcoal and firewood") and
     rewriting all 25 into "Designed to reduce..." would read badly, so
     the LABEL carries the framing instead: these are what each solution
     is designed to deliver, not results in hand. */
  benefitsLabel = "Designed to Deliver",
  image,
  stat,
  ctaLabel,
  ctaHref,
  flip = false,
  tone = "white",
}: SolutionBlockProps) {
  const Icon = ICONS[iconName];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={[
        "py-14 md:py-16",
        tone === "tint" ? "bg-gray-50" : "bg-white",
        // Anchor offset: globals.css sets `scroll-padding-top: 6.5rem`
        // on <html> and the fixed Navbar plus this page's sticky sub-nav
        // occupy ~8rem, so a small scroll-margin clears both.
        "scroll-mt-6",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ── CONTENT — always first in the DOM ── */}
          <div className={flip ? "lg:order-2" : undefined}>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </span>
              <h2
                id={`${id}-title`}
                className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl"
              >
                {title}
              </h2>
            </div>

            {description.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-justify leading-relaxed text-gray-700"
              >
                {paragraph}
              </p>
            ))}

            {/* ── Key Benefits — identical chip treatment in all five ── */}
            <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {benefitsLabel}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="inline-flex items-start gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm leading-snug text-gray-700"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* ── per-section CTA ── */}
            <Link
              href={ctaHref}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* ── MEDIA — the only column that is ever reordered ── */}
          <div className={flip ? "lg:order-1" : undefined}>
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ) : (
              /* PLACEHOLDER IMAGE — no client photography supplied yet.
                 Delete this block once image.src is set in the data file. */
              <div
                role="img"
                aria-label={`Placeholder image: ${image.alt}`}
                className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-primary/30 bg-green-50/60 p-6 text-center"
              >
                <ImageOff className="h-8 w-8 text-primary/60" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Placeholder image
                </p>
                <p className="text-sm text-gray-600">
                  [ PLACEHOLDER: {image.placeholderNote} ]
                </p>
              </div>
            )}

            {/* PLACEHOLDER STAT — confirm with client before launch.
                Renders "—" until a verified figure is supplied. */}
            <div className="mt-4 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber-700">
                Placeholder stat — confirm with client
              </p>
              <p className="mt-1.5 text-2xl font-bold leading-none text-gray-900">
                {stat.value ?? "—"}
              </p>
              <p className="mt-1.5 text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
