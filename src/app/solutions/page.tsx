/* ───────────────────────────────────────────────────────────────
   SOLUTIONS PAGE — WHAT WAS FIXED / ADDED (client review)

   1. KEY BENEFITS ORDERING BUG — FIXED. The five solutions were
      hand-coded here, and the two sections that placed their benefits
      column first (Materials Recovery, Community Livelihoods) used
      `order-2 lg:order-1`, so those lists rendered BEFORE their own
      heading — directly after the previous section's benefits, which
      read as an off-by-one. All copy now lives in
      src/data/solutionsContent.ts, one entry per solution, and every
      section renders from a single <SolutionBlock /> in a fixed
      reading order: icon → heading → intro → Key Benefits → CTA.
      Materials Recovery and Community Livelihoods did have benefits;
      they were only in the wrong position, and have been re-attached
      to their own sections rather than rewritten. No claim was
      invented. Advisory's list is a list of SERVICES, so it keeps an
      honest "Key Services" label with the same visual treatment.

   2. STANDARDISED TEMPLATE. One reusable component
      (src/components/SolutionBlock.tsx) now renders all five
      solutions, replacing the previous mix of benefits panel, services
      panel and no panel at all.

   3. IN-PAGE NAVIGATION ADDED. A sticky pill sub-nav jumps to all
      five solutions. Anchor IDs are unchanged, so all existing inbound
      links still resolve — /solutions#clean-energy,
      /solutions#materials-recovery, /solutions#organic-waste,
      /solutions#livelihoods (Navbar dropdown + homepage cards) and
      /solutions#advisory. On narrow screens it becomes a horizontal
      scrollable strip.

   4. PLACEHOLDERS FLAGGED. No client photography and no verified
      figures exist, so all five sections render a labelled dashed
      placeholder box and a "—" placeholder stat. Both are marked
      PLACEHOLDER in the markup. See src/data/solutionsContent.ts for
      exactly what to supply.

   5. UNCHANGED: the page intro (now correctly marked up as the
      page's <h1>) and the bottom "Ready to Build Circular Solutions?"
      CTA, which remains the main closing CTA for the page.
   ─────────────────────────────────────────────────────────────── */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import SolutionBlock from "@/components/SolutionBlock";
import { solutionNav, solutions } from "@/data/solutionsContent";

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Solutions"
            titleLevel="h1"
            subtitle="Practical circular economy solutions across clean energy, materials recovery, community livelihoods, and environmental services."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      {/* ── IN-PAGE SUB-NAV ──────────────────────────────
          Sticky directly below the fixed Navbar (~4.5rem). Plain <a>
          anchors are used so they work without JavaScript; the global
          `scroll-behavior: smooth` in globals.css animates the jump. */}
      <nav
        aria-label="Solutions on this page"
        className="sticky top-[4.5rem] z-30 border-b border-gray-100 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
            {solutionNav.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-label={`Jump to ${item.label}`}
                  className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.shortLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {solutions.map((solution, i) => (
        <SolutionBlock
          key={solution.id}
          id={solution.id}
          icon={solution.icon}
          title={solution.title}
          description={solution.description}
          benefits={solution.benefits}
          benefitsLabel={solution.benefitsLabel}
          image={solution.image}
          stat={solution.stat}
          ctaLabel={solution.ctaLabel}
          ctaHref={solution.ctaHref}
          /* Media alternates left/right, as on the original page.
             Only the media column is reordered — the reading order of
             heading, intro, benefits and CTA is identical every time. */
          flip={i % 2 === 1}
          tone={i % 2 === 0 ? "white" : "tint"}
        />
      ))}

      <section className="py-16 bg-gradient-to-r from-green-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Circular Solutions?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Partner with us to bring clean energy, recycling, and environmental
            services to your community or organization.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
