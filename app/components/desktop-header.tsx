"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Trainers", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

export function DesktopHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/15 bg-[color:var(--bj-navy)]/95 backdrop-blur"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
          aria-label="Bodyjunkies home"
        >
          <Image
            src="/assets/_orange_b_transparent.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span>BODYJUNKIES</span>
        </Link>
        <nav aria-label="Desktop navigation" className="hidden items-center gap-8 md:flex">
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

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:scale-105 hover:bg-white/10 md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: MENU_EASE }}
            className="border-t border-white/15 px-4 pb-5 pt-4 sm:px-6 md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex min-h-11 items-center rounded-xl border border-transparent px-3 text-sm font-semibold uppercase tracking-[0.08em] text-white/85 transition hover:scale-[1.01] hover:border-white/15 hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} className="mt-4">
                <Link
                  href="/starter-pack"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white"
                >
                  Starter Pack £49
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
