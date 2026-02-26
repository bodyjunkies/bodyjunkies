import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TeamTrainerCards } from "../components/team-trainer-cards";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Meet The Team | Bodyjunkies",
  description:
    "Meet the Bodyjunkies coaching team and see each trainer's professional background and personal training style.",
  path: "/team",
});

export default function TeamPage() {
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
            Meet The Team
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Coaches Built For Every Stage
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            Tap a trainer to open their profile. You will see their professional
            background and a personal note on how they coach sessions at
            Bodyjunkies.
          </p>
          <div className="mt-6">
            <TeamTrainerCards />
          </div>
        </section>
      </div>
    </main>
  );
}
