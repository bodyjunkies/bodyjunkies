import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DesktopHeader } from "./components/desktop-header";
import { MobileBottomNavLazy } from "./components/mobile-bottom-nav-lazy";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bodyjunkies | Fuel Your Fire",
  description:
    "Bodyjunkies boxing and conditioning in London. Train with grit, community, and expert coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://momence.com" />
        <link rel="dns-prefetch" href="https://momence.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DesktopHeader />
        {children}
        <MobileBottomNavLazy />
      </body>
    </html>
  );
}
