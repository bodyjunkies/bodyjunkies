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
      <div className="relative min-h-[70svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[74svh]">
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
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.78)_100%)] sm:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(110deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.52)_45%,rgba(0,0,0,0.75)_100%)] sm:block" />

        <div className="relative z-10 flex min-h-[70svh] items-end p-6 sm:min-h-[74svh] sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
              Boxing And Fitness In Islington
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[0.97] text-white sm:text-5xl lg:text-6xl">
              Fuel Your Fire
              <br />
              Build Real Strength
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 sm:max-w-xl sm:text-base">
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
            </div>
            <a
              href="https://www.google.com/search?hl=en-GB&gl=uk&q=Bodyjunkies+%7C+Fitness+%26+Boxing+Studio+Islington,+259+Holloway+Rd,+London+N7+8HG&ludocid=1826352018722448038&lsig=AB86z5Wutww2nbiXMq3CJVD2spTO&hl=en&gl=GB#lrd=0x48761b7473021b31:0x1958817c0ec4e2a6,1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-white/90 transition-opacity hover:opacity-90"
              aria-label="View Bodyjunkies reviews on Google"
            >
              5.0
              <span className="inline-flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-3 fill-current" fill="currentColor" />
                ))}
              </span>
              <span className="normal-case">90+ reviews</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
