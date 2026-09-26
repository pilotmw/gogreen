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

/* PRE-OPERATIONAL REFRAME (Priority 3) — READ BEFORE PUBLISHING.

   The `ProjectStatus` union previously included "Ongoing" and
   "Completed", and the four placeholder projects were ASSIGNED those
   statuses so the filter had something to show. On a company that has
   not begun operations that produced a "Completed" project and an
   "Ongoing" one — the clearest possible false claim of a track
   record, and worse than having no status at all.

   "Ongoing" and "Completed" are therefore REMOVED from the union: we
   cannot complete or run anything yet. The remaining statuses describe
   intent only, and the filter no longer needs invented values to have
   something to render. */

export type ProjectStatus = "Planned" | "In development" | "Seeking partners";

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
  /** What the project will do and what it is aimed at. Claims no
      outcome. Present-tense verbs ("Organised collection…",
      "A pilot system converting…") were replaced with planned
      framing — see each entry. */
  description: string;
  /** Must match a `label` in projectCategories. */
  category: string;
  /** Named partners, once the client approves public naming. Empty. */
  projectPartners?: string[];
}

/* ── STATUS FILTERS ─────────────────────────────────────────────
   Order here is the display order of the filter pills. */
export const projectStatuses: ProjectStatus[] = [
  "Planned",
  "In development",
  "Seeking partners",
];

/* ── PROJECTS ──────────────────────────────────────────────────
   PLACEHOLDER PROJECTS — confirm with client before launch.
   Four placeholders (the brief's minimum is three) so the grid is not
   sparse and so every status filter returns at least one card.

   PRE-OPERATIONAL REFRAME (Priority 3): statuses are now intent-only
   (no "Ongoing"/"Completed"), and every description is reframed from
   present-tense operational language to planned intent. The technical
   and sector detail in each is preserved in full. */
