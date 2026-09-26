/* ────────────────────────────────────────────��──────────────────
   CIRCULAR MODEL FLOW

   The step diagram, extracted verbatim from the homepage's "Our
   Response" section so the same component renders the model on more
   than one page. Layout and behaviour are unchanged from the approved
   homepage treatment:

     - a semantic <ol>, so the five steps are announced in order
     - each <li> holds its card AND the arrow that follows it, so the
       last card simply has no arrow and the list stays valid
     - a single row of five equal-width cards from 820px up; one
       column below that, with each arrow rotated 90° to point down
     - optional "Returns to Recover" loop note, since the flow is
       circular and step 05 feeds step 01

   Step names, order, count, icons and copy all come from
   src/data/circularModel.ts — this component holds no content of its
   own, only the presentation.

   `level` selects the description tier ("phrase" for the homepage's
   compact cards, "detail" for How It Works). The card layout is the
   same; the fullest tier simply has a longer sentence in it.
   ─────────────────────────────────────────────────────────────── */

"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useRef } from "react";

import {
  circularModelSteps,
  stepDescription,
  type CircularModelLevel,
} from "@/data/circularModel";

interface CircularModelFlowProps {
  /** Which description tier to render. Default "phrase". */
  level?: CircularModelLevel;
  /** Show the "Returns to Recover" note under the flow. */
  showLoopNote?: boolean;
  /** Extra classes on the wrapping <ol>. */
  className?: string;
  /** Delay the first card's entrance animation, in seconds. */
  delay?: number;
}

export default function CircularModelFlow({
  level = "phrase",
  showLoopNote = false,
  className,
  delay = 0,
}: CircularModelFlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.2 });

  return (
    <>
      <ol
        ref={listRef}
        className={
          [
            "flex flex-col items-stretch md:mt-16 min-[820px]:flex-row min-[820px]:items-stretch",
            className,
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        {circularModelSteps.map((step, i) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: d ?? 0.55,
              delay: d ?? delay + i * 0.08,
              ease: "easeOut",
            }}
            className="flex min-w-0 flex-col items-stretch min-[820px]:flex-row min-[820px]:flex-1 min-[820px]:basis-0"
          >
            <article className="flex w-full min-w-0 flex-col rounded-xl border border-primary/10 bg-white p-4 shadow-[0_18px_45px_-38px_rgba(20,83,45,0.45)] min-[820px]:p-5">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <step.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              <h3 className="mt-3.5 text-[0.78rem] font-bold uppercase leading-snug tracking-[0.14em] text-primary-dark">
                {step.number} · {step.name}
              </h3>
              <p className="mt-1.5 text-[0.9rem] leading-snug text-gray-600">
                {stepDescription(step, level)}
              </p>
            </article>

            {i < circularModelSteps.length - 1 && (
              <span
                aria-hidden="true"
                className="my-2 flex h-7 w-7 shrink-0 rotate-90 items-center justify-center self-center text-primary min-[820px]:my-0 min-[820px]:rotate-0"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </span>
            )}
          </motion.li>
        ))}
      </ol>

      {showLoopNote && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: d ?? 0.5, delay: d ?? 0.5, ease: "easeOut" }}
          className="mt-7 flex items-center justify-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/70"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Returns to Recover
        </motion.p>
      )}
    </>
  );
}
