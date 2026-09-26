/* ───────────────────────────────────────────────────────────────
   ABOUT PAGE — WHAT CHANGED (client review)

   1. CIRCULAR MODEL CORRECTED TO 5 STEPS (critical). This page
      described the model as "One system. Four moves." — Recover →
      Convert → Distribute → Reinvest — which contradicted the
      homepage's 5-step flow. "Create Value" is now step 04, in the
      same position and with the same name as the homepage
      (Recover → Convert → Distribute → Create Value → Reinvest), and
      the heading and intro line were updated to say "Five moves".
      Audited the whole codebase: the only other instance of the model
      is the homepage "Our Response" flow in
      src/components/ResponseSection.tsx, which already uses these
      five names in this order. No other page describes the loop, so
      the site is now consistent. (The About page's separate closing
      brand line "Reduce. Recover. Reinvest." is a slogan, not a
      process description, and was left alone — flag if it should go.)

   2. "OUR VALUES" REWORDED TO REMOVE HOMEPAGE OVERLAP. About's values
      are now framed as internal operating principles (how we behave);
      the homepage's "Why Go Green Resources" keeps the external
      differentiators (why a partner should choose us). Four values
      were near-duplicates and were reworded — see the FLAGS block
      below, which needs a client decision.

   3. NEW: FOUNDING STORY TIMELINE. Year founded plus milestones,
      using the same numbered 01/02/03 marker style as the Circular
      Model. All dates and milestones are PLACEHOLDERS.

   4. NEW: COMPANY INFO / LEGAL STRIP. The "Who We Are" info row now
      also carries legal entity name, registration number and year of
      incorporation. The registration number and incorporation year are
      marked placeholders and have NOT been invented.

   5. NEW: SUPPORTING PHOTO placeholder between Mission & Vision and
      Who We Serve, to break up the text/headshot layout. Marked as a
      placeholder — no suitable photography was available.

   6. Team bios and optional profile links live in
      src/components/LeadershipSection.tsx (placeholder bios).

   FLAGS FOR CLIENT REVIEW — VALUES vs HOMEPAGE DIFFERENTIATORS
   - "Community Empowerment" (here) was a near-duplicate of the
     homepage's "Community-Centred" — both claimed local ownership,
     participation and income generation. Reworded here to be about
     sharing decision-making, which is an internal practice rather
     than an external claim. RECOMMENDATION: keep the homepage's
     "Community-Centred" as the external differentiator and let this
     value carry only the "how we work with communities" point. If the
     client wants a tighter page, drop one of the two.
   - "Innovation" here was close to the homepage's "Scalable &
     Adaptable" (both implied scalability). Reworded to be about
     testing at small scale and what we reject, rather than
     replicability.
   - "Sustainability" here overlapped the homepage's "Commercially
     Grounded" in tone (both about long-term viability). Reworded to
     the trade-off principle — improving environment and economics
     together rather than one at the expense of the other.
   - "Circularity" and the homepage's "Integrated Model" were related
     but distinguishable; only lightly tightened.
   ─────────────────────────────────────────────────────────────── */

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
  Coins,
  Flag,
  ImageOff,
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
    /* NEW — step 04. Added to match the homepage's 5-step model. */
    icon: Coins,
    title: "Create Value",
    description:
      "Environmental, social and economic value is generated across the chain, and captured so it can be measured and reinvested.",
  },
  {
    icon: RefreshCw,
    title: "Reinvest",
    description:
      "Economic and environmental value supports continued recovery, capability and circular growth.",
  },
];

/* ── FOUNDING STORY ───────────────────────────────────────────
   ⚠ PLACEHOLDER DATES AND MILESTONES. No founding history has been
   supplied by the client, so the years are written as "20XX" and
   each entry says what belongs there. Replace before launch — do
   not publish as-is. */
