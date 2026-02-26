const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() ?? "";
const phoneHref =
  process.env.NEXT_PUBLIC_PHONE_HREF?.trim() ??
  (phoneDisplay ? `tel:${phoneDisplay.replace(/[^\d+]/g, "")}` : "");
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "hello@bodyjunkies.co.uk";
const emailHref = process.env.NEXT_PUBLIC_CONTACT_EMAIL_HREF?.trim() ?? `mailto:${email}`;

export const siteConfig = {
  name: "Bodyjunkies",
  url: "https://bodyjunkies.co.uk",
  phoneDisplay,
  phoneHref,
  email,
  emailHref,
  addressLine1: "Bodyjunkies Studio",
  addressLine2: "Islington, London",
  mapsHref:
    "https://maps.google.com/?q=Bodyjunkies+Fitness+%26+Boxing+Studio+Islington",
  openingHours: [
    "Mon: 7:00 AM – 9:00 PM",
    "Tue–Thu: 6:45 AM – 9:45 PM",
    "Fri: 7:00 AM – 8:00 PM",
    "Sat–Sun: 8:30 AM – 1:30 PM",
  ],
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() ?? "",
  },
} as const;
