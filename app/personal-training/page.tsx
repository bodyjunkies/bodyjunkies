import Link from "next/link";
import { ArrowLeft, Target, Flame, LineChart } from "lucide-react";
import { MomencePersonalTrainingEmbed } from "../components/momence-personal-training-embed";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Personal Training | 1:1 Boxing & Conditioning Coaching, Islington | Bodyjunkies",
  description:
    "One-to-one boxing and conditioning coaching at our Islington studio. Tailored technique, strength, and conditioning. Book direct or share your goals to be matched with the right coach.",
  path: "/personal-training",
  keywords: [
    "personal training London",
    "personal training Islington",
    "boxing personal trainer London",
    "1:1 boxing coaching",
    "boxing conditioning coach",
  ],
});

export default function PersonalTrainingPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <link rel="modulepreload" href="https://momence.com/plugin/lead-form/lead-form.js" />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="mb-8 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Personal Training
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            1:1 Coaching
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
            One-to-one boxing and conditioning coaching at our Islington studio.
            Built around <span className="font-bold text-white">your level, your goal, and your schedule</span> —
            not a generic gym programme. Every session is led by a coach who
            knows where you are now and what the next round of progress looks
            like.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-white/15 bg-black/20 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Target className="h-4 w-4 text-white" aria-hidden />
              </span>
              <h2 className="mt-3 text-lg font-black uppercase text-white">
                Boxing Technique
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Stance, footwork, defence, and pad rounds — broken down round by
                round. Beginners welcome. Experienced fighters sharpened.
              </p>
            </article>

            <article className="rounded-xl border border-white/15 bg-black/20 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Flame className="h-4 w-4 text-white" aria-hidden />
              </span>
              <h2 className="mt-3 text-lg font-black uppercase text-white">
                Strength & Conditioning
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Strength, HIIT, and engine work programmed around boxing
                demands. Build the body that holds up in the last round.
              </p>
            </article>

            <article className="rounded-xl border border-white/15 bg-black/20 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <LineChart className="h-4 w-4 text-white" aria-hidden />
              </span>
              <h2 className="mt-3 text-lg font-black uppercase text-white">
                Tracked Progress
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Goals set in session one. Programme reviewed as you adapt.
                Monthly measurements logged in your Momence profile to show the
                work.
              </p>
            </article>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-black/20 p-5">
              <h2 className="text-lg font-black uppercase text-white">
                What A Session Looks Like
              </h2>
              <p className="mt-2 text-sm text-white/85">
                A typical 60-minute slot covers a warm-up tuned to the day&apos;s
                focus, a technical block on pads or bag, a strength or
                conditioning piece, and a debrief on what to drill before the
                next session. Sessions run from our Islington studio at 259
                Holloway Road.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/20 p-5">
              <h2 className="text-lg font-black uppercase text-white">
                Who It&apos;s For
              </h2>
              <p className="mt-2 text-sm text-white/85">
                People who want structure, clear technique, and a coach in their
                corner. New to boxing and want gloves-up basics done right.
                Returning to training after a break. Or already in the room and
                ready to push the next level.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-white/80">
            Book direct via the calendar below, or share your goals through the
            lead form so we can match you to the right coach and time.
          </p>
        </section>

        <MomencePersonalTrainingEmbed />
      </div>
    </main>
  );
}
