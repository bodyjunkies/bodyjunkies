"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Flame, Shield } from "lucide-react";

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
  const { scrollY } = useScroll();
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowFloatingCta(latest > 760);
  });

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <div className="grid gap-4 md:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          whileHover={{ scale: 1.01 }}
          className="relative min-h-[50svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[64svh]"
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
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                <Shield className="h-3.5 w-3.5" />
                Beginner
              </span>
              <h1 className="text-3xl font-black uppercase leading-[0.95] text-white sm:text-5xl">
                Start With
                <br />
                The Gloves
              </h1>
              <p className="max-w-sm text-sm text-white/85 sm:text-base">
                Build your base in the Starter Pack and keep your brand-new boxing
                gloves and wraps as part of your kit.
              </p>
            </div>
            <motion.a
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              href={STARTER_PACK_PATH}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:w-fit"
            >
              Starter Pack £49
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          whileHover={{ scale: 1.01 }}
          className="relative min-h-[50svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[64svh]"
        >
          {experiencedVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={experiencedImage}
            >
              <source src={experiencedVideo} />
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
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                <Flame className="h-3.5 w-3.5" />
                Experienced
              </span>
              <h2 className="text-3xl font-black uppercase leading-[0.95] text-white sm:text-5xl">
                Bring The
                <br />
                Fire In
              </h2>
              <p className="max-w-sm text-sm text-white/85 sm:text-base">
                Already equipped and ready to move? Jump straight into sessions and
                lock your next slot.
              </p>
            </div>
            <motion.a
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              href="/schedule"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:w-fit"
            >
              Book Session
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.article>
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: showFloatingCta ? 1 : 0, y: showFloatingCta ? 0 : 16 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed inset-x-4 bottom-[calc(var(--floating-cta-bottom-mobile)+env(safe-area-inset-bottom))] z-30 hidden justify-center md:inset-x-auto md:right-6 md:bottom-6 md:flex"
      >
        <motion.a
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          href={STARTER_PACK_PATH}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        >
          Starter Pack £49
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </>
  );
}
