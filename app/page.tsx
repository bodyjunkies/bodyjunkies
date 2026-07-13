import { GatewaySplit } from "./components/gateway-split";
import { HomeHero } from "./components/home-hero";
import { ReviewsCarousel } from "./components/reviews-carousel";
import { ServicesBento } from "./components/services-bento";
import { siteConfig } from "./lib/site";
import { getHomeMedia } from "./lib/media";
import { buildPageMetadata } from "./lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const STARTER_PACK_IMAGE = "/assets/%28WEB%29BODYJUNKIES_210124_0064.webp";

export const metadata = buildPageMetadata({
  title: "Fitness & Gym Classes, Boxing in Islington | Bodyjunkies",
  description:
    "Small group fitness classes and non-contact boxing in Islington - max 12 per session. £49 Starter Pack with gloves to keep. 5.0 from 90+ Google reviews.",
  path: "/",
  keywords: [
    "boxing gym London",
    "white collar boxing",
    "white collar boxing London",
    "boxing Islington",
    "Bodyjunkies",
    "boxing classes London",
    "personal training boxing",
  ],
});

export default async function Home() {
  const media = await getHomeMedia();
  const socialProfiles = [
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
    "https://www.google.com/maps/place/Bodyjunkies+%7C+Fitness+%26+Boxing+Studio+Islington/@51.5517,-0.1114,17z/",
  ].filter(Boolean);

  const studioImages = [
    "/assets/%28WEB%29BODYJUNKIES_210124_0647.webp",
    "/assets/%28WEB%29BODYJUNKIES_210124_1301.webp",
    "/assets/%28WEB%29BODYJUNKIES_210124_0064.webp",
    "/assets/%28WEB%29BODYJUNKIES_210124_1160.webp",
    "/assets/womens-boxing-north-london-fitness-boxing-bodyjunkies-04%20%281%29.webp",
    "/assets/Boxing%20at%20BJ-2.webp",
  ].map((p) => `${siteConfig.url}${p}`);

  const exerciseGymJsonLd = {
    "@context": "https://schema.org",
    "@type": ["HealthClub", "ExerciseGym"],
    "@id": `${siteConfig.url}/#business`,
    name: "Bodyjunkies | Fitness & Boxing Studio Islington",
    description:
      "Independent fitness and boxing studio in Islington offering non-contact fitness boxing and bodyweight strength training in small group sessions capped at 12, plus one-to-one personal training. On Holloway Road, near Holloway Road, Caledonian Road and Drayton Park stations.",
    url: siteConfig.url,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.email,
    telephone: siteConfig.telephone,
    image: studioImages,
    logo: `${siteConfig.url}/assets/%28WEB%29BODYJUNKIES_210124_0647.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.mapsHref,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "07:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "06:45", closes: "21:45" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "06:45", closes: "21:45" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "06:45", closes: "21:45" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:30", closes: "13:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:30", closes: "13:30" },
    ],
    priceRange: "££",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Boxing Ring", value: true },
      { "@type": "LocationFeatureSpecification", name: "Showers", value: true },
      { "@type": "LocationFeatureSpecification", name: "Changing Rooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Personal Training", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Small Group Training", value: true },
    ],
    areaServed: [
      { "@type": "City", name: "Islington" },
      { "@type": "AdministrativeArea", name: "North London" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "95",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Training at Bodyjunkies",
      itemListElement: [
        {
          "@type": "Offer",
          name: "£49 Starter Pack",
          price: "49.00",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "Starter Pack",
            description:
              "Boxing gloves and wraps to keep, a personalised boxing induction and a small group training session, with a money-back guarantee.",
          },
        },
        {
          "@type": "Offer",
          name: "£15 Taster Session",
          price: "15.00",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "Taster Session",
            description:
              "A single small group fitness boxing session to try the studio before committing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fitness Classes",
            description:
              "Small group fitness sessions combining non-contact boxing and bodyweight strength training, capped at 12 people.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gym Classes",
            description:
              "Coach-led gym classes for all levels in a small group setting, capped at 12 per session.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Group Fitness",
            description:
              "High-energy group fitness training with personal attention from expert coaches.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Small Group Training",
            description:
              "Training sessions capped at 12 participants so workouts adapt to each person's level.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Women's Fitness",
            description:
              "A welcoming, supportive environment for women of all fitness levels.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Beginner Fitness Classes",
            description:
              "Every session adapts to beginners - no boxing or fitness experience needed.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fitness Boxing",
            description:
              "Non-contact boxing training focused on fitness, technique and conditioning - no sparring.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Personal Training",
            description:
              "One-to-one personal training in a private weights room, tailored to individual goals.",
          },
        },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a Starter Pack",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/starter-pack`,
      },
      result: {
        "@type": "Reservation",
        name: "Starter Pack Booking",
      },
    },
    sameAs: socialProfiles,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the boxing at Bodyjunkies full contact?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All boxing at Bodyjunkies is non-contact. Sessions use boxing training methods - pads, bags and footwork - for fitness and conditioning. There is no sparring or fighting.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need any boxing or fitness experience to join?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No experience is needed. Sessions are capped at 12 people, so coaches adapt every exercise to your level, whether you are a complete beginner or already train regularly.",
        },
      },
      {
        "@type": "Question",
        name: "How big are the training sessions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every small group session is capped at 12 participants, so you get personal attention from the coach in every session.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started at Bodyjunkies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the £49 Starter Pack, which includes boxing gloves and wraps to keep, a personalised boxing induction and a small group session, with a money-back guarantee. Or book a £15 Taster Session to try a single session first.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Bodyjunkies and how do I get there?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bodyjunkies is at 259 Holloway Road, Islington N7 8HG, a short walk from Holloway Road, Caledonian Road and Drayton Park stations.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
      { "@type": "ListItem", position: 3, name: "Starter Pack", item: `${siteConfig.url}/starter-pack` },
      { "@type": "ListItem", position: 4, name: "Taster Session", item: `${siteConfig.url}/taster-session` },
      { "@type": "ListItem", position: 5, name: "Pricing", item: `${siteConfig.url}/pricing` },
      { "@type": "ListItem", position: 6, name: "Reviews", item: `${siteConfig.url}/#reviews` },
      { "@type": "ListItem", position: 7, name: "Coaches", item: `${siteConfig.url}/team` },
      { "@type": "ListItem", position: 8, name: "Personal Training", item: `${siteConfig.url}/personal-training` },
      { "@type": "ListItem", position: 9, name: "Contact", item: `${siteConfig.url}/contact` },
      { "@type": "ListItem", position: 10, name: "FAQ", item: `${siteConfig.url}/faq` },
      { "@type": "ListItem", position: 11, name: "Terms", item: `${siteConfig.url}/terms` },
      { "@type": "ListItem", position: 12, name: "Privacy", item: `${siteConfig.url}/privacy` },
    ],
  };

  return (
    <main className="pb-nav-offset">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exerciseGymJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HomeHero
        heroImage={media.gatewayImage}
        heroVideo="/assets/10secs_v2.mp4"
      />

      <GatewaySplit
        beginnerImage={STARTER_PACK_IMAGE}
        experiencedImage={media.gatewayImage}
        experiencedVideo="/assets/10sec%20video_v2.mp4"
      />

      <ServicesBento
        media={[
          media.serviceAssets[0],
          "/assets/%28WEB%29BODYJUNKIES_210124_1301.webp",
          "/assets/womens-boxing-north-london-fitness-boxing-bodyjunkies-04%20%281%29.webp",
        ].filter(Boolean) as string[]}
      />

      <section
        id="reviews"
        className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:py-10 lg:px-8 lg:py-10"
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
          <a
            href="https://www.google.com/maps/place//data=!4m4!3m3!1s0x48761b7473021b31:0x1958817c0ec4e2a6!9m1!1b1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-white/90 transition-opacity hover:opacity-90"
            aria-label="View Bodyjunkies reviews on Google"
          >
            <span className="normal-case">Google Reviews</span>
            <span aria-hidden="true">·</span>
            5.0
            <span className="inline-flex items-center gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-3 fill-[#F69523] text-[#F69523]" />
              ))}
            </span>
            <span className="normal-case">(90+)</span>
          </a>
          <div className="mt-6">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      <section
        id="trainers"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
            <Link href="/team" className="group relative block overflow-hidden min-h-[280px] sm:min-h-[360px]" aria-label="Meet the team" tabIndex={-1}>
              <Image
                src="/assets/%28WEB%29BODYJUNKIES_210124_0647.webp"
                alt="Bodyjunkies trainers together on the gym floor"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </Link>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Meet The Team
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Coaches Dedicated to Your Journey
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
                Our team provides the expert guidance, balanced nutrition, and
                consistent support you need to reach your unique goals—whatever
                they may be.
              </p>
              <ul className="mt-4 space-y-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 sm:text-sm">
                <li>England Boxing / ABA-qualified coaches</li>
                <li>Technique-first coaching</li>
                <li>Small group attention</li>
              </ul>
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
          <div className="md:hidden">
            <p className="mt-4 max-w-2xl text-sm text-white/80">
              Bodyjunkies is an independent fitness and boxing studio at 259
              Holloway Road, Islington N7 8HG - one minute from Holloway Road
              station, with Caledonian Road and Drayton Park a short walk away.
              Small group fitness classes and gym classes run morning to
              evening, capped at 12 per session, with one-to-one personal
              training in our private weights room. Get directions when
              you&apos;re ready to train.
            </p>
            <a
              href={siteConfig.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get directions
            </a>
            <Link
              href="/contact"
              className="mt-3 block w-fit text-xs font-semibold uppercase tracking-[0.1em] text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              Contact us
            </Link>
          </div>
          <p className="mt-4 hidden max-w-2xl text-sm text-white/80 md:mt-4 md:block md:text-base">
            Bodyjunkies is an independent fitness and boxing studio at 259
            Holloway Road, Islington N7 8HG - one minute from Holloway Road
            station, with Caledonian Road and Drayton Park a short walk away.
            Small group fitness classes and gym classes run morning to evening,
            capped at 12 per session, with one-to-one personal training in our
            private weights room. Get directions when you&apos;re ready to
            train.
          </p>
          <Link
            href="/contact"
            className="mt-3 hidden text-xs font-semibold uppercase tracking-[0.1em] text-white/80 underline underline-offset-4 transition-colors hover:text-white md:inline-flex"
          >
            Contact us
          </Link>
          <div className="mt-6 hidden overflow-hidden rounded-xl border border-white/15 md:block">
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

      <section
        id="final-cta"
        className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-10"
      >
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Start Here
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Discover Your Potential
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Get the sessions, the nutrition, and the tracking you need to be in
            the best shape of your life.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            New to boxing? Start with the Starter Pack to build your base and{" "}
            <span className="font-bold">receive your boxing gloves and wraps as part of your kit.</span>
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <Link
              href="/starter-pack"
              className="hidden items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
            >
              Starter Pack £49
            </Link>
            <p className="text-sm text-white/70">
              Already training?{" "}
              <a
                href="/schedule"
                target="_blank"
                rel="noreferrer"
                className="font-semibold uppercase tracking-[0.1em] text-white transition hover:text-white/85"
              >
                View Schedule
              </a>
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
