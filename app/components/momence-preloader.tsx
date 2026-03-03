"use client";
import { useEffect } from "react";

const SCRIPTS = [
  "https://momence.com/plugin/lead-form/lead-form.js",
];

export function MomencePreloader() {
  useEffect(() => {
    const inject = () => {
      for (const href of SCRIPTS) {
        if (document.querySelector(`link[rel="modulepreload"][href="${href}"]`)) continue;
        const link = document.createElement("link");
        link.rel = "modulepreload";
        link.href = href;
        document.head.appendChild(link);
      }
    };
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(inject, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(inject, 2000);
      return () => clearTimeout(id);
    }
  }, []);
  return null;
}
