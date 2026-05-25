import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "https://bodyjunkies.co.uk";
const SCHEDULE_EXTERNAL_URL = "https://momence.com/u/bodyjunkies-NFLGZG";

// Legacy Wix URLs from GSC Page indexing reports. Single-hop 308s to apex canonical.
const LEGACY_EXACT: Record<string, string> = {
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
  "/b-trainers": "/team",
  "/colin-k-copy": "/team",
  "/jason-p": "/team",
  "/alan-k": "/team",
  "/chudi": "/team",
  "/copy-of-chudi-o-1": "/team",
  "/post/book-a-class-for-fitness-day": "/pricing",
  "/product-page/discounted-6-week-challenge-2nd-payment": "/starter-pack",
};

const PREFIX_REDIRECTS: { prefix: string; destination: string }[] = [
  { prefix: "/post/", destination: "/about" },
  { prefix: "/product-page/", destination: "/pricing" },
  { prefix: "/service-page/", destination: "/personal-training" },
];

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function resolveLegacyTarget(pathname: string): string | null {
  const path = normalizePathname(pathname);

  if (path in LEGACY_EXACT) {
    return LEGACY_EXACT[path];
  }

  for (const { prefix, destination } of PREFIX_REDIRECTS) {
    if (path.startsWith(prefix)) {
      return destination;
    }
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname, search, hostname } = request.nextUrl;

  if (pathname.startsWith("/schedule")) {
    return NextResponse.redirect(SCHEDULE_EXTERNAL_URL, 308);
  }

  const legacyTarget = resolveLegacyTarget(pathname);

  if (hostname === "www.bodyjunkies.co.uk") {
    const destPath = legacyTarget ?? normalizePathname(pathname);
    return NextResponse.redirect(`${CANONICAL_HOST}${destPath}${search}`, 308);
  }

  if (legacyTarget) {
    return NextResponse.redirect(`${CANONICAL_HOST}${legacyTarget}${search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
