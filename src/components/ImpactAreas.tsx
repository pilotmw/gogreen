"use client";

import { motion } from "framer-motion";
import {
  Sun,
  Recycle,
  BriefcaseBusiness,
  Network,
  HeartHandshake,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export interface ImpactMetric {
  /** Verbatim figure, e.g. "1,240 tonnes". Rendered as "—" when empty. */
  value: string;
  /** What the figure measures, e.g. "diverted from dumpsites in 2025". */
  label: string;
  /** Renders a visible PLACEHOLDER METRIC flag. True while `value` is
      empty. See src/data/impactContent.ts — no verified figures exist. */
  isPlaceholder?: boolean;
}

export interface ImpactArea {
  title: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  span: string;
  /** Optional per-card metric line, rendered above the headline. Only the
      /impact page supplies these — the homepage passes no data and its
      cards are unchanged. */
  metric?: ImpactMetric;
}

/* NOTE: descriptions were trimmed ~25% per redesign spec now that the Stats Bar
   carries the headline numbers. These cards explain mechanism, not impact
   claims. TRIMMED DRAFT COPY — confirm final wording with client. */
const impactAreas: ImpactArea[] = [
  {
    title: "Clean Energy",
    headline: "Powering a cleaner, more sustainable Malawi.",
    description:
      // PRE-OPERATIONAL REFRAME (Priority 2, homepage copy). All six
      // descriptions below claimed present-tense delivery. Each is now
      // planned/design intent, with the original quoted. The technology
      // and actor lists are UNCHANGED in every case — the brief requires
      // that technical depth be preserved and only the tense move.
      //
      // NOTE: this array is the HOMEPAGE source. src/data/impactContent.ts
      // holds the /impact page's own trimmed variants, reframed
      // separately. The two are deliberately NOT re-synchronised — the
      // 20-30% length difference between them is the de-duplication
      // Phase 0.3 established, and both now say the same thing at
      // different lengths.
      //
      // ORIGINAL: "We DEVELOP AND PROMOTE … that REDUCE dependence…"
      // → "are building and promoting … designed to reduce".
      "We are building and promoting clean, affordable energy solutions — renewable energy, solar power, biogas and energy-efficient technologies — designed to reduce dependence on fossil fuels and unreliable traditional sources.",
    icon: Sun,
    featured: true,
    span: "lg:col-span-7",
  },
  {
    title: "Waste Recovery",
    headline: "Turning waste into valuable resources.",
    description:
      // ORIGINAL: "We CREATE collection, sorting, recycling, reuse and composting systems SO WASTE IS RECOVERED rather than landfilled…"
      // → "are designing … intended to keep waste out of": no system
      // exists and nothing has been recovered. All five system types and
      // the three disposal routes are UNCHANGED.
      "We are designing collection, sorting, recycling, reuse and composting systems intended to keep waste out of landfill, waterways and open space.",
    icon: Recycle,
    span: "lg:col-span-5",
  },
  {
    title: "Green Jobs",
    headline: "Creating livelihoods through the green economy.",
    description:
      // ORIGINAL: "…we BACK skills development and local businesses — particularly for young people."
      // → "plan to back": we back nobody yet. The six value-chain stages
      // and the youth focus are UNCHANGED.
      "Across collection, recycling, installation, maintenance, manufacturing and distribution, we plan to back skills development and local businesses — particularly for young people.",
    icon: BriefcaseBusiness,
    span: "lg:col-span-5",
  },
  {
    title: "Circular Supply Chains",
    headline: "Keeping resources in use and value within our communities.",
    description:
      // ORIGINAL: "We CONNECT waste producers, collectors, recyclers, manufacturers, farmers, businesses and consumers SO MATERIALS MOVE BACK into the economy…"
      // → "plan to connect": none of these links exist. All seven actor
      // types UNCHANGED.
      "We plan to connect waste producers, collectors, recyclers, manufacturers, farmers, businesses and consumers so materials move back into the economy instead of becoming waste.",
    icon: Network,
    featured: true,
    span: "lg:col-span-7",
  },
  {
    title: "Community Empowerment",
    headline: "Building skills, opportunities, and sustainable communities.",
    description:
      // ORIGINAL: "We WORK DIRECTLY WITH households, businesses, institutions and communities…"
      // → "plan to work directly with": this claimed an existing community
      // engagement programme. All four audiences and four topics UNCHANGED.
      "We plan to work directly with households, businesses, institutions and communities on environmental awareness, practical skills, clean technologies and income-generating opportunities.",
    icon: HeartHandshake,
    span: "lg:col-span-6",
  },
  {
    title: "Environmental Protection",
    headline: "Protecting our environment for generations to come.",
    description:
      // ORIGINAL: "…we SUPPORT healthier communities and long-term climate resilience."
      // → "intend to support": no pollution has been reduced. The four
      // intervention areas UNCHANGED.
      "By reducing pollution, improving waste management, promoting renewable energy and encouraging responsible resource use, we intend to support healthier communities and long-term climate resilience.",
    icon: Leaf,
    span: "lg:col-span-6",
  },
];

interface ImpactAreasProps {
  /** Overrides the built-in cards. The homepage passes nothing and keeps
      the mechanism-only wording; /impact passes its own set, where each
      card carries a metric and a shorter description. */
  areas?: ImpactArea[];
}

export default function ImpactAreas({ areas = impactAreas }: ImpactAreasProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
      {areas.map((area, idx) => (
        <motion.article
          key={area.title}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: (idx % 3) * 0.08,
            ease: "easeOut",
          }}
          className={[
            "group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 md:rounded-3xl",
            "shadow-[0_18px_45px_-35px_rgba(20,83,45,0.4)]",
            "transition-[transform,box-shadow] duration-300",
            "hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.5)]",
            area.span,
            area.featured
              ? "bg-[linear-gradient(145deg,#ffffff_0%,#f1f9f3_55%,#e8f5ec_100%)]"
              : "bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]",
          ].join(" ")}
        >
          {/* decorative environmental shapes */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.13),transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.28),transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute right-10 top-10 h-16 w-16 rounded-full border border-primary/10 transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {area.featured ? (
            <div className="relative grid gap-6 p-7 md:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-10">
              <div className="flex flex-col">
                <Header icon={area.icon} number={`0${idx + 1}`} />
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-gray-900 md:text-xl">
                  {area.title}
                </h3>
                <Metric metric={area.metric} />
                <p className="mt-2 text-lg font-bold leading-snug text-gray-900 md:text-xl">
                  {area.headline}
                </p>
              </div>
              <div className="flex flex-col lg:pt-2">
                <span
                  aria-hidden="true"
                  className="hidden h-px w-12 bg-gradient-to-r from-primary/40 to-transparent lg:block"
                />
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-gray-600 lg:mt-4">
                  {area.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-1 flex-col p-7 md:p-8">
              <Header icon={area.icon} number={`0${idx + 1}`} />
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-gray-900 md:text-xl">
                {area.title}
              </h3>
              <Metric metric={area.metric} />
              <p className="mt-2 text-lg font-bold leading-snug text-gray-900">
                {area.headline}
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-gray-600">
                {area.description}
              </p>
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}

function Metric({ metric }: { metric?: ImpactMetric }) {
  if (!metric) return null;
  /* An empty value means the figure has not been supplied, so the flag
     is derived rather than trusted — it clears itself automatically once
     a real number is added. */
  const isPlaceholder = metric.isPlaceholder ?? !metric.value.trim();

  return (
    <div className="mt-4 rounded-xl border border-primary/15 bg-white/70 p-3.5">
      <p className="text-2xl font-black leading-none tabular-nums tracking-tight text-primary md:text-[1.7rem]">
        {metric.value.trim() || "—"}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
        {metric.label}
      </p>
      {isPlaceholder && (
        <p className="mt-2.5 inline-block rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-amber-700">
          Placeholder metric
        </p>
      )}
    </div>
  );
}

function Header({ icon: Icon, number }: { icon: LucideIcon; number: string }) {
  return (
    <div className="flex items-start justify-between">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-emerald-100 text-primary [box-shadow:inset_0_1px_0_rgba(255,255,255,0.7)]"
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <span
        aria-hidden="true"
        className="text-xs font-bold tabular-nums tracking-[0.28em] text-primary/50"
      >
        {number}
      </span>
    </div>
  );
}