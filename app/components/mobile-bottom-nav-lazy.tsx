"use client";

import dynamic from "next/dynamic";

const MobileStarterPackCta = dynamic(
  () =>
    import("./mobile-bottom-nav").then((module) => module.MobileStarterPackCta),
  { ssr: false }
);

export function MobileStarterPackCtaLazy() {
  return <MobileStarterPackCta />;
}
