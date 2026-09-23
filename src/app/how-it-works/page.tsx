"use client";

import SectionHeading from "@/components/SectionHeading";
import StepCard from "@/components/StepCard";
import { Recycle, Coins, Banknote, Layers, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
  const stages = [
    {
      step: 1,
      title: "Recover",
      description:
        "Organic waste, recyclable materials, and underused resources are collected through structured aggregator and community networks.",
      icon: "leaf" as const,
    },
    {
      step: 2,
      title: "Convert",
      description:
        "Recovered inputs are processed into clean energy, recycled materials, or value-added products using appropriate, scalable technology.",
      icon: "recycle" as const,
    },
    {
      step: 3,
      title: "Distribute",
      description:
        "Outputs are delivered to households, institutions, and commercial or industrial buyers through cost-effective last-mile channels.",
      icon: "leaf" as const,
    },
    {
      step: 4,
      title: "Reinvest",
      description:
        "Revenue and impact are channelled back into expanding recovery capacity, community livelihoods, and environmental restoration.",
      icon: "recycle" as const,
    },
  ];

  const financing = [
    {
      icon: <Coins className="h-8 w-8 text-primary" />,
      title: "Grant-Funded Programmes",
      desc: "Initial capital and technical support to establish recovery and conversion infrastructure.",
    },
    {
      icon: <Banknote className="h-8 w-8 text-primary" />,
      title: "Commercial Financing",
      desc: "Revenue-backed structures that move operations toward financial sustainability.",
    },
    {
      icon: <Layers className="h-8 w-8 text-primary" />,
      title: "Blended Finance",
      desc: "Combining concessional and commercial capital to de-risk circular economy investments.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Results-Based Arrangements",
      desc: "Funding linked to verified environmental and social outcomes.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Our circular economy model: Recover → Convert → Distribute → Reinvest."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-green-100 rounded-lg">
              <Recycle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              The Circular Economy Model
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {stages.map((stage, index) => (
              <StepCard key={stage.step} {...stage} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Adaptable by Design"
            subtitle="The model is modular and can be adapted to different financing structures."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {financing.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
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
            Partner with us to design and deliver circular economy solutions
            across Malawi and the wider SADC region.
          </p>
          <a
            href="/contact"
            className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            Partner With Us
          </a>
        </div>
      </section>
    </>
  );
}
