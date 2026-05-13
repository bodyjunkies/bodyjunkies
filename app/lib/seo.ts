import type { Metadata } from "next";
import { siteConfig } from "./site";

const OG_IMAGE = "/assets/%28WEB%29BODYJUNKIES_210124_0647.webp";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  // Set true on legal/thin pages that should not compete in search.
  // Links are still followed so equity flows to canonical pages.
  noindex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: PageMetadataInput): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.legalName,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${title} — Bodyjunkies`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Bodyjunkies",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
