/* ───────────────────────────────────────────────────────────────
   IMPACT PAGE — WHAT CHANGED (client review)

   1. HARD METRICS, ALL PLACEHOLDERS
      `impactMetrics` is the new numbers-first content, rendered by the
      existing <StatsBar /> (reused, not duplicated — it gained optional
      `note` and `columns` props; the homepage passes neither, so its
      layout is unchanged). Six metrics are listed, as the brief asks.

      NOT ONE FIGURE IS REAL, so every value is an empty string, which
      <StatsBar /> renders as "—". No number has been invented.

      IMPORTANT — the homepage's `homeStats` in src/data/homeContent.ts
      ("1,200+ tonnes", "3,500+ households", "180+ green jobs", "900+
      tCO2e") are ALREADY MARKED PLACEHOLDER in that file. They have
      deliberately NOT been copied here: this is the page where a figure
      is most likely to be read as a verified claim, and an unverified
      number next to a reporting-period label is more misleading than a
      visible dash. Those homepage figures still need replacing too —
      see the summary at the top of src/app/impact/page.tsx.

      `reportingPeriod` is likewise blank, because the client's
      verification start date is unknown. Confirm the period, the
      figures and the methodology together before launch.

   2. IMPACT-AREA CARDS DE-DUPLICATED FROM THE HOMEPAGE
      The six cards on /impact are rendered by the shared <ImpactAreas />
      with this page's own `impactAreas` data. The homepage calls
      <ImpactAreas /> with no data and keeps its original
      mechanism-only wording, so the two pages no longer show
      word-for-word identical text.

      Each card here carries a `metric` (a placeholder figure plus what
      it would measure) and a description shortened by roughly 25% from
      the homepage version, since the metric now carries part of the
      weight. Card titles, headlines, icons and the featured/span
      layout are unchanged.

   3. SDG TILES — OFFICIAL COLOURS, SIMPLIFIED ICONS
      `sdgs` replaces a plain-text list, and FOUR of the five old
      Tailwind colour classes were wrong: SDG 8 was red (should be
      maroon), 11 green (should be orange), 12 blue (should be dark
      gold) and 13 orange (should be dark green). The official UN hex
      values are now used directly.

      The UN's own SDG icon artwork is copyrighted and is NOT used.
      Each tile uses a generic lucide symbol (Lightbulb, Briefcase,
      Building, Recycle, Leaf) as a stand-in, which is why the tiles
      are described in the summary comment as "official-style" rather
      than official.

   4. FRAMEWORK ALIGNMENT — 2 OF 6 FLAGGED FOR CLIENT DECISION
      Each framework now has one sentence explaining how Go Green's work
      relates to it. Four could be written from material already on the
      site. Two could not, and are FLAGGED INSTEAD OF REMOVED so the
      choice goes to the client rather than being made unilaterally:
        - "Regional circular economy frameworks"
        - "International climate finance frameworks"
      Neither names a specific framework, publication or instrument, so
      there is nothing to substantiate a sentence against. They render
      with a visible "alignment detail to be confirmed" flag. If the
      client cannot name the specific frameworks, these two items
      should be deleted rather than kept vague.

      Malawi's NDCs entry also carries a comment: the sentence is
      deliberately directional and does not name a specific NDC sector
      or target, which the client should verify.

   5. NOT DONE — DOWNLOADABLE IMPACT REPORT
      The brief says to skip this unless a report genuinely exists or is
      planned, and not to fabricate a file. No such document is in the
      repository, so no download link was added. `impactReport` below is
      the single place to add one.

   6. SUPPORTING VISUAL
      No photography of operations, beneficiaries or projects exists in
      the repo, so the page uses one clearly labelled dashed placeholder
      block (the same treatment as /projects and /solutions) rather than
      reusing a stock image.
   ─────────────────────────────────────────────────────────────── */

import {
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Network,
  Recycle,
  Sun,
  type LucideIcon,
} from "lucide-react";

import type { HomeStat } from "@/data/homeContent";
import type { ImpactArea } from "@/components/ImpactAreas";

