import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MomenceScheduleEmbed } from "../components/momence-schedule-embed";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Schedule | Bodyjunkies",
  description:
    "View the live Bodyjunkies class schedule and book your next boxing, bagwork, or conditioning session in Islington.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <link rel="modulepreload" href="https://momence.com/plugin/host-schedule/host-schedule.js" />
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Book Your Session
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Live Schedule
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Browse upcoming classes and reserve your spot. Times update in real
            time as sessions fill.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-5">
          <MomenceScheduleEmbed />
        </div>
        <p className="mt-5 text-center text-xs text-white/60">
          New to the gym?{" "}
          <Link href="/starter-pack" className="text-white/80 underline-offset-2 hover:underline">
            Start with the Starter Pack
          </Link>{" "}
          or{" "}
          <Link href="/classes" className="text-white/80 underline-offset-2 hover:underline">
            see our weekly timetable
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
