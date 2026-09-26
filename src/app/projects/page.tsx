"use client";

/* ───────────────────────────────────────────────────────────────
   PROJECTS PAGE — WHAT CHANGED (client review)

   1. THIS PAGE NOW SHOWS PROJECTS. It previously had none — only six
      abstract "Areas of Work" paragraphs that restated the homepage
      and /solutions copy. A new primary "Projects" section renders
      real project records as <ProjectCard />s from
      src/data/projectsContent.ts, with a status filter above the grid.

   2. "AREAS OF WORK" → "PROJECT CATEGORIES". Same six items, kept,
      but reframed as a categorisation layer over the projects: short
      label + ONE scope line + a link to the matching solution on
      /solutions. The paragraph-length descriptions now live only on
      /solutions, so the two pages no longer duplicate each other. This
      page shows proof of delivery; that page shows the depth.

   3. "KEY PARTNERSHIPS" KEPT AND MOVED DOWN. The four existing
      partnership-category cards are retained verbatim below the
      projects, followed by a clearly marked PLACEHOLDER logo strip
      that reuses the existing <PartnerLogos /> component.

   4. THE HERO IS UNCHANGED (still the dark green→blue gradient) and
      now carries the page's <h1> via SectionHeading's titleLevel prop
      — the page previously started at <h2>. The body sections were
      converted from the old dark treatment to the light theme used by
      the homepage, /about and /solutions, so the cards, chips and
      badges can reuse the site's existing light design tokens. The
      closing CTA band is left as the dark bookend it already was.

   5. NO FABRICATED DATA. No project record, date, district, statistic
      or partner name has been invented. All four projects are marked
      PLACEHOLDER in the data file and on the cards themselves. See
      the comment block at the top of src/data/projectsContent.ts for
      the full list of what the client still needs to supply.
   ─────────────────────────────────────────────────────────────── */

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Cloud,
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import ProjectCard from "@/components/ProjectCard";
import PartnerLogos from "@/components/PartnerLogos";
import RoadmapPhases from "@/components/RoadmapPhases";
import SectionHeading from "@/components/SectionHeading";
import {
  partnerships,
  projectCategories,
  projectPartnerSlots,
  projects,
  projectStatuses,
  type PartnershipIconName,
  type ProjectCategoryIconName,
  type ProjectStatus,
} from "@/data/projectsContent";

const CATEGORY_ICONS: Record<ProjectCategoryIconName, LucideIcon> = {
  leaf: Leaf,
  recycle: Recycle,
  sprout: Sprout,
  users: Users,
  shield: ShieldCheck,
  cloud: Cloud,
};

const PARTNERSHIP_ICONS: Record<PartnershipIconName, LucideIcon> = {
  calendar: Calendar,
  users: Users,
  trending: TrendingUp,
  leaf: Leaf,
};

