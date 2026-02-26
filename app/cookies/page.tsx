import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildPageMetadata({
  title: "Cookie Policy | Bodyjunkies",
  description:
    "Understand how Bodyjunkies uses cookies and similar technologies for site functionality, analytics, and booking experiences.",
  path: "/cookies",
});

export default function CookiesPage() {
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
        <article className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-white/75">Last updated: 25 February 2026</p>

          <div className="mt-6 space-y-5 text-sm text-white/85 sm:text-base">
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                1. What Are Cookies
              </h2>
              <p className="mt-2">
                Cookies are small text files placed on your device to help
                websites work, remember preferences, and measure performance.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                2. Cookies We Use
              </h2>
              <p className="mt-2">
                We use essential cookies for core site and booking functionality,
                and analytics cookies to understand user journeys and improve
                conversion performance.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                3. Third-Party Tools
              </h2>
              <p className="mt-2">
                Booking and embedded services may set their own cookies,
                including our scheduling and checkout providers. Their policies
                apply to those cookies.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                4. Managing Cookies
              </h2>
              <p className="mt-2">
                You can control cookies in your browser settings, including
                blocking or deleting cookies. Some site functionality may be
                limited if essential cookies are disabled.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                5. Contact
              </h2>
              <p className="mt-2">
                Questions about cookies can be sent to{" "}
                <a className="underline underline-offset-4" href={siteConfig.emailHref}>
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
