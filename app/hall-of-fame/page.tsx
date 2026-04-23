import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HallOfFameGrid } from "../components/hall-of-fame-grid";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "White Collar Boxing Hall of Fame | Bodyjunkies",
  description:
    "Meet the Bodyjunkies members who went from the gym to the ring. Our white collar boxing Hall of Fame celebrates everyday people who trained, fought, and earned their place on fight night in London.",
  path: "/hall-of-fame",
  keywords: [
    "white collar boxing",
    "white collar boxing London",
    "white collar boxing event",
    "amateur boxing fight night",
    "from the gym to the ring",
    "Bodyjunkies boxing",
    "charity boxing event London",
    "boxing hall of fame",
  ],
});

export default function HallOfFamePage() {
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
            White Collar Boxing — Hall of Fame
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            From The Gym To The Ring
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            White collar boxing takes everyday people and puts them through real fight
            preparation. No prior experience required. Just the will to show
            up and do the work.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-white/80 sm:text-base">
            Every name on this page went from the gym to the ring. They trained
            at Bodyjunkies, committed to the process, and stepped between the
            ropes on fight night — a moment they&apos;ll carry with them for
            the rest of their lives.
          </p>
          <div className="mt-8">
            <HallOfFameGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
