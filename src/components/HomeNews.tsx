"use client";

import { motion } from "framer-motion";

const newsItems = [
  {
    title: "Building a Circular Economy in Malawi",
    status: "Our Focus",
    excerpt:
      "Go Green Resources Limited recovers waste and underused resources and converts them into clean energy, recovered materials, and sustainable livelihoods.",
  },
  {
    title: "Community Collection Networks",
    status: "Ongoing",
    excerpt:
      "Our aggregator and community networks recover organic waste and recyclable materials while creating local income opportunities.",
  },
  {
    title: "Partnerships for Sustainable Impact",
    status: "Open",
    excerpt:
      "We work with government institutions, development partners, financial institutions, and private-sector clients to deliver circular economy solutions.",
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
            Stay up to date with{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Go Green Resources Limited
            </span>
            .
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            The latest news and initiatives from across our circular economy,
            clean energy and community programmes.
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
                  className="grid gap-3 px-2 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6 sm:px-3 md:grid-cols-[8rem_1fr] md:py-8"
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