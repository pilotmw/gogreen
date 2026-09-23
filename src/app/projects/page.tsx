"use client";

import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import {
  Leaf,
  Recycle,
  Sprout,
  Users,
  ShieldCheck,
  Cloud,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function ProjectsPage() {
  const workAreas = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Community-Linked Biogas Systems",
      desc: "Anaerobic digestion of organic and biomass waste to produce clean cooking fuel for households and institutions.",
    },
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: "Materials Recovery & Recycling",
      desc: "Structured collection and processing of recyclable materials, beginning with aluminium used beverage cans.",
    },
    {
      icon: <Sprout className="h-8 w-8 text-primary" />,
      title: "Organic Waste Valorisation",
      desc: "Composting and black soldier fly farming that convert biodegradable waste into soil inputs and animal feed.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Green Livelihoods",
      desc: "Aggregator and distribution networks that create income for youth groups, women-led enterprises, and community collectors.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Environmental Consultancy",
      desc: "Advisory and technical support for structuring and delivering circular economy and environmental projects.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Carbon Project Development",
      desc: "Development of carbon credit projects that capture environmental value and attract climate finance.",
    },
  ];

  const partnerships = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Markets and Farms",
      desc: "Markets, farms, food processing businesses, and agricultural producers supply organic feedstock for our clean energy and valorisation activities, improving their waste management while reducing environmental footprint.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Collectors",
      desc: "Local youth, women, waste collectors, and community-based organizations are at the heart of our recovery networks, creating sustainable income while keeping materials in circulation.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Regional Recycling Partners",
      desc: "Trusted regional recycling companies process our recovered materials into new products, connecting Malawi's efforts to the wider circular economy.",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Environmental NGOs and Development Partners",
      desc: "Environmental organizations, NGOs, research institutions, and development agencies provide technical expertise, capacity building, and strategic support.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Work"
            subtitle="Our practical areas of work across the circular economy."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-900/60 via-green-800/60 to-blue-900/60 p-8 md:p-12 rounded-lg mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary rounded-lg">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                An Integrated Circular Model
              </h2>
            </div>
            <p className="text-white/90 text-lg mb-6">
              Go Green Resources Limited recovers waste and underused resources
              and transforms them into clean energy, recovered materials,
              sustainable products, and economic opportunity. Our work spans
              energy access, waste management, climate finance, and community
              development.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                Lilongwe-Based
              </span>
              <span className="bg-green-700 text-green-100 px-4 py-2 rounded-full text-sm font-semibold">
                Community-Driven
              </span>
              <span className="bg-blue-800 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold">
                Regionally Ambitious
              </span>
            </div>
          </div>

          <SectionHeading
            title="Areas of Work"
            subtitle="Current and developing focus areas across our circular economy model."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="text-primary mb-4">{area.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {area.title}
                </h3>
                <p className="text-white/90 text-sm">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-4">Key Partnerships</h2>
          <p className="text-white text-lg mb-8 max-w-3xl text-justify">
            We work with government institutions, development partners, financial
            institutions, and private-sector clients to structure, finance, and
            deliver circular economy projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-primary">{partner.icon}</div>
                  <h3 className="text-lg font-bold text-white">
                    {partner.title}
                  </h3>
                </div>
                <p className="text-white/90 text-sm text-justify">
                  {partner.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Build a Circular Future Together
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for strategic partners, investors, and community
            organizations to join our mission.
          </p>
          <a
            href="/contact"
            className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            Become a Partner
          </a>
        </div>
      </section>
    </>
  );
}
