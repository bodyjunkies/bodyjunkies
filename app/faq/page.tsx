import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "FAQ | Bodyjunkies",
  description:
    "Answers to common questions about beginner suitability, equipment, session format, bookings, and cancellations at Bodyjunkies.",
  path: "/faq",
});

const faqs = [
  {
    q: "Is Bodyjunkies suitable for complete beginners?",
    a: "Yes. If you are new, start with the Starter Pack. Coaches break down fundamentals and keep standards high without throwing you in at the deep end.",
  },
  {
    q: "Do I need my own gloves?",
    a: "No for your first phase. The Starter Pack includes gloves and intro sessions so you can start properly with your own kit.",
  },
  {
    q: "What if my fitness level is low right now?",
    a: "You can still start. Sessions are coached with options and progression while keeping intensity and accountability in the room.",
  },
  {
    q: "Can I train if I have an injury or limitation?",
    a: "Tell your coach before class and train within safe limits. We can adapt drills where possible, but always follow medical advice first.",
  },
  {
    q: "How do bookings and cancellations work?",
    a: "Bookings and cancellation windows are managed in Momence. Final terms are shown at checkout and in your booking account.",
  },
  {
    q: "What should I bring to class?",
    a: "Bring water, comfortable training clothes, and your wraps/gloves if you already have them. Arrive early for your first session.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
            FAQ
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Quick Answers Before You Book
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Everything you need to know before stepping in.
          </p>

          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <article
                key={item.q}
                className="rounded-xl border border-white/15 bg-black/20 p-4"
              >
                <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-white sm:text-base">
                  {item.q}
                </h2>
                <p className="mt-2 text-sm text-white/85 sm:text-base">{item.a}</p>
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
              href="/schedule"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              View Schedule
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
