/* ───────────────────────────────────────────────────────────────
   CIRCULAR MODEL — SINGLE SOURCE OF TRUTH (client review)

   WHY THIS FILE EXISTS
   The model was described three different ways across the site:
     - Homepage "Our Response" ....... 5 steps
     - About "The Circular Model" .... 5 steps (corrected earlier)
     - How It Works .................. 4 steps  ← missing Create Value
   All three now read their step names, order, count and copy from
   this file, so a future edit happens once and cannot drift again.

   THE MODEL: FIVE STEPS, FIXED ORDER
     01 Recover → 02 Convert → 03 Distribute → 04 Create Value
     → 05 Reinvest (which feeds back into 01)
   `count` and the arrow-joined name list are exported so any page
   that spells the model out in a sentence (hero subtitles, section
   intros) can build it from the data instead of hard-coding it.

   THREE DESCRIPTION TIERS, ONE SET OF NAMES
   Step NAMES and the step COUNT are identical everywhere — that was
   the actual bug. Only the length of the description varies by page
   context, which is intentional:
     phrase  3–5 words    — homepage "Our Response" cards
     about   one sentence — About page cards
     detail  one sentence, operational — How It Works (the fullest)
   The `detail` text for Recover, Convert, Distribute and Reinvest is
   the ORIGINAL How It Works copy, kept word for word: it was already
   the strongest version, so it became the source rather than being
   replaced. Only Create Value is newly written, in the same
   operational register.

   ICONS
   One icon per step, site-wide, taken from the homepage's approved
   set. The About page previously used Zap / Share2 / RefreshCw for
   Convert / Distribute / Reinvest; it now shows the same icons as
   every other page, so the step diagrams are recognisably identical
   across the site.

   NOT MODEL COPY — DO NOT "FIX" THESE
   - "Reduce. Recover. Reinvest." (About closing band) and
     "Returns to Recover" (homepage loop note) are slogans, not
     step lists, and are deliberately unchanged.
   - "Circular Economy & Resource Recovery" (homepage solution card),
     "Resource Recovery" (pillar two) and "Waste Recovery" (impact
     area) are category names, not the model's steps.
   ─────────────────────────────────────────────────────────────── */

import {
  Coins,
  Cog,
  Recycle,
  Sprout,
  Truck,
  type LucideIcon,
} from "lucide-react";

/** Which description tier a page renders. */
export type CircularModelLevel = "phrase" | "about" | "detail";

export interface CircularModelStep {
  /** Stable slug, safe for keys and anchors. */
  id: string;
  /** Two-digit index, e.g. "01". */
  number: string;
  /** THE canonical step name. Must match across every page. */
  name: string;
  icon: LucideIcon;
  /** Homepage cards — 3–5 words. */
  phrase: string;
  /** About page cards — one sentence. */
  about: string;
  /** How It Works — one sentence, operational. Original HIW copy. */
  detail: string;
}

export const circularModelSteps: CircularModelStep[] = [
  {
    id: "recover",
    number: "01",
    name: "Recover",
    icon: Recycle,
    phrase: "Waste & underused resources",
    about:
      "Waste and underused resources are collected and recovered rather than discarded.",
    detail:
      "Organic waste, recyclable materials, and underused resources are collected through structured aggregator and community networks.",
  },
  {
    id: "convert",
    number: "02",
    name: "Convert",
    icon: Cog,
    phrase: "Into energy & materials",
    about:
      "Recovered materials and resources are transformed into useful materials, products, energy or other value.",
    detail:
      "Recovered inputs are processed into clean energy, recycled materials, or value-added products using appropriate, scalable technology.",
  },
  {
    id: "distribute",
    number: "03",
    name: "Distribute",
    icon: Truck,
    phrase: "To people & markets",
    about:
      "Value moves back into communities, households, businesses and productive systems.",
    detail:
      "Outputs are delivered to households, institutions, and commercial or industrial buyers through cost-effective last-mile channels.",
  },
  {
    id: "create-value",
    number: "04",
    /* NEW STEP — this is what How It Works was missing. */
    name: "Create Value",
    icon: Coins,
    phrase: "Environmental & economic",
    about:
      "Environmental, social and economic value is generated across the chain, and captured so it can be measured and reinvested.",
    detail:
      "Environmental, social and economic value is generated from the distributed energy, materials and services, and captured so it can be measured.",
  },
  {
    id: "reinvest",
    number: "05",
    name: "Reinvest",
    icon: Sprout,
    phrase: "Back into the system",
    about:
      "Economic and environmental value supports continued recovery, capability and circular growth.",
    detail:
      "Revenue and impact are channelled back into expanding recovery capacity, community livelihoods, and environmental restoration.",
  },
];

/** How many steps the model has. 5 — the site-wide count. */
export const circularModelCount = circularModelSteps.length;

/** Arrow-joined step names, e.g. "Recover → Convert → … → Reinvest".
    Used by hero subtitles and section intros so no page retypes the
    sequence and no page can spell it with the wrong count. */
export const circularModelNames = circularModelSteps
  .map((step) => step.name)
  .join(" → ");

/** Title-cased first letters only, for running prose. */
export const circularModelNamesSentence = circularModelSteps
  .map((step) => step.name)
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1");

/** Picks the description for the tier a page is rendering. */
export function stepDescription(
  step: CircularModelStep,
  level: CircularModelLevel,
): string {
  return step[level];
}
