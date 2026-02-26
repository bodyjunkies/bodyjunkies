import { MomenceStrengthConditioningEmbed } from "../../components/momence-strength-conditioning-embed";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Strength & Conditioning | Bodyjunkies",
  description: "Book strength and conditioning sessions at Bodyjunkies.",
  path: "/schedule/strength-conditioning",
});

export default function StrengthConditioningSchedulePage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
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
            Strength & Conditioning
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Book Your Session
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Power blocks built for endurance and athletic output.
          </p>
          <p className="mt-2 max-w-2xl text-xs uppercase tracking-[0.16em] text-white/65">
            Pick your block and receive instant booking confirmation.
          </p>
        </div>
        <div className="min-h-[60vh] rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-6">
          <MomenceStrengthConditioningEmbed />
        </div>
      </div>
    </main>
  );
}
