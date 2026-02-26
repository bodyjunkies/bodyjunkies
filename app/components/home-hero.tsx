import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getVideoSourceCandidates } from "../lib/video";

type HomeHeroProps = {
  heroImage: string;
  heroVideo?: string | null;
};

export function HomeHero({ heroImage, heroVideo }: HomeHeroProps) {
  const videoSources = heroVideo ? getVideoSourceCandidates(heroVideo) : [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <div className="relative min-h-[56svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[74svh]">
        <Image
          src={heroImage}
          alt="Bodyjunkies members training together in Islington"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {heroVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
            aria-label="Bodyjunkies members training in a boxing and conditioning session"
          >
            {videoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : null}
        <div className="absolute inset-0 bg-black/70 sm:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(110deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.52)_45%,rgba(0,0,0,0.75)_100%)] sm:block" />

        <div className="relative z-10 flex min-h-[56svh] items-end p-6 sm:min-h-[74svh] sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
              Boxing And Fitness In Islington
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              Fuel Your Fire
              <br />
              Build Real Strength
            </h1>
            <p className="mt-4 max-w-lg text-sm text-white/85 sm:max-w-xl sm:text-base">
              Small-group boxing sessions with structure, accountability, and a
              real training standard.
            </p>
            <div className="mt-5 flex flex-col items-start gap-4 sm:mt-7 sm:flex-row sm:items-center">
              <Link
                href="/starter-pack"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                Starter Pack £49
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/schedule"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/60 bg-black/45 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <span className="sm:hidden">Book Session</span>
                <span className="hidden sm:inline">I Have Gloves - Book Session</span>
              </Link>
            </div>
            <p className="mt-4 text-xs font-medium text-white/85 sm:text-sm">
              New? Starter Pack £49 includes brand-new gloves + wraps. Already
              training? Book now.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
              <span className="inline-flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-3 fill-current" fill="currentColor" />
                ))}
              </span>
              5.0 Google Rating - 90+ Reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