/* ── 1. METRICS ───────────────────────────────────────────────
   PLACEHOLDER METRICS — confirm each real figure, its unit and the
   reporting period with the client before launch.
   Values are intentionally empty strings, not zeros and not estimates:
   <StatsBar /> renders "—" and the client drops the real figure in. */
export const impactMetrics: HomeStat[] = [
  { value: "", label: "Tonnes of waste recovered" },
  { value: "", label: "Households reached with clean energy" },
  { value: "", label: "Green jobs supported" },
  { value: "", label: "kg CO2e emissions avoided" },
  { value: "", label: "kg of aluminium recycled" },
  { value: "", label: "People trained" },
];

/* PLACEHOLDER — the client's verification start date is unknown, so
   this is blank rather than a guessed year. Shown under the metrics. */
export const reportingPeriod = "";

/* ── 2. IMPACT-AREA CARDS ──────────────────────────────────────
   Same six areas as the homepage, but each with a placeholder metric
   and a description trimmed 20-30%. Metrics describe WHAT WOULD BE
   COUNTED — no totals, no outcomes.

   COPY TRIM CORRECTED 2026-09-26. An earlier pass here claimed a ~25%
   trim but delivered only 5-9% on five of the six cards, and two cards
   ("Green Jobs", "Environmental Protection") were still word-for-word
   identical to the homepage, which is precisely the duplication Phase
   0.3 asked to remove. All six are now genuinely 20-30% shorter than
   their homepage counterparts (29/24/21/20/24/26%), so no card reads as
   a copy-paste of the one above it. Verified by comparing this array
   against the `impactAreas` in src/components/ImpactAreas.tsx, which
   still owns the untrimmed homepage copy and is deliberately unchanged. */
export const impactAreas: ImpactArea[] = [
  {
    title: "Clean Energy",
    headline: "Powering a cleaner, more sustainable Malawi.",
    description:
      // ORIGINAL: "We develop clean, affordable energy solutions — renewable power, solar, biogas and efficient technologies — that reduce dependence on fossil fuels." → "are building … designed to reduce": nothing has been developed and nothing reduced yet. The technology list is UNCHANGED — the brief requires that depth be preserved.
      "We are building clean, affordable energy solutions — renewable power, solar, biogas and efficient technologies — designed to reduce dependence on fossil fuels.",
    icon: Sun,
    featured: true,
    span: "lg:col-span-7",
    metric: {
      value: "",
      label: "households or institutions connected to clean cooking or solar",
    },
  },
  {
    title: "Waste Recovery",
    headline: "Turning waste into valuable resources.",
    description:
      // ORIGINAL: "We build collection, sorting, recycling and composting systems so waste is recovered, not dumped or burned." → "are designing … intended to keep waste out of": no system has been built and no waste diverted. The four system types are UNCHANGED.
      "We are designing collection, sorting, recycling and composting systems intended to keep waste out of dumpsites and open burning.",
    icon: Recycle,
    span: "lg:col-span-5",
    metric: {
      value: "",
      label: "tonnes diverted from dumpsites, with the year counted",
    },
  },
  {
    title: "Green Jobs",
    headline: "Creating livelihoods through the green economy.",
    description:
      // ORIGINAL: "In collection, recycling, installation and manufacturing, we back skills development and local businesses, especially for young people." → "plan to back": we currently back nobody. The sector list is UNCHANGED.
      "Across collection, recycling, installation and manufacturing, we plan to back skills development and local businesses, especially for young people.",
    icon: BriefcaseBusiness,
    span: "lg:col-span-5",
    metric: {
      value: "",
      label: "people in paid roles, broken down by women and youth",
    },
  },
  {
    title: "Circular Supply Chains",
    headline: "Keeping resources in use and value within our communities.",
    description:
      // ORIGINAL: "We connect producers, collectors, recyclers, manufacturers and farmers so materials return to the economy rather than becoming waste." → "plan to connect": none of these links exist yet. The actor list is UNCHANGED.
      "We plan to connect producers, collectors, recyclers, manufacturers and farmers so materials return to the economy rather than becoming waste.",
    icon: Network,
    featured: true,
    span: "lg:col-span-7",
    metric: {
      value: "",
      label: "tonnes or kilograms moved into verified recycling markets",
    },
  },
  {
    title: "Community Empowerment",
    headline: "Building skills, opportunities, and sustainable communities.",
    description:
      // ORIGINAL: "We work with households, businesses and institutions on environmental awareness, practical skills and income-generating opportunities." → "plan to work with": this claimed an existing community engagement programme.
      "We plan to work with households, businesses and institutions on environmental awareness, practical skills and income-generating opportunities.",
    icon: HeartHandshake,
    span: "lg:col-span-6",
    metric: {
      value: "",
      label: "people reached by training or community programmes",
    },
  },
  {
    title: "Environmental Protection",
    headline: "Protecting our environment for generations to come.",
    description:
      // ORIGINAL: "By reducing pollution, improving waste management and promoting renewable energy, we support healthier communities and climate resilience." → "intend to support": no pollution has been reduced.
      "By reducing pollution, improving waste management and promoting renewable energy, we intend to support healthier communities and climate resilience.",
    icon: Leaf,
    span: "lg:col-span-6",
    metric: {
      value: "",
      label: "estimated emissions avoided, and the method used to estimate it",
    },
  },
];

