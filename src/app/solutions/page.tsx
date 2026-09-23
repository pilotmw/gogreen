import SectionHeading from "@/components/SectionHeading";
import {
  Leaf,
  Recycle,
  Sprout,
  Users,
  ShieldCheck,
  Flame,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Solutions"
            subtitle="Practical circular economy solutions across clean energy, materials recovery, community livelihoods, and environmental services."
            centered={false}
            subtitleClass="text-white/90"
          />
        </div>
      </section>

      <section id="clean-energy" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Clean Energy &amp; Waste-to-Energy Solutions
                </h2>
              </div>
              <p className="text-gray-700 mb-4 text-justify">
                Go Green Resources Limited develops clean energy solutions that
                convert organic and biomass waste into usable fuel and supports
                adoption of cleaner cooking and energy technologies as
                alternatives to charcoal and firewood.
              </p>
              <p className="text-gray-700 mb-4 text-justify">
                This includes community-linked biogas systems using anaerobic
                digestion to convert food waste, agricultural residues, and
                animal waste into clean cooking fuel. The company also supports
                access to clean cooking appliances and fuels through models
                suited to target markets, including cylinder exchange,
                institutional distribution, and bulk-user distribution.
              </p>
              <p className="text-gray-700 text-justify">
                The remaining organic material is recovered as bio-slurry, an
                organic fertiliser that returns nutrients to the soil and further
                closes the resource loop.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Key Benefits
              </h3>
              <div className="space-y-5">
                {[
                  "Reduced dependence on charcoal and firewood",
                  "Lower household and institutional greenhouse gas emissions",
                  "Affordable, reliable clean energy access",
                  "Reduced deforestation and indoor air pollution",
                  "Recovery of bio-slurry as organic fertiliser",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="text-primary mt-1 flex-shrink-0">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="materials-recovery" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Key Benefits
                </h3>
                <div className="space-y-5">
                  {[
                    "Reduction in urban waste pollution",
                    "Diversion of recyclable materials from dumpsites and drainage systems",
                    "Reduced energy intensity compared with primary material production",
                    "Strengthened local circular supply chains",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="text-primary mt-1 flex-shrink-0">
                        <Recycle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Recycle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Materials Recovery &amp; Recycling
                </h2>
              </div>
              <p className="text-gray-700 mb-4 text-justify">
                Go Green Resources Limited builds structured recovery and
                recycling networks for recyclable materials, beginning with
                aluminium used beverage cans and extendable to other recoverable
                waste streams.
              </p>
              <p className="text-gray-700 mb-4 text-justify">
                The company works with community-based aggregators, retailers,
                institutions, and commercial facilities to recover materials that
                would otherwise pollute urban environments and waterways.
                Recovered materials are sorted, processed, and channelled into
                regional recycling and industrial value chains.
              </p>
              <p className="text-gray-700 text-justify">
                By connecting communities to regional recycling markets, the
                programme demonstrates that environmental sustainability and
                economic development can work hand in hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="organic-waste" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Organic Waste Valorisation
                </h2>
              </div>
              <p className="text-gray-700 mb-4 text-justify">
                Go Green Resources Limited is developing organic waste
                valorisation activities including composting and black soldier
                fly farming. These activities convert biodegradable waste into
                soil inputs and protein for animal feed.
              </p>
              <p className="text-gray-700 mb-4 text-justify">
                They extend the company&apos;s circular model into agriculture and food
                systems while creating additional revenue streams and
                environmental benefits, turning organic waste streams into
                productive outputs.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Key Benefits
              </h3>
              <div className="space-y-5">
                {[
                  "Converts biodegradable waste into useful products",
                  "Produces soil inputs that support agriculture",
                  "Generates protein for animal feed",
                  "Creates additional revenue streams",
                  "Reduces organic waste pollution",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="text-primary mt-1 flex-shrink-0">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="livelihoods" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Key Benefits
                </h3>
                <div className="space-y-5">
                  {[
                    "Income for youth groups and women-led enterprises",
                    "Opportunities for informal waste collectors",
                    "Support for community-based entrepreneurs",
                    "Local ownership and participation",
                    "Dignified and inclusive green livelihoods",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="text-primary mt-1 flex-shrink-0">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Community Livelihoods &amp; Green Jobs
                </h2>
              </div>
              <p className="text-gray-700 mb-4 text-justify">
                Economic empowerment is embedded into Go Green Resources
                programmes rather than being treated as a separate activity.
                Aggregator and distribution networks create income opportunities
                for youth groups, women-led enterprises, informal waste
                collectors, and community-based entrepreneurs.
              </p>
              <p className="text-gray-700 text-justify">
                These participants can earn income through collection, processing,
                and distribution. Communities are active participants and economic
                partners, not merely beneficiaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="advisory" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Advisory, Carbon &amp; Environmental Services
                </h2>
              </div>
              <p className="text-gray-700 mb-4 text-justify">
                Go Green Resources Limited supports partners in structuring,
                financing, and delivering environmental and circular economy
                projects. Services include environmental consultancy, carbon
                credit project development, technical support, implementation
                support, waste infrastructure support, and clean energy programme
                support.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Our Services
              </h3>
              <div className="space-y-5">
                {[
                  "Environmental consultancy",
                  "Carbon credit project development",
                  "Technical support",
                  "Implementation support",
                  "Waste infrastructure support",
                  "Clean energy programme support",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="text-primary mt-1 flex-shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Circular Solutions?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Partner with us to bring clean energy, recycling, and environmental
            services to your community or organization.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
