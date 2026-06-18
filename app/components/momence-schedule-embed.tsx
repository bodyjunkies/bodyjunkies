"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MOMENCE_HOST_ID,
  SCHEDULE_CONTAINER_ID,
  SCHEDULE_SCRIPT_SRC,
  getTimeoutMultiplier,
} from "../lib/momence-embed";

const SCHEDULE_TIMEOUT_MS = 10_000;
const SCRIPT_ID = "momence-host-schedule-src";

const loadedScheduleUrls = new Set<string>();

function uniqueScheduleUrl(bust: boolean): string {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  let url = bust ? `${SCHEDULE_SCRIPT_SRC}?_r=${suffix}` : SCHEDULE_SCRIPT_SRC;
  if (loadedScheduleUrls.has(url)) {
    url = `${SCHEDULE_SCRIPT_SRC}?_r=${suffix}`;
  }
  loadedScheduleUrls.add(url);
  return url;
}

export function MomenceScheduleEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let settled = false;
    let retryDone = false;
    const mult = getTimeoutMultiplier();
    const timers: number[] = [];

    const markReady = () => {
      if (settled) return;
      settled = true;
      for (const t of timers) window.clearTimeout(t);
      setStatus("ready");
    };

    const markError = () => {
      if (settled) return;
      settled = true;
      for (const t of timers) window.clearTimeout(t);
      setStatus("error");
    };

    const injectScript = (bust: boolean) => {
      const script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.id = SCRIPT_ID;
      script.setAttribute("fetchpriority", "high");
      script.setAttribute("host_id", MOMENCE_HOST_ID);
      script.setAttribute("teacher_ids", "[]");
      script.setAttribute("location_ids", "[]");
      script.setAttribute("tag_ids", "[]");
      script.setAttribute("hide_drop_in_price", "true");
      script.setAttribute("default_filter", "show-all");
      script.setAttribute("locale", "en");
      script.onload = markReady;
      script.onerror = () => {
        if (!retryDone) {
          retryDone = true;
          mountSchedule(true);
          return;
        }
        markError();
      };
      script.src = uniqueScheduleUrl(bust);
      return script;
    };

    const mountSchedule = (bust: boolean) => {
      container.innerHTML = "";
      const wrapper = document.createElement("div");
      wrapper.id = SCHEDULE_CONTAINER_ID;
      container.appendChild(wrapper);
      container.appendChild(injectScript(bust));
    };

    const deferredMountId = window.setTimeout(() => {
      if (settled) return;
      mountSchedule(false);
      timers.push(
        window.setTimeout(() => {
          if (!settled) markError();
        }, SCHEDULE_TIMEOUT_MS * mult),
      );
    }, 0);

    return () => {
      settled = true;
      window.clearTimeout(deferredMountId);
      for (const t of timers) window.clearTimeout(t);
      container.querySelector(`#${SCRIPT_ID}`)?.remove();
    };
  }, [retryKey]);

  const retry = useCallback(() => {
    setStatus("loading");
    setRetryKey((k) => k + 1);
  }, []);

  return (
    <div className="relative min-h-[480px]">
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Schedule
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-md text-sm text-white/80">
            Schedule did not load on this connection.
          </p>
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Try Again
          </button>
        </div>
      )}
      <div
        ref={containerRef}
        className={status === "ready" ? "min-h-[480px]" : "min-h-0 opacity-0"}
        aria-hidden={status !== "ready"}
      />
    </div>
  );
}
