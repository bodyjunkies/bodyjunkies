"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics";

const BOOKING_CONFIRMED_URL = "https://bodyjunkies.co.uk/booking-confirmed";
const STARTER_PACK_BASE_URL =
  "https://momence.com/Bodyjunkies/membership/Intro-Package/539286";
const FALLBACK_BOOKING_URL = STARTER_PACK_BASE_URL;

function withReturnUrl(url: string) {
  const nextUrl = new URL(url);
  // Add common return-url keys so completion can route back deterministically.
  nextUrl.searchParams.set("return_url", BOOKING_CONFIRMED_URL);
  nextUrl.searchParams.set("returnUrl", BOOKING_CONFIRMED_URL);
  return nextUrl.toString();
}

const STARTER_PACK_URL = withReturnUrl(STARTER_PACK_BASE_URL);

export function StarterPackEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const [iframeHeight, setIframeHeight] = useState(1200);
  const [iframeStatus, setIframeStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const hasTrackedBookingCompleteRef = useRef(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }
    setIframeStatus("loading");

    const onMessage = (event: MessageEvent) => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow || event.source !== iframeWindow) {
        return;
      }

      const data = event.data as { height?: number | string; type?: string } | null;
      if (!data) {
        return;
      }

      const height =
        typeof data.height === "number"
          ? data.height
          : typeof data.height === "string"
            ? Number(data.height)
            : NaN;

      if (!Number.isFinite(height) || height < 700) {
        return;
      }

      if (typeof data.type === "string" && !data.type.includes("resize")) {
        const message = data.type.toLowerCase();
        if (
          !hasTrackedBookingCompleteRef.current &&
          /(book|checkout|payment).*(complete|success|confirmed)|confirmation/.test(
            message
          )
        ) {
          hasTrackedBookingCompleteRef.current = true;
          trackEvent("booking_complete", {
            source: "starter_pack_iframe",
            path: window.location.pathname,
          });
        }
        return;
      }

      setIframeHeight(Math.ceil(height));

      const rawMessage = JSON.stringify(event.data).toLowerCase();
      if (
        !hasTrackedBookingCompleteRef.current &&
        /(book|checkout|payment).*(complete|success|confirmed)|confirmation/.test(
          rawMessage
        )
      ) {
        hasTrackedBookingCompleteRef.current = true;
        trackEvent("booking_complete", {
          source: "starter_pack_iframe",
          path: window.location.pathname,
        });
      }
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[1000px] bg-gradient-to-b from-white/[0.04] to-transparent"
    >
      {!shouldLoad || iframeStatus === "loading" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Starter Pack Checkout
          </p>
        </div>
      ) : null}
      {iframeStatus === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-md text-sm text-white/80">
            Checkout did not load on this connection.
          </p>
          <a
            href={FALLBACK_BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Open Checkout In New Tab
          </a>
        </div>
      ) : null}
      {shouldLoad && iframeStatus !== "error" ? (
        <iframe
          ref={iframeRef}
          src={STARTER_PACK_URL}
          title="Starter Pack - Bodyjunkies"
          className="w-full border-0 transition-[height] duration-300 ease-out"
          style={{ height: `${iframeHeight}px`, minHeight: "1000px" }}
          loading="lazy"
          scrolling="yes"
          allowFullScreen
          onLoad={() => setIframeStatus("ready")}
          onError={() => setIframeStatus("error")}
        />
      ) : null}
    </div>
  );
}
