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
  imageAlt: string;
  videoAriaLabel: string;
  icon: ComponentType<{ className?: string }>;
};

const tiles: Tile[] = [
  {
    title: "Personal Training",
    copy: "1:1 coaching built around your level, goals, and pace.",
    href: "/personal-training",
    cta: "Book 1:1 Session",
    imageAlt:
      "Coach delivering one-to-one boxing and fitness instruction at Bodyjunkies",
    videoAriaLabel:
      "Personal training footage with one-to-one coaching at Bodyjunkies",
    icon: Users,
  },
  {
    title: "Strength & Conditioning",
    copy: "Compound strength work built for the ring and beyond.",
    href: "https://momence.com/u/bodyjunkies-NFLGZG",
    cta: "Book S&C Session",
    imageAlt:
      "Members working through a strength and conditioning block at Bodyjunkies",
    videoAriaLabel:
      "Strength and conditioning training footage inside the Bodyjunkies studio",
    icon: Dumbbell,
  },
  {
    title: "Pricing & Memberships",
    copy: "See all pathways before you commit: Starter Pack, classes, and PT.",
    href: "/pricing",
    cta: "View pricing",
    imageAlt:
      "Bodyjunkies members training together while exploring class pathways",
    videoAriaLabel:
      "Bodyjunkies class footage highlighting membership and training pathways",
    icon: Wallet,
  },
];

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

export function ServicesBento({ media }: ServicesBentoProps) {
  const tileMedia = [media[0], media[1], media[2]].filter(Boolean) as string[];

  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            More Ways To Train
          </p>
          <h3 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
            Train With Intent
          </h3>
        </div>
      </div>

      <div className="mt-1 md:hidden">
        {(() => {
          const featuredTiles = tiles.slice(0, 2);
          const pricingTile = tiles[2];
          return (
            <>
              <div className="space-y-3">
                {featuredTiles.map((tile, index) => {
                  const mediaUrl = tileMedia[index];
                  const external = tile.href.startsWith("http");
                  const isPrimaryTile = index === 0;

                  return (
                    <Link
                      key={tile.title}
                      href={tile.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${tile.title}: ${tile.cta}`}
                      className="block cursor-pointer"
                    >
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: index * 0.04 }}
                        whileHover={{ y: -4 }}
                        className={`group relative overflow-hidden rounded-2xl border border-white/15 ${isPrimaryTile ? "min-h-[16.5rem]" : "min-h-[14rem]"}`}
                      >
                        {mediaUrl ? (
                          isVideo(mediaUrl) ? (
                            <video
                              className="absolute inset-0 h-full w-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="none"
                              aria-label={tile.videoAriaLabel}
                            >
                              {getVideoSourceCandidates(mediaUrl).map((source) => (
                                <source key={source.src} src={source.src} type={source.type} />
                              ))}
                            </video>
                          ) : (
                            <Image
                              src={mediaUrl}
                              alt={tile.imageAlt}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                          )
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,#f69523_0%,#221e3a_45%,#000000_100%)]" />
                        )}
                        <div className="absolute inset-0 bg-black/65 transition-colors group-hover:bg-black/55" />
                        <div className={`relative z-10 flex flex-col justify-between p-5 ${isPrimaryTile ? "min-h-[16.5rem]" : "min-h-[14rem]"}`}>
                          <div className="space-y-2.5">
                            <h4 className={`${isPrimaryTile ? "text-xl" : "text-lg"} font-extrabold uppercase text-white`}>
                              {tile.title}
                            </h4>
                            <p className="max-w-md text-sm text-white/90">{tile.copy}</p>
                          </div>
                          <motion.span
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ scale: 1.02 }}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:w-fit"
                          >
                            {tile.cta}
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </div>
                      </motion.article>
                    </Link>
                  );
                })}
              </div>
              {pricingTile ? (
                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  <li>
                    <Link
                      href={pricingTile.href}
                      className="flex items-center justify-between text-white/75 transition hover:text-white/90"
                    >
                      <span className="text-sm font-medium">{pricingTile.title}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65">
                        {pricingTile.cta}
                      </span>
                    </Link>
                  </li>
                </ul>
              ) : null}
            </>
          );
        })()}
      </div>

      <div className="hidden grid-cols-1 gap-3 sm:gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          const mediaUrl = tileMedia[index];
          const external = tile.href.startsWith("http");
          const isPrimaryTile = index === 0;

          return (
            <Link
              key={tile.title}
              href={tile.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={`${tile.title}: ${tile.cta}`}
              className="block h-full cursor-pointer"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className={`group relative h-full overflow-hidden rounded-2xl border border-white/15 ${isPrimaryTile ? "min-h-[16.5rem] sm:min-h-[18rem] md:min-h-[22rem]" : "min-h-[12.5rem] sm:min-h-[16rem] md:min-h-[22rem]"}`}
              >
                {mediaUrl ? (
                  isVideo(mediaUrl) ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={tile.videoAriaLabel}
                    >
                      {getVideoSourceCandidates(mediaUrl).map((source) => (
                        <source key={source.src} src={source.src} type={source.type} />
                      ))}
                    </video>
                  ) : (
                    <Image
                      src={mediaUrl}
                      alt={tile.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,#f69523_0%,#221e3a_45%,#000000_100%)]" />
                )}
                <div className="absolute inset-0 bg-black/55 transition-colors group-hover:bg-black/45" />

                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                  <div className="space-y-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <h4 className={`${isPrimaryTile ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} font-extrabold uppercase text-white`}>
                      {tile.title}
                    </h4>
                    <p className="max-w-md text-sm text-white/85">{tile.copy}</p>
                  </div>

                  <motion.span
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                  >
                    {tile.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.span>
                </div>
              </motion.article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
