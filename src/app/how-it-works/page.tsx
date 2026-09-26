/* ────────────────────────────────────────────��──────────────────
   HOW IT WORKS — SIMPLIFICATION SUMMARY (for client review)

   THE SITE-WIDE INCONSISTENCY, FIXED
   This page described a FOUR-step model (Recover → Convert →
   Distribute → Reinvest). The homepage and About page both described
   a FIVE-step model. "Create Value" was missing here, so a visitor
   comparing pages saw two different business models. The hero
   subtitle below was the visible symptom; the model section made it
   worse. All three pages now read the model from
   src/data/circularModel.ts, so the names, order, count and copy
   cannot drift apart again. The hero subtitle is now generated from
   that data rather than typed out.

   The `detail` copy for Recover, Convert, Distribute and Reinvest is
   the ORIGINAL How It Works text, kept word for word — it was already
   the most operational version on the site, so it became the source
   instead of being rewritten. Only Create Value is newly written, in
   the same register.

   THE MODEL DIAGRAM
   The plain 2×2 grid of <StepCard /> boxes is replaced by
   <CircularModelFlow /> — the same component the homepage's "Our
   Response" section uses, showing the same approved design: five
   cards joined by four arrow connectors, one row from 820px up and a
   single column with downward arrows below that. Rendered here with
   the fullest "detail" copy tier. StepCard was used nowhere else and
   has been deleted rather than left as dead code.

   WORKED EXAMPLE (new)
   A concrete trace of one organic-waste stream through all five
   steps, so the abstract model can be seen doing something. Each
   example row is keyed to the canonical step, so the example cannot
   fall out of order with the model above it. ⚠ IT IS LABELLED
   ILLUSTRATIVE ON SCREEN AND IN THE CODE: it is a constructed walk-
   through of how the model works, not a GoGreen case study, and it
   deliberately contains no names, locations, dates, quantities,
   percentages or outcomes. Do not present it as delivered work.

   FINANCING STATUSES (new)
   Each structure now carries a status badge, so a visitor can tell at
   a glance whether an instrument is live or merely available. ⚠ NO
   STATUS HAS BEEN CONFIRMED BY THE CLIENT, so all four are `null` and
   render a flagged "Status to be confirmed" badge. The two values the
   badge is designed for are "Currently active" and "Available
   structure" — set the `status` field once confirmed. Do not mark one
   active without written confirmation.

   CROSS-LINKS (new)
   The model section now links to /solutions and /projects, and the
   closing band links to all three, so the page is a route into the
   rest of the site rather than a dead end.

   ACCESSIBILITY FIX
   The page had no <h1> at all — the hero title was an <h2>, so
   heading levels skipped h1 entirely on a page of its own. The hero
   now passes titleLevel="h1".

   STYLING
   Body sections move from flat bg-gray-50 / rounded-lg to the pale
   green washes, rounded-2xl/3xl cards and soft green shadows used
   across the rest of the site, so this page stops looking like a
   different website. The existing green→blue hero gradient is kept.
   ─────────────────────────────────────────────────────────────── */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Coins,
  Flag,
  Layers,
  Lightbulb,
  Recycle,
  Target,
} from "lucide-react";

import CircularModelFlow from "@/components/CircularModelFlow";
import SectionHeading from "@/components/SectionHeading";
import {
  circularModelNames,
  circularModelNamesSentence,
  circularModelSteps,
} from "@/data/circularModel";

/* ── FINANCING STRUCTURES ───────────────────────────────────────
   `status` is null everywhere: the client has not confirmed which
   instruments are live. Confirm and set per item, using the two values
   the badge is built for: "Currently active" | "Available structure". */
type FinancingStatus = "Currently active" | "Available structure";

const financing: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  status: FinancingStatus | null;
}[] = [
  {
    icon: <Coins className="h-7 w-7 text-primary" />,
    title: "Grant-Funded Programmes",
    desc: "Initial capital and technical support to establish recovery and conversion infrastructure.",
    status: null,
  },
  {
    icon: <Banknote className="h-7 w-7 text-primary" />,
    title: "Commercial Financing",
    desc: "Revenue-backed structures that move operations toward financial sustainability.",
    status: null,
  },
  {
    icon: <Layers className="h-7 w-7 text-primary" />,
    title: "Blended Finance",
    desc: "Combining concessional and commercial capital to de-risk circular economy investments.",
    status: null,
  },
  {
    icon: <Target className="h-7 w-7 text-primary" />,
    title: "Results-Based Arrangements",
    desc: "Funding linked to verified environmental and social outcomes.",
    status: null,
  },
];

/* Renders either the confirmed status, or the flagged placeholder. */
function StatusBadge({ status }: { status: FinancingStatus | null }) {
  if (!status) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-amber-800">
        <Flag className="h-3 w-3" aria-hidden="true" />
        Status to be confirmed
      </span>
    );
  }

  return (
    <span
      className={
        status === "Currently active"
          ? "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary-dark"
          : "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary"
      }
    >
      {status}
    </span>
  );
}

