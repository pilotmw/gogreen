/* ───────────────────────────────────────────────────────────────
   SDG TILES

   Replaces the previous plain-text SDG list (a coloured circle with a
   number and a sentence underneath). Each goal is now a solid square
   tile in its official UN colour, carrying the goal number and a
   symbol, with the goal name and a one-line note of how Go Green's
   work touches it below the tile.

   COLOURS ARE OFFICIAL, ICONS ARE NOT
   `hex` values are the UN's official per-goal colours and are the only
   brand-external colours on the site; they are confined to these tiles.
   The UN's SDG icon artwork is copyrighted and is deliberately NOT
   reproduced. Each tile uses a generic lucide symbol as a stand-in, so
   the tiles read as "official-style" rather than official artwork.
   Replacing these with licensed SDG icons is a client decision.

   Four of the five previous Tailwind colour classes were wrong (SDG 8
   was red, 11 green, 12 blue, 13 orange); the official values are used
   here instead.

   Text colour is set per goal via `onDark`, because SDG 7's yellow
   needs dark text while the other four take white.
   ─────────────────────────────────────────────────────────────── */

import { motion, useReducedMotion } from "framer-motion";

import { sdgs } from "@/data/impactContent";

export default function SdgTiles() {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : undefined;

  return (
    /* 2 per row on mobile, 3 from `sm`, all 5 in one row from `lg`. */
    <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
      {sdgs.map((sdg, idx) => {
        const Icon = sdg.icon;
        const foreground = sdg.onDark ? "text-white" : "text-[#1a1a1a]";

        return (
          <motion.li
            key={sdg.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: d ?? 0.45, delay: (d ?? 0.45) * idx * 0.07 }}
            className="group flex flex-col"
          >
            {/* ── the official-colour square ── */}
            <div
              /* Colour comes from the data, so the UN palette lives in
                 one place. A focus/hover ring uses the same hue. */
              style={{
                backgroundColor: sdg.hex,
                boxShadow: `0 18px 40px -30px ${sdg.hex}`,
              }}
              className={[
                "flex aspect-square w-full flex-col justify-between p-4 sm:p-5",
                "transition-transform duration-300 group-hover:-translate-y-1",
                foreground,
              ].join(" ")}
            >
              <span className="text-2xl font-black leading-none tabular-nums sm:text-3xl">
                {sdg.number}
              </span>
              <Icon
                className="ml-auto h-9 w-9 opacity-95 sm:h-11 sm:w-11"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>

            {/* ── name and contribution, outside the colour block so the
                long official names stay legible and selectable ── */}
            <h3 className="mt-4 text-sm font-bold leading-snug tracking-tight text-gray-900">
              SDG {sdg.number}: {sdg.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              {sdg.contribution}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
}
