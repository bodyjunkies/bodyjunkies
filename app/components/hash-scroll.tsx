"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToServices() {
  const el = document.getElementById("services");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Scrolls to the #services section when the URL is /#services (from another page or on home).
 * Next.js client-side navigation doesn't always apply hash scroll, so we do it manually.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") return;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      if (window.location.hash?.slice(1) !== "services") return;
      timeout = window.setTimeout(scrollToServices, 100);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => {
      window.removeEventListener("hashchange", run);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