const milestones = [
  {
    year: "20XX",
    title: "Company founded",
    description:
      "PLACEHOLDER — confirm the founding year and how the company was established.",
  },
  {
    year: "20XX",
    title: "First field project",
    description:
      "PLACEHOLDER — confirm the first operating project: location, partner and year.",
  },
  {
    year: "20XX",
    title: "First anchor partnership",
    description:
      "PLACEHOLDER — confirm the first significant funder, buyer or delivery partner, and the year.",
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

/* ── OUR VALUES ────────────────────────────────────────────────
   Reframed as INTERNAL OPERATING PRINCIPLES — how the company
   behaves day to day. The homepage's "Why Go Green Resources" keeps
   the external differentiators (why a partner or investor should
   choose us). Wording was tightened only where the two lists were
   near-duplicates; see the FLAGS block at the top of this file. */
const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We improve the environment and the economics in the same intervention, rather than trading one against the other.",
  },
  {
    icon: Recycle,
    title: "Circularity",
    description:
      "We design out the idea of disposal, treating every waste stream as a resource still in productive use.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "Communities are delivery partners, not recipients — we agree roles and decisions up front and are held to the commitments we set together.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We test small before scaling and drop what does not hold up in the field; new technology has to earn its place on cost and reliability.",
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
      "We design livelihood and participation models so women, youth and underserved communities can take part on equal terms.",
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

                {/* ── LEGAL / REGISTRATION DETAIL ──
                    Added for credibility. The registered name is taken
                    from existing site copy; the registration number and
                    incorporation year have NOT been invented and are
                    shown as placeholders. */}
                <div className="!mt-6 border-t border-primary/10 pt-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    Legal Entity
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    Go Green Resources Limited
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    Registration Number
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2 text-gray-700">
                    <span>—</span>
                    <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-amber-700">
                      Placeholder
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                    Year of Incorporation
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2 text-gray-700">
                    <span>—</span>
                    <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-amber-700">
                      Placeholder
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="mt-4 pl-5 text-xs leading-relaxed text-gray-500">
                Registration number and year of incorporation to be confirmed by
                the client.
              </p>
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

      {/* ── 3. FOUNDING STORY ────────────────────────────
          New. Numbered 01/02/03 markers reuse the Circular Model's
          styling so the page keeps one visual language. Every date
          and milestone below is a PLACEHOLDER. */}
      <section className="bg-[#f6faf7]/70 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Our Story
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              How we got here.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              From a founding idea to a working collection, conversion and
              livelihoods network.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
            {milestones.map((milestone, i) => (
              <li
                key={milestone.title}
                className="relative flex flex-col rounded-3xl border border-primary/10 bg-white/85 p-7 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-emerald-100 text-primary ring-1 ring-primary/20">
                    <Flag className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-2xl font-black tabular-nums tracking-tight text-primary/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {milestone.year}
                </p>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-gray-900">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.7] text-gray-600">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. THE CIRCULAR MODEL ───────────────────────── */}
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
              One system. Five moves.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
              Recover, convert, distribute, create value, reinvest — the loop
              that keeps value in productive use and grows the system over time.
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

      {/* ── 5. MISSION & VISION ─────────────────────────── */}
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

      {/* ── 6. SUPPORTING PHOTO ───────────────────────────
          New. A non-headshot image to break up the text/leadership
          layout. PLACEHOLDER — no suitable photography of the office,
          a field visit or the team at work was available, so this is
          a labelled empty frame. Replace the <div> with a next/image
          when the client supplies a photo. (Hero_2.jpg exists on the
          site but is the homepage hero image, so it was not reused
          here.) */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="img"
            aria-label="Placeholder image: the Go Green Resources team at work on site in Malawi. Awaiting client photography."
            className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-primary/30 bg-[#f6faf7]/70 p-6 text-center"
          >
            <ImageOff className="h-9 w-9 text-primary/60" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Placeholder image
            </p>
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              [ PLACEHOLDER: team at work / field visit / office photograph — to
              be supplied by the client ]
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. WHO WE SERVE ─────────────────────────────── */}
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

      {/* ── 8. CORE VALUES ──────────────────────────────── */}
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

      {/* ── 9. LEADERSHIP ───────────────────────────────── */}
      <LeadershipSection />

      {/* ── 10. CLOSING BRAND STATEMENT ──────────────────── */}
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

      {/* ── 11. FINAL CTA ────────────────────────────────── */}
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