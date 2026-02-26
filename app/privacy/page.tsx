import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Bodyjunkies",
  description:
    "Read how Bodyjunkies collects, uses, stores, and protects personal data for memberships, bookings, and coaching communication.",
  path: "/privacy",
});

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/75">Last updated: 25 February 2026</p>

          <div className="mt-6 space-y-5 text-sm text-white/85 sm:text-base">
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                1. Who We Are
              </h2>
              <p className="mt-2">
                Bodyjunkies provides boxing and fitness coaching in Islington,
                London. This policy explains how we handle your personal data
                when you use our website, book sessions, or contact us.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                2. Data We Collect
              </h2>
              <p className="mt-2">
                We may collect your name, email, phone number, booking history,
                and any information you share in lead forms or support messages.
                Payment details are processed by our booking provider and are not
                stored directly on this site.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                3. How We Use Data
              </h2>
              <p className="mt-2">
                We use personal data to manage bookings, answer enquiries,
                support coaching delivery, send essential service messages, and
                improve the website and conversion flow.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                4. Legal Basis
              </h2>
              <p className="mt-2">
                We process data for contract performance (bookings), legitimate
                interests (service improvement and operations), and consent where
                required (non-essential cookies and marketing communications).
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                5. Data Sharing
              </h2>
              <p className="mt-2">
                We share data only with trusted service providers needed for site
                operation, booking, analytics, and communication. Providers must
                protect your data and process it under applicable data laws.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                6. Data Retention
              </h2>
              <p className="mt-2">
                We keep personal data only for as long as needed for service
                delivery, legal obligations, and legitimate business records.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                7. Your Rights
              </h2>
              <p className="mt-2">
                You can request access, correction, deletion, restriction,
                objection, or portability of your data. You can also withdraw
                consent where processing is consent-based.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                8. Contact
              </h2>
              <p className="mt-2">
                For privacy requests, email{" "}
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
