"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics";
import { mountMomenceScheduleScript } from "../lib/momence-embed";

const FALLBACK_BOOKING_URL = "https://momence.com/appointments/93353";
const RENDER_RETRY_DELAY_MS = 2400;
const NO_RENDER_TIMEOUT_MS = 6500;

export function MomenceScheduleEmbed() {
  const pluginMountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    trackEvent("schedule_view_load", {
      path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    const pluginMount = pluginMountRef.current;
    if (!pluginMount) return;
    setStatus("loading");
    let isSettled = false;
    let retryTimeout: number | undefined;
    let noRenderTimeout: number | undefined;

    const hasRenderedEmbed = () => {
      const wrapper = pluginMount.querySelector<HTMLElement>("#ribbon-schedule");
      const hasIframe = pluginMount.querySelector("iframe") !== null;
      return hasIframe || (wrapper?.childElementCount ?? 0) > 0;
    };

    const markReady = () => {
      if (isSettled) return;
      isSettled = true;
      if (retryTimeout) window.clearTimeout(retryTimeout);
      if (noRenderTimeout) window.clearTimeout(noRenderTimeout);
      setStatus("ready");
    };

    const markError = () => {
      if (isSettled) return;
      isSettled = true;
      if (retryTimeout) window.clearTimeout(retryTimeout);
      if (noRenderTimeout) window.clearTimeout(noRenderTimeout);
      setStatus("error");
    };

    const mountEmbed = (cacheBust: boolean) =>
      mountMomenceScheduleScript({
        mountPoint: pluginMount,
        cacheBust,
        config: {
          hostId: "93353",
          teacherIds: "[]",
          locationIds: "[]",
          tagIds: "[]",
          defaultFilter: "show-all",
          locale: "en",
        },
        onLoad: markReady,
        onError: markError,
      });

    let cleanup = mountEmbed(false);
    let didRetryWithCacheBust = false;

    const observer = new MutationObserver(() => {
      if (hasRenderedEmbed()) {
        markReady();
      }
    });
    observer.observe(pluginMount, { childList: true, subtree: true });

    retryTimeout = window.setTimeout(() => {
      if (isSettled) return;
      if (hasRenderedEmbed() || didRetryWithCacheBust) return;
      didRetryWithCacheBust = true;
      cleanup();
      cleanup = mountEmbed(true);
    }, RENDER_RETRY_DELAY_MS);

    noRenderTimeout = window.setTimeout(() => {
      if (isSettled) return;
      if (hasRenderedEmbed()) return;
      markError();
    }, NO_RENDER_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      if (retryTimeout) window.clearTimeout(retryTimeout);
      if (noRenderTimeout) window.clearTimeout(noRenderTimeout);
      cleanup();
    };
  }, []);

  return (
    <div
      className="relative min-h-[540px] rounded-xl border border-white/10 bg-black/20"
    >
      <div ref={pluginMountRef} className="min-h-[540px]" />
      {status === "loading" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Class Schedule
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
