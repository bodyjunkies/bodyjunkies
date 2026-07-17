"use client";

export type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

// The measurement ID is public (visible in page source on any GA4 site), so
// the fallback keeps analytics working even if the env var is missing.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-XGD7C6J3W9";

// Ad pixels stay inert until these are set.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

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

// Meta ads optimize against standard events, so the funnel events map onto
// them; anything else is forwarded as a custom event for audience building.
// window.fbq only exists after MetaPixelLoader initializes (consented
// visitors with a pixel ID configured), so this is a no-op otherwise.
function forwardToMeta(event: string, payload: AnalyticsPayload) {
  const fbq = typeof window !== "undefined" ? window.fbq : undefined;
  if (typeof fbq !== "function") return;

  if (event === "starter_pack_click") {
    fbq("track", "InitiateCheckout", { content_name: "starter_pack" });
  } else if (event === "taster_session_click") {
    fbq("track", "Schedule", { content_name: "taster_session" });
  } else if (
    event === "booking_complete" &&
    payload.source === "starter_pack_iframe"
  ) {
    fbq("track", "Purchase", {
      currency: "GBP",
      value: 49,
      content_name: "starter_pack",
    });
  } else {
    fbq("trackCustom", event, payload);
  }
}

// Events are sent to GA regardless of cookie consent: Consent Mode (see
// gtag-loader.tsx) keeps storage denied for non-consenting visitors, so
// their events reach GA4 only as cookieless pings used for modeling.
export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  gtag("event", event, payload);
  forwardToMeta(event, payload);
}
