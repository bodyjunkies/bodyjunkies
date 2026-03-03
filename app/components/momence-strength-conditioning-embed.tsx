"use client";

import { withReturnUrl } from "../lib/momence-embed";
import { useMomenceIframe } from "../hooks/use-momence-iframe";

const SCHEDULE_BASE_URL = "https://momence.com/u/bodyjunkies-NFLGZG";
const SCHEDULE_URL = withReturnUrl(SCHEDULE_BASE_URL);
const FALLBACK_BOOKING_URL = SCHEDULE_BASE_URL;

export function MomenceStrengthConditioningEmbed() {
  const iframe = useMomenceIframe({
    src: SCHEDULE_URL,
    analyticsSource: "strength_conditioning_iframe",
  });

  return (
    <div className="relative min-h-[540px] rounded-xl border border-white/10 bg-black/20">
      {iframe.status !== "error" && (
        <iframe
          key={iframe.retryKey}
          ref={iframe.iframeRef}
          src={iframe.iframeSrc}
          className="min-h-[540px] w-full border-0"
          allowFullScreen
          scrolling="yes"
          loading="eager"
          title="Bodyjunkies Strength &amp; Conditioning Schedule"
          onLoad={iframe.onLoad}
          onError={iframe.onError}
        />
      )}
      {iframe.status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Strength &amp; Conditioning Schedule
          </p>
        </div>
      )}
      {iframe.status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="max-w-md text-sm text-white/80">
            The booking panel did not load on this connection.
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <button
              type="button"
              onClick={iframe.retry}
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Try Again
            </button>
            <a
              href={FALLBACK_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Open Booking In New Tab
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
