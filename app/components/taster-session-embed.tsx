"use client";

import { withReturnUrl } from "../lib/momence-embed";
import { useMomenceIframe } from "../hooks/use-momence-iframe";

const TASTER_SESSION_BASE_URL = "https://momence.com/m/676912";
const TASTER_SESSION_URL = withReturnUrl(TASTER_SESSION_BASE_URL);
const FALLBACK_BOOKING_URL = TASTER_SESSION_BASE_URL;

export function TasterSessionEmbed() {
  const iframe = useMomenceIframe({
    src: TASTER_SESSION_URL,
    analyticsSource: "taster_session_iframe",
  });

  const height = iframe.height ?? 1200;

  return (
    <div className="relative min-h-[1000px] bg-gradient-to-b from-white/[0.04] to-transparent">
      {iframe.status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Taster Session Checkout
          </p>
        </div>
      )}
      {iframe.status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-md text-sm text-white/80">
            Checkout did not load on this connection.
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
              Open Checkout In New Tab
            </a>
          </div>
        </div>
      )}
      {iframe.status !== "error" && (
        <iframe
          key={iframe.retryKey}
          ref={iframe.iframeRef}
          src={iframe.iframeSrc}
          title="Taster Session - Bodyjunkies"
          className="w-full border-0 transition-[height] duration-300 ease-out"
          style={{ height: `${height}px`, minHeight: "1000px" }}
          loading="eager"
          scrolling="yes"
          allowFullScreen
          onLoad={iframe.onLoad}
          onError={iframe.onError}
        />
      )}
    </div>
  );
}
