"use client";

import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import ImpactAreas from "@/components/ImpactAreas";
import { Globe2, CheckCircle2 } from "lucide-react";

const frameworks = [
  "Malawi National Energy Policy",
  "Malawi Nationally Determined Contributions (NDCs)",
  "National Solid Waste Management Strategy",
  "United Nations Sustainable Development Goals (SDGs)",
  "Regional circular economy frameworks",
  "International climate finance frameworks",
];

const sdgs = [
  { number: "7", title: "Affordable and Clean Energy", color: "bg-yellow-500" },
  { number: "8", title: "Decent Work and Economic Growth", color: "bg-red-500" },
  { number: "11", title: "Sustainable Cities and Communities", color: "bg-green-500" },
  { number: "12", title: "Responsible Consumption and Production", color: "bg-blue-500" },
  { number: "13", title: "Climate Action", color: "bg-orange-500" },
];

export default function ImpactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Impact"
            subtitle="Creating environmental and economic value through circular economy solutions across Malawi."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Where We Create Impact"
            subtitle="Our work delivers outcomes across these interconnected areas of environmental and economic value."
          />
          <div className="mt-12">
            <ImpactAreas />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Globe2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  National &amp; Global Sustainability Alignment
                </h2>
              </div>
              <p className="text-gray-700 mb-6 text-justify">
                Go Green Resources Limited structures its operations to align with
                national and international sustainability frameworks, ensuring
                that local action contributes to Malawi&apos;s development priorities
                and global climate commitments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <ul className="space-y-4">
                {frameworks.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Sustainable Development Goals"
            subtitle="Our work contributes to multiple UN Sustainable Development Goals."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
            {sdgs.map((goal, idx) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center h-full"
              >
                <div
                  className={`w-16 h-16 ${goal.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3`}
                >
                  {goal.number}
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {goal.title}
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
            Partner with us to deliver measurable environmental and economic
            impact across Malawi and the wider region.
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
