"use client";

import { motion } from "framer-motion";

/* PLACEHOLDER DATES — no confirmed publication dates yet. Replace the
   `date` values (and `dateTime`) with real ones before launch.

   PRE-OPERATIONAL REFRAME (this brief, Priority 6). This array is not
   a news feed: nothing has been published, begun or delivered, so the
   section heading and intro were changed too — "The latest news and
   initiatives from across our circular economy" implied a programme of
   activity that does not exist.

   ORIGINAL WORDING, for client review of the status change:
     "Ongoing"  -> "In development"   (an ongoing initiative is
                     claimed; this pilot is only being planned)
     "Open"     -> "Seeking partners" ("Open" implied an established
                     programme accepting engagement; no such programme
                     exists, and we are not yet partnered)
     "Our Focus" is UNCHANGED — it is a positioning label, not a status
     claim, and it is accurate for a founding-stage company. */

const newsItems = [
  {
    title: "Building a Circular Economy in Malawi",
    status: "Our Focus",
    date: "March 2025",
    dateTime: "2025-03",
    // ORIGINAL: "Go Green Resources Limited recovers waste and underused
    // resources and converts them into clean energy, recovered
    // materials, and sustainable livelihoods." -> reframed: nothing has
    // been recovered or converted yet.
    excerpt:
      "Go Green Resources Limited is building a circular economy model for Malawi, designed to convert waste and underused resources into clean energy, recovered materials and sustainable livelihoods.",
  },
  {
    title: "Community Collection Networks",
    status: "In development",
    date: "June 2025",
    dateTime: "2025-06",
    // ORIGINAL: "Our aggregator and community networks recover organic
    // waste and recyclable materials while creating local income
    // opportunities." -> reframed: the networks do not exist yet.
    excerpt:
      "We are designing aggregator and community collection networks intended to recover organic waste and recyclable materials while creating local income opportunities.",
  },
  {
    title: "Partnerships for Sustainable Impact",
    status: "Seeking partners",
    date: "September 2025",
    dateTime: "2025-09",
    // ORIGINAL: "We work with government institutions, development
    // partners, financial institutions, and private-sector clients to
    // deliver circular economy solutions." -> reframed: we work with
    // NOBODY yet, so "we work with" was the most misleading line on the
    // site. This is the one item where claiming an existing network was
    // flatly untrue rather than merely premature.
    excerpt:
      "We are seeking relationships with government institutions, development partners, financial institutions and private-sector clients to build circular economy solutions with us. We have no partners in place yet.",
  },
];

export default function HomeNews() {
  return (
    <section className="py-20 md:py-24 bg-white/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            News
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-gray-900">
            What we are{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              building towards
            </span>
            .
          </h2>
          {/* ORIGINAL: "The latest news and initiatives from across our
              circular economy, clean energy and community programmes."
              Implied an existing programme of work. */}
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Where our focus is settling as we form the company, plan our
            first pilots, and start conversations with partners and funders.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-primary/10 bg-[#fbfdfb]/85 p-5 shadow-[0_24px_55px_-40px_rgba(20,83,45,0.4)] sm:p-8 md:mt-16 md:p-10">
          <ol className="divide-y divide-primary/10">
            {newsItems.map((item, idx) => (
              <li key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  className="grid gap-3 px-2 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6 sm:px-3 md:grid-cols-[9.5rem_1fr] md:py-8"
                >
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                    <span
                      aria-hidden="true"
                      className="text-2xl font-black tabular-nums tracking-tight text-primary/25"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                      {item.status}
                    </span>
                    <time
                      dateTime={item.dateTime}
                      className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gray-500"
                    >
                      {item.date}
                    </time>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-gray-900 md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-[0.95rem] leading-[1.75] text-gray-600">
                      {item.excerpt}
                    </p>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}