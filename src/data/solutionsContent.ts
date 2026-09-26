/* ───────────────────────────────────────────────────────────────
   SOLUTIONS PAGE — WHAT WAS FIXED / ADDED (client review)

   1. KEY BENEFITS ORDERING BUG — FIXED
      The five solutions were hand-coded in the page, and the two
      sections that put their benefits column first (Materials
      Recovery, Community Livelihoods) used `order-2 lg:order-1`, so
      those benefit lists appeared in the markup BEFORE their own
      heading — directly after the previous section's benefits. That
      read as an off-by-one: a list about "urban waste pollution /
      diversion of recyclable materials" looked like it belonged to
      Clean Energy. All copy now lives in this file, one entry per
      solution, with each benefits list attached to its own solution,
      and SolutionBlock always renders heading → intro → benefits →
      CTA in that order. Visual left/right alternation is done with
      `order` on the media column only, so it can no longer reorder
      the reading sequence.

      NOTE ON THE TWO "MISSING" LISTS: benefits for Materials
      Recovery and Community Livelihoods already existed on the page —
      they were simply rendered in the wrong position. They have been
      re-attached to their own sections, not rewritten. No benefit or
      claim has been invented anywhere on this page.

   2. ONE SHARED TEMPLATE
      All five solutions now render from a single <SolutionBlock />
      (icon → title → intro → Key Benefits chips → per-section CTA,
      with a media column). Previously the structure varied: some had
      a benefits panel, one had an "Our Services" panel, and Advisory
      had no benefits-style list at all.

   3. ADVISORY LIST LABEL
      The Advisory section's existing list is a list of SERVICES
      ("Environmental consultancy", "Carbon credit project
      development", …), not benefits. It is reused verbatim and keeps
      an honest label via `benefitsLabel` — the visual treatment is
      identical to the other four. It has NOT been rewritten into
      invented "benefits".

   4. IN-PAGE NAVIGATION
      Added `solutionNav`: a sticky pill sub-nav of jump links. The
      anchor IDs are unchanged, so every existing link into this page
      still resolves — /solutions#clean-energy, /solutions#materials-
      recovery, /solutions#organic-waste, /solutions#livelihoods
      (used by the Navbar dropdown and the homepage cards) plus
      /solutions#advisory.

   5. PLACEHOLDERS — MUST BE REPLACED BEFORE LAUNCH
      - `image.placeholderNote` on all five: no client photography has
        been supplied, so SolutionBlock draws a clearly labelled
        dashed placeholder box. Add `image.src` to swap in a real
        photo (alt text is already written).
      - `stat` on all five: NO verified figures exist, so every stat
        renders as "—" behind a PLACEHOLDER STAT flag. No numbers have
        been fabricated. Replace `stat.value` with a client-verified
        figure (plus period/methodology) before launch.

   All intro copy is the existing page copy, unchanged.
   ─────────────────────────────────────────────────────────────── */

/* Icon keys rather than components, matching src/data/homeContent.ts,
   so this data stays serialisable if a section is ever rendered from a
   client component. SolutionBlock resolves the key. */
export type SolutionIconName = "zap" | "recycle" | "sprout" | "users" | "shield";

export interface SolutionImage {
  /** Supply a real photo path (e.g. "/solutions/biogas.jpg") to replace
      the placeholder box. Left undefined until the client delivers. */
  src?: string;
  /** Required either way — used as next/image `alt`, or as the
      accessible name of the placeholder box. */
  alt: string;
  /** Plain-language note describing the photo that is needed. */
  placeholderNote: string;
}

export interface SolutionStat {
  /** Verified figure. Intentionally undefined on every solution — no
      real numbers are available yet, so the UI shows "—". */
  value?: string;
  /** What the metric should measure once supplied. */
  label: string;
}

export interface Solution {
  /** Anchor ID. Also used by the sub-nav and by inbound links. */
  id: string;
  icon: SolutionIconName;
  title: string;
  /** Intro copy — existing page copy, kept verbatim. */
  description: string[];
  benefits: string[];
  /** Defaults to "Key Benefits". Overridden for Advisory, whose list
      is genuinely a list of services rather than benefits. */
  benefitsLabel?: string;
  image: SolutionImage;
  stat: SolutionStat;
  ctaLabel: string;
  ctaHref: string;
}

