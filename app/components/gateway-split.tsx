"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Shield } from "lucide-react";
import { getVideoSourceCandidates } from "../lib/video";

type GatewaySplitProps = {
  beginnerImage: string;
  experiencedImage: string;
  experiencedVideo?: string | null;
};

const STARTER_PACK_PATH = "/starter-pack";

export function GatewaySplit({
  beginnerImage,
  experiencedImage,
  experiencedVideo,
}: GatewaySplitProps) {
  const experiencedVideoSources = experiencedVideo
    ? getVideoSourceCandidates(experiencedVideo)
    : [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-4 lg:px-8 lg:pt-6">
      <p className="mb-3 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:hidden">
        Choose your lane
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href={STARTER_PACK_PATH}
          aria-label="Beginner: Start Starter Pack"
          className="block h-full cursor-pointer"
          id="gateway-beginner-card"
        >
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            whileHover={{ scale: 1.01 }}
            className="relative h-full min-h-[50svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[64svh]"
          >
            <Image
              src={beginnerImage}
              alt="Beginner boxing class at Bodyjunkies"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="space-y-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  <Shield className="h-3.5 w-3.5" />
                  Beginner
                </span>
                <h2 className="text-3xl font-black uppercase leading-[0.97] text-white sm:text-5xl">
                  Start With
                  <br />
                  The Gloves
                </h2>
                <p className="max-w-sm text-[15px] leading-relaxed text-white/85 sm:text-base">
                  Build your base in the Starter Pack and{" "}
                  <span className="font-bold">keep your brand-new boxing gloves and wraps as part of your kit.</span>
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/75">
                  No experience needed.
                </p>
              </div>
              <motion.span
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--bj-red)]/40 bg-[var(--bj-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white sm:w-fit"
              >
                View Starter Pack
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </div>
          </motion.article>
        </Link>

        <Link
          href="/taster-session"
          aria-label="Experienced: View Taster Session"
          className="block h-full cursor-pointer"
          id="gateway-experienced-card"
        >
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            whileHover={{ scale: 1.01 }}
            className="relative h-full min-h-[50svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[64svh]"
          >
            {experiencedVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={experiencedImage}
                aria-label="Experienced boxers training at Bodyjunkies"
              >
                {experiencedVideoSources.map((source) => (
                  <source key={source.src} src={source.src} type={source.type} />
                ))}
              </video>
            ) : (
              <Image
                src={experiencedImage}
                alt="Experienced boxer training at Bodyjunkies"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.7)_100%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="space-y-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  <Flame className="h-3.5 w-3.5" />
                  Experienced
                </span>
                <h2 className="text-3xl font-black uppercase leading-[0.97] text-white sm:text-5xl">
                  Bring The
                  <br />
                  Fire In
                </h2>
                <p className="max-w-sm text-[15px] leading-relaxed text-white/85 sm:text-base">
                  Already equipped and ready to move? Try a full session and feel the tribe atmosphere first hand.
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/75">
                  Bring your own gloves. Zero strings.
                </p>
              </div>
              <motion.span
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:w-fit"
              >
                View Taster Session
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </div>
          </motion.article>
        </Link>
      </div>
    </section>
  );
}
