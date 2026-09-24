import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  Leaf,
  Recycle,
  Users,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  Briefcase,
  Building2,
  Landmark,
  Handshake,
  TrendingUp,
  ArrowRight,
  Zap,
  Share2,
  RefreshCw,
} from "lucide-react";
import LeadershipSection from "@/components/LeadershipSection";

const stages = [
  {
    icon: Recycle,
    title: "Recover",
    description:
      "Waste and underused resources are collected and recovered rather than discarded.",
  },
  {
    icon: Zap,
    title: "Convert",
    description:
      "Recovered materials and resources are transformed into useful materials, products, energy or other value.",
  },
  {
    icon: Share2,
    title: "Distribute",
    description:
      "Value moves back into communities, households, businesses and productive systems.",
  },
  {
    icon: RefreshCw,
    title: "Reinvest",
    description:
      "Economic and environmental value supports continued recovery, capability and circular growth.",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Communities",
    description:
      "Local groups, households and community enterprises we work with directly.",
  },
  {
    icon: Briefcase,
    title: "Businesses",
    description:
      "Private-sector clients seeking circular supply and disposal solutions.",
  },
  {
    icon: Building2,
    title: "Institutions",
    description:
      "Schools, hospitals and public facilities that need waste and energy services.",
  },
  {
    icon: Landmark,
    title: "Government",
    description:
      "Local and national authorities working on waste and environmental policy.",
  },
  {
    icon: Handshake,
    title: "Development Partners",
    description:
      "Organisations supporting inclusive, sustainable development in Malawi.",
  },
  {
    icon: TrendingUp,
    title: "Investors & Finance",
    description:
      "Financial institutions and investors funding circular economy ventures.",
  },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We design solutions that create long-term environmental, social and economic value — not short-term fixes.",
  },
  {
    icon: Recycle,
    title: "Circularity",
    description:
      "We keep materials, energy and value in productive use for as long as possible, closing resource loops.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "Communities are partners in delivery, creating income for youth, women-led enterprises and informal collectors.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We apply practical, scalable technologies and financing suited to Malawi's operating environment.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We operate with transparency, accountability and professionalism in every engagement.",
  },
  {
    icon: HeartHandshake,
    title: "Inclusion",
    description:
      "We prioritise women, youth and underserved communities in our livelihood and participation models.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden md:min-h-[620px]">
        <Image
          src="/Hero_1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,95,70,0.82),rgba(30,58,95,0.88))]"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-light">
            About Go Green Resources
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            A Malawian enterprise building a circular economy for people and the
            environment.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-green-100 md:text-lg">
            Go Green Resources Limited is an environmental enterprise based in
            Lilongwe. We develop practical circular-economy solutions that turn
            waste and underused resources into clean energy, recovered
            materials and economic opportunity.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-7 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg md:text-base"
            >
              Partner With Us
            </Link>
            <Link
              href="/solutions"
              className="rounded-full border-2 border-white px-7 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 md:text-base"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. WHO WE ARE ───────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Who We Are
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl">
                An environmental enterprise with Malawi at its core.
              </h2>
              <dl className="mt-8 space-y-4 border-l-2 border-primary/20 pl-5">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    Head Office
                  </dt>
                  <dd className="mt-1 text-gray-700">Lilongwe, Malawi</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    Sector
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    Circular economy, clean energy, resource recovery
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    Model
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    A commercial enterprise combining environmental and economic
                    value
                  </dd>
                </div>
              </dl>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-gray-700 md:text-lg lg:col-span-7">
              <p>
                Go Green Resources Limited is a Malawian environmental
                enterprise based in Lilongwe. We develop practical
                circular-economy solutions for a cleaner, more
                resource-efficient Malawi.
              </p>
              <p>
                We treat waste and underused resources as value to be recovered
                — not simply something to dispose of. Every project we deliver
                is designed to convert that value into clean energy, recovered
                materials and sustainable livelihoods.
              </p>
              <p>
                We are a commercial enterprise, not a charity. Environmental
                sustainability and economic viability are designed into the same
                system, so the benefits we create can last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE CIRCULAR MODEL ───────────────────────── */}
      <section id="circular-model" className="relative overflow-hidden bg-[#f2f8f3]/65 py-20 md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.45),transparent_70%)] blur-2xl" />
          <div className="absolute bottom-[-10rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] blur-2xl" />
          <div className="absolute left-[3%] top-[22%] hidden h-40 w-40 rounded-full border border-primary/10 lg:block" />
          <div className="absolute bottom-[20%] right-[3%] hidden h-28 w-28 rounded-full border border-primary/10 lg:block" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              The Circular Model
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              One system. Four moves.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              Recover, convert, distribute, reinvest — the loop that keeps
              value in productive use and grows the system over time.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 md:mt-16 xl:flex-row xl:items-stretch xl:justify-center">
            {stages.map((stage, i) => (
              <Fragment key={stage.title}>
                <article className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white/85 p-7 shadow-[0_20px_45px_-35px_rgba(20,83,45,0.4)] backdrop-blur-sm xl:max-w-none xl:flex-1">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12),transparent_70%)]"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20">
                      <stage.icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <span className="text-2xl font-black tabular-nums tracking-tight text-primary/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-xl font-bold tracking-tight text-gray-900">
                    {stage.title}
                  </h3>
                  <p className="relative mt-2 text-[0.95rem] leading-[1.7] text-gray-600">
                    {stage.description}
                  </p>
                </article>
                {i < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center text-primary/40"
                  >
                    <ArrowRight className="h-7 w-7 rotate-90 xl:rotate-0" />
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MISSION & VISION ─────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Mission &amp; Vision
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Why we exist, and where we are headed.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            <article className="rounded-3xl border border-primary/10 bg-[#f6faf7]/70 p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Mission
              </p>
              <p className="mt-4 text-lg leading-[1.75] text-gray-700 md:text-xl">
                To design and deliver commercially sustainable circular economy
                solutions that reduce pollution and greenhouse gas emissions,
                recover value from waste streams, and create dignified
                livelihoods for communities across Malawi and the wider region.
              </p>
            </article>
            <article className="rounded-3xl border border-primary/10 bg-[#f6faf7]/70 p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Vision
              </p>
              <p className="mt-4 text-lg leading-[1.75] text-gray-700 md:text-xl">
                We aspire to be one of Malawi&apos;s leading circular economy
                enterprises — transforming waste and underused resources into
                clean energy, sustainable products and inclusive economic
                opportunity.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── 5. WHO WE SERVE ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f6faf7]/70 py-20 md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-1/4 h-[28rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.35),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Who We Serve
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Built to work across the whole economy.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-2xl border border-primary/10 bg-white/80 p-6 backdrop-blur-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-40px_rgba(20,83,45,0.5)]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20"
                >
                  <audience.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-gray-900">
                  {audience.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  {audience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CORE VALUES ──────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Our Values
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              The principles behind the work.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl border border-primary/10 bg-[#fbfdfb]/85 p-7 backdrop-blur-sm"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20"
                >
                  <value.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.7] text-gray-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. LEADERSHIP ───────────────────────────────── */}
      <LeadershipSection />

      {/* ── 8. CLOSING BRAND STATEMENT ──────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "linear-gradient(to right, rgba(6,95,70,0.92), rgba(30,58,95,0.92))",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Reduce. Recover. Reinvest.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-green-100 md:text-lg">
            Our design philosophy is simple: reduce what is wasted, recover what
            has value, and reinvest that value into people and communities.
          </p>
        </div>
      </section>

      {/* ── 9. FINAL CTA ────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Get Involved
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl">
            Let&apos;s build a circular future together.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Whether you are a community member, investor, partner or
            institution, there is a place for you in building a sustainable
            Malawi.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-7 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg md:text-base"
            >
              Partner With Us
            </Link>
            <Link
              href="/solutions"
              className="rounded-full border-2 border-primary bg-white/80 px-7 py-3.5 text-center text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/5 md:text-base"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}