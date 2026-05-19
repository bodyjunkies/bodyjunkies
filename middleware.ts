import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SCHEDULE_EXTERNAL_URL = "https://momence.com/u/bodyjunkies-NFLGZG";
// Add entries only for legacy URLs confirmed in Search Console (Page indexing →
// Not found / Page with redirect). Speculative redirects fragment signals.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/index": "/",
  "/buy-classes": "/pricing",
  "/post/book-a-class-for-fitness-day": "/pricing",
  "/product-page/discounted-6-week-challenge-2nd-payment": "/starter-pack",
};

export function middleware(request: NextRequest) {
  const { pathname, search, hostname } = request.nextUrl;

  if (hostname === "www.bodyjunkies.co.uk") {
    return NextResponse.redirect(
      `https://bodyjunkies.co.uk${pathname}${search}`,
      308,
    );
  }

  // Catch any straggler traffic to the removed /schedule routes
  if (pathname.startsWith("/schedule")) {
    return NextResponse.redirect(SCHEDULE_EXTERNAL_URL, 308);
  }

  const redirectTarget = LEGACY_REDIRECTS[pathname];
  if (redirectTarget) {
    return NextResponse.redirect(
      `https://bodyjunkies.co.uk${redirectTarget}${search}`,
      308,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/schedule/:path*",
    "/index",
    "/buy-classes",
    "/post/:path*",
    "/product-page/:path*",
  ],
};
