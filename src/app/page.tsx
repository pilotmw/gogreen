import Hero from "@/components/Hero";
import ChallengesSection from "@/components/ChallengesSection";
import ResponseSection from "@/components/ResponseSection";
import SolutionsSection from "@/components/SolutionsSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import HomeNews from "@/components/HomeNews";
import HomeGallery from "@/components/HomeGallery";
import ImpactAreas from "@/components/ImpactAreas";
import {
  RefreshCw,
  Users,
  TrendingUp,
  Network,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import bground from "../../bground.webp";

export default function Home() {
  const whyCards: {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: "light" | "dark";
  }[] = [
    {
      icon: RefreshCw,
      title: "Integrated Model",
      description:
        "Clean energy, materials recovery, and community livelihoods are combined into one mutually reinforcing circular economy system.",
      tone: "light",
    },
    {
      icon: Users,
      title: "Community-Centred",
      description:
        "Local ownership, participation, and income generation are designed into every programme we deliver.",
      tone: "dark",
    },
    {
      icon: TrendingUp,
      title: "Commercially Grounded",
      description:
        "Programmes are structured to move toward financial sustainability through revenue from energy, recycling, and environmental services.",
      tone: "dark",
    },
    {
      icon: Network,
      title: "Scalable & Adaptable",
      description:
        "Systems are modular and can be replicated across urban centres in Malawi and the wider region under different financing instruments.",
      tone: "light",
    },
  ];

  return (
    <div className="relative isolate">
      {/* ONE shared homepage environmental background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${bground.src}")` }}
      />
<Hero
  title="GoGreen Resources Limited"
  subtitle="Building Circular Economy Solutions for a Cleaner, More Resource-Efficient Malawi"
  primaryCTA={{ label: "Explore Our Solutions", href: "/solutions" }}
  secondaryCTA={{ label: "Partner With Us", href: "/contact" }}
/>

      <ChallengesSection />

      <ResponseSection />

      <ThreePillarsSection />

      <SolutionsSection />

      <section className="py-20 md:py-24 bg-[#f6faf7]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Our Impact
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-gray-900">
              Creating environmental and economic value across Malawi through
              circular economy solutions.
            </h2>
          </div>
          <div className="mt-12 md:mt-16">
            <ImpactAreas />
          </div>
        </div>
      </section>

      <HomeNews />

      <section className="relative overflow-hidden bg-[#f2f8f3]/65 py-20 md:py-28">
        {/* green environmental backdrop — CSS only */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.5),transparent_70%)] blur-2xl" />
          <div className="absolute bottom-[-12rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.15),transparent_70%)] blur-2xl" />
          <div className="absolute bottom-[16%] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.42),transparent_70%)] blur-2xl" />
          <div className="absolute right-[5%] top-[16%] h-44 w-44 rounded-full border border-primary/10" />
          <div className="absolute bottom-[24%] left-[3%] h-24 w-24 rounded-full border border-primary/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Why Go Green Resources?
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-gray-900">
              An integrated, community-centred, and commercially grounded
              approach to the{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                circular economy
              </span>
              .
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {whyCards.map((card) => {
              const dark = card.tone === "dark";
              return (
                <article
                  key={card.title}
                  className={[
                    "group relative flex flex-col overflow-hidden rounded-3xl p-8 md:p-9",
                    "transition-[transform,box-shadow] duration-300 hover:-translate-y-1",
                    dark
                      ? "border border-emerald-300/20 bg-gradient-to-br from-emerald-800 via-emerald-900 to-green-950 text-white shadow-[0_24px_50px_-35px_rgba(6,78,59,0.7)] hover:shadow-[0_34px_70px_-35px_rgba(6,78,59,0.8)]"
                      : "border border-primary/15 bg-white/75 text-gray-900 shadow-[0_20px_45px_-35px_rgba(20,83,45,0.4)] backdrop-blur-sm hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.5)]",
                  ].join(" ")}
                >
                  {/* decorative shapes */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    <div
                      className={
                        dark
                          ? "absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(110,231,183,0.14),transparent_70%)]"
                          : "absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12),transparent_70%)]"
                      }
                    />
                    <div
                      className={
                        dark
                          ? "absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(110,231,183,0.08),transparent_70%)]"
                          : "absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.3),transparent_70%)]"
                      }
                    />
                    <div
                      className={
                        dark
                          ? "absolute right-12 top-12 h-14 w-14 rounded-full border border-emerald-200/20"
                          : "absolute right-12 top-12 h-14 w-14 rounded-full border border-primary/10"
                      }
                    />
                  </div>

                  {/* icon circle */}
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className={[
                        "flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105",
                        dark
                          ? "bg-gradient-to-br from-emerald-400/25 to-emerald-300/10 text-emerald-300 ring-1 ring-emerald-200/30 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)]"
                          : "bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20 shadow-[0_10px_24px_-14px_rgba(20,83,45,0.6)]",
                      ].join(" ")}
                    >
                      <card.icon className="h-8 w-8" strokeWidth={1.6} />
                    </div>
                  </div>

                  {/* divider */}
                  <span
                    aria-hidden="true"
                    className={[
                      "mt-6 h-px w-14",
                      dark
                        ? "bg-gradient-to-r from-emerald-300/70 to-transparent"
                        : "bg-gradient-to-r from-primary/60 to-transparent",
                    ].join(" ")}
                  />

                  <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-[1.7rem]">
                    {card.title}
                  </h3>
                  <p
                    className={[
                      "mt-4 text-[1.02rem] leading-[1.75] md:text-[1.05rem]",
                      dark ? "text-emerald-50/85" : "text-gray-600",
                    ].join(" ")}
                  >
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <HomeGallery />

      <section
        className="py-12 md:py-16"
        style={{
          background:
            "linear-gradient(to right, rgba(6,95,70,0.9), rgba(30,58,95,0.9))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Let&apos;s Build a Circular Future Together
          </h2>
          <p className="text-base sm:text-xl text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Whether you are a community member, investor, partner, or institution,
            there is a place for you in building a sustainable Malawi.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              href="/contact"
              className="bg-white text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-md font-semibold hover:bg-green-50 transition-colors text-sm md:text-base"
            >
              Partner With Us
            </Link>
            <Link
              href="/solutions"
              className="border-2 border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-md font-semibold hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
