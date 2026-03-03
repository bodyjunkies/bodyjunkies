const STARTER_PACK_BASE_URL =
  "https://momence.com/Bodyjunkies/membership/Intro-Package/539286";

export default function Head() {
  return <link rel="prefetch" href={STARTER_PACK_BASE_URL} as="document" />;
}
