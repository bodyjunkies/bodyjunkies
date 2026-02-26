"use client";

import { useEffect, useRef, useState } from "react";
import { mountMomenceScheduleScript } from "../lib/momence-embed";

const FALLBACK_BOOKING_URL = "https://momence.com/appointments/93353";
const MOBILE_ROOT_MARGIN_PX = 120;
const DESKTOP_ROOT_MARGIN_PX = 300;
const SPA_LOAD_FALLBACK_DELAY_MS = 1600;

export function MomenceStrengthConditioningEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pluginMountRef = useRef<HTMLDivElement>(null);
  const hasRequestedLoadRef = useRef(false);
  const isBootstrappingRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    shouldLoad ? "loading" : "idle"
  );

  useEffect(() => {
    if (shouldLoad) return;
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const rootMarginPx = window.matchMedia("(max-width: 768px)").matches
      ? MOBILE_ROOT_MARGIN_PX
      : DESKTOP_ROOT_MARGIN_PX;

    const requestLoad = () => {
      if (hasRequestedLoadRef.current) return;
      hasRequestedLoadRef.current = true;
      setShouldLoad(true);
      setStatus("loading");
    };

    const isWithinViewportBuffer = () => {
      const bounds = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      return (
        bounds.top <= viewportHeight + rootMarginPx &&
        bounds.bottom >= -rootMarginPx
      );
    };

    if (isWithinViewportBuffer()) {
      requestLoad();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        requestLoad();
        observer.disconnect();
      },
      { rootMargin: `${rootMarginPx}px 0px` }
    );

    observer.observe(container);
    const fallbackTimeout = window.setTimeout(
      requestLoad,
      SPA_LOAD_FALLBACK_DELAY_MS
    );

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimeout);
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const pluginMount = pluginMountRef.current;
    if (!pluginMount || isBootstrappingRef.current) return;
    isBootstrappingRef.current = true;
    setStatus("loading");

    const cleanup = mountMomenceScheduleScript({
      mountPoint: pluginMount,
      config: {
        hostId: "93353",
        teacherIds: "[]",
        locationIds: "[95520]",
        tagIds: "[164836]",
        liteMode: "true",
        defaultFilter: "show-all",
        locale: "en",
      },
      onLoad: () => {
        isBootstrappingRef.current = false;
        setStatus("ready");
      },
      onError: () => {
        isBootstrappingRef.current = false;
        setStatus("error");
      },
    });

    return () => {
      isBootstrappingRef.current = false;
      cleanup();
    };
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[540px] rounded-xl border border-white/10 bg-black/20"
    >
      <div ref={pluginMountRef} className="min-h-[540px]" />
      {!shouldLoad || status === "loading" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Strength &amp; Conditioning Schedule
          </p>
        </div>
      ) : null}
      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="max-w-md text-sm text-white/80">
            The booking panel did not load on this connection.
          </p>
          <a
            href={FALLBACK_BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Open Booking In New Tab
          </a>
        </div>
      ) : null}
    </div>
  );
}
