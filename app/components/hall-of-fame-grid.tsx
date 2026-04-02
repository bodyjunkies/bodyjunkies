"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Fighter = {
  name: string;
  record: string | null;
  image: string | null;
};

const fighters: Fighter[] = [
  // ── Fighters with photos (sorted alphabetically) ──
  { name: "Anna T.", record: "1-0", image: "/assets/HOF%20photos/Anna%20T.webp" },
  { name: "Bobbi M.", record: "3-0", image: "/assets/HOF%20photos/Booby%20M.jpg" },
  { name: "Dwayne B.", record: "3-0", image: "/assets/HOF%20photos/Duane%20B.webp" },
  { name: "Ethan H.", record: "2-0", image: "/assets/HOF%20photos/Ethan%20H.jpg" },
  { name: "Harvey S.", record: "1-0", image: "/assets/HOF%20photos/Harvey%20S.webp" },
  { name: "JJ B.", record: "2-1", image: "/assets/HOF%20photos/JJ%20Booth.jpg" },
  { name: "Joanna B.", record: null, image: "/assets/HOF%20photos/Joanna%20B.webp" },
  { name: "Lloyd O.", record: "1-0", image: "/assets/HOF%20photos/Lloyd%20O.jpg" },
  { name: "Maura N.", record: "2-0", image: "/assets/HOF%20photos/Maura%20N.jpg" },
  { name: "Michael B.", record: "3-0", image: "/assets/HOF%20photos/Michael%20B.jpg" },
  { name: "Raisa C.", record: "1-0", image: "/assets/HOF%20photos/Raisa%20C.jpg" },
  { name: "Rosario G.", record: "0-0-1", image: "/assets/HOF%20photos/Rosario%20G.jpg" },
  { name: "Sabrina S.", record: "2-0", image: "/assets/HOF%20photos/Sabrina%20S.jpg" },
  { name: "Sammy O.", record: "1-0", image: "/assets/HOF%20photos/Sammy%20O.jpg" },
  { name: "Sophie W.", record: "2-0", image: "/assets/HOF%20photos/Sophie%20W.jpg" },
  { name: "Thomas B.", record: "1-0", image: "/assets/HOF%20photos/Thomas%20B.jpg" },

  // ── Fighters without photos ──
  { name: "Adam C.", record: "0-0-1", image: null },
  { name: "Bernetta L.", record: "0-1", image: null },
  { name: "Bryony B.", record: "1-0", image: null },
  { name: "Callum", record: "0-1", image: null },
  { name: "Chris P.", record: "2-0-1", image: null },
  { name: "Eden K.", record: "1-0", image: null },
  { name: "James F.", record: "1-0", image: null },
  { name: "Jay M.", record: "0-1", image: null },
  { name: "Jean Paul C.", record: "1-0", image: null },
  { name: "Jinnie K.", record: "1-0", image: null },
  { name: "Kevin C.", record: "2-0", image: null },
  { name: "Kevin P.", record: "0-1", image: null },
  { name: "Liz D.", record: "1-0", image: null },
  { name: "Logan F.", record: "0-1", image: null },
  { name: "Lucy H.", record: "1-0", image: null },
  { name: "Matt H.", record: "0-1", image: null },
  { name: "Michael M.", record: "2-1-0", image: null },
  { name: "Michael S.", record: "1-0", image: null },
  { name: "Patrizia P.", record: "1-0", image: null },
  { name: "Rachel H.", record: "1-0", image: null },
  { name: "Roozbeh G.", record: "0-1", image: null },
  { name: "Serene", record: "1-0", image: null },
  { name: "Sze-von L.", record: "1-0", image: null },
  { name: "Tati Y.", record: "1-0", image: null },
  { name: "Theo P.", record: "2-0", image: null },
  { name: "Yannis", record: "1-1-0", image: null },
];

function getInitials(name: string): string {
  const parts = name.replace(".", "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[parts.length - 1][0];
}

export function HallOfFameGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {fighters.map((fighter) => (
        <motion.article
          key={fighter.name}
          whileHover="hover"
          variants={{ hover: { y: -4 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/15"
        >
          {fighter.image ? (
            <>
              <motion.div
                className="absolute inset-0"
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src={fighter.image}
                  alt={fighter.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
              <span className="text-4xl font-black uppercase text-white/20 sm:text-5xl">
                {getInitials(fighter.name)}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <p className="text-sm font-bold uppercase tracking-[0.06em] text-white sm:text-base">
              {fighter.name}
            </p>
            {fighter.record ? (
              <span className="mt-1.5 inline-flex rounded-full border border-white/25 bg-black/40 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums tracking-wide text-white/90 backdrop-blur-sm">
                {fighter.record}
              </span>
            ) : null}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
