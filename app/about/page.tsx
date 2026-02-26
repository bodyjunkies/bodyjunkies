import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AboutContent } from "../components/about-content";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "About Us | Bodyjunkies",
  description:
    "Discover Bodyjunkies: gritty small-group boxing and fitness coaching in London, built on community, accountability, and inner fire.",
  path: "/about",
});

export default function AboutPage() {
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

        <AboutContent />
      </div>
    </main>
  );
}
