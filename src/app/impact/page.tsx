"use client";

/* ───────────────────────────────────────────────────────────────
   IMPACT PAGE — WHAT CHANGED (client review)

   1. NEW METRICS SECTION, DIRECTLY BELOW THE TITLE. Rendered by the
      existing <StatsBar /> (reused, not duplicated). Six metrics, all
      PLACEHOLDERS rendering "—", plus a reporting-period line that is
      also blank. No figure has been invented.

      NOTABLE FOR THE CLIENT: the homepage's `homeStats`
      ("1,200+ tonnes", "3,500+ households", "180+ green jobs",
      "900+ tCO2e" in src/data/homeContent.ts) are ALREADY MARKED AS
      PLACEHOLDER in that file's own comment block. They have not been
      copied here on purpose — on the page that exists to report impact,
      an unverified figure beside a reporting period reads as a verified
      claim. Those four homepage numbers still need real values, and
      once they exist they are the obvious first candidates for this
      page's metrics.

   2. THE SIX IMPACT CARDS NO LONGER MATCH THE HOMEPAGE. The cards
      still come from the shared <ImpactAreas />, but this page passes
      its own data (see src/data/impactContent.ts) so each card carries
      a placeholder metric line and a description trimmed ~25%. The
      homepage calls <ImpactAreas /> with no data and is unchanged.

   3. SDGs ARE NOW VISUAL TILES in the official UN colours, via
      <SdgTiles />. Four of the five old colour classes were wrong.
      Icons are generic lucide symbols, NOT the UN's copyrighted SDG
      artwork.

   4. EVERY FRAMEWORK NOW HAS AN ALIGNMENT SENTENCE, except the two
      that name no specific framework ("Regional circular economy
      frameworks", "International climate finance frameworks"). Those
      two are marked with a visible "detail to be confirmed" flag
      rather than deleted, so the decision is the client's — if they
      cannot name the specific frameworks, the two items should go.

   5. NO DOWNLOADABLE IMPACT REPORT LINK. No such document exists in
      the repo and none is confirmed as planned, and the brief says not
      to fabricate a file. Add one via `impactReport` in
      src/data/impactContent.ts when a real PDF is supplied.

   6. ONE SUPPORTING VISUAL added (a labelled placeholder block) to
      break up the text-only layout. The dark hero, light body and dark
      closing CTA are all preserved.
   ─────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";
import { CheckCircle2, CircleHelp, Globe2, ImageOff } from "lucide-react";

import ImpactAreas from "@/components/ImpactAreas";
import SdgTiles from "@/components/SdgTiles";
import SectionHeading from "@/components/SectionHeading";
import StatsBar from "@/components/StatsBar";
import {
  frameworks,
  impactAreas,
  impactImage,
  impactMetrics,
  impactReport,
  reportingPeriod,
  sdgs,
} from "@/data/impactContent";

export default function ImpactPage() {
  return (
    <>
      {/* ── 1. HERO — now carries the page's <h1> ───────────────────
          PRE-OPERATIONAL REFRAME (Priority 4). Page heading retitled
          "Our Impact" → "Our Impact Goals" and the subtitle reframed
          from "Creating environmental and economic value through
          circular economy solutions across Malawi" (an achieved
          outcome) to intended impact.

          PER THE BRIEF'S OWN INSTRUCTION, THE NAV LABEL IS UNCHANGED —
          the Navbar still reads "Impact". Only the page heading moved.
          Renaming the nav item is a client decision because it affects
          main site navigation; the alternatives are listed in the
          handover notes for their choice. */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            titleLevel="h1"
            title="Our Impact Goals"
            subtitle="What our model is designed to achieve for the environment and the economy across Malawi. These are the goals we are building towards, not results we have delivered."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      {/* ── 2. METRICS ──────────────────────────────────────────────
          Every value is an empty string, so all six render "-" and no
          figure is ever shown. That discipline predates this brief and
          is retained.

          PRE-OPERATIONAL REFRAME (Priority 4): the block label and note
          now state explicitly that these are the measures we INTEND to
          report, not results. The old label "Our impact in numbers"
          implied the numbers existed. The illustrative-target option
          the brief permits was NOT taken — same reasoning as the
          homepage stats bar: a figure rendered large next to a
          reporting-period label reads as a result, however it is
          labelled. */}
      <StatsBar
        stats={impactMetrics}
        label="What we intend to measure"
        columns={3}
        note={
          reportingPeriod
            ? `Reporting period: ${reportingPeriod}.`
            : "TARGETS, NOT RESULTS — Go Green Resources Limited is in its founding phase and has not yet begun operations. These are the measures we intend to report once our first pilots have run and the data is verified. No figure has been estimated or invented."
        }
      />

      {/* ── 3. IMPACT AREAS (de-duplicated from the homepage) ─────── */}
      <section id="impact-areas" className="py-16 bg-white md:py-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Where We Aim To Create Impact"
            subtitle="Our work delivers outcomes across these interconnected areas of environmental and economic value."
          />
          <div className="mt-12">
            <ImpactAreas areas={impactAreas} />
          </div>
        </div>
      </section>

      {/* ── 4. SUPPORTING VISUAL (new) ──
          PLACEHOLDER IMAGE — no photography of operations or
          beneficiaries exists in the repo. Replace with next/image. */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            role="img"
            aria-label={`Placeholder image: ${impactImage.alt}`}
            className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-primary/30 bg-[#f6faf7]/70 p-6 text-center"
          >
            <ImageOff className="h-9 w-9 text-primary/60" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Placeholder image
            </p>
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              [ PLACEHOLDER: {impactImage.placeholderNote} ]
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. SUSTAINABILITY ALIGNMENT (now explained) ───────────── */}
      <section className="py-16 bg-gray-50 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Globe2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  National &amp; Global Sustainability Alignment
                </h2>
              </div>
              <p className="text-gray-700 text-justify">
                Go Green Resources Limited structures its operations to align with
                national and international sustainability frameworks, ensuring
                that local action contributes to Malawi&apos;s development priorities
                and global climate commitments.
              </p>
            </div>

            <ul className="space-y-5">
              {frameworks.map((framework) => (
                <li
                  key={framework.name}
                  className="rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)]"
                >
                  <div className="flex items-start gap-3">
                    {framework.needsConfirmation ? (
                      <CircleHelp
                        className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckCircle2
                        className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <h3 className="text-base font-bold leading-snug text-gray-900">
                        {framework.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        {framework.alignment}
                      </p>
                      {framework.needsConfirmation && (
                        <p className="mt-3 inline-block rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-amber-700">
                          Alignment detail to be confirmed
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder notice for the two flagged frameworks. */}
          <p className="mt-10 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <span className="font-bold uppercase tracking-[0.14em]">
              For client review
            </span>{" "}
            — the two flagged items above do not name a specific framework,
            publication or instrument, so the alignment described could not be
            substantiated. Please confirm the exact frameworks intended, or
            confirm these items should be removed from the page.
          </p>
        </div>
      </section>

      {/* ── 6. SDGs (now visual tiles in official colours) ─────────── */}
      <section id="sdgs" className="py-16 bg-white md:py-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Sustainable Development Goals"
            subtitle={`Our work contributes to ${sdgs.length} of the UN Sustainable Development Goals.`}
          />
          <SdgTiles />
        </div>
      </section>

      {/* ── 7. IMPACT REPORT (optional, intentionally absent) ──
          Nothing renders unless a real PDF is supplied via
          `impactReport` — no link to a file that does not exist. */}
      {impactReport.href && (
        <section className="bg-white pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.a
              href={impactReport.href}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {impactReport.label ?? "Download Full Impact Report"}
              {impactReport.sizeNote && (
                <span className="text-sm font-normal opacity-80">
                  {impactReport.sizeNote}
                </span>
              )}
            </motion.a>
          </div>
        </section>
      )}

      {/* ── 8. CTA (unchanged) ────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Build a Circular Future Together
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Partner with us to deliver measurable environmental and economic
            impact across Malawi and the wider region.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Partner With Us
          </a>
        </div>
      </section>
    </>
  );
}
