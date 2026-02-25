"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Services", href: "/#services" },
  { label: "FAQ", href: "/faq" },
  { label: "Trainers", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function DesktopHeader() {
  return (
    <header
      className="sticky top-0 z-40 hidden border-b border-white/15 bg-[color:var(--bj-navy)]/95 backdrop-blur md:block"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
        >
          Bodyjunkies
        </Link>
        <nav aria-label="Desktop navigation" className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-[0.08em] text-white/80 transition hover:scale-105 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.05 }}>
            <Link
              href="/starter-pack"
              className="inline-flex rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white"
            >
              Starter Pack £49
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
