import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude public assets from serverless bundle (served by CDN).
  // getHomeMedia() reads public/assets at build time; tracing can pull 250MB+ into the function.
  outputFileTracingExcludes: {
    "/*": ["public/**"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bodyjunkies.co.uk" }],
        destination: "https://bodyjunkies.co.uk/:path*",
        permanent: true,
      },
    ];
  },
  // Legacy Wix redirects are handled in middleware.ts (absolute apex URLs, single-hop www+legacy).
};

export default nextConfig;
