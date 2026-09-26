/* ───────────────────────────────────────────────────────────────
   HOMEPLACEHOLDER CONTENT — NOT REAL DATA.

   Every figure, project name, date, partner slot and one-line bio
   in this file is PLACEHOLDER copy written for the homepage
   redesign. Replace each block with client-verified content
   before launch.
   ─────────────────────────────────────────────────────────────── */

import type { StaticImageData } from "next/image";

import andrewKandiero from "../../Andrew Kandiero_Operations Manager.png";
import jasonMtiwa from "../../Jason Mtiwa_ IT & Digital Officer.jpeg";
import thokozaniKamangira from "../../Thokozani Kamangira_Chief Executive Officer.png";
import vitumbikoChirwa from "../../Vitumbiko Chirwa_Environmental Affairs Manager.png";

/* ── 2. STATS BAR ──────────────────────────────────────────
   PRE-OPERATIONAL REFRAME (this brief). These four figures were
   "1,200+ tonnes", "3,500+ households", "180+ green jobs", "900+ tCO2e"
   — invented numbers presented as DELIVERED results on a company
   that has not begun operations. A source comment marking them
   "placeholder" is invisible to a visitor; only the rendered figure
   is read. Under diligence that is the single largest credibility
   risk on the site, so all four are now EMPTY STRINGS, which
   <StatsBar /> renders as "-".

   `homeStatsNote` (passed to <StatsBar note=...>, previously unused
   here) states plainly that the figures are not yet reported. This
   mirrors the /impact treatment, where the same discipline already
   applied. No figure is published until the client verifies it with
   a reporting period and methodology. */

export interface HomeStat {
  value: string;
  label: string;
}

export const homeStats: HomeStat[] = [
  { value: "", label: "Tonnes of waste recovered" },
  { value: "", label: "Households reached" },
  { value: "", label: "Green jobs supported" },
  { value: "", label: "tCO2e emissions avoided" },
];

/* Rendered under the figures. Tense is deliberate: we have not
   recovered, reached, supported or avoided anything yet. */
export const homeStatsNote =
  "Go Green Resources Limited is in its founding phase and has not yet begun operations. These figures are not reported results — they are the measures we intend to publish once our first pilots have run and the data is verified. No figure is claimed here.";

/* ── 7. CASE STUDY SPOTLIGHT ───────────────────────────────
   PRE-OPERATIONAL REFRAME (this brief). This previously rendered a
   finished-looking case study: "Community Resource Recovery Centre",
   "Lilongwe, Malawi", "2025", summarising a centre that "diverts"
   waste, "converts" organic streams and "pays community collectors
   for every tonne delivered", behind a "Read full story" link. No
   such centre, site or date exists.

   It now describes the pilot we are FORMING, not one we have run.
   `location` and `date` are empty strings so no district or year is
   asserted; <CaseStudySpotlight /> now renders a "to be confirmed"
   note in place of each. `status` drives a visible pre-launch label,
   and the CTA points at the roadmap rather than a story that does
   not exist. Layout and visual treatment are unchanged. */

export type FeaturedProjectStatus = "In development" | "Planned";

/* Icon keys, not components, so this data stays serialisable when passed
   into client components. Each component resolves the key itself. */
export type WorkIconName = "recycle" | "energy" | "materials" | "people";

export interface FeaturedProject {
  name: string;
  /** Empty string = not yet chosen. No district is asserted. */
  location: string;
  /** Empty string = no confirmed year. */
  date: string;
  /** Pre-launch status label. The old build had no such field and
      therefore implied the work was done. */
  status: FeaturedProjectStatus;
  summary: string;
  href: string;
  ctaLabel: string;
  icon: WorkIconName;
  gradient: string;
  /** Optional real photograph — supply `imageAlt` alongside it. */
  image?: string | StaticImageData;
  imageAlt?: string;
}

export const featuredProject: FeaturedProject = {
  name: "Our First Pilot Site",
  location: "",
  date: "",
  status: "In development",
  summary:
    "Our first pilot is in development. We are designing a community collection and recovery site that will take organic and recyclable waste away from dumpsites, turn organic streams into clean cooking fuel, and pay community collectors for material delivered. The site, its district and its scope are still to be confirmed with the communities and partners we are engaging.",
  href: "/projects",
  ctaLabel: "See where we're starting",
  icon: "recycle",
  gradient: "from-emerald-500 via-green-600 to-teal-700",
};

/* ── 9. TEAM PREVIEW ───────────────────────────────────────
   Headshots, names and titles are REAL (same source as
   LeadershipSection on /about). The `bio` one-liners are
   PLACEHOLDER copy pending client sign-off.

   PRE-OPERATIONAL REFRAME (this brief, Priority 8). With no company
   track record, these bios are the PRIMARY trust signal on the site,
   so they must carry professional standing rather than imply running
   operations that do not exist. The previous copy was written in the
   present tense about current work — "Runs resource recovery
   operations and field delivery teams", "Builds the data and digital
   systems behind our operations" — which is exactly the claim the
   brief asks us to remove.

   Each bio below is therefore reframed around ROLE AND EXPERTISE and
   is still a PLACEHOLDER: the client's actual qualifications,
   certifications and career history are not in the repository and
   MUST be supplied. This is flagged as HIGH PRIORITY for the client
   in the handover notes. Nothing here is a credential claim until
   confirmed. */

export interface TeamPreviewMember {
  name: string;
  title: string;
  bio: string;
  image: StaticImageData;
}

export const teamPreview: TeamPreviewMember[] = [
  {
    name: "Thokozani Edgar Kamangira",
    title: "Chief Executive Officer",
    // PLACEHOLDER — replace with a client-approved bio. Should state
    // the CEO's actual background, qualifications and prior roles.
    bio: "Sets the company's circular economy strategy and leads funder and partner engagement.",
    image: thokozaniKamangira,
  },
  {
    name: "Andrew Kandiero",
    title: "Operations Manager",
    // PLACEHOLDER — replace with a client-approved bio. Should state
    // the Operations Manager's actual background and qualifications.
    bio: "Leads operations design, including collection logistics, site layout and field delivery planning.",
    image: andrewKandiero,
  },
  {
    name: "Vitumbiko Chirwa",
    title: "Environmental Affairs Manager",
    // PLACEHOLDER — replace with a client-approved bio. Should state
    // the Environmental Affairs Manager's actual credentials.
    bio: "Leads environmental compliance, monitoring design and impact measurement across the model.",
    image: vitumbikoChirwa,
  },
  {
    name: "Jason Mtiwa",
    title: "IT & Digital Officer",
    // PLACEHOLDER — replace with a client-approved bio. Should state
    // the IT & Digital Officer's actual background and qualifications.
    bio: "Designs the data and digital systems that will track materials, collection and impact reporting.",
    image: jasonMtiwa,
  },
];

/* ── 10. PARTNER / FUNDER LOGO STRIP ───────────────────────
   PLACEHOLDER SLOTS — deliberately generic. No partner or funder
   names, marks or logos are shown until the client supplies
   approved artwork and permission to display each logo. */

export interface PartnerSlot {
  /** Real partner name, once approved. Keep empty until then. */
  name: string;
  /** Optional logo asset path, once supplied. */
  logo?: string;
  logoAlt?: string;
}

export const partnerSlots: PartnerSlot[] = [
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
];
