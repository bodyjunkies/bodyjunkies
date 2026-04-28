import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TasterSessionEmbed } from "../components/taster-session-embed";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Taster Session | Bodyjunkies",
  description:
    "Try a full boxing session at Bodyjunkies for £15 — bring your own gloves and jump straight in.",
  path: "/taster-session",
});

export default function TasterSessionPage() {
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
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Try It Out
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Taster Session £15
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Already have your own gloves? Try a full session. Complete checkout
            below.
          </p>
          <p className="mt-2 max-w-2xl text-xs uppercase tracking-[0.16em] text-white/65">
            Once complete, your confirmation arrives immediately by email.
          </p>
        </div>
        <section
          aria-labelledby="taster-session-included"
          className="mb-5 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2
            id="taster-session-included"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            What&apos;s Included
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-white/85 sm:grid-cols-2 sm:text-base">
            <li>One full small-group boxing class — same format as our regulars</li>
            <li>Live coaching cues and pacing options throughout</li>
            <li>Access to wraps, pads, and bag space at the studio</li>
            <li>Bring your own gloves — that&apos;s the only kit you need</li>
          </ul>
        </section>
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02] p-0">
          <TasterSessionEmbed />
        </div>
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-white/15 bg-black/20 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Who It&apos;s For
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Equipped movers who already own gloves and want to feel the
              Bodyjunkies room before committing. Expect structured rounds,
              technical boxing blocks, and conditioning — not a watered-down
              drop-in. If you have trained boxing or combat sports before,
              this is the cleanest way to test the fit.
            </p>
          </article>
          <article className="rounded-xl border border-white/15 bg-black/20 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              After You Book
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Confirmation arrives by email immediately. Bring water, gloves,
              and training gear. We are at 259 Holloway Road, Islington,
              London — one minute from Holloway Road tube. Arrive 10 to 15
              minutes early so a coach can welcome you and walk through the
              class flow.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
