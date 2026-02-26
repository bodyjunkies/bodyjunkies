"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck2 } from "lucide-react";
import { useEffect, useState } from "react";

const CTA_REVEAL_VIEWPORT_RATIO = 0.2;
// Approximate height of the full-width CTA (button + wrapper padding + bottom padding)
const FULL_CTA_HEIGHT_PX = 80;
// Safe zone above legal links in compact mode
const COMPACT_SAFE_ZONE_PX = 14;

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileStarterPackCta() {
  const pathname = usePathname();
  const [showStarterPackCta, setShowStarterPackCta] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [compactBottom, setCompactBottom] = useState(COMPACT_SAFE_ZONE_PX);

  useEffect(() => {
    const shouldTrackBeginnerCard = pathname === "/";

    if (!shouldTrackBeginnerCard) {
      setShowStarterPackCta(false);
      return;
    }

    const update = () => {
      const beginnerCard = document.getElementById("gateway-beginner-card");
      const openingHoursCard = document.getElementById("footer-opening-hours");
      const legalLinks = document.getElementById("footer-legal-links");

      if (!beginnerCard) {
        setShowStarterPackCta(false);
        return;
      }

      const beginnerCardBounds = beginnerCard.getBoundingClientRect();
      const revealLine = window.innerHeight * CTA_REVEAL_VIEWPORT_RATIO;
      const isVisible = beginnerCardBounds.bottom <= revealLine;
      setShowStarterPackCta(isVisible);

      if (!isVisible) return;

      // Switch to compact when the opening hours card's bottom has scrolled above
      // the zone where the full-width CTA sits (bottom of viewport).
      if (openingHoursCard) {
        const oHBounds = openingHoursCard.getBoundingClientRect();
        setIsCompact(oHBounds.bottom < window.innerHeight - FULL_CTA_HEIGHT_PX);
      }

      // Dynamically lift the compact CTA above the legal links section.
      if (legalLinks) {
        const legalBounds = legalLinks.getBoundingClientRect();
        const legalVisiblePx = window.innerHeight - legalBounds.top;
        setCompactBottom(
          legalVisiblePx > 0
            ? legalVisiblePx + COMPACT_SAFE_ZONE_PX
            : COMPACT_SAFE_ZONE_PX,
        );
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      {showStarterPackCta && !isCompact && (
        <motion.div
          key="full"
          aria-label="Starter Pack quick action"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.24, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(0.8rem+env(safe-area-inset-bottom))] md:hidden"
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
      )}

      {showStarterPackCta && isCompact && (
        <motion.div
          key="compact"
          aria-label="Starter Pack quick action"
          initial={{ opacity: 0, scale: 0.82, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 8 }}
          transition={{ duration: 0.24, ease: EASE }}
          className="fixed right-4 z-50 md:hidden"
          style={{
            bottom: compactBottom,
            // CSS transition handles smooth repositioning as user scrolls;
            // Framer Motion handles enter/exit via transform, so no conflict.
            transition: "bottom 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="rounded-full border border-white/15 bg-white/[0.08] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm [transform:translateZ(0)]">
            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }}>
              <Link
                href="/starter-pack"
                aria-label="Book Starter Pack £49"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[var(--bj-red)]/95 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_18px_rgba(148,4,5,0.28)]"
              >
                <CalendarCheck2 className="h-3.5 w-3.5 shrink-0" />
                £49
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
