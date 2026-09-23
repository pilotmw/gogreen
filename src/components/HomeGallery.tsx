"use client";

import SectionHeading from "@/components/SectionHeading";
import { Recycle, Sun, Users, Car } from "lucide-react";

const galleryCards = [
  {
    title: "Resource Recovery",
    description:
      "Recovering materials and organic resources for productive reuse.",
    icon: Recycle,
    gradient: "from-emerald-500 via-green-600 to-teal-700",
  },
  {
    title: "Clean Energy",
    description:
      "Practical renewable-energy solutions for communities and businesses.",
    icon: Sun,
    gradient: "from-amber-300 via-orange-400 to-emerald-600",
  },
  {
    title: "Circular Communities",
    description:
      "Creating green economic opportunities across local value chains.",
    icon: Users,
    gradient: "from-green-600 via-emerald-700 to-teal-900",
  },
  {
    title: "Sustainable Mobility",
    description: "Exploring clean-energy mobility and EV infrastructure.",
    icon: Car,
    gradient: "from-teal-400 via-teal-600 to-emerald-700",
  },
];

export default function HomeGallery() {
  return (
    <section className="py-16 bg-white/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Work in Action"
          subtitle="A glimpse into the practical work behind GoGreen's circular economy, clean energy and community-focused solutions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {galleryCards.map((card) => (
            <article
              key={card.title}
              className="group rounded-2xl overflow-hidden bg-white/90 ring-1 ring-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                aria-hidden="true"
                className={`relative h-44 overflow-hidden bg-gradient-to-br ${card.gradient}`}
              >
                <div className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/10" />
                <div className="absolute -right-2 -top-4 h-24 w-24 rounded-full bg-white/15" />
                <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-black/10" />
                <div className="absolute left-6 top-6 h-11 w-11 rounded-full border border-white/30" />
                <div className="absolute left-8 top-8 h-5 w-5 rounded-full border border-white/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <card.icon
                    className="h-24 w-24 text-white/95 drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}