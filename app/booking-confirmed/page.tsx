import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { BookingConfirmedTracker } from "../components/booking-confirmed-tracker";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Booking Confirmed | Bodyjunkies",
  description:
    "Your booking is confirmed. Get ready for your next Bodyjunkies session and choose your next step.",
  path: "/booking-confirmed",
});

export default function BookingConfirmedPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <BookingConfirmedTracker />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Confirmation
          </p>
          <h1 className="mt-3 flex items-center gap-2 text-3xl font-black uppercase text-white sm:text-4xl">
            <CheckCircle2 className="h-7 w-7 text-[var(--bj-orange)]" />
            Booking Confirmed
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
            You are locked in. We will see you in session. Keep momentum by
            planning your next step now.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://momence.com/u/bodyjunkies-NFLGZG"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Book Another Session
            </a>
            <Link
              href="/personal-training"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Explore Personal Training
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Back To Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
