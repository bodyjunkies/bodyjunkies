"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Users, Wallet } from "lucide-react";
import type { ComponentType } from "react";
import { getVideoSourceCandidates } from "../lib/video";

type ServicesBentoProps = {
  media: string[];
};

type Tile = {
  title: string;
  copy: string;
  href: string;
  cta: string;
  icon: ComponentType<{ className?: string }>;
};

const tiles: Tile[] = [
  {
    title: "Personal Training",
    copy: "1:1 coaching tailored to your level, goals, and pace.",
    href: "/personal-training",
    cta: "Book 1:1 Session",
    icon: Users,
  },
  {
    title: "Strength & Conditioning",
    copy: "Power-focused coaching tailored to your level, pace, and goals.",
    href: "/schedule/strength-conditioning",
    cta: "Book Session",
    icon: Dumbbell,
  },
  {
    title: "Pricing & Memberships",
    copy: "See all pathways before you commit: Starter Pack, classes, and PT.",
    href: "/pricing",
    cta: "View pricing",
    icon: Wallet,
  },
];

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

export function ServicesBento({ media }: ServicesBentoProps) {
  const tileMedia = [media[0], media[1], media[2]].filter(Boolean) as string[];

  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Services
          </p>
          <h3 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
            Train With Intent
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          const mediaUrl = tileMedia[index];
          const external = tile.href.startsWith("http");
          const isPrimaryTile = index === 0;

          return (
            <motion.article
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/15 ${isPrimaryTile ? "min-h-[16.5rem] sm:min-h-[18rem] md:min-h-[22rem]" : "min-h-[12.5rem] sm:min-h-[16rem] md:min-h-[22rem]"}`}
            >
              {mediaUrl ? (
                isVideo(mediaUrl) ? (
                  <video
                    className={`absolute inset-0 h-full w-full object-cover ${isPrimaryTile ? "" : "hidden sm:block"}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={`${tile.title} training footage at Bodyjunkies`}
                  >
                    {getVideoSourceCandidates(mediaUrl).map((source) => (
                      <source
                        key={source.src}
                        src={source.src}
                        type={source.type}
                      />
                    ))}
                  </video>
                ) : (
                  <Image
                    src={mediaUrl}
                    alt={`${tile.title} at Bodyjunkies`}
                    fill
                    className={`object-cover ${isPrimaryTile ? "" : "hidden sm:block"}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,#f69523_0%,#221e3a_45%,#000000_100%)]" />
              )}
              {!isPrimaryTile ? (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(246,149,35,0.35)_0%,rgba(34,30,58,0.92)_45%,rgba(0,0,0,0.94)_100%)] sm:hidden" />
              ) : null}
              <div className="absolute inset-0 bg-black/55 transition-colors group-hover:bg-black/45" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="space-y-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  <h4 className={`${isPrimaryTile ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} font-extrabold uppercase text-white`}>
                    {tile.title}
                  </h4>
                  <p className={`${isPrimaryTile ? "max-w-md text-sm text-white/85" : "hidden max-w-md text-sm text-white/85 sm:block"}`}>
                    {tile.copy}
                  </p>
                </div>

                <motion.div
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={tile.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                  >
                    {tile.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