export const projects: Project[] = [
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Aluminium Can Collection Network",
    location: "",
    // ORIGINAL: "Ongoing" — claimed a running collection network. We
    // have not started collecting anything.
    status: "In development",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of community collectors gathering aluminium used beverage cans",
      placeholderNote: "community can collection activity",
    },
    // ORIGINAL: "Organised collection of aluminium used beverage cans
    // from households, markets and institutions, with recovered
    // material routed to regional recyclers. Aimed at keeping cans out
    // of dumpsites… while returning income to collectors."
    // → "is intended to organise… would be routed": no cans have been
    // collected and no material routed. The three collection sources
    // and the recycler route are UNCHANGED.
    description:
      "An intended organised collection of aluminium used beverage cans from households, markets and institutions, with recovered material to be routed to regional recyclers. Aimed at keeping cans out of dumpsites and drainage channels while returning income to collectors.",
    category: "Materials Recovery",
  },
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Community Biogas Clean Cooking Pilot",
    location: "",
    // ORIGINAL: "Pilot" — implied a pilot was under way.
    status: "Planned",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of a community biogas digester and clean cooking unit",
      placeholderNote: "biogas digester & clean cooking setup",
    },
    // ORIGINAL: "A pilot anaerobic digestion system converting food
    // and agricultural waste into clean cooking fuel for participating
    // households, with bio-slurry retained as an organic soil input."
    // → "A planned pilot … intended to convert … would be retained":
    // no digester exists and no household participates. Anaerobic
    // digestion, the two feedstocks and the bio-slurry are UNCHANGED.
    description:
      "A planned pilot anaerobic digestion system intended to convert food and agricultural waste into clean cooking fuel for participating households, with bio-slurry to be retained as an organic soil input. Aimed at reducing reliance on charcoal and firewood.",
    category: "Community Biogas",
  },
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Organic Waste Valorisation Site",
    location: "",
    // ORIGINAL: "Planned" — still accurate, retained.
    status: "Planned",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of a composting or black soldier fly larvae setup",
      placeholderNote: "composting / black soldier fly setup",
    },
    // ORIGINAL: "A planned site converting biodegradable waste … into
    // compost and black soldier fly larvae for animal feed."
    // → "converting" → "intended to convert": the site is not built, so
    // it cannot be converting. Compost, black soldier fly and animal
    // feed are UNCHANGED.
    description:
      "A planned site intended to convert biodegradable waste from markets and food businesses into compost and black soldier fly larvae for animal feed. Aimed at producing soil inputs for local agriculture and adding a second revenue stream.",
    category: "Organic Waste",
  },
  {
    // PLACEHOLDER PROJECT — confirm with client before launch.
    name: "Community Aggregator Training",
    location: "",
    // ORIGINAL: "Completed" — THE MOST DAMAGING CLAIM ON THE PAGE. A
    // company with no operations cannot have completed a training
    // programme. There is no historical record of anyone having been
    // trained by us, so this becomes "Planned". The previous value was
    // only ever invented to populate the status filter.
    status: "Planned",
    timeframe: "",
    image: {
      alt: "Placeholder for a photograph of a community group training session",
      placeholderNote: "aggregator training session",
    },
    // ORIGINAL: "A training and onboarding programme preparing
    // community aggregators and youth groups to handle collection,
    // sorting and distribution for the recovery network."
    // → "A planned training and onboarding programme intended to
    // prepare…": nobody has been prepared. The three skills and the
    // recovery network reference are UNCHANGED.
    description:
      "A planned training and onboarding programme intended to prepare community aggregators and youth groups to handle collection, sorting and distribution for the recovery network. Aimed at building the local capacity the other projects depend on.",
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

/* ── PHASED ROADMAP (Priority 3) ─────────────────────────────────
   NEW. The brief asked for the page to be rebuilt as a forward-looking
   phased plan rather than a set of "areas of work". `projectPhases`
   drives a new section rendered above the project grid; the existing
   grid, filter and category chips are unchanged beneath it.

   PHASE NUMBERING IS SEQUENCING INTENT, NOT PROGRESS. Phase 1 has not
   started — there is no completed phase behind it.

   `timeframe` is EMPTY on every phase, deliberately. The brief permits
   placeholder timeframes, but an invented quarter or year on a company
   with no operations reads as a published schedule commitment. Left
   blank, <RoadmapPhases /> renders "Timing to be confirmed".

   `rationale` is the "why this is a starting point" the brief asks
   for. IMPORTANT FOR THE CLIENT: the reasoning below is derived from
   the technical logic already published on this site (aluminium cans
   are the highest-value recoverable stream in the collection; biogas
   addresses the charcoal dependency the Challenge section names) and
   is NOT client-supplied. It is plausible and internally consistent,
   but it is an inference, not an articulated client position. Each
   must be confirmed or replaced — flagged per entry below. */
export interface ProjectPhase {
  /** Stable key, also used as the list item id. */
  id: string;
  /** "Phase 1" etc. */
  label: string;
  title: string;
  /** Empty string = no client-confirmed timeframe. Do not invent one. */
  timeframe: string;
  /** What this phase involves. Planned intent, not delivered work. */
  focus: string;
  /** WHY it is a starting point. Needs client confirmation. */
  rationale: string;
  /** True when `rationale` is inferred rather than client-supplied. */
  rationaleNeedsConfirmation: boolean;
}

export const projectPhases: ProjectPhase[] = [
  {
    id: "phase-1",
    label: "Phase 1",
    title: "Establish the first pilot",
    // PLACEHOLDER — no client-confirmed start date. Left blank on
    // purpose; do not fill in without the client's agreement.
    timeframe: "",
    focus:
      "Stand up one collection and recovery site, with community-led aluminium can recovery as the first activity, and establish the measurement baseline we will report against.",
    // FLAGGED FOR CLIENT INPUT — inferred from the technical logic
    // already on this site, not articulated by the client. Confirm or
    // replace before publish.
    rationale:
      "Aluminium cans are the highest-value material in the common waste stream, recover the greatest energy per tonne against primary production, and need the least processing equipment — which makes them the most practical first activity to prove the collection model works.",
    rationaleNeedsConfirmation: true,
  },
  {
    id: "phase-2",
    label: "Phase 2",
    title: "Add organic waste and clean cooking",
    // PLACEHOLDER — as above.
    timeframe: "",
    focus:
      "Extend the model to organic waste valorisation and the first community-linked biogas digester, connecting clean cooking fuel to the households the Phase 1 network already reaches.",
    // FLAGGED FOR CLIENT INPUT — inferred, as above.
    rationale:
      "The organic stream is where the largest environmental gain sits, and biogas is the only part of the model that displaces charcoal and firewood directly. Sequencing it second means the collection network that organises feedstock is already working before the more complex processing is added.",
    rationaleNeedsConfirmation: true,
  },
  {
    id: "phase-3",
    label: "Phase 3",
    title: "Scale and replicate",
    // PLACEHOLDER — as above.
    timeframe: "",
    focus:
      "Extend the proven model to additional sites and districts, and develop the advisory and carbon project services that support third-party delivery of the same approach.",
    // FLAGGED FOR CLIENT INPUT — inferred, as above.
    rationale:
      "Replication only becomes viable once a single site has produced verified data on cost, recovery rates and community uptake. Publishing the advisory and carbon services at that point means they are offered on the strength of a demonstrated local result rather than a proposal.",
    rationaleNeedsConfirmation: true,
  },
];

/* ── PARTNERSHIPS ──────────────────────────────────────────────
   The four existing partnership-category cards are retained and still
   appear below the projects.

   PRE-OPERATIONAL REFRAME (Priority 3): the brief asked for
   "Key Partnerships" to become a target map rather than existing
   relationships. The four descriptions were all present-tense
   statements of fact about counterparties — "are at the heart of our
   recovery networks", "process our recovered materials", "provide
   technical expertise", and "supply organic feedstock for our ... "
   — none of which is true today, since we have no partners and have
   recovered nothing. Each is now written as the relationship we are
   SEEKING.

   Per the brief, no partner names, logos or marks have been added. */
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
    // ORIGINAL: "Markets, farms, food processing businesses, and
    // agricultural producers SUPPLY organic feedstock for our clean
    // energy and valorisation activities, improving their waste
    // management while reducing environmental footprint."
    // → "are the kind of organisations we are seeking to work with":
    // nobody supplies us feedstock today.
    desc: "Markets, farms, food processing businesses and agricultural producers are the kind of organisations we are seeking to work with, as future suppliers of organic feedstock for our clean energy and valorisation activities.",
  },
  {
    icon: "users",
    title: "Community Collectors",
    // ORIGINAL: "Local youth, women, waste collectors, and
    // community-based organizations ARE AT THE HEART of our recovery
    // networks, creating sustainable income…"
    // → "are the people we intend our recovery networks to be built
    // around": no network exists and nobody is enrolled.
    desc: "Local youth, women, waste collectors and community-based organizations are the people we intend our recovery networks to be built around, creating sustainable income while keeping materials in circulation.",
  },
  {
    icon: "trending",
    title: "Regional Recycling Partners",
    // ORIGINAL: "Trusted regional recycling companies PROCESS OUR
    // RECOVERED MATERIALS into new products…"
    // → "are the outlets we will need": we have recovered no material
    // and have no processing relationship.
    desc: "Regional recycling companies are the outlets we will need, to process recovered materials into new products and connect Malawi's efforts to the wider circular economy.",
  },
  {
    icon: "leaf",
    title: "Environmental NGOs and Development Partners",
    // ORIGINAL: "Environmental organizations, NGOs, research
    // institutions, and development agencies PROVIDE technical
    // expertise, capacity building, and strategic support."
    // → "are the organisations we hope will provide": we have no
    // funders or technical partners in place.
    desc: "Environmental organizations, NGOs, research institutions and development agencies are the organisations we hope will provide technical expertise, capacity building and strategic support as we establish the company.",
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