/* ── 3. SUSTAINABLE DEVELOPMENT GOALS ─────────────────────────
   `hex` is the official UN colour for each goal. These are the only
   brand-external colours on the site and are confined to the tiles.
   `onDark` controls tile text/icon colour for contrast — SDG 7's
   yellow needs dark text, the other four take white. */
export interface Sdg {
  number: string;
  title: string;
  hex: string;
  onDark: boolean;
  icon: LucideIcon;
  /** How Go Green's model touches this goal, in one line.
      PRE-OPERATIONAL REFRAME (Priority 4): the brief keeps the SDG
      alignment section — stating intentions against the SDGs is
      legitimate for a pre-operational company — but requires it be
      framed as "how our model ALIGNS WITH" rather than "how our
      RESULTS CONTRIBUTE TO". All five were result statements and are
      now model/alignment statements. No SDG goal, colour or tile has
      changed. */
  contribution: string;
}

export const sdgs: Sdg[] = [
  {
    number: "7",
    title: "Affordable and Clean Energy",
    hex: "#FCC30B",
    onDark: false,
    icon: Lightbulb,
    // ORIGINAL: "Biogas and clean cooking systems displace charcoal and firewood."
    contribution:
      "Our model is aligned to SDG 7 because biogas and clean cooking systems are designed to displace charcoal and firewood.",
  },
  {
    number: "8",
    title: "Decent Work and Economic Growth",
    hex: "#A21942",
    onDark: true,
    icon: BriefcaseBusiness,
    // ORIGINAL: "Collection, processing and distribution create paid green roles."
    contribution:
      "Our model is aligned to SDG 8 because collection, processing and distribution are designed to create paid green roles.",
  },
  {
    number: "11",
    title: "Sustainable Cities and Communities",
    hex: "#FD9D24",
    onDark: true,
    icon: Building2,
    // ORIGINAL: "Urban waste recovery keeps material out of city dumpsites and drains."
    contribution:
      "Our model is aligned to SDG 11 because urban waste recovery is designed to keep material out of city dumpsites and drains.",
  },
  {
    number: "12",
    title: "Responsible Consumption and Production",
    hex: "#BF8B2E",
    onDark: true,
    icon: Recycle,
    // ORIGINAL: "Recovery and reuse systems design material out of the waste stream."
    contribution:
      "Our model is aligned to SDG 12 because recovery and reuse systems are designed to keep material out of the waste stream.",
  },
  {
    number: "13",
    title: "Climate Action",
    hex: "#3F7E44",
    onDark: true,
    icon: Leaf,
    // ORIGINAL: "Avoided emissions from recovery and cleaner fuels support mitigation."
    contribution:
      "Our model is aligned to SDG 13 because avoided emissions from recovery and cleaner fuels are intended to support mitigation.",
  },
];

