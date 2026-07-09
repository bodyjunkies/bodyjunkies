const phoneDisplay =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "+44 7458 672586";
const phoneHref =
  process.env.NEXT_PUBLIC_PHONE_HREF?.trim() ||
  `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "info@bodyjunkies.co.uk";
const emailHref = process.env.NEXT_PUBLIC_CONTACT_EMAIL_HREF?.trim() ?? `mailto:${email}`;

export const siteConfig = {
  name: "Bodyjunkies",
  legalName: "Bodyjunkies Fitness & Boxing Studio",
  url: "https://bodyjunkies.co.uk",
  foundingDate: "2018",
  phoneDisplay,
  phoneHref,
  telephone: "+44 7458 672586",
  email,
  emailHref,
  addressLine1: "259 Holloway Road",
  addressLine2: "Islington N7 8HG",
  address: {
    streetAddress: "259 Holloway Road",
    addressLocality: "Islington",
    addressRegion: "London",
    postalCode: "N7 8HG",
    addressCountry: "GB",
  },
  geo: { latitude: 51.5517, longitude: -0.1114 },
  mapsHref:
    "https://maps.google.com/?q=Bodyjunkies+Fitness+%26+Boxing+Studio+Islington",
  whiteCollarBoxingLondonUrl: "https://www.whitecollarboxinglondon.com/",
  openingHours: [
    "Mon: 7:00 AM – 9:00 PM",
    "Tue–Thu: 6:45 AM – 9:45 PM",
    "Fri: 7:00 AM – 8:00 PM",
    "Sat–Sun: 8:30 AM – 1:30 PM",
  ],
  openingHoursSchema: [
    "Mo 07:00-21:00",
    "Tu 06:45-21:45",
    "We 06:45-21:45",
    "Th 06:45-21:45",
    "Fr 07:00-20:00",
    "Sa 08:30-13:30",
    "Su 08:30-13:30",
  ],
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() ?? "",
  },
} as const;
