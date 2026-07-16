"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// The measurement ID is public (visible in page source on any GA4 site), so
// the fallback keeps analytics working even if the env var is missing.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-XGD7C6J3W9";

type AnalyticsPayload = Record<string, string | number | boolean | null>;

// gtag.js only processes gtag-style `arguments` objects pushed to the
// dataLayer — plain objects and arrays are ignored.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function gtag(..._args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

// Events are sent regardless of cookie consent: Consent Mode (see
// gtag-loader.tsx) keeps storage denied for non-consenting visitors, so
// their events reach GA4 only as cookieless pings used for modeling.
export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  gtag("event", event, payload);
}
