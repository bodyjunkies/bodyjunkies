import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { HallOfFameGrid } from "../components/hall-of-fame-grid";
import { buildPageMetadata } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildPageMetadata({
  title: "White Collar Boxing London x Bodyjunkies | Fight Prep",
  description:
    "Sign up to White Collar Boxing London and prepare for fight night with a dedicated Bodyjunkies coach. Meet the members who went from the gym to the ring.",
  path: "/white-collar-boxing",
  keywords: ["white collar boxing", "white collar boxing London"],
});

export default function WhiteCollarBoxingPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            In partnership with White Collar Boxing London
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-[0.97] text-white sm:text-5xl">
            Your Fight
            <br />
            Starts Here
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            White collar boxing puts everyday people in a real ring for a real
            fight. No background in the sport required — just the will to show
            up and do the work.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-white/80 sm:text-base">
            You sign up through White Collar Boxing London, and you prepare with
            Bodyjunkies. We work closely with every contender so you walk out on
            fight night sharp, fit, and ready.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={siteConfig.whiteCollarBoxingLondonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Sign Up With WCBL
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="#hall-of-fame"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              See Who&apos;s Done It
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section
          id="hall-of-fame"
          className="mt-4 scroll-mt-24 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Hall Of Fame
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase text-white sm:text-3xl">
            From The Gym To The Ring
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            Every name here went from the gym to the ring. They trained at
            Bodyjunkies, committed to the process, and stepped between the ropes
            on fight night. Your spot is waiting.
          </p>
          <div className="mt-8">
            <HallOfFameGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
