import Image from "next/image";

import andrewKandiero from "../../Andrew Kandiero_Operations Manager.png";
import jasonMtiwa from "../../Jason Mtiwa_ IT & Digital Officer.jpeg";
import marlynNyantahe from "../../Marlyn Nyantahe_Finance Manager.png";
import thokozaniKamangira from "../../Thokozani Kamangira_Chief Executive Officer.png";
import vitumbikoChirwa from "../../Vitumbiko Chirwa_Environmental Affairs Manager.png";

const leaders = [
  {
    name: "Thokozani Kamangira",
    occupation: "Chief Executive Officer",
    image: thokozaniKamangira,
  },
  {
    name: "Andrew Kandiero",
    occupation: "Operations Manager",
    image: andrewKandiero,
  },
  {
    name: "Marlyn Nyantahe",
    occupation: "Finance Manager",
    image: marlynNyantahe,
  },
  {
    name: "Vitumbiko Chirwa",
    occupation: "Environmental Affairs Manager",
    image: vitumbikoChirwa,
  },
  {
    name: "Jason Mtiwa",
    occupation: "IT & Digital Officer",
    image: jasonMtiwa,
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
            People Driving the Green Transition
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Meet the people helping shape Go Green Resources&apos; vision for a
            more circular, sustainable and commercially resilient future.
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

              <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                {leader.name}
              </h3>
              <p className="mt-1.5 text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-primary md:text-[0.72rem]">
                {leader.occupation}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}