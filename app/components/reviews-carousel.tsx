"use client";

import { useEffect, useRef, useState } from "react";

const MOMENCE_REVIEWS_SCRIPT_SRC = "https://momence.com/plugin/reviews/reviews.js";
const MOMENCE_HOST = "https://momence.com";
const LOAD_TIMEOUT_MS = 8000;
const MAX_AUTO_RETRIES = 2;

type ReviewStatus = "idle" | "loading" | "ready" | "error" | "fallback";

const STATIC_TESTIMONIALS = [
  {
    quote:
      "I came in with no boxing background. Coaches broke everything down clearly and I felt progress in weeks.",
    name: "Bodyjunkies Member",
    result: "Beginner Route",
  },
  {
    quote:
      "Sessions are structured, intense, and focused. You work hard and leave with proper detail, not random circuits.",
    name: "Bodyjunkies Member",
    result: "Experienced Route",
  },
  {
    quote:
      "The community is strong and the coaching standard is high every single session. It keeps me consistent.",
    name: "Bodyjunkies Member",
    result: "Tribe Feedback",
  },
] as const;

function ensureNetworkHints() {
  if (typeof document === "undefined") return;

  const links: Array<{
    rel: "preconnect" | "dns-prefetch";
    href: string;
    crossOrigin?: "anonymous";
  }> = [
    { rel: "preconnect", href: MOMENCE_HOST, crossOrigin: "anonymous" },
    { rel: "dns-prefetch", href: "//momence.com" },
  ];

  links.forEach((linkDef) => {
    const selector = `link[rel="${linkDef.rel}"][href="${linkDef.href}"]`;
    if (document.head.querySelector(selector)) return;

    const link = document.createElement("link");
    link.rel = linkDef.rel;
    link.href = linkDef.href;
    if (linkDef.crossOrigin) {
      link.crossOrigin = linkDef.crossOrigin;
    }
    document.head.appendChild(link);
  });
}

export function ReviewsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pluginMountRef = useRef<HTMLDivElement>(null);
  const autoRetryCountRef = useRef(0);
  const retryTimeoutRef = useRef<number | null>(null);
  const [status, setStatus] = useState<ReviewStatus>("idle");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  const retryLoad = (resetAutoRetry = false) => {
    if (resetAutoRetry) {
      autoRetryCountRef.current = 0;
    }
    setStatus("loading");
    setLoadAttempt((attempt) => attempt + 1);
  };
  const hasOverlayState =
    !shouldLoad || status === "loading" || status === "idle" || status === "error" || status === "fallback";

  useEffect(() => {
    if (!shouldLoad) return;
    ensureNetworkHints();
  }, [shouldLoad]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setStatus("loading");
      return;
    }
    const rootMargin = window.matchMedia("(max-width: 768px)").matches
      ? "120px 0px"
      : "240px 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setStatus("loading");
          setLoadAttempt((attempt) => attempt + 1);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const pluginMount = pluginMountRef.current;
    if (!pluginMount) return;
    let isMounted = true;
    let didResolve = false;

    const reviewsRoot = document.createElement("div");
    reviewsRoot.id = "momence-plugin-reviews";

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.setAttribute("host_id", "93353");
    script.setAttribute("is_profile_picture_enabled", "true");
    script.setAttribute("is_text_only_enabled", "true");
    script.setAttribute("is_session_and_teacher_info_enabled", "true");
    script.setAttribute("layout", "horizontal");
    script.setAttribute(
      "signature",
      "98e0fe2b6e055a841810d060089c8fb203a0f4a8593d0bb1ca95f253339e433c"
    );
    script.src = MOMENCE_REVIEWS_SCRIPT_SRC;
    script.onload = () => {
      if (!isMounted) return;
      didResolve = true;
      setStatus("ready");
      autoRetryCountRef.current = 0;
    };
    script.onerror = () => {
      if (!isMounted) return;
      if (autoRetryCountRef.current < MAX_AUTO_RETRIES) {
        didResolve = true;
        setStatus("error");
        autoRetryCountRef.current += 1;
        const delay = 600 * autoRetryCountRef.current;
        retryTimeoutRef.current = window.setTimeout(() => {
          retryLoad(false);
        }, delay);
        return;
      }
      didResolve = true;
      setStatus("fallback");
    };

    const timeoutId = window.setTimeout(() => {
      if (!isMounted || didResolve) return;
      script.onerror?.(new Event("error"));
    }, LOAD_TIMEOUT_MS);

    pluginMount.replaceChildren(reviewsRoot, script);

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      script.onload = null;
      script.onerror = null;
      script.remove();
      pluginMount.replaceChildren();
    };
  }, [shouldLoad, loadAttempt]);

  return (
    <>
      <style jsx global>{`
        :root {
          --momenceReviewColorBackground: #fbfbfb;
          --momenceBorder: 1px solid rgba(0, 0, 0, 0.08);
          --momenceBorderRadius: 12px;
          --momenceBoxShadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
        }
      `}</style>
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 ${
          hasOverlayState ? "min-h-[320px]" : ""
        }`}
      >
        <div ref={pluginMountRef} className="w-full" />

        {(!shouldLoad || status === "loading" || status === "idle") && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-5 text-center">
            <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Loading Reviews
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#221E3A]/95 px-5 text-center">
            <div className="h-9 w-9 animate-pulse rounded-full border border-white/25 bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              Retrying Reviews Feed
            </p>
            <button
              type="button"
              onClick={() => retryLoad(true)}
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "fallback" && (
          <div className="absolute inset-0 z-20 overflow-auto bg-[#221E3A] p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Reviews Feed Unavailable
              </p>
              <button
                type="button"
                onClick={() => retryLoad(true)}
                className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Try Again
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {STATIC_TESTIMONIALS.map((item) => (
                <article
                  key={item.result}
                  className="rounded-xl border border-white/15 bg-white/[0.04] p-4"
                >
                  <p className="text-sm leading-relaxed text-white/85">&quot;{item.quote}&quot;</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#F69523]">
                    {item.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
