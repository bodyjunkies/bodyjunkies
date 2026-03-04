import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STARTER_PACK_EXTERNAL_URL =
  "https://momence.com/Bodyjunkies/membership/Intro-Package/539286";
const SCHEDULE_EXTERNAL_URL = "https://momence.com/u/bodyjunkies-NFLGZG";

function isMobileRequest(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    userAgent,
  );
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (isMobileRequest(userAgent)) {
    if (request.nextUrl.pathname.startsWith("/starter-pack")) {
      return NextResponse.redirect(STARTER_PACK_EXTERNAL_URL);
    }
  }

  // Catch any straggler traffic to the removed /schedule routes
  if (request.nextUrl.pathname.startsWith("/schedule")) {
    return NextResponse.redirect(SCHEDULE_EXTERNAL_URL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/starter-pack/:path*", "/schedule/:path*"],
};