/* ── 4. SUSTAINABILITY FRAMEWORKS ────────────────────────────── */
export interface Framework {
  name: string;
  /** One sentence on how the model relates to this framework.
      PRE-OPERATIONAL REFRAME (Priority 4): aligned to "how our model
      aligns with", not "how our results contribute to". The first four
      said "Our … programmes / activity / work", implying an existing
      programme; the two flagged items already used "is intended to" and
      are unchanged apart from the note. */
  alignment: string;
  /** Renders a visible "detail to be confirmed" flag. Set on the two
      items where no specific framework is named, so no alignment
      sentence could be substantiated. */
  needsConfirmation?: boolean;
}

export const frameworks: Framework[] = [
  {
    name: "Malawi National Energy Policy",
    // ORIGINAL: "Our biogas and clean cooking programmes widen access to modern cooking energy in place of charcoal and firewood, which is the direction the policy sets." → "The biogas and clean cooking solutions we are developing are designed to widen access…": no programmes exist yet.
    alignment:
      "The biogas and clean cooking solutions we are developing are designed to widen access to modern cooking energy in place of charcoal and firewood, which is the direction the policy sets.",
  },
  {
    name: "Malawi Nationally Determined Contributions (NDCs)",
    // Deliberately directional: no specific NDC sector or target number is
    // named, because none has been verified. Client to confirm the sector
    // reference before launch.
    // ORIGINAL: "Avoiding emissions from recovered waste and from cooking fuels that replace biomass count towards the mitigation commitments in Malawi's NDCs." → "is intended to count towards": nothing has been avoided or recovered yet.
    alignment:
      "Emissions avoided through recovered waste and through cooking fuels that replace biomass are intended to count towards the mitigation commitments in Malawi's NDCs.",
  },
  {
    name: "National Solid Waste Management Strategy",
    // ORIGINAL: "Our collection, sorting and recycling networks are the on-the-ground waste management activity that a national solid waste strategy depends on." → "are designed to be": the networks are planned, not operating.
    alignment:
      "The collection, sorting and recycling networks we are designing are intended to be the on-the-ground waste management activity that a national solid waste strategy depends on.",
  },
  {
    name: "United Nations Sustainable Development Goals (SDGs)",
    // ORIGINAL: "The work maps directly to SDG 7, 8, 11, 12 and 13, shown as tiles above." → "Our model maps directly to": "the work" implied delivered work.
    alignment:
      "Our model maps directly to SDG 7, 8, 11, 12 and 13, shown as tiles above.",
  },
  {
    // FLAGGED FOR CLIENT REVIEW — kept rather than removed, per the brief.
    // This names no specific framework, publication or instrument, so there
    // is nothing to substantiate an alignment sentence against. Delete this
    // item if the client cannot name the frameworks they meant.
    name: "Regional circular economy frameworks",
    alignment:
      "Our cross-border recovery and recycling activity is intended to sit within the region's circular economy frameworks.",
    needsConfirmation: true,
  },
  {
    // FLAGGED FOR CLIENT REVIEW — same reason as above.
    name: "International climate finance frameworks",
    alignment:
      "Carbon project development is intended to align with international climate finance frameworks.",
    needsConfirmation: true,
  },
];

/* ── 5. SUPPORTING VISUAL ────────────────────────────────────── */
export const impactImage = {
  alt: "Placeholder for a photograph of Go Green's recovery or clean energy work in Malawi",
  placeholderNote: "operations, beneficiaries or project photograph",
};

/* ── 6. DOWNLOADABLE IMPACT REPORT ─────────────────────────────
   Intentionally empty: no impact report exists in the repository and
   none has been confirmed as planned, so no download link is rendered.
   Add { label, href, sizeNote } when a real PDF is supplied — do not
   point this at a file that does not exist. */
export const impactReport: { label?: string; href?: string; sizeNote?: string } = {};
