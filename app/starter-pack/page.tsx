import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StarterPackEmbed } from "../components/starter-pack-embed";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Starter Pack | Bodyjunkies",
  description:
    "Get started with the Starter Pack — gloves, intro sessions, and your base at Bodyjunkies.",
  path: "/starter-pack",
});

export default function StarterPackPage() {
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
            Get Started
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Starter Pack £49
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Gloves, intro sessions, and your base. Complete checkout below.
          </p>
          <p className="mt-2 max-w-2xl text-xs uppercase tracking-[0.16em] text-white/65">
            Once complete, your confirmation arrives immediately by email.
          </p>
        </div>
        <section
          aria-labelledby="starter-pack-included"
          className="mb-5 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2
            id="starter-pack-included"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            What&apos;s Included
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-white/85 sm:grid-cols-2 sm:text-base">
            <li>Boxing gloves and wraps to keep — yours from day one</li>
            <li>Intro sessions to build technique and confidence</li>
            <li>Live coaching cues, pacing options, and clear standards</li>
            <li>Full access to the Bodyjunkies schedule once you start</li>
          </ul>
        </section>
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02] p-0">
          <StarterPackEmbed />
        </div>
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-white/15 bg-black/20 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Who It&apos;s For
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Total beginners and anyone returning to training. The Starter
              Pack pathway is built so you can step into a small-group boxing
              class with a coach beside you, learn the fundamentals at the
              right pace, and keep the kit you trained in. No prior
              experience required.
            </p>
          </article>
          <article className="rounded-xl border border-white/15 bg-black/20 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              After You Book
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Confirmation arrives by email immediately. Bring water and
              training gear — your gloves and wraps are waiting at the studio
              at 259 Holloway Road, Islington, one minute from Holloway Road
              tube. Coaches will brief you on arrival.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
