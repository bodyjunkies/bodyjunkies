"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck2, Dumbbell, House, Mail, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/", icon: House },
  { label: "Services", href: "/#services", icon: Dumbbell },
  { label: "Pricing", href: "/pricing", icon: Wallet },
  { label: "Schedule", href: "/schedule", icon: CalendarCheck2 },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current + 8;
      const scrollingUp = currentY < lastScrollY.current - 8;

      if (scrollingDown && currentY > 80) {
        setIsHidden(true);
      } else if (scrollingUp || currentY <= 40) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.replace("/", "");
    }

    if (href === "/") {
      return pathname === "/" && hash === "";
    }

    return pathname === href;
  };

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[color:var(--bj-navy)]/95 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 [transform:translateZ(0)] will-change-transform md:hidden ${isHidden ? "translate-y-full" : "translate-y-0"}`}
      >
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="mx-auto mb-2 flex max-w-lg justify-center"
        >
          <Link
            href="/starter-pack"
            aria-label="Book Starter Pack £49"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-[var(--bj-red)] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_10px_24px_rgba(148,4,5,0.45)]"
          >
            <CalendarCheck2 className="h-3.5 w-3.5" />
            Starter Pack £49
          </Link>
        </motion.div>
        <ul className="mx-auto grid max-w-lg grid-cols-5 gap-2 rounded-2xl border border-white/10 bg-black/20 px-2 py-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = isActiveLink(link.href);

            return (
              <motion.li key={link.label} whileTap={{ scale: 0.94 }}>
                <Link
                  href={link.href}
                  className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold uppercase tracking-[0.08em] transition ${isActive ? "bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                >
                  <Icon className={`h-4 w-4 transition-transform ${isActive ? "scale-105" : ""}`} />
                  {link.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <motion.div
        initial={false}
        animate={{
          opacity: isHidden ? 1 : 0,
          y: isHidden ? 0 : 24,
          pointerEvents: isHidden ? "auto" : "none",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-[calc(0.8rem+env(safe-area-inset-bottom))] z-40 px-3 md:hidden"
        aria-hidden={!isHidden}
      >
        <div className="mx-auto flex max-w-lg justify-center">
          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
            <Link
              href="/starter-pack"
              aria-label="Book Starter Pack £49"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-[var(--bj-red)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_28px_rgba(148,4,5,0.5)]"
            >
              <CalendarCheck2 className="h-3.5 w-3.5" />
              Starter Pack £49
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
