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
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02] p-0">
          <TasterSessionEmbed />
        </div>
      </div>
    </main>
  );
}
