import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  LineChart,
  UtensilsCrossed,
} from "lucide-react";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Pricing & Memberships | Bodyjunkies",
  description:
    "Explore Bodyjunkies pricing pathways: Starter Pack, class bookings, and personal training options in Islington.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-3xl font-black uppercase text-white sm:text-4xl">
            Choose Your Path
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            Start where you are. Move with intent. Build consistency round by
            round with clear options.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Link
              href="/starter-pack"
              aria-label="Starter Pack: Starter Pack £49"
              className="block cursor-pointer"
            >
              <article className="flex h-full flex-col rounded-2xl border border-[var(--bj-red)]/60 bg-[var(--bj-red)]/15 p-5 transition-colors hover:border-[var(--bj-red)]/80 hover:bg-[var(--bj-red)]/20">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                    Most Popular Start
                  </p>
                  <h2 className="mt-3 text-2xl font-black uppercase text-white">
                    Starter Pack
                  </h2>
                  <p className="mt-2 text-4xl font-black uppercase text-white">£49</p>
                  <p className="mt-3 text-sm text-white/85">
                    Perfect for beginners. <span className="font-bold text-white">Includes intro sessions plus your own gloves and wraps to keep</span>, so you can build a strong foundation from day one.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--bj-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                  Starter Pack £49
                  <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            </Link>

            <Link
              href="/taster-session"
              aria-label="Experienced Track: Taster Session £15"
              className="block cursor-pointer"
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/15 bg-black/20 p-5 transition-colors hover:border-white/25 hover:bg-white/[0.06]">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                    Experienced Track
                  </p>
                  <h2 className="mt-3 text-2xl font-black uppercase text-white">
                    Taster Session
                  </h2>
                  <p className="mt-2 text-4xl font-black uppercase text-white">£15</p>
                  <p className="mt-3 text-sm text-white/80">
                    Already have your own gloves? Try a full session and feel the tribe atmosphere.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/85">
                    <li>Full boxing session experience</li>
                    <li>Bring your own gloves</li>
                    <li>Zero strings attached</li>
                  </ul>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                  Taster Session £15
                  <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            </Link>

            <Link
              href="/personal-training"
              aria-label="Personal Training: Book 1:1"
              className="block cursor-pointer"
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/15 bg-black/20 p-5 transition-colors hover:border-white/25 hover:bg-white/[0.06]">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                    Personal Training
                  </p>
                  <h2 className="mt-3 text-2xl font-black uppercase text-white">
                    1:1 Coaching
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    Personal training for technique, conditioning, and goals that
                    need tighter structure.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/85">
                    <li>Book direct PT appointments</li>
                    <li>Reach out to discuss your goals</li>
                    <li>Tailored coaching approach</li>
                  </ul>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                  Book 1:1
                  <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-white/15 bg-black/20 p-4 sm:p-5">
            <h2 className="border-b border-white/15 pb-3 text-lg font-black uppercase tracking-[0.12em] text-white sm:text-xl">
              Memberships
            </h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              <Link
                href="https://momence.com/Bodyjunkies/membership/B-Unlimited/540930"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="B-Unlimited membership: Start B-Unlimited"
                className="block cursor-pointer"
              >
                <article className="flex h-full flex-col rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/[0.09]">
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase text-white">
                      B-Unlimited
                    </h3>
                    <p className="mt-1 text-2xl font-black text-white">£199.00</p>
                    <p className="mt-2 text-sm text-white/85">
                      Unlimited class access every month to fuel your fire.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    Start B-Unlimited
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </article>
              </Link>

              <Link
                href="https://momence.com/Bodyjunkies/membership/B-12-/539306"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="B-12 membership: Start B-12"
                className="block cursor-pointer"
              >
                <article className="flex h-full flex-col rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/[0.09]">
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase text-white">B-12</h3>
                    <p className="mt-1 text-2xl font-black text-white">£168.00</p>
                    <p className="mt-2 text-sm text-white/85">
                      12 class credits every month to fuel your fire. Unused
                      credits roll over once.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    Start B-12
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </article>
              </Link>

              <Link
                href="https://momence.com/Bodyjunkies/membership/B-8/539635"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="B-8 membership: Start B-8"
                className="block cursor-pointer"
              >
                <article className="flex h-full flex-col rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/[0.09]">
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase text-white">B-8</h3>
                    <p className="mt-1 text-2xl font-black text-white">£128.00</p>
                    <p className="mt-2 text-sm text-white/85">
                      8 class credits every month to fuel your fire. Unused credits
                      roll over once.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    Start B-8
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </article>
              </Link>
            </div>

            <div className="border-t border-white/10 pt-5 sm:pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                What&apos;s included
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <article className="rounded-xl border border-white/20 bg-white/5 p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <LineChart
                      className="h-4 w-4 text-white"
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-3 text-lg font-black uppercase text-white">
                    Monthly Progress Tracking
                  </h3>
                  <p className="mt-2 text-sm text-white/85">
                    More than just a number. Record your monthly measurements in
                    your Momence profile to celebrate how your body is evolving
                    and see the results of your dedication.
                  </p>
                </article>
                <article className="rounded-xl border border-white/20 bg-white/5 p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <UtensilsCrossed
                      className="h-4 w-4 text-white"
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-3 text-lg font-black uppercase text-white">
                    Your 7-Day Lifestyle Fuel
                  </h3>
                  <p className="mt-2 text-sm text-white/85">
                    {`Nourishment made simple. Access our curated eating plans for Healthy Living, Vitality & Growth, or Body Composition, designed to help you feel energized all week long.`}
                  </p>
                </article>
                <article className="rounded-xl border border-white/20 bg-white/5 p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <CalendarDays
                      className="h-4 w-4 text-white"
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-3 text-lg font-black uppercase text-white">
                    Weekly Featured Session
                  </h3>
                  <p className="mt-2 text-sm text-white/85">
                    {`Keep your routine fresh and inspired with our 'Workout of the Week'—extra guidance to help you find your rhythm and stay on track.`}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
