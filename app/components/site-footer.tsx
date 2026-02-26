import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, Clock3 } from "lucide-react";
import { siteConfig } from "../lib/site";

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const quickLinks = [
  { label: "Starter Pack", href: "/starter-pack" },
  { label: "Schedule", href: "/schedule" },
  { label: "Pricing", href: "/pricing" },
  { label: "First Session", href: "/first-session" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-black/20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
            Bodyjunkies
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase text-white">
            Fuel Your Fire
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/80">
            Boxing and conditioning in Islington with high standards, tight
            coaching, and a community that keeps you accountable.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/85">
            <MapPin className="h-4 w-4" />
            <a
              href={siteConfig.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              {siteConfig.addressLine1}, {siteConfig.addressLine2}
            </a>
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/85">
            {siteConfig.phoneDisplay && siteConfig.phoneHref ? (
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            ) : null}
            <a
              href={siteConfig.emailHref}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
            {siteConfig.social.instagram ? (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            ) : null}
          </div>
          <div id="footer-opening-hours" className="mt-5 rounded-xl border border-white/15 bg-white/[0.03] p-4">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
              <Clock3 className="h-3.5 w-3.5" />
              Opening Hours
            </p>
            <ul className="mt-3 space-y-1 text-sm text-white/85">
              {siteConfig.openingHours.map((line) => {
                const colon = line.indexOf(": ");
                const days = colon >= 0 ? line.slice(0, colon) : line;
                const hours = colon >= 0 ? line.slice(colon + 2) : "";
                return (
                  <li key={line} className="flex gap-4">
                    <span className="w-20 shrink-0">{days}</span>
                    <span className="tabular-nums">{hours}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
            Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/85 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div id="footer-legal-links" className="mt-6 border-t border-white/10 pt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
}
