"use client";

import { motion } from "framer-motion";
import { CalendarCheck2, CircleHelp, Dumbbell, House, Mail, Wallet } from "lucide-react";

const links = [
  { label: "Home", href: "/", icon: House },
  { label: "Services", href: "/#services", icon: Dumbbell },
  { label: "Pricing", href: "/pricing", icon: Wallet },
  { label: "FAQ", href: "/faq", icon: CircleHelp },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[color:var(--bj-navy)]/95 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold uppercase tracking-[0.08em] text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      <motion.a
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        href="/starter-pack"
        className="mx-auto mt-2 flex min-h-12 w-full max-w-lg items-center justify-center gap-2 rounded-xl bg-[var(--bj-red)] px-4 text-sm font-bold uppercase tracking-[0.1em] text-white"
      >
        <CalendarCheck2 className="h-4 w-4" />
        Book Now
      </motion.a>
    </nav>
  );
}