/* ── WORKED EXAMPLE ─────────────────────────────────────────────
   ⚠ ILLUSTRATIVE ONLY. A constructed trace of how the five steps work
   together on one organic-waste stream. No figures, names, places or
   results are asserted, and none of it describes delivered work.
   Keyed to the canonical steps so order cannot drift. */
const workedExample: {
  stepId: string;
  whatHappens: string;
}[] = [
  {
    stepId: "recover",
    whatHappens:
      "Market traders and food vendors sort organic waste into shared collection bins. An aggregator collects the bins on a scheduled round and takes the material to a local aggregation point.",
  },
  {
    stepId: "convert",
    whatHappens:
      "At the site the material is cleaned and processed into usable cooking energy and organic compost, using technology scaled to what the site can actually run and maintain.",
  },
  {
    stepId: "distribute",
    whatHappens:
      "The cooking energy reaches households and small food businesses through low-cost last-mile delivery; the compost is sold or supplied to nearby growers.",
  },
  {
    stepId: "create-value",
    whatHappens:
      "Households get an affordable alternative to firewood, growers get an input they would otherwise buy, and paid collection work exists locally. These benefits are recorded so they can be counted, not just claimed.",
  },
  {
    stepId: "reinvest",
    whatHappens:
      "Sales revenue and recorded impact fund the next collection round, the aggregator's paid work, site upkeep, and restoration of land degraded by earlier dumping.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            /* The subtitle used to say "Recover → Convert → Distribute
               → Reinvest" — four steps, omitting Create Value. Built
               from the shared data now, so it always matches. */
            subtitle={`Our circular economy model: ${circularModelNames}.`}
            centered={false}
            titleLevel="h1"
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      {/* ── THE MODEL ────────────────────────────────── */}
      <section
        id="the-model"
        className="relative overflow-hidden bg-[#f6faf7] py-20 md:py-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.4),transparent_70%)]" />
          <div className="absolute bottom-[-12rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.10),transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
              >
                <Recycle className="h-6 w-6" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                The Circular Economy Model
              </p>
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Five steps. One closed loop.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              {circularModelNamesSentence}. The last step feeds the first, so
              the loop gets stronger each time round rather than running down.
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <CircularModelFlow level="detail" showLoopNote />
          </div>

          {/* route onward from the model */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/25 transition-[background-position,box-shadow] duration-300 hover:from-primary-light hover:to-primary hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore Our Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:border-primary/60 hover:bg-[#f0f9f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              See Projects In Practice
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WORKED EXAMPLE ───────────────────────────── */}
      <section id="worked-example" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Worked Example
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              One organic-waste stream, end to end.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              The same five steps, applied to a single waste stream so the loop
              is concrete rather than abstract.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
              <Flag className="h-3.5 w-3.5" aria-hidden="true" />
              Illustrative example — not a GoGreen case study
            </span>
          </div>

          <ol className="mt-10 flex flex-col gap-5">
            {workedExample.map((row, i) => {
              const step = circularModelSteps.find((s) => s.id === row.stepId);
              if (!step) return null;
              return (
                <motion.li
                  key={row.stepId}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="grid gap-4 rounded-2xl border border-primary/10 bg-[#f6faf7]/70 p-6 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:p-7"
                >
                  <div className="flex items-start gap-3 sm:flex-col sm:items-start sm:gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    >
                      <step.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary/60">
                        Step {step.number}
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight text-gray-900">
                        {step.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[0.95rem] leading-[1.75] text-gray-700">
                    {row.whatHappens}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <p className="mt-8 text-center text-sm text-gray-500">
            Each row is the same five steps as the diagram above — the example
            changes only the material being tracked.
          </p>
        </div>
      </section>

      {/* ── FINANCING ────────────────────────────────── */}
      <section
        id="financing"
        className="border-y border-primary/10 bg-[#f6faf7] py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Adaptable by Design"
            subtitle="The same five steps can be funded through more than one structure. Each badge below shows whether that instrument is live or simply available — statuses are pending client confirmation."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {financing.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-[0_20px_45px_-38px_rgba(20,83,45,0.4)]"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
                <div className="mt-5">
                  <StatusBadge status={item.status} />
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Structure shown is not a commitment: the applicable mix is agreed
            per project.
          </p>
        </div>
      </section>

      {/* ── CLOSING BAND ─────────────────────────────── */}
      <section className="bg-gradient-to-r from-green-800 to-blue-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight md:text-4xl">
            Let&apos;s Build a Circular Future Together
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-green-100">
            Partner with us to design and deliver circular economy solutions
            across Malawi and the wider SADC region.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Partner With Us
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Our Solutions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Our Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
            Recover, convert, distribute, create value, reinvest
          </p>
        </div>
      </section>
    </>
  );
}
