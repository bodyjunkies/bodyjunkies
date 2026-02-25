"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_NOTICE_KEY = "bj_cookie_notice_dismissed_v1";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(COOKIE_NOTICE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(COOKIE_NOTICE_KEY, "1");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-[calc(var(--cookie-notice-bottom-mobile)+env(safe-area-inset-bottom))] z-40 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <div className="rounded-2xl border border-white/20 bg-black/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          Cookies
        </p>
        <p className="mt-2 text-sm text-white/90">
          We use cookies and analytics to improve performance and conversion
          journeys. Learn more in our{" "}
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
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[var(--bj-red)] px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02] active:scale-[0.98]"
        >
          Understood
        </button>
      </div>
    </div>
  );
}
