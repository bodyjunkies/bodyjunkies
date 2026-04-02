import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HallOfFameGrid } from "../components/hall-of-fame-grid";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Hall of Fame | Bodyjunkies",
  description:
    "Meet the Bodyjunkies members who stepped out of the gym and into the ring. Our white-collar boxing Hall of Fame.",
  path: "/hall-of-fame",
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
            Hall of Fame
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            From The Gym To The Ring
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            These members took their training beyond the bag and stepped into
            the ring. Every name here earned their place through commitment,
            courage, and fight night.
          </p>
          <div className="mt-8">
            <HallOfFameGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
