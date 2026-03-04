import Link from "next/link";
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "../lib/site";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact | Bodyjunkies",
  description:
    "Contact Bodyjunkies in Islington for class bookings, Starter Pack questions, and personal training enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappHref =
    "https://wa.me/447458672586?text=Hi%21%20I%27m%20interested%20in%20the%20Bodyjunkies%20Starter%20Pack.";

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

        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Tell us where you are now and where you want to get to. We will
            point you to the best place to start.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {siteConfig.phoneDisplay && siteConfig.phoneHref ? (
              <a
                href={siteConfig.phoneHref}
                className="rounded-xl border border-white/15 bg-black/20 p-4 transition hover:scale-[1.01]"
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                  <Phone className="h-4 w-4" />
                  Phone
                </p>
                <p className="mt-2 text-lg font-bold text-white">
                  {siteConfig.phoneDisplay}
                </p>
              </a>
            ) : null}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/15 bg-black/20 p-4 transition hover:scale-[1.01]"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </p>
              <p className="mt-2 text-lg font-bold text-white">
                +44 7458 672586
              </p>
            </a>
            <a
              href={siteConfig.emailHref}
              className="rounded-xl border border-white/15 bg-black/20 p-4 transition hover:scale-[1.01]"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="mt-2 text-lg font-bold text-white">
                {siteConfig.email}
              </p>
            </a>
          </div>

          <div className="mt-4 rounded-xl border border-white/15 bg-black/20 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              <MapPin className="h-4 w-4" />
              Location
            </p>
            <p className="mt-2 text-sm text-white/85">
              {siteConfig.addressLine1}, {siteConfig.addressLine2}
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.89910346624!2d-0.11407002359254548!3d51.55174910746285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b7473021b31%3A0x1958817c0ec4e2a6!2sBodyjunkies%20%7C%20Fitness%20%26%20Boxing%20Studio%20Islington!5e0!3m2!1sen!2suk!4v1772113760158!5m2!1sen!2suk"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-4 w-full rounded-lg"
              title="Bodyjunkies location map"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/starter-pack"
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Starter Pack £49
            </Link>
            <a
              href="https://momence.com/u/bodyjunkies-NFLGZG"
              target="_blank"
              rel="noreferrer"
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
