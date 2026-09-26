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
   PLACEHOLDER NUMBERS — swap for verified figures (with the
   reporting period and methodology) before launch. */

export interface HomeStat {
  value: string;
  label: string;
}

export const homeStats: HomeStat[] = [
  { value: "1,200+", label: "Tonnes of waste recovered" },
  { value: "3,500+", label: "Households reached" },
  { value: "180+", label: "Green jobs supported" },
  { value: "900+", label: "tCO2e emissions avoided" },
];

/* ── 7. CASE STUDY SPOTLIGHT ───────────────────────────────
   PLACEHOLDER PROJECT — there is no confirmed flagship project
   yet. `name`, `location`, `date` and `summary` are illustrative
   and must be replaced with a real, client-approved project.
   No photograph is supplied, so the component falls back to the
   abstract brand gradient + icon treatment (WorkTeaserCard). */

/* Icon keys, not components, so this data stays serialisable when passed into
   client components. Each component resolves the key itself. */
export type WorkIconName = "recycle" | "energy" | "materials" | "people";

export interface FeaturedProject {
  name: string;
  location: string;
  date: string;
  summary: string;
  href: string;
  icon: WorkIconName;
  gradient: string;
  /** Optional real photograph — supply `imageAlt` alongside it. */
  image?: string | StaticImageData;
  imageAlt?: string;
}

export const featuredProject: FeaturedProject = {
  name: "Community Resource Recovery Centre",
  location: "Lilongwe, Malawi",
  date: "2025",
  summary:
    "A community collection and recovery centre that diverts organic and recyclable waste from dumpsites, converts organic streams into clean cooking fuel, and pays community collectors for every tonne delivered. Recovered aluminium is baled and sold into regional recycling markets.",
  href: "/projects",
  icon: "recycle",
  gradient: "from-emerald-500 via-green-600 to-teal-700",
};

/* ── 9. TEAM PREVIEW ───────────────────────────────────────
   Headshots, names and titles are REAL (same source as
   LeadershipSection on /about). The `bio` one-liners are
   PLACEHOLDER copy pending client sign-off. */

export interface TeamPreviewMember {
  name: string;
  title: string;
  bio: string;
  image: StaticImageData;
}

export const teamPreview: TeamPreviewMember[] = [
  {
    name: "Thokozani Kamangira",
    title: "Chief Executive Officer",
    // PLACEHOLDER — replace with a client-approved one-line bio.
    bio: "Leads the company's circular economy strategy and partnerships.",
    image: thokozaniKamangira,
  },
  {
    name: "Andrew Kandiero",
    title: "Operations Manager",
    // PLACEHOLDER — replace with a client-approved one-line bio.
    bio: "Runs resource recovery operations and field delivery teams.",
    image: andrewKandiero,
  },
  {
    name: "Vitumbiko Chirwa",
    title: "Environmental Affairs Manager",
    // PLACEHOLDER — replace with a client-approved one-line bio.
    bio: "Oversees environmental compliance, monitoring and reporting.",
    image: vitumbikoChirwa,
  },
  {
    name: "Jason Mtiwa",
    title: "IT & Digital Officer",
    // PLACEHOLDER — replace with a client-approved one-line bio.
    bio: "Builds the data and digital systems behind our operations.",
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
