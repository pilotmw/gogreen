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

interface ImpactArea {
  title: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  span: string;
}

const impactAreas: ImpactArea[] = [
  {
    title: "Clean Energy",
    headline: "Powering a cleaner, more sustainable Malawi.",
    description:
      "We develop and promote clean, affordable energy solutions that reduce dependence on fossil fuels and unreliable traditional energy sources. Our approach includes renewable energy, solar power, biogas, energy-efficient technologies, and sustainable mobility solutions that help households and businesses access cleaner energy while reducing emissions.",
    icon: Sun,
    featured: true,
    span: "lg:col-span-7",
  },
  {
    title: "Waste Recovery",
    headline: "Turning waste into valuable resources.",
    description:
      "We turn waste into valuable resources through collection, sorting, recycling, reuse, composting, and energy recovery. Instead of allowing waste to end up in landfills, waterways, and open spaces, we create systems that recover materials and convert organic waste into useful products such as compost, biogas, and other forms of energy.",
    icon: Recycle,
    span: "lg:col-span-5",
  },
  {
    title: "Green Jobs",
    headline: "Creating livelihoods through the green economy.",
    description:
      "We create opportunities for meaningful employment and entrepreneurship within Malawi's growing green economy. From waste collection and recycling to renewable energy installation, maintenance, manufacturing, and distribution, our work supports skills development, local businesses, and sustainable livelihoods—particularly for young people and communities.",
    icon: BriefcaseBusiness,
    span: "lg:col-span-5",
  },
  {
    title: "Circular Supply Chains",
    headline: "Keeping resources in use and value within our communities.",
    description:
      "We help build supply chains where materials are kept in productive use for as long as possible. By connecting waste producers, collectors, recyclers, manufacturers, farmers, businesses, and consumers, we enable resources to move back into the economy instead of becoming waste. This reduces resource consumption, lowers costs, and strengthens local industries.",
    icon: Network,
    featured: true,
    span: "lg:col-span-7",
  },
  {
    title: "Community Empowerment",
    headline: "Building skills, opportunities, and sustainable communities.",
    description:
      "We believe sustainable development starts with empowered communities. We work with households, businesses, institutions, and local communities to promote environmental awareness, practical skills, clean technologies, and income-generating opportunities. By involving communities directly, we help create solutions that are locally relevant, inclusive, and sustainable.",
    icon: HeartHandshake,
    span: "lg:col-span-6",
  },
  {
    title: "Environmental Protection",
    headline: "Protecting our environment for generations to come.",
    description:
      "Our solutions are designed to protect Malawi's land, water, air, and natural ecosystems. By reducing pollution, improving waste management, promoting renewable energy, and encouraging responsible resource use, we contribute to healthier communities and a cleaner environment while supporting long-term climate resilience.",
    icon: Leaf,
    span: "lg:col-span-6",
  },
];

export default function ImpactAreas() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
      {impactAreas.map((area, idx) => (
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