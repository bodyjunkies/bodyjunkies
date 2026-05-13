import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude public assets from serverless bundle (served by CDN).
  // getHomeMedia() reads public/assets at build time; tracing can pull 250MB+ into the function.
  outputFileTracingExcludes: {
    "/*": ["public/**"],
  },
  // 301s for legacy Wix URLs still indexed by Google. Sourced from the GSC
  // Page Indexing report (Soft 404, Not found, Page with redirect, Redirect error).
  // Goal: reclaim ranking signal and clear ~75 ghost URLs from search.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },

      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/faq-s", destination: "/faq", permanent: true },
      { source: "/privacy-agreement", destination: "/privacy", permanent: true },
      { source: "/blank-page-1", destination: "/", permanent: true },

      { source: "/beginner-boxing", destination: "/starter-pack", permanent: true },
      { source: "/intermediate-boxing", destination: "/pricing", permanent: true },
      { source: "/advance-boxing", destination: "/pricing", permanent: true },
      { source: "/training", destination: "/pricing", permanent: true },

      { source: "/book-online", destination: "/pricing", permanent: true },
      { source: "/buy-classes", destination: "/pricing", permanent: true },
      { source: "/timetable", destination: "/pricing", permanent: true },
      { source: "/schedule-copy", destination: "/pricing", permanent: true },
      { source: "/pricing-plans", destination: "/pricing", permanent: true },

      { source: "/personaltraining", destination: "/personal-training", permanent: true },

      { source: "/coaches", destination: "/team", permanent: true },
      { source: "/b-trainers", destination: "/team", permanent: true },
      { source: "/colin-k-copy", destination: "/team", permanent: true },
      { source: "/jason-p", destination: "/team", permanent: true },
      { source: "/alan-k", destination: "/team", permanent: true },
      { source: "/chudi", destination: "/team", permanent: true },
      { source: "/copy-of-chudi-o-1", destination: "/team", permanent: true },

      // Wildcard collapses for old Wix content trees that have no new equivalent.
      // Sent to topically-closest pages rather than "/" to avoid soft-404 signals.
      { source: "/post/:slug*", destination: "/about", permanent: true },
      { source: "/product-page/:slug*", destination: "/pricing", permanent: true },
      { source: "/service-page/:slug*", destination: "/personal-training", permanent: true },
    ];
  },
};

export default nextConfig;
