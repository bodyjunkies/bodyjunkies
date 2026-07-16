"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  COOKIE_CONSENT_EVENT,
  getStoredCookieConsent,
} from "../lib/cookie-consent";
import { GA_MEASUREMENT_ID, gtag } from "../lib/analytics";

function applyConsent(command: "default" | "update", granted: boolean) {
  const value = granted ? "granted" : "denied";
  gtag("consent", command, {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
    ...(command === "default" ? { wait_for_update: 500 } : {}),
  });
}

function ensureGtagLoaded() {
  if (document.getElementById("gtag-base")) return;

  const script = document.createElement("script");
  script.id = "gtag-base";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

let lastTrackedPath: string | null = null;

export function GtagLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Consent Mode v2: set the consent state before the tag loads, then load
    // it unconditionally. Visitors who decline (or ignore the banner) send
    // cookieless pings that GA4 uses for modeling; storage is only granted
    // after "Accept Analytics".
    applyConsent("default", getStoredCookieConsent() === "accepted");
    gtag("js", new Date());
    // send_page_view: false — page_view for the initial load and every
    // client-side navigation is sent by the pathname effect below, so the
    // config must not send its own.
    gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
    ensureGtagLoaded();

    const onConsentChange = () => {
      applyConsent("update", getStoredCookieConsent() === "accepted");
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
    };
  }, []);

  useEffect(() => {
    // Next.js updates document.title shortly after the route commit, so wait
    // a beat before reading it or GA attributes the view to the old title.
    // The dedupe lives inside the callback so a double-mount (StrictMode)
    // that cancels the first timer still sends exactly one page_view.
    const timer = window.setTimeout(() => {
      if (pathname === lastTrackedPath) return;
      lastTrackedPath = pathname;
      gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: pathname,
        page_title: document.title,
      });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
