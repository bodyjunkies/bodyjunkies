"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  cacheBustUrl,
  getTimeoutMultiplier,
  isMomenceOrigin,
} from "../lib/momence-embed";
import { trackEvent } from "../lib/analytics";

type IframeStatus = "loading" | "ready" | "error";

type UseMomenceIframeOptions = {
  src: string;
  timeoutMs?: number;
  minHeight?: number;
  analyticsSource?: string;
  bookingCompletePattern?: RegExp;
};

const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_MIN_HEIGHT = 700;
const DEFAULT_BOOKING_PATTERN =
  /(book|appointment|checkout|payment).*(complete|success|confirmed)|confirmation/;

export function useMomenceIframe(options: UseMomenceIframeOptions) {
  const {
    src,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    minHeight = DEFAULT_MIN_HEIGHT,
    analyticsSource = "momence_iframe",
    bookingCompletePattern = DEFAULT_BOOKING_PATTERN,
  } = options;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasTrackedRef = useRef(false);

  const [status, setStatus] = useState<IframeStatus>("loading");
  const [retryKey, setRetryKey] = useState(0);
  const [iframeSrc, setIframeSrc] = useState(src);
  const [height, setHeight] = useState<number | null>(null);

  // Timeout: mark error if iframe doesn't load in time
  useEffect(() => {
    if (status !== "loading") return;
    const mult = getTimeoutMultiplier();
    const timer = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, timeoutMs * mult);
    return () => window.clearTimeout(timer);
  }, [status, retryKey, timeoutMs]);

  // PostMessage listener for resize + booking analytics
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!isMomenceOrigin(event.origin)) return;

      const iframe = iframeRef.current;
      if (iframe?.contentWindow && event.source !== iframe.contentWindow) return;

      const data = event.data as Record<string, unknown> | null;
      if (!data || typeof data !== "object") return;

      const h =
        typeof data.height === "number"
          ? data.height
          : typeof data.height === "string"
            ? Number(data.height)
            : NaN;

      if (Number.isFinite(h) && h >= minHeight) {
        setHeight(Math.ceil(h));
      }

      if (!hasTrackedRef.current) {
        const text = extractMessageText(data);
        if (bookingCompletePattern.test(text)) {
          hasTrackedRef.current = true;
          trackEvent("booking_complete", {
            source: analyticsSource,
            path: window.location.pathname,
          });
        }
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [minHeight, analyticsSource, bookingCompletePattern]);

  const onLoad = useCallback(() => setStatus("ready"), []);
  const onError = useCallback(() => setStatus("error"), []);

  const retry = useCallback(() => {
    hasTrackedRef.current = false;
    setStatus("loading");
    setIframeSrc(cacheBustUrl(src));
    setRetryKey((k) => k + 1);
  }, [src]);

  return { iframeRef, status, iframeSrc, height, retryKey, onLoad, onError, retry };
}

function extractMessageText(data: Record<string, unknown>): string {
  return ["type", "event", "status", "message", "action", "name"]
    .map((key) => data[key])
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.toLowerCase())
    .join(" ");
}
