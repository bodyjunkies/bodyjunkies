"use client";

import { useEffect } from "react";
import { isFramed, trackEvent } from "../lib/analytics";
import { getMomenceProduct } from "../lib/momence-embed";

// Momence sends buyers here through the "checkout purchase tracking URL" set
// in its host settings (https://bodyjunkies.co.uk/booking-confirmed),
// appending ?type=membership&membershipId=<id> after a purchase and
// ?type=session&sessionId=<id> after a class booking. A purchase in the
// site's embedded checkout redirects inside the iframe, so the page re-opens
// itself in the top window, marked checkout=embedded, and records it there.
export function BookingConfirmedTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const membershipId = params.get("membershipId");

    if (isFramed()) {
      // Carry over only the purchase details: Momence also appends any UTM
      // params it stored, which would start a new GA4 session.
      const target = new URL(window.location.pathname, window.location.origin);
      if (type) target.searchParams.set("type", type);
      if (membershipId) target.searchParams.set("membershipId", membershipId);
      target.searchParams.set("checkout", "embedded");
      try {
        window.top?.location.replace(target.href);
      } catch {
        // Framed by another site, whose window can't be navigated.
      }
      return;
    }

    if (!window.location.search) return;
    // Drop the params so a reload or a shared link can't record the purchase
    // twice.
    window.history.replaceState(null, "", window.location.pathname);

    // Class bookings land here too, but they aren't purchases.
    if (type !== "membership" || !membershipId) return;

    const product = getMomenceProduct(membershipId);
    // booking_complete counts purchases made in the site's own checkout;
    // purchases made on Momence's pages (direct links, the new-tab fallback)
    // are kept separate so the key event only reflects the website funnel.
    trackEvent(
      params.get("checkout") === "embedded"
        ? "booking_complete"
        : "momence_direct_purchase",
      {
        membership_id: membershipId,
        product: product?.product ?? "other",
        ...(product?.value !== undefined
          ? { value: product.value, currency: "GBP" }
          : {}),
      },
    );
  }, []);

  return null;
}
