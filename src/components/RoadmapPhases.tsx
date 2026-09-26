/* ───────────────────────────────────────────────────────────────
   ROADMAP PHASES — NEW (Priority 3, "Rebuild the Projects Page as a
   Roadmap").

   Renders the phased plan from `projectPhases` in src/data/
   projectsContent.ts. Added ABOVE the existing project grid, which is
   unchanged — so the page reads as a plan first and a list of
   not-yet-started activities second.

   WHY A NEW COMPONENT RATHER THAN FOLDING THIS INTO ProjectCard:
   the existing grid is driven by `projects` + the ARIA tablist status
   filter, and its cards are shaped around a single activity (status
   chip, category chip, location, timeframe, image). A phase is a
   different thing — a stage of a sequence, with a rationale — and
   bending ProjectCard to render it would have put roadmap content
   inside the status filter's DOM, where it does not belong and where
   a screen reader would announce it as filterable. Kept separate.

   VISUAL LANGUAGE IS DELIBERATELY THE SITE'S OWN, not a new design:
   numbered circles reusing the About page's founding-story markers
   (01/02/03 in a ring), the same rounded card, border and shadow
   tokens, the same focus-visible ring. No new colour is introduced.

   HONESTY CONSTRAINTS BAKED IN HERE:
   - `timeframe` renders "Timing to be confirmed" when empty. It is
     empty on all three phases (see the data file) because an invented
     quarter on a company with no operations reads as a published
     schedule commitment.
   - `rationaleNeedsConfirmation` renders a visible flag. The "why" text
     for each phase is inferred from technical logic already published
     on this site — it is NOT a client-supplied position and must be
     confirmed before publish.
   - No phase is marked done, active or under way. Phase 1 is the
     earliest and it has not started.
   ─────────────────────────────────────────────────────────────── */

import { Flag, Lightbulb, AlertTriangle } from "lucide-react";

import { projectPhases, type ProjectPhase } from "@/data/projectsContent";

export default function RoadmapPhases() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="bg-white py-16 md:py-20 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            How we intend to proceed
          </p>
          <h2
            id="roadmap-heading"
            className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl"
          >
            The phased approach we are planning.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            We intend to build in three phases rather than launch
            everything at once, so that each stage is proven before the
            next depends on it. Phase 1 has not yet begun.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {projectPhases.map((phase: ProjectPhase, i: number) => (
            <li
              key={phase.id}
              id={phase.id}
              className="relative flex scroll-mt-28 flex-col rounded-3xl border border-primary/10 bg-[#f6faf7]/70 p-7 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20">
                  <Flag className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl font-black tabular-nums tracking-tight text-primary/25"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {phase.label}
              </p>
              <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-gray-900">
                {phase.title}
              </h3>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                {/* Empty timeframe = no client-confirmed schedule. Never
                    print a bare separator here. */}
                {phase.timeframe || "Timing to be confirmed"}
              </p>

              <p className="mt-4 text-[0.95rem] leading-[1.75] text-gray-700">
                {phase.focus}
              </p>

              {/* "Why this is a starting point" — the brief asks for the
                  reasoning to be stated, not just the sequence. */}
              <div className="mt-5 rounded-2xl border border-primary/15 bg-white/70 p-4">
                <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary">
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                  Why we are starting here
                </p>
                <p className="mt-2 text-[0.9rem] leading-[1.7] text-gray-700">
                  {phase.rationale}
                </p>
                {phase.rationaleNeedsConfirmation && (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-amber-700">
                    <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                    Rationale to be confirmed by client
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
