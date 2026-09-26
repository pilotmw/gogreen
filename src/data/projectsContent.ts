/* ───────────────────────────────────────────────────────────────
   PROJECTS PAGE — WHAT CHANGED (client review)

   1. REAL PROJECTS ARE NOW THE PRIMARY CONTENT
      The page previously had no projects at all. Its only project-
      related content was six abstract "Areas of Work" paragraphs that
      restated the homepage and /solutions copy, so the page proved
      nothing. A `projects` list now drives the primary Projects
      section through the new <ProjectCard />, and the status filter
      is wired to it.

   2. "AREAS OF WORK" → "PROJECT CATEGORIES"
      The same six items are kept, but reframed as a categorisation
      layer over the projects rather than a second description of the
      company's offer. Each is now a short label + ONE short scope
      line, and links to the matching solution on /solutions via
      `solutionHref`. The paragraph-length copy that used to live here
      now lives only on /solutions, so the two pages no longer
      duplicate each other.

      Note: 6 categories map onto 5 solutions. Carbon Project
      Development is a service line inside the Advisory solution
      (/solutions#advisory), so both categories point at that anchor.

   3. KEY PARTNERSHIPS KEPT, MOVED BELOW PROJECTS
      The four existing partnership-category cards are retained
      verbatim and now render after the projects, as a secondary
      section, followed by a clearly marked PLACEHOLDER logo strip
      (reusing the existing <PartnerLogos /> and the homepage's
      `partnerSlots` idea).

   4. NO FABRICATED FACTS — MUST BE REPLACED BEFORE LAUNCH
      The client has not supplied any project records, partner names,
      partner logos or project photography. Therefore:
      - `location` and `timeframe` are "—" on every project, with a
        visible "to confirm" note. No district, site or date has been
        invented.
      - `status` is assigned across the four placeholders ONLY so the
        filter is demonstrable; each project's real status must be
        confirmed.
      - `name` is an indicative activity label, not a confirmed
        project title.
      - `description` states what the activity does and what it is
        AIMED at, and claims NO outcome, result, volume, tonnage or
        figure. There are no statistics anywhere on this page.
      - `image.src` is undefined on every project, so each card draws
        a labelled dashed PLACEHOLDER box. Add `src` and the same card
        renders a real photo with the existing alt text.
      - `projectPartners` is an empty list on every project.
      - `partnerSlots` below contains NO names — only empty slots.
      EVERY project card also renders a visible "Placeholder project"
      ribbon, so no card can be mistaken for real data.
      Real project count should reflect the projects the client
      actually has — currently 4 placeholders.
   ─────────────────────────────────────────────────────────────── */

/* Icon keys rather than components, matching src/data/solutionsContent.ts,
   so this data stays serialisable. The page resolves the key. */
export type ProjectCategoryIconName =
  | "leaf"
  | "recycle"
  | "sprout"
  | "users"
  | "shield"
  | "cloud";

export interface ProjectImage {
  /** Supply a real photo path (e.g. "/projects/can-recovery.jpg") to
      replace the placeholder box. Undefined until the client delivers. */
  src?: string;
  /** Required either way — next/image `alt`, or the accessible name of
      the placeholder box. */
  alt: string;
  /** Plain-language note describing the photo that is needed. */
  placeholderNote: string;
}

export type ProjectStatus = "Ongoing" | "Pilot" | "Planned" | "Completed";

export interface Project {
  /** Indicative activity label — not a confirmed project title. */
  name: string;
  /** District / city in Malawi. An EMPTY STRING is the placeholder
      signal — <ProjectCard /> then renders "—" plus a "to be
      confirmed" note. This mirrors SolutionBlock's `stat.value`, which
      is left unset rather than filled with a dash. No district has
      been invented. */
  location: string;
  status: ProjectStatus;
  /** Start date or timeframe. Empty string = placeholder, as above. */
  timeframe: string;
  image: ProjectImage;
  /** What the project does and what it is aimed at. Claims no outcome. */
  description: string;
  /** Must match a `label` in projectCategories. */
  category: string;
  /** Named partners, once the client approves public naming. Empty. */
  projectPartners?: string[];
}

/* ── STATUS FILTERS ─────────────────────────────────────────────
   Rendered as the ARIA tablist above the project grid, reusing the
   tab pattern that previously existed on the homepage Solutions
   section (role=tablist/tab, roving tabIndex, arrow + Home/End keys).
   Order here is the display order of the filter pills. */
export const projectStatuses: ProjectStatus[] = [
  "Ongoing",
  "Pilot",
  "Planned",
  "Completed",
];

/* ── PROJECTS ──────────────────────────────────────────────────
   PLACEHOLDER PROJECTS — confirm with client before launch.
   Four placeholders (the brief's minimum is three) so the grid is not
   sparse and so every status filter returns at least one card. */
