// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------

export const MOMENCE_HOST_ID = "93353";
export const BOOKING_CONFIRMED_URL = "https://bodyjunkies.co.uk/booking-confirmed";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export function getTimeoutMultiplier(): number {
  if (typeof navigator === "undefined") return 1;
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string } })
    .connection;
  if (!conn?.effectiveType) return 1;
  switch (conn.effectiveType) {
    case "slow-2g":
    case "2g":
      return 2;
    case "3g":
      return 1.5;
    default:
      return 1;
  }
}

function cacheBustSuffix(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cacheBustUrl(url: string): string {
  const u = new URL(url);
  u.searchParams.set("_r", cacheBustSuffix());
  return u.toString();
}

export function withReturnUrl(url: string): string {
  const u = new URL(url);
  u.searchParams.set("return_url", BOOKING_CONFIRMED_URL);
  u.searchParams.set("returnUrl", BOOKING_CONFIRMED_URL);
  return u.toString();
}

export function isMomenceOrigin(origin: string): boolean {
  if (!origin) return false;
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "momence.com" || hostname.endsWith(".momence.com");
  } catch {
    return false;
  }
}

