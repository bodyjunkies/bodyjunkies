"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

function toPath(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname;
  } catch {
    return "";
  }
}

export function AnalyticsAutoTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const path = toPath(link.href);
      if (!path) return;

      if (path.startsWith("/starter-pack")) {
        trackEvent("starter_pack_click", {
          source_path: window.location.pathname,
          target_path: path,
        });
      }

      if (path.startsWith("/taster-session")) {
        trackEvent("taster_session_click", {
          source_path: window.location.pathname,
          target_path: path,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
