import type { Metadata } from "next";
import { siteConfig } from "./site";

const OG_IMAGE = "/assets/%28WEB%29BODYJUNKIES_210124_0647.webp";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    title,
    description,
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
