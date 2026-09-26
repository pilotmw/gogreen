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
    description: [
      "Go Green Resources Limited develops clean energy solutions that convert organic and biomass waste into usable fuel and supports adoption of cleaner cooking and energy technologies as alternatives to charcoal and firewood.",
      "This includes community-linked biogas systems using anaerobic digestion to convert food waste, agricultural residues, and animal waste into clean cooking fuel. The company also supports access to clean cooking appliances and fuels through models suited to target markets, including cylinder exchange, institutional distribution, and bulk-user distribution.",
      "The remaining organic material is recovered as bio-slurry, an organic fertiliser that returns nutrients to the soil and further closes the resource loop.",
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
    description: [
      "Go Green Resources Limited builds structured recovery and recycling networks for recyclable materials, beginning with aluminium used beverage cans and extendable to other recoverable waste streams.",
      "The company works with community-based aggregators, retailers, institutions, and commercial facilities to recover materials that would otherwise pollute urban environments and waterways. Recovered materials are sorted, processed, and channelled into regional recycling and industrial value chains.",
      "By connecting communities to regional recycling markets, the programme demonstrates that environmental sustainability and economic development can work hand in hand.",
    ],
    // These four benefits were already on the page — they were only
    // rendered above this section's own heading. Re-attached, not rewritten.
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
    description: [
      "Go Green Resources Limited is developing organic waste valorisation activities including composting and black soldier fly farming. These activities convert biodegradable waste into soil inputs and protein for animal feed.",
      "They extend the company’s circular model into agriculture and food systems while creating additional revenue streams and environmental benefits, turning organic waste streams into productive outputs.",
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
    description: [
      "Economic empowerment is embedded into Go Green Resources programmes rather than being treated as a separate activity. Aggregator and distribution networks create income opportunities for youth groups, women-led enterprises, informal waste collectors, and community-based entrepreneurs.",
      "These participants can earn income through collection, processing, and distribution. Communities are active participants and economic partners, not merely beneficiaries.",
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
    description: [
      "Go Green Resources Limited supports partners in structuring, financing, and delivering environmental and circular economy projects. Services include environmental consultancy, carbon credit project development, technical support, implementation support, waste infrastructure support, and clean energy programme support.",
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