export const projects: Project[] = [
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Aluminium Can Collection Network",
    location: "",
    status: "Ongoing",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of community collectors gathering aluminium used beverage cans",
      placeholderNote: "community can collection activity",
    },
    description:
      "Organised collection of aluminium used beverage cans from households, markets and institutions, with recovered material routed to regional recyclers. Aimed at keeping cans out of dumpsites and drainage channels while returning income to collectors.",
    category: "Materials Recovery",
  },
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Community Biogas Clean Cooking Pilot",
    location: "",
    status: "Pilot",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of a community biogas digester and clean cooking unit",
      placeholderNote: "biogas digester & clean cooking setup",
    },
    description:
      "A pilot anaerobic digestion system converting food and agricultural waste into clean cooking fuel for participating households, with bio-slurry retained as an organic soil input. Aimed at reducing reliance on charcoal and firewood.",
    category: "Community Biogas",
  },
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Organic Waste Valorisation Site",
    location: "",
    status: "Planned",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of a composting or black soldier fly larvae setup",
      placeholderNote: "composting / black soldier fly setup",
    },
    description:
      "A planned site converting biodegradable waste from markets and food businesses into compost and black soldier fly larvae for animal feed. Aimed at producing soil inputs for local agriculture and adding a second revenue stream.",
    category: "Organic Waste",
  },
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Community Aggregator Training",
    location: "",
    status: "Completed",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of a community group training session",
      placeholderNote: "aggregator training session",
    },
    description:
      "A training and onboarding programme preparing community aggregators and youth groups to handle collection, sorting and distribution for the recovery network. Aimed at building the local capacity the other projects depend on.",
    category: "Green Livelihoods",
  },
];

export interface ProjectCategory {
  /** Stable key, also used as the section's item id. */
  id: string;
  icon: ProjectCategoryIconName;
  /** Short label — also the chip shown on each project card. */
  label: string;
  /** ONE short line. The full description lives on /solutions only. */
  scope: string;
  /** Link to the fuller write-up on the Solutions page. */
  solutionHref: string;
  /** Full solution name, used as the link's accessible name. */
  solutionTitle: string;
}

export const projectCategories: ProjectCategory[] = [
  {
    id: "community-biogas",
    icon: "leaf",
    label: "Community Biogas",
    scope: "Clean cooking fuel from organic and biomass waste.",
    solutionHref: "/solutions#clean-energy",
    solutionTitle: "Clean Energy & Waste-to-Energy Solutions",
  },
  {
    id: "materials-recovery",
    icon: "recycle",
    label: "Materials Recovery",
    scope: "Collection and processing of recyclable materials.",
    solutionHref: "/solutions#materials-recovery",
    solutionTitle: "Materials Recovery & Recycling",
  },
  {
    id: "organic-waste",
    icon: "sprout",
    label: "Organic Waste",
    scope: "Composting and black soldier fly farming.",
    solutionHref: "/solutions#organic-waste",
    solutionTitle: "Organic Waste Valorisation",
  },
  {
    id: "green-livelihoods",
    icon: "users",
    label: "Green Livelihoods",
    scope: "Income through collection and distribution networks.",
    solutionHref: "/solutions#livelihoods",
    solutionTitle: "Community Livelihoods & Green Jobs",
  },
  {
    id: "environmental-consultancy",
    icon: "shield",
    label: "Environmental Consultancy",
    scope: "Technical and implementation support for projects.",
    solutionHref: "/solutions#advisory",
    solutionTitle: "Advisory, Carbon & Environmental Services",
  },
  {
    id: "carbon-projects",
    icon: "cloud",
    label: "Carbon Projects",
    scope: "Carbon credit projects that capture environmental value.",
    solutionHref: "/solutions#advisory",
    solutionTitle: "Advisory, Carbon & Environmental Services",
  },
];

/* ── PARTNERSHIPS ──────────────────────────────────────────────
   The four existing partnership-category cards, retained verbatim
   from the original page and moved below the Projects section.
   Descriptions are unchanged — they describe partner types, not the
   solutions, so they do not duplicate /solutions. */
export type PartnershipIconName = "calendar" | "users" | "trending" | "leaf";

export interface Partnership {
  icon: PartnershipIconName;
  title: string;
  desc: string;
}

export const partnerships: Partnership[] = [
  {
    icon: "calendar",
    title: "Markets and Farms",
    desc: "Markets, farms, food processing businesses, and agricultural producers supply organic feedstock for our clean energy and valorisation activities, improving their waste management while reducing environmental footprint.",
  },
  {
    icon: "users",
    title: "Community Collectors",
    desc: "Local youth, women, waste collectors, and community-based organizations are at the heart of our recovery networks, creating sustainable income while keeping materials in circulation.",
  },
  {
    icon: "trending",
    title: "Regional Recycling Partners",
    desc: "Trusted regional recycling companies process our recovered materials into new products, connecting Malawi's efforts to the wider circular economy.",
  },
  {
    icon: "leaf",
    title: "Environmental NGOs and Development Partners",
    desc: "Environmental organizations, NGOs, research institutions, and development agencies provide technical expertise, capacity building, and strategic support.",
  },
];

/* ── PLACEHOLDER PARTNER LOGO SLIP ─────────────────────────────
   NO partner names or logos have been approved for public use, so
   every slot is empty. <PartnerLogos /> draws a bordered box reading
   "Logo" for each one — it never invents a name. Add `{ name, logo,
   logoAlt }` once the client approves. */
export interface ProjectPartnerSlot {
  /** Real partner name, once approved. Keep empty until then. */
  name: string;
  /** Optional logo asset path, once supplied. */
  logo?: string;
  logoAlt?: string;
}

export const projectPartnerSlots: ProjectPartnerSlot[] = [
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
];