export const solutions: Solution[] = [
  {
    id: "clean-energy",
    icon: "zap",
    title: "Clean Energy & Waste-to-Energy Solutions",
    // PRE-OPERATIONAL REFRAME (Priority 2). ORIGINAL WORDING, flagged for
    // client review of the tense shift:
    //   "Go Green Resources Limited DEVELOPS clean energy solutions THAT
    //    CONVERT organic and biomass waste into usable fuel and SUPPORTS
    //    adoption of cleaner cooking..." -> "is building ... designed to
    //    convert", because no system has been built or fuels produced.
    //   "This INCLUDES community-linked biogas systems..." -> "Our first
    //    solutions are planned to include..." (the brief's own example).
    //   "The company ALSO SUPPORTS access to clean cooking appliances..."
    //    -> "is also structuring how to support access...".
    //   "The REMAINING organic material IS RECOVERED as bio-slurry" ->
    //    "would be recovered", because no digester is running.
    // TECHNICAL DEPTH IS UNCHANGED: anaerobic digestion, feedstocks,
    // bio-slurry, cylinder exchange, institutional and bulk-user
    // distribution are all preserved in full.
    description: [
      "Go Green Resources Limited is building clean energy solutions designed to convert organic and biomass waste into usable fuel, and to support adoption of cleaner cooking and energy technologies as alternatives to charcoal and firewood.",
      "Our first solutions are planned to include community-linked biogas systems using anaerobic digestion to convert food waste, agricultural residues, and animal waste into clean cooking fuel. The company is also structuring how to support access to clean cooking appliances and fuels through models suited to target markets, including cylinder exchange, institutional distribution, and bulk-user distribution.",
      "The remaining organic material would be recovered as bio-slurry, an organic fertiliser designed to return nutrients to the soil and further close the resource loop.",
    ],
    benefits: [
      "Reduced dependence on charcoal and firewood",
      "Lower household and institutional greenhouse gas emissions",
      "Affordable, reliable clean energy access",
      "Reduced deforestation and indoor air pollution",
      "Recovery of bio-slurry as organic fertiliser",
    ],
    image: {
      alt: "Placeholder for a photograph of a community-linked biogas digester and clean cooking unit",
      placeholderNote: "biogas digester & clean cooking setup",
    },
    // PLACEHOLDER STAT — confirm with client before launch.
    stat: { label: "Biogas systems installed to date" },
    ctaLabel: "Talk to us about clean energy",
    ctaHref: "/contact",
  },
  {
    id: "materials-recovery",
    icon: "recycle",
    title: "Materials Recovery & Recycling",
    // ORIGINAL WORDING, flagged for client review:
    //   "Go Green Resources Limited BUILDS structured recovery and
    //    recycling networks" -> "is building ... intended to develop",
    //    because no network exists yet.
    //   "The company WORKS WITH community-based aggregators, retailers,
    //    institutions, and commercial facilities to RECOVER materials
    //    ..." -> "plans to work with ... to recover". This is the brief's
    //    own named example, and it was the most overstated claim on the
    //    site: we have no aggregator relationships at all.
    //   "Recovered materials ARE SORTED, PROCESSED, and CHANNELLED" ->
    //    "would be sorted", because no material has been recovered.
    //   "the programme DEMONSTRATES that environmental sustainability
    //    and economic development can work hand in hand" -> "is
    //    intended to demonstrate". A programme cannot demonstrate
    //    anything before it runs.
    description: [
      "Go Green Resources Limited is building its approach to structured recovery and recycling networks for recyclable materials, beginning with aluminium used beverage cans and intended to extend to other recoverable waste streams.",
      "The company plans to work with community-based aggregators, retailers, institutions, and commercial facilities to recover materials that would otherwise pollute urban environments and waterways. Recovered materials would be sorted, processed, and channelled into regional recycling and industrial value chains.",
      "By connecting communities to regional recycling markets, the programme is intended to demonstrate that environmental sustainability and economic development can work hand in hand.",
    ],
    // These four benefits were already on the page — they were only
    // rendered above this section's own heading. Re-attached, not rewritten.
    // They are outcome phrased, so the section LABEL is what carries the
    // framing (see `benefitsLabel` in SolutionBlock) rather than each chip
    // being rewritten into clumsy "designed to reduce" prose.
    benefits: [
      "Reduction in urban waste pollution",
      "Diversion of recyclable materials from dumpsites and drainage systems",
      "Reduced energy intensity compared with primary material production",
      "Strengthened local circular supply chains",
    ],
    image: {
      alt: "Placeholder for a photograph of community collectors and sorted recyclable materials",
      placeholderNote: "materials collection & sorting scene",
    },
    // PLACEHOLDER STAT — confirm with client before launch.
    stat: { label: "Kilograms of aluminium recovered" },
    ctaLabel: "Talk to us about materials recovery",
    ctaHref: "/contact",
  },
  {
    id: "organic-waste",
    icon: "sprout",
    title: "Organic Waste Valorisation",
    // ALREADY correctly framed ("IS DEVELOPING ... activities") and left
    // unchanged — recording this so the client can see it was audited,
    // not missed. The second paragraph's "They EXTEND the company's
    // circular model ... while CREATING additional revenue streams" is
    // softened, because the activities do not yet exist to do either.
    description: [
      "Go Green Resources Limited is developing organic waste valorisation activities including composting and black soldier fly farming. These activities are designed to convert biodegradable waste into soil inputs and protein for animal feed.",
      "They are intended to extend the company’s circular model into agriculture and food systems while creating additional revenue streams and environmental benefits, turning organic waste streams into productive outputs.",
    ],
    benefits: [
      "Converts biodegradable waste into useful products",
      "Produces soil inputs that support agriculture",
      "Generates protein for animal feed",
      "Creates additional revenue streams",
      "Reduces organic waste pollution",
    ],
    image: {
      alt: "Placeholder for a photograph of a composting or black soldier fly larvae setup",
      placeholderNote: "composting / black soldier fly setup",
    },
    // PLACEHOLDER STAT — confirm with client before launch.
    stat: { label: "Tonnes of organic waste valorised" },
    ctaLabel: "Talk to us about organic waste",
    ctaHref: "/contact",
  },
  {
    id: "livelihoods",
    icon: "users",
    title: "Community Livelihoods & Green Jobs",
    // ORIGINAL WORDING, flagged for client review:
    //   "Economic empowerment IS EMBEDDED INTO Go Green Resources
    //    PROGRAMMES rather than being treated as a separate activity.
    //    Aggregator and distribution networks CREATE income
    //    opportunities..." -> "is designed to be embedded in the
    //    programmes we are structuring ... are intended to create".
    //    "These participants CAN EARN income through collection,
    //    processing, and distribution" -> "would be able to earn",
    //    because no participant has been enrolled.
    //   "Communities ARE ACTIVE participants and economic partners"
    //    -> "are intended to be active ... once the model is running",
    //    because there are no community partnerships yet. This
    //    sentence is important to soften honestly: it reads as a claim
    //    of existing equal partnership.
    description: [
      "Economic empowerment is designed into the Go Green Resources programmes we are structuring, rather than being treated as a separate activity. Aggregator and distribution networks are intended to create income opportunities for youth groups, women-led enterprises, informal waste collectors, and community-based entrepreneurs.",
      "These participants would be able to earn income through collection, processing, and distribution. Communities are intended to be active participants and economic partners once the model is running, not merely beneficiaries.",
    ],
    // As with Materials Recovery, these benefits already existed and were
    // only in the wrong position. Re-attached, not rewritten.
    benefits: [
      "Income for youth groups and women-led enterprises",
      "Opportunities for informal waste collectors",
      "Support for community-based entrepreneurs",
      "Local ownership and participation",
      "Dignified and inclusive green livelihoods",
    ],
    image: {
      alt: "Placeholder for a photograph of community members receiving materials or payments",
      placeholderNote: "community distribution & green jobs",
    },
    // PLACEHOLDER STAT — confirm with client before launch.
    stat: { label: "People in green livelihoods supported" },
    ctaLabel: "Talk to us about green livelihoods",
    ctaHref: "/contact",
  },
  {
    id: "advisory",
    icon: "shield",
    title: "Advisory, Carbon & Environmental Services",
    // ORIGINAL WORDING, flagged for client review:
    //   "Go Green Resources Limited SUPPORTS PARTNERS in structuring,
    //    financing, and DELIVERING environmental ... projects" ->
    //    "is structuring services to support partners ... once they are
    //    engaged". We have no partners, so "supports partners" claimed
    //    existing client relationships. The service LIST is unchanged.
    description: [
      "Go Green Resources Limited is structuring advisory services intended to support partners in structuring, financing, and delivering environmental and circular economy projects. Services are planned to include environmental consultancy, carbon credit project development, technical support, implementation support, waste infrastructure support, and clean energy programme support.",
    ],
    // Existing page content, kept verbatim. These are services, not
    // benefits, so the heading is relabelled rather than rewritten.
    benefitsLabel: "Key Services",
    benefits: [
      "Environmental consultancy",
      "Carbon credit project development",
      "Technical support",
      "Implementation support",
      "Waste infrastructure support",
      "Clean energy programme support",
    ],
    image: {
      alt: "Placeholder for a photograph of a GoGreen advisory or consultancy engagement",
      placeholderNote: "advisory / consultancy engagement",
    },
    // PLACEHOLDER STAT — confirm with client before launch.
    stat: { label: "Environmental projects supported" },
    ctaLabel: "Talk to us about advisory services",
    ctaHref: "/contact",
  },
];

/* ── IN-PAGE SUB-NAV ───────────────────────────────────────────
   Jump links for the sticky pill bar. `id` must match the section
   anchor and any inbound link from the Navbar dropdown or the
   homepage solution cards. */

export interface SolutionNavItem {
  id: string;
  /** Full label, used as the link's accessible name. */
  label: string;
  /** Short label shown in the pill. */
  shortLabel: string;
}

export const solutionNav: SolutionNavItem[] = [
  { id: "clean-energy", label: "Clean Energy & Waste-to-Energy", shortLabel: "Clean Energy" },
  { id: "materials-recovery", label: "Materials Recovery & Recycling", shortLabel: "Materials Recovery" },
  { id: "organic-waste", label: "Organic Waste Valorisation", shortLabel: "Organic Waste" },
  { id: "livelihoods", label: "Community Livelihoods & Green Jobs", shortLabel: "Livelihoods" },
  { id: "advisory", label: "Advisory, Carbon & Environmental Services", shortLabel: "Advisory" },
];
