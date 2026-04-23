import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
