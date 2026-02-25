import Image from "next/image";
import { ArrowRight } from "lucide-react";

type HomeHeroProps = {
  heroImage: string;
  heroVideo?: string | null;
};

export function HomeHero({ heroImage, heroVideo }: HomeHeroProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <div className="relative min-h-[60svh] overflow-hidden rounded-3xl border border-white/20 sm:min-h-[74svh]">
        {heroVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
          >
            <source src={heroVideo} />
          </video>
        ) : (
          <Image
            src={heroImage}
            alt="Bodyjunkies members training together in Islington"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.52)_45%,rgba(0,0,0,0.75)_100%)]" />

        <div className="relative z-10 flex min-h-[60svh] items-end p-6 sm:min-h-[74svh] sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
              Boxing And Fitness In Islington
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[0.92] text-white sm:text-5xl lg:text-6xl">
              Fuel Your Fire
              <br />
              Build Real Strength
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/85 sm:text-base">
              Small-group boxing sessions with structure, accountability, and a
              real training standard. Trusted by a growing crew with 90+ reviews.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="/starter-pack"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                Starter Pack £49
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/schedule"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/45 bg-black/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
