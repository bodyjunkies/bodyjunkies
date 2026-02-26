"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
const CTA_REVEAL_VIEWPORT_RATIO = 0.2;

export function MobileStarterPackCta() {
  const pathname = usePathname();
  const [showStarterPackCta, setShowStarterPackCta] = useState(false);

  useEffect(() => {
    const shouldTrackBeginnerCard = pathname === "/";

    if (!shouldTrackBeginnerCard) {
      setShowStarterPackCta(false);
      return;
    }

    const updateStarterPackVisibility = () => {
      const beginnerCard = document.getElementById("gateway-beginner-card");

      if (!beginnerCard) {
        setShowStarterPackCta(false);
        return;
      }

      const beginnerCardBounds = beginnerCard.getBoundingClientRect();
      const revealLine = window.innerHeight * CTA_REVEAL_VIEWPORT_RATIO;
      setShowStarterPackCta(beginnerCardBounds.bottom <= revealLine);
    };

    updateStarterPackVisibility();
    window.addEventListener("scroll", updateStarterPackVisibility, { passive: true });
    window.addEventListener("resize", updateStarterPackVisibility);

    return () => {
      window.removeEventListener("scroll", updateStarterPackVisibility);
      window.removeEventListener("resize", updateStarterPackVisibility);
    };
  }, [pathname]);

  return (
    <motion.div
      aria-label="Starter Pack quick action"
      initial={false}
      animate={
        showStarterPackCta
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 14, scale: 0.98 }
      }
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(0.8rem+env(safe-area-inset-bottom))] md:hidden"
      style={{ pointerEvents: showStarterPackCta ? "auto" : "none" }}
    >
      <div className="mx-auto max-w-sm rounded-full border border-white/15 bg-white/[0.08] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm [transform:translateZ(0)]">
        <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }}>
          <Link
            href="/starter-pack"
            aria-label="Book Starter Pack £49"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-[var(--bj-red)]/95 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_18px_rgba(148,4,5,0.28)]"
          >
            <CalendarCheck2 className="h-4 w-4" />
            Starter Pack £49
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
