"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  COOKIE_CONSENT_EVENT,
  getStoredCookieConsent,
} from "../lib/cookie-consent";
import { META_PIXEL_ID, type FbqFunction } from "../lib/analytics";

let pixelInitialized = false;
let lastTrackedPath: string | null = null;

// TypeScript port of Meta's standard fbevents.js bootstrap snippet.
function bootstrapMetaPixel() {
  if (window.fbq) return;

  const fbq: FbqFunction = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as FbqFunction;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.id = "meta-pixel-base";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

// Unlike the Google tags (which run pre-consent as cookieless pings under
// Consent Mode), the Meta pixel has no equivalent mechanism, so it only
// loads after the visitor accepts the cookie banner.
export function MetaPixelLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (!META_PIXEL_ID) return;

    const maybeInit = () => {
      if (pixelInitialized) return;
      if (getStoredCookieConsent() !== "accepted") return;
      bootstrapMetaPixel();
      window.fbq?.("init", META_PIXEL_ID);
      window.fbq?.("track", "PageView");
      lastTrackedPath = window.location.pathname;
      pixelInitialized = true;
    };

    maybeInit();
    window.addEventListener(COOKIE_CONSENT_EVENT, maybeInit);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, maybeInit);
    };
  }, []);

  useEffect(() => {
    if (!pixelInitialized) return;
    if (pathname === lastTrackedPath) return;
    lastTrackedPath = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
