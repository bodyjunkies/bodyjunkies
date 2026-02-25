import { GatewaySplit } from "./components/gateway-split";
import { HomeHero } from "./components/home-hero";
import { ReviewsCarousel } from "./components/reviews-carousel";
import { ServicesBento } from "./components/services-bento";
import { siteConfig } from "./lib/site";
import { getHomeMedia } from "./lib/media";
import Image from "next/image";
import Link from "next/link";

const STARTER_PACK_IMAGE = "/assets/%28WEB%29BODYJUNKIES_210124_0064.jpg";

export default async function Home() {
  const media = await getHomeMedia();
  const socialProfiles = [
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
  ].filter(Boolean);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Bodyjunkies",
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}${media.gatewayImage}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islington",
      addressRegion: "London",
      addressCountry: "GB",
    },
    openingHours: siteConfig.openingHours,
    ...(siteConfig.phoneDisplay ? { telephone: siteConfig.phoneDisplay } : {}),
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };

  return (
    <main className="pb-nav-offset">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HomeHero
        heroImage={media.gatewayImage}
        heroVideo="/assets/52dae399-9b5c-4536-987f-a0fdd2710d18.mov"
      />

      <GatewaySplit
        beginnerImage={STARTER_PACK_IMAGE}
        experiencedImage={media.gatewayImage}
        experiencedVideo="/assets/10secs.mov"
      />

      <section
        id="reviews"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-10"
      >
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Reviews
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Real Members. Real Progress.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            See what the Bodyjunkies community says after sessions with our
            coaches.
          </p>
          <div className="mt-6">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      <ServicesBento
        media={[
          media.serviceAssets[0],
          "/assets/%28WEB%29BODYJUNKIES_210124_1301.jpg",
          "/assets/womens-boxing-north-london-fitness-boxing-bodyjunkies-04%20%281%29.jpg",
        ].filter(Boolean) as string[]}
      />

      <section
        id="trainers"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[280px] sm:min-h-[360px]">
              <Image
                src="/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg"
                alt="Bodyjunkies trainers together on the gym floor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Meet The Team
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Coaches Who Bring Grit And Precision
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
                Every coach has a different lane, but the same standard:
                structure, accountability, and proper boxing detail in every
                session.
              </p>
              <Link
                href="/team"
                className="mt-6 inline-flex rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Meet The Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="final-cta"
        className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-10"
      >
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Start Here
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Step In. Train With Intent.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            If you are new, start with the Starter Pack to build your base.
            If you are ready to move now, lock your next class slot.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/starter-pack"
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Starter Pack £49
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View Class Schedule
            </Link>
          </div>
        </div>
      </section>

      <section
        id="location"
        className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-10"
      >
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Location
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Train With Us In Islington
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Find Bodyjunkies in Islington and step in for boxing and fitness
            sessions built around grit, structure, and progress.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-white/15">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.89910346624!2d-0.11407002359254548!3d51.55174910746285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b7473021b31%3A0x1958817c0ec4e2a6!2sBodyjunkies%20%7C%20Fitness%20%26%20Boxing%20Studio%20Islington!5e0!3m2!1sen!2suk!4v1772036651677!5m2!1sen!2suk"
              className="h-[360px] w-full sm:h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bodyjunkies Islington location"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
