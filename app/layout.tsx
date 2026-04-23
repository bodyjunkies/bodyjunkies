import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { DesktopHeader } from "./components/desktop-header";
import { HashScroll } from "./components/hash-scroll";
import { AnalyticsAutoTracker } from "./components/analytics-auto-tracker";
import { CookieNotice } from "./components/cookie-notice";
import { GtmLoader } from "./components/gtm-loader";
import { MobileStarterPackCtaLazy } from "./components/mobile-bottom-nav-lazy";
import { MomencePreloader } from "./components/momence-preloader";
import { SiteFooter } from "./components/site-footer";
import { siteConfig } from "./lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title:
    "Bodyjunkies Fitness & Boxing Studio | Gym & Fitness Classes Islington",
  description:
    "Top-rated fitness gym in Islington, London. Boxing & conditioning classes, personal training, and a Starter Pack with gloves to keep. 90+ five-star Google reviews.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Bodyjunkies" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    title:
      "Bodyjunkies Fitness & Boxing Studio | Gym & Fitness Classes Islington",
    description:
      "Top-rated fitness gym in Islington, London. Boxing & conditioning classes, personal training, and a Starter Pack with gloves to keep. 90+ five-star Google reviews.",
    siteName: "Bodyjunkies Fitness & Boxing Studio",
    images: [
      {
        url: "/assets/%28WEB%29BODYJUNKIES_210124_0647.webp",
        width: 1200,
        height: 630,
        alt: "Bodyjunkies Fitness & Boxing Studio Islington",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Bodyjunkies",
    title:
      "Bodyjunkies Fitness & Boxing Studio | Gym & Fitness Classes Islington",
    description:
      "Top-rated fitness gym in Islington, London. Boxing & conditioning classes, personal training, and a Starter Pack with gloves to keep.",
    images: ["/assets/%28WEB%29BODYJUNKIES_210124_0647.webp"],
  },
  other: {
    "geo.region": "GB-ISL",
    "geo.placename": "Islington, London",
    "geo.position": "51.5517;-0.1114",
    ICBM: "51.5517, -0.1114",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://momence.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://momence.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GtmLoader gtmId={gtmId} />
        <DesktopHeader />
        <HashScroll />
        <AnalyticsAutoTracker />
        <MomencePreloader />
        {children}
        <SiteFooter />
        <CookieNotice />
        <MobileStarterPackCtaLazy />
        <Analytics />
      </body>
    </html>
  );
}
