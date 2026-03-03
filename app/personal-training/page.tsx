import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MomencePersonalTrainingEmbed } from "../components/momence-personal-training-embed";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Personal Training | Bodyjunkies",
  description:
    "Book personal training sessions or share your goals through the lead form at Bodyjunkies.",
  path: "/personal-training",
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
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Personal Training
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            1:1 Coaching
          </h1>
        </div>
        <MomencePersonalTrainingEmbed />
      </div>
    </main>
  );
}
