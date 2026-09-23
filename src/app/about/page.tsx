"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import {
  Leaf,
  Recycle,
  Users,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AboutPage() {
  const [expandedValue, setExpandedValue] = useState<string | null>(null);

  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description:
        "We design solutions built to generate long-term environmental, social, and economic value, not short-term fixes.",
      fullStory:
        "We design solutions built to generate long-term environmental, social, and economic value, rather than short-term fixes. Every project is assessed on its ability to reduce pollution and greenhouse gas emissions, recover value from waste streams, and create dignified livelihoods for communities across Malawi and the wider region.",
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Circularity",
      description:
        "We design every project to close resource loops, keeping materials, energy, and value in productive use for as long as possible.",
      fullStory:
        "We design every project to close resource loops, keeping materials, energy, and value in productive use for as long as possible. By recovering inputs and returning them to productive use, we reduce the demand for virgin resources and keep value circulating within local economies.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Empowerment",
      description:
        "We treat communities as central partners in delivery, not passive beneficiaries, of environmental and economic transformation.",
      fullStory:
        "We treat communities as central partners in delivery, not passive beneficiaries, of environmental and economic transformation. Our aggregator and distribution networks create income opportunities for youth groups, women-led enterprises, informal waste collectors, and community-based entrepreneurs.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description:
        "We apply practical, scalable technologies and financing structures suited to Malawi's operating environment.",
      fullStory:
        "We apply practical, scalable technologies and financing structures suited to Malawi's operating environment. We prioritise solutions that are appropriate, affordable, and capable of being replicated across urban centres and adapted to different funding instruments.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Integrity",
      description:
        "We operate with transparency, accountability, and professionalism in every engagement and partnership.",
      fullStory:
        "We operate with transparency, accountability, and professionalism in every engagement and partnership. We are committed to ethical conduct, clear reporting, and responsible stewardship of the resources and relationships entrusted to us.",
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Inclusion",
      description:
        "We prioritise women, youth, and underserved communities in the design of our livelihood and participation models.",
      fullStory:
        "We prioritise women, youth, and underserved communities in the design of our livelihood and participation models. Inclusive design strengthens outcomes, broadens ownership, and ensures that the benefits of circular economy solutions reach those who need them most.",
    },
  ];

  const toggleExpanded = (title: string) => {
    setExpandedValue(expandedValue === title ? null : title);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About Go Green Resources Limited"
            subtitle="Building circular economy solutions for a cleaner, more resource-efficient Malawi."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 mb-4 text-justify">
                Go Green Resources Limited is a Malawian environmental enterprise
                based in Lilongwe that develops practical circular economy
                solutions. We treat environmental sustainability and economic
                opportunity as complementary outcomes of well-designed systems.
              </p>
              <p className="text-gray-700 mb-4 text-justify">
                Rather than treating waste simply as something to dispose of, we
                treat waste as a resource that can be recovered and converted into
                economic and environmental value.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                What We Do
              </h2>
              <p className="text-gray-700 mb-4 text-justify">
                We recover waste and underused resources and transform them into
                clean energy, recovered materials, sustainable products, and
                economic opportunity. Our work operates across three
                interconnected areas: clean energy and resource recovery,
                materials recycling and circular supply chains, and inclusive
                green livelihoods.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                How We Work
              </h2>
              <p className="text-gray-700 mb-4 text-justify">
                We use a circular model:
              </p>
              <p className="text-gray-700 mb-4 text-justify font-semibold text-primary">
                Recover → Convert → Distribute → Reinvest
              </p>
              <p className="text-gray-700 mb-4 text-justify">
                Recovered inputs are processed into clean energy, recycled
                materials, or value-added products, delivered to households and
                institutions, with revenue and impact reinvested into recovery
                capacity, community livelihoods, and environmental restoration.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Who We Serve
              </h2>
              <p className="text-gray-700 text-justify">
                Our programmes can work with communities, households,
                institutions, businesses, government, development partners,
                financial institutions, and private-sector clients.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 text-justify">
                    To design and deliver commercially sustainable circular
                    economy solutions that reduce pollution and greenhouse gas
                    emissions, recover value from waste streams, and create
                    dignified livelihoods for communities across Malawi and the
                    wider region.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 text-justify">
                    To be Malawi&apos;s leading circular economy enterprise,
                    transforming waste and underused resources into clean energy,
                    sustainable products, and inclusive economic opportunity.
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Leaf className="h-5 w-5" />
                    <span>Head Office: Lilongwe, Republic of Malawi, Central Africa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide our operations and decision-making."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all cursor-pointer"
                onClick={() => toggleExpanded(value.title)}
              >
                <div className="text-primary flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm">{value.description}</p>
                <div className="mt-4 flex justify-center text-primary">
                  {expandedValue === value.title ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
                {expandedValue === value.title && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                    <p className="text-gray-700 text-sm">{value.fullStory}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-800 to-blue-900 text-white p-8 md:p-12 rounded-lg">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">
                Reduce. Recover. Reinvest.
              </h2>
              <p className="text-green-100 text-lg mb-6">
                Our design philosophy is simple: reduce what is wasted, recover
                what has value, and reinvest that value into people and
                communities. We work alongside communities, businesses,
                development partners, and government institutions to build
                circular economy solutions across Lilongwe and Malawi.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors inline-block"
                >
                  Partner With Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
