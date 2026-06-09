import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SCHEDULE_EXTERNAL_URL = "https://momence.com/u/bodyjunkies-NFLGZG";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/schedule")) {
    return NextResponse.redirect(SCHEDULE_EXTERNAL_URL, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/schedule/:path*"],
};
