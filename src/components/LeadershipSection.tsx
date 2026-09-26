/* ───────────────────────────────────────────────────────────────
   LEADERSHIP — WHAT WAS ADDED (client review)

   - Every card now carries a 1–2 sentence `bio` under the job title,
     set in the page's secondary text style. `bio` is optional in the
     type, so cards without one still render.
   - Every card also accepts an optional `linkedin` URL, rendered as a
     small labelled icon link beside the name. All five are currently
     EMPTY — no social profiles have been supplied, and none were
     guessed. Add the URL to an entry and the link appears.
   - NAMES, TITLES AND HEADSHOTS ARE REAL AND UNCHANGED.

   ⚠ ALL BIOS BELOW ARE PLACEHOLDER COPY — written to fill the layout
   while the structure is agreed. Replace with client-approved
   biographies (background, years of experience, area of focus)
   before launch. The same placeholder bios exist for four of these
   people in src/data/homeContent.ts (homepage TeamPreview); the two
   lists should be consolidated into one source at some point.
   ─────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import andrewKandiero from "../../Andrew Kandiero_Operations Manager.png";
import jasonMtiwa from "../../Jason Mtiwa_ IT & Digital Officer.jpeg";
import marlynNyantahe from "../../Marlyn Nyantahe_Finance Manager.png";
import thokozaniKamangira from "../../Thokozani Kamangira_Chief Executive Officer.png";
import vitumbikoChirwa from "../../Vitumbiko Chirwa_Environmental Affairs Manager.png";

interface Leader {
  name: string;
  occupation: string;
  image: typeof thokozaniKamangira;
  /** Optional. PLACEHOLDER COPY — confirm with client. */
  bio?: string;
  /** Optional. Empty until the client supplies a profile URL. */
  linkedin?: string;
}

const leaders: Leader[] = [
  {
    name: "Thokozani Kamangira",
    occupation: "Chief Executive Officer",
    image: thokozaniKamangira,
    // PLACEHOLDER BIO — confirm with client.
    bio: "Sets the company's circular economy strategy and leads its partnerships with communities, investors and development partners.",
  },
  {
    name: "Andrew Kandiero",
    occupation: "Operations Manager",
    image: andrewKandiero,
    // PLACEHOLDER BIO — confirm with client.
    bio: "Runs resource recovery operations and the field delivery teams behind every collection and conversion site.",
  },
  {
    name: "Marlyn Nyantahe",
    occupation: "Finance Manager",
    image: marlynNyantahe,
    // PLACEHOLDER BIO — confirm with client.
    bio: "Oversees budgeting, reporting and the financial models that keep each programme commercially grounded.",
  },
  {
    name: "Vitumbiko Chirwa",
    occupation: "Environmental Affairs Manager",
    image: vitumbikoChirwa,
    // PLACEHOLDER BIO — confirm with client.
    bio: "Leads environmental compliance, monitoring and reporting across the company's waste and energy activities.",
  },
  {
    name: "Jason Mtiwa",
    occupation: "IT & Digital Officer",
    image: jasonMtiwa,
    // PLACEHOLDER BIO — confirm with client.
    bio: "Builds and maintains the data and digital systems used to measure recovered materials, energy and emissions.",
  },
];

export default function LeadershipSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4faf6]/60 py-20 md:py-28">
      {/* subtle environmental decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[30rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.4),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] blur-2xl" />
        <div className="absolute top-[18%] right-[4%] h-44 w-44 rounded-full border border-primary/10" />
        <div className="absolute bottom-[26%] left-[3%] h-28 w-28 rounded-full border border-primary/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Our Leadership
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            The People Behind Go Green
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            The people leading Go Green Resources across operations, finance,
            environment and digital.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="group relative flex flex-col rounded-3xl border border-primary/10 bg-white/85 p-3 shadow-[0_20px_45px_-35px_rgba(20,83,45,0.4)] backdrop-blur-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,83,45,0.55)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent"
                />
              </div>

              <span
                aria-hidden="true"
                className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300 group-hover:w-14"
              />

              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                    {leader.name}
                  </h3>
                  <p className="mt-1.5 text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-primary md:text-[0.72rem]">
                    {leader.occupation}
                  </p>
                </div>
                {/* Optional profile link — renders only when a URL exists. */}
                {leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name} on LinkedIn (opens in a new tab)`}
                    className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>

              {leader.bio && (
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {leader.bio}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}