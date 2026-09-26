/* ───────────────────────────────────────────────────────────────
   PROJECT CARD

   Reusable card for the primary Projects section on /projects.
   Props follow the agreed shape:
     { name, location, status, timeframe, image, description, category }
   plus an optional `index` used only for the entrance stagger, so the
   card can also be used standalone.

   PLACEHOLDERS (client review)
   - `image` follows the same convention as SolutionBlock's image:
     `src` is undefined until a real photo is supplied, so the card
     draws a labelled dashed placeholder box instead. Adding `src`
     switches it to a real next/image with the existing alt text.
   - `location` and `timeframe` render "—" plus a "to confirm" note
     when they are empty, rather than inventing a district or a date.
   - A "Placeholder project" ribbon always renders. It is driven by
     the absence of a confirmed location and timeframe, so it
     disappears automatically once real project data is supplied and
     at least one of those fields is filled in.
   - The description is expected to state intent, never a measured
     outcome. There are no statistics in this component.
   ─────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ImageOff, MapPin } from "lucide-react";

import type { Project, ProjectStatus } from "@/data/projectsContent";

/* One visually distinct treatment per status. Ring + tint rather than
   solid fill, to match the light chip/badge language already used for
   the "Placeholder" flags on /about and the benefit chips on
   /solutions. */
const STATUS_STYLES: Record<
  ProjectStatus,
  { badge: string; dot: string }
> = {
  // PRE-OPERATIONAL REFRAME (Priority 3): the "Ongoing", "Pilot" and
  // "Completed" styles were deleted along with those statuses. An
  // emerald "Ongoing" dot or a violet "Completed" badge is a visual
  // claim of activity or completion, and there has been no activity to
  // show. The two keys that remain are all pre-launch intent, so both
  // use amber/amber to read as "not started" rather than progress.
  "In development": {
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
  "Seeking partners": {
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-400",
  },
  Planned: {
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
};

interface ProjectCardProps {
  name: string;
  location: string;
  status: ProjectStatus;
  timeframe: string;
  image: Project["image"];
  description: string;
  category: string;
  /** Optional entrance-stagger delay. Defaults to 0. */
  index?: number;
}

export default function ProjectCard({
  name,
  location,
  status,
  timeframe,
  image,
  description,
  category,
  index = 0,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const statusStyle = STATUS_STYLES[status];

  /* A location and a timeframe are the two fields that make a project
     a real record rather than a category. If either is still empty,
     the card is flagged as a placeholder. */
  const isPlaceholder = !location.trim() || !timeframe.trim();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: d ?? 0.5, delay: (d ?? 0.5) * index * 0.06 }}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white",
        "shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)]",
        "transition-[transform,box-shadow] duration-300",
        "hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.5)]",
      ].join(" ")}
    >
      {/* ── MEDIA: real photo, or a labelled placeholder box ── */}
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        /* PLACEHOLDER IMAGE — no project photography supplied yet.
           Delete this block once image.src is set in the data file. */
        <div
          role="img"
          aria-label={`Placeholder image: ${image.alt}`}
          className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 border-b border-primary/10 bg-green-50/60 p-6 text-center"
        >
          <ImageOff className="h-7 w-7 text-primary/60" aria-hidden="true" />
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
            Placeholder image
          </p>
          <p className="text-xs leading-relaxed text-gray-600">
            [ PLACEHOLDER: {image.placeholderNote} ]
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* ── status + category ── */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] ring-1",
              statusStyle.badge,
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "h-1.5 w-1.5 rounded-full",
                statusStyle.dot,
              ].join(" ")}
            />
            {status}
          </span>
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">
            {category}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-gray-900">
          {name}
        </h3>

        {/* ── location + timeframe ── */}
        <dl className="mt-3 space-y-1.5 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <dd>
              {location.trim() ? (
                location
              ) : (
                <span className="text-gray-400">
                  Location to be confirmed{" "}
                  <span aria-hidden="true">—</span>
                </span>
              )}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Timeframe</dt>
            <Calendar
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <dd>
              {timeframe.trim() ? (
                timeframe
              ) : (
                <span className="text-gray-400">
                  Timeframe to be confirmed <span aria-hidden="true">—</span>
                </span>
              )}
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* ── placeholder flag, pinned to the bottom of the card ── */}
        {isPlaceholder && (
          <p className="mt-5 self-start rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-amber-700">
            Placeholder project — confirm with client
          </p>
        )}
      </div>
    </motion.article>
  );
}