type StatusFilter = ProjectStatus | "All";

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  const [activeStatus, setActiveStatus] = useState<StatusFilter>("All");

  const filters: StatusFilter[] = ["All", ...projectStatuses];

  const visibleProjects =
    activeStatus === "All"
      ? projects
      : projects.filter((project) => project.status === activeStatus);

  /* Count per status, shown on the filter pills so it is obvious how
     many records sit behind each one. */
  const countFor = useCallback(
    (status: StatusFilter) =>
      status === "All"
        ? projects.length
        : projects.filter((project) => project.status === status).length,
    []
  );

  /* Keyboard support for the filter, reusing the tab pattern that
     previously existed on the homepage Solutions section: roving
     tabIndex plus arrow / Home / End keys. */
  const onFilterKey =
    (index: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const len = filters.length;
      let next: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % len;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + len) % len;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = len - 1;
      if (next !== null) {
        e.preventDefault();
        setActiveStatus(filters[next]);
      }
    };

  return (
    <>
      {/* ── 1. HERO — now carries the page's <h1> ───────────────────
          PRE-OPERATIONAL REFRAME (Priority 3). Page heading retitled
          "Our Projects" → "Our Roadmap", and the subtitle no longer
          claims work is "happening".

          PER THE BRIEF'S OWN INSTRUCTION, THE NAV LABEL IS UNCHANGED —
          the Navbar still reads "Projects". The brief says to confirm a
          nav rename with the client because it affects main site
          navigation, so only the page heading moved. Options are listed
          in the handover notes for their decision. */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            titleLevel="h1"
            title="Our Roadmap"
            subtitle="Where we are starting, what we plan to build next, and the order we intend to build it in. None of it is built yet."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      {/* ── 2. INTEGRATED MODEL (dark card → light card) ──────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/10 bg-[#f6faf7]/80 p-8 md:p-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-lg">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                An Integrated Circular Model
              </h2>
            </div>
            {/* ORIGINAL: "Go Green Resources Limited RECOVERS waste and
                underused resources and TRANSFORMS them into … OUR WORK
                SPANS energy access, waste management, climate finance,
                and community development." → "is building a model
                designed to recover … is designed to span": nothing has
                been recovered or transformed. The four output types and
                the four sector names are UNCHANGED. */}
            <p className="text-gray-700 text-lg mt-6 max-w-4xl">
              Go Green Resources Limited is building a model designed to
              recover waste and underused resources and transform them into
              clean energy, recovered materials, sustainable products, and
              economic opportunity. The model is designed to span energy
              access, waste management, climate finance, and community
              development.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                Lilongwe-Based
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                Community-Driven
              </span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
                Regionally Ambitious
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ROADMAP PHASES (new, Priority 3) ─────────────────────
          The phased plan sits ABOVE the project grid so the page reads
          as a forward plan first. The grid, its ARIA tablist filter and
          the category chips below are all unchanged. */}
      <RoadmapPhases />

      {/* ── 4. PROJECTS (primary section, now "planned activities") ── */}
      <section id="projects" className="bg-[#f6faf7]/70 py-16 md:py-24 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Planned Activities"
            subtitle="The activities we intend to carry out, grouped by the area of work each belongs to. Select a status to narrow the list."
          />

          {/* ── STATUS FILTER ──
              Built now, with placeholder data, so it is ready for the
              real project list. Reuses the ARIA tab pattern from the
              former homepage Solutions tabs. */}
          <div
            role="tablist"
            aria-label="Filter projects by status"
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center"
          >
            {filters.map((status, i) => {
              const isActive = status === activeStatus;
              return (
                <button
                  key={status}
                  type="button"
                  role="tab"
                  id={`project-status-tab-${status}`}
                  aria-selected={isActive}
                  aria-controls="project-grid"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStatus(status)}
                  onKeyDown={onFilterKey(i)}
                  className={[
                    "inline-flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                    "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    isActive
                      ? "bg-primary text-white shadow-[0_10px_24px_-14px_rgba(20,83,45,0.6)]"
                      : "border border-primary/20 bg-white text-primary hover:bg-primary hover:text-white",
                  ].join(" ")}
                >
                  {status}
                  <span
                    className={[
                      "rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold tabular-nums",
                      isActive ? "bg-white/20" : "bg-primary/10",
                    ].join(" ")}
                  >
                    {countFor(status)}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="project-grid"
            role="tabpanel"
            aria-labelledby={`project-status-tab-${activeStatus}`}
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
          >
            {visibleProjects.map((project, i) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                location={project.location}
                status={project.status}
                timeframe={project.timeframe}
                image={project.image}
                description={project.description}
                category={project.category}
                index={i}
              />
            ))}
          </div>

          {/* Empty state, so the filter never renders a bare gap once
              the real project list replaces the placeholders. */}
          {visibleProjects.length === 0 && (
            <p className="mt-10 rounded-2xl border border-dashed border-primary/30 bg-white p-8 text-center text-gray-600">
              No projects with this status yet.
            </p>
          )}

          {/* PLACEHOLDER NOTICE — confirm with client before launch. */}
          <p className="mt-8 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <span className="font-bold uppercase tracking-[0.14em]">
              Placeholder content
            </span>{" "}
            — the projects above are placeholders so the page structure can be
            reviewed. Project names, locations, timeframes, statuses and
            photography will be replaced with the client&apos;s actual projects
            before launch.
          </p>
        </div>
      </section>

      {/* ── 4. PROJECT CATEGORIES (reframed "Areas of Work") ─────── */}
      <section
        id="project-categories"
        className="bg-white py-16 md:py-24 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Project Categories"
            subtitle="The areas of work our projects are grouped under. Each one is described in full on our Solutions page."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectCategories.map((category, index) => {
              const Icon = CATEGORY_ICONS[category.icon];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: d ?? 0.5, delay: (d ?? 0.5) * index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.5)]"
                >
                  <div className="text-primary mb-4">
                    <Icon className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600">{category.scope}</p>

                  <Link
                    href={category.solutionHref}
                    aria-label={`Read about ${category.solutionTitle} on our Solutions page`}
                    className="group mt-5 inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    See the full solution
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERSHIPS WE ARE SEEKING (was "Key Partnerships") ──
          PRE-OPERATIONAL REFRAME (Priority 3). The brief asked for
          "Key Partnerships" to become a target map rather than a list
          of existing relationships.

          ORIGINAL SUBTITLE: "We work with government institutions,
          development partners, financial institutions, and
          private-sector clients to structure, finance, and deliver
          circular economy projects." — "We work with" was a flat
          statement that relationships exist. None do. Replaced with an
          explicit statement that we are seeking them.

          The `id="partnerships"` anchor is UNCHANGED so any inbound link
          to it still resolves. Per the brief, no partner names, logos
          or marks have been added. */}
      <section id="partnerships" className="bg-[#f6faf7]/70 py-16 md:py-24 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Partners We Are Seeking"
            subtitle="We have no partners in place yet. These are the relationships we are actively looking to build — the organisations we need alongside us to structure, finance and deliver circular economy projects in Malawi."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {partnerships.map((partner, index) => {
              const Icon = PARTNERSHIP_ICONS[partner.icon];
              return (
                <motion.div
                  key={partner.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: d ?? 0.5, delay: (d ?? 0.5) * index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {partner.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{partner.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLACEHOLDER PARTNER LOGO STRIP ──
          Reuses <PartnerLogos />, which already draws a bordered box
          per empty slot. No partner name or logo has been invented. */}
      <PartnerLogos
        partners={projectPartnerSlots}
        label="Partner and funder logos"
        note="Placeholder slots — partner names and logos to be added once approved for public use."
      />

      {/* ── 6. CTA (unchanged dark bookend) ──────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Build a Circular Future Together
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for strategic partners, investors, and community
            organizations to join our mission.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </>
  );
}
