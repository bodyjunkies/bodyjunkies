export const CANONICAL_ORIGIN = "https://bodyjunkies.co.uk";

// Legacy Wix URLs from GSC Page indexing reports.
export const LEGACY_EXACT: Record<string, string> = {
  "/home": "/",
  "/index": "/",
  "/about-us": "/about",
  "/faqs": "/faq",
  "/faq-s": "/faq",
  "/privacy-agreement": "/privacy",
  "/blank-page-1": "/",
  "/beginner-boxing": "/starter-pack",
  "/intermediate-boxing": "/pricing",
  "/advance-boxing": "/pricing",
  "/training": "/pricing",
  "/book-online": "/pricing",
  "/buy-classes": "/pricing",
  "/timetable": "/pricing",
  "/schedule-copy": "/pricing",
  "/pricing-plans": "/pricing",
  "/personaltraining": "/personal-training",
  "/coaches": "/team",
  "/hall-of-fame": "/white-collar-boxing",
  "/b-trainers": "/team",
  "/colin-k-copy": "/team",
  "/jason-p": "/team",
  "/alan-k": "/team",
  "/chudi": "/team",
  "/copy-of-chudi-o-1": "/team",
  "/post/book-a-class-for-fitness-day": "/pricing",
  "/product-page/discounted-6-week-challenge-2nd-payment": "/starter-pack",
};

export const PREFIX_REDIRECTS: { prefix: string; destination: string }[] = [
  { prefix: "/post/", destination: "/about" },
  { prefix: "/product-page/", destination: "/pricing" },
  { prefix: "/service-page/", destination: "/personal-training" },
];

const WWW_HOST = "www.bodyjunkies.co.uk";

type NextRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  has?: { type: "host"; value: string }[];
};

function apex(destination: string): string {
  return `${CANONICAL_ORIGIN}${destination}`;
}

/** Build ordered next.config redirects: specific rules before www catch-all. */
export function buildLegacyRedirects(): NextRedirect[] {
  const redirects: NextRedirect[] = [];

  for (const [source, destination] of Object.entries(LEGACY_EXACT)) {
    redirects.push({
      source,
      destination: apex(destination),
      permanent: true,
    });
    redirects.push({
      source: `${source}/`,
      destination: apex(destination),
      permanent: true,
    });
  }

  for (const { prefix, destination } of PREFIX_REDIRECTS) {
    const slug = prefix.slice(1, -1); // "post" from "/post/"
    redirects.push({
      source: `/${slug}/:path*`,
      destination: apex(destination),
      permanent: true,
    });
  }

  for (const [source, destination] of Object.entries(LEGACY_EXACT)) {
    redirects.push({
      source,
      destination: apex(destination),
      permanent: true,
      has: [{ type: "host" as const, value: WWW_HOST }],
    });
    redirects.push({
      source: `${source}/`,
      destination: apex(destination),
      permanent: true,
      has: [{ type: "host" as const, value: WWW_HOST }],
    });
  }

  for (const { prefix, destination } of PREFIX_REDIRECTS) {
    const slug = prefix.slice(1, -1);
    redirects.push({
      source: `/${slug}/:path*`,
      destination: apex(destination),
      permanent: true,
      has: [{ type: "host" as const, value: WWW_HOST }],
    });
  }

  redirects.push({
    source: "/",
    destination: `${CANONICAL_ORIGIN}/`,
    permanent: true,
    has: [{ type: "host" as const, value: WWW_HOST }],
  });

  redirects.push({
    source: "/:path+",
    destination: `${CANONICAL_ORIGIN}/:path*`,
    permanent: true,
    has: [{ type: "host" as const, value: WWW_HOST }],
  });

  return redirects;
}
