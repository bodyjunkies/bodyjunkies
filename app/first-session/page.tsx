import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "First Session | Bodyjunkies",
  description:
    "See exactly what to expect in your first Bodyjunkies session: arrival, warm-up, class flow, and next steps.",
  path: "/first-session",
});

const steps = [
  {
    title: "Before You Arrive",
    copy: "Book your slot, bring water, and wear training gear you can move in. If you have wraps or gloves, bring them.",
  },
  {
    title: "Check-In",
    copy: "Arrive 10 to 15 minutes early so the team can welcome you, confirm your booking, and answer any quick questions.",
  },
  {
    title: "Class Format",
    copy: "Expect structured rounds: warm-up, technical boxing blocks, conditioning, then a clean finish. Coaches cue every stage.",
  },
  {
    title: "Coaching Support",
    copy: "You get live corrections, pacing options, and clear standards so you can train hard without getting lost in the room.",
  },
  {
    title: "After Class",
    copy: "Your coach helps you choose your next step: continue with classes, commit to the Starter Pack pathway, or go 1:1.",
  },
];

export default function FirstSessionPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            First Session
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            What To Expect
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            No guesswork. Here is how your first session flows from arrival to
            finish.
          </p>

          <div className="mt-6 space-y-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-white/15 bg-black/20 p-4"
              >
                <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.08em] text-white sm:text-base">
                  <CheckCircle2 className="h-4 w-4 text-[var(--bj-orange)]" />
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-white/85 sm:text-base">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/starter-pack"
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Starter Pack £49
            </a>
            <a
              href="https://momence.com/u/bodyjunkies-NFLGZG"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Book A Class
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
