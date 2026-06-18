import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site";

const routes = [
  "",
  "/about",
  "/team",
  "/starter-pack",
  "/taster-session",
  "/personal-training",
  "/pricing",
  "/faq",
  "/first-session",
  "/contact",
  "/white-collar-boxing",
  "/classes",
  "/schedule",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
