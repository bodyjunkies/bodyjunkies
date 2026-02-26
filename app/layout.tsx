import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DesktopHeader } from "./components/desktop-header";
import { HashScroll } from "./components/hash-scroll";
import { AnalyticsAutoTracker } from "./components/analytics-auto-tracker";
import { CookieNotice } from "./components/cookie-notice";
import { GtmLoader } from "./components/gtm-loader";
import { MobileBottomNavLazy } from "./components/mobile-bottom-nav-lazy";
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
  title: "Bodyjunkies | Fuel Your Fire",
  description:
    "Bodyjunkies boxing and conditioning in London. Train with grit, community, and expert coaching.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Bodyjunkies | Fuel Your Fire",
    description:
      "Boxing and conditioning in Islington with coach-led sessions, real accountability, and a strong community.",
    siteName: "Bodyjunkies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bodyjunkies | Fuel Your Fire",
    description:
      "Boxing and conditioning in Islington with coach-led sessions and real progress.",
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
        {children}
        <SiteFooter />
        <div
          aria-hidden="true"
          className="h-[calc(var(--mobile-nav-height)+3.5rem+env(safe-area-inset-bottom))] md:hidden"
        />
        <CookieNotice />
        <MobileBottomNavLazy />
      </body>
    </html>
  );
}
