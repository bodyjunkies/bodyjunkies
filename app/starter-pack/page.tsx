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
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02] p-0">
          <StarterPackEmbed />
        </div>
      </div>
    </main>
  );
}
