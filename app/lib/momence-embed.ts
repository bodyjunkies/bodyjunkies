// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------

export const MOMENCE_HOST_ID = "93353";

// Momence membership IDs of the products the site sells. Momence appends
// membershipId to its purchase tracking redirect (see BookingConfirmedTracker),
// so purchases can be labelled. Values are list prices for one-off products.
const MOMENCE_PRODUCTS = new Map<string, { product: string; value?: number }>([
  ["539286", { product: "starter_pack", value: 49 }],
  ["676912", { product: "taster_session", value: 15 }],
  ["780449", { product: "b5_pack", value: 100 }],
  ["539295", { product: "b10_pack", value: 180 }],
  ["539635", { product: "b8_membership" }],
  ["539306", { product: "b12_membership" }],
  ["540930", { product: "b_unlimited_membership" }],
]);

export const SCHEDULE_CONTAINER_ID = "ribbon-schedule";
export const SCHEDULE_SCRIPT_SRC =
  "https://momence.com/plugin/host-schedule/host-schedule.js";
export const SCHEDULE_PATH = "/schedule";

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

export function getMomenceProduct(membershipId: string) {
  return MOMENCE_PRODUCTS.get(membershipId);
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

