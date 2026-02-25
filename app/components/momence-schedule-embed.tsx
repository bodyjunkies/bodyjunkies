"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

const MOMENCE_SCRIPT_SRC =
  "https://momence.com/plugin/host-schedule/host-schedule.js";

export function MomenceScheduleEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("schedule_view_load", {
      path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existing = document.querySelector(
      `script[src="${MOMENCE_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.setAttribute("host_id", "93353");
    script.setAttribute("teacher_ids", "[]");
    script.setAttribute("location_ids", "[]");
    script.setAttribute("tag_ids", "[]");
    script.setAttribute("default_filter", "show-all");
    script.setAttribute("locale", "en");
    script.src = MOMENCE_SCRIPT_SRC;

    const wrapper = document.createElement("div");
    wrapper.id = "ribbon-schedule";
    container.innerHTML = "";
    container.appendChild(wrapper);
    container.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div ref={containerRef} className="min-h-[400px]" />;
}
