"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getStoredCookieConsent,
  setStoredCookieConsent,
} from "../lib/cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !getStoredCookieConsent()
  );

  const chooseConsent = (status: "accepted" | "rejected") => {
    setStoredCookieConsent(status);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-[calc(var(--cookie-notice-bottom-mobile)+env(safe-area-inset-bottom)+0.25rem)] z-40 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <div className="rounded-2xl border border-white/20 bg-black/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          Cookies
        </p>
        <p className="mt-2 text-sm text-white/90">
          We use necessary cookies for core site functionality. Optional
          analytics helps us improve performance and booking journeys. Learn
          more in our{" "}
          <Link
            href="/cookies"
            className="underline decoration-white/60 underline-offset-4"
          >
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline decoration-white/60 underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => chooseConsent("accepted")}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--bj-red)] px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Accept Analytics
          </button>
          <button
            type="button"
            onClick={() => chooseConsent("rejected")}
            className="inline-flex min-h-11 items-center rounded-full border border-white/35 bg-white/10 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Necessary Only
          </button>
        </div>
      </div>
    </div>
  );
}
