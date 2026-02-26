import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildPageMetadata({
  title: "Terms & Conditions | Bodyjunkies",
  description:
    "Review Bodyjunkies website, booking, cancellation, and session participation terms.",
  path: "/terms",
});

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-white/75">Last updated: 25 February 2026</p>

          <div className="mt-6 space-y-5 text-sm text-white/85 sm:text-base">
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                1. Bookings
              </h2>
              <p className="mt-2">
                Session bookings, memberships, and packages are managed through
                our booking platform. Availability is live and spaces are not
                guaranteed until booking confirmation is complete.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                2. Payments
              </h2>
              <p className="mt-2">
                Prices shown on this website are guidance for current offers.
                Final pricing and billing terms are confirmed at checkout on the
                booking platform.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                3. Cancellations & No-Shows
              </h2>
              <p className="mt-2">
                Cancellation windows and no-show policies follow the rules shown
                in your booking account at the time of purchase. Please review
                those conditions before confirming your booking.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                4. Health & Safety
              </h2>
              <p className="mt-2">
                You are responsible for training within your limits and informing
                coaches of any injuries, conditions, or concerns before class.
                Seek medical advice before starting any new training programme.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                5. Conduct
              </h2>
              <p className="mt-2">
                We maintain a respectful, safe training environment. We reserve
                the right to refuse service or remove participants for unsafe,
                abusive, or disruptive behaviour.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                6. Liability
              </h2>
              <p className="mt-2">
                Training involves physical effort and inherent risk. To the
                extent allowed by law, Bodyjunkies is not liable for indirect or
                consequential loss arising from use of this site or participation
                in sessions.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold uppercase text-white">
                7. Contact
              </h2>
              <p className="mt-2">
                For terms-related queries, email{" "}
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
