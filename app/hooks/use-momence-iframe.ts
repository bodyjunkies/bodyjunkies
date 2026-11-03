"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  cacheBustUrl,
  getTimeoutMultiplier,
  isMomenceOrigin,
} from "../lib/momence-embed";

type IframeStatus = "loading" | "ready" | "error";

type UseMomenceIframeOptions = {
  src: string;
  timeoutMs?: number;
  minHeight?: number;
};

const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_MIN_HEIGHT = 700;

export function useMomenceIframe(options: UseMomenceIframeOptions) {
  const {
    src,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    minHeight = DEFAULT_MIN_HEIGHT,
  } = options;

  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Momence posts { type: "iframe_..._resize", height } when framed. It sends
  // no message on purchase; purchases are tracked on /booking-confirmed.
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
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [minHeight]);

  const onLoad = useCallback(() => setStatus("ready"), []);
  const onError = useCallback(() => setStatus("error"), []);

  const retry = useCallback(() => {
    setStatus("loading");
    setIframeSrc(cacheBustUrl(src));
    setRetryKey((k) => k + 1);
  }, [src]);

  return { iframeRef, status, iframeSrc, height, retryKey, onLoad, onError, retry };
}
