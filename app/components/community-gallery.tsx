"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type GalleryItem = {
  src: string;
  alt: string;
};

const CAROUSEL_BASE = "/assets/Carousel";

function carouselSrc(filename: string) {
  return `${CAROUSEL_BASE}/${encodeURIComponent(filename)}`;
}

const galleryItems: GalleryItem[] = [
  { src: carouselSrc("Boxing at BJ.webp"), alt: "Group training at Bodyjunkies" },
  { src: carouselSrc("Boxing at BJ-72.webp"), alt: "Boxing session in the studio" },
  { src: carouselSrc("Boxing at BJ-75.webp"), alt: "Members training with gloves" },
  { src: carouselSrc("Boxing at BJ-77.webp"), alt: "Conditioning rounds at Bodyjunkies" },
  { src: carouselSrc("Boxing at BJ-78.webp"), alt: "Small-group boxing class" },
  { src: carouselSrc("Boxing at BJ-81.webp"), alt: "Coach-led session in the room" },
  { src: carouselSrc("Boxing at BJ-90.webp"), alt: "Tribe training together" },
  { src: carouselSrc("Boxing at BJ-95.webp"), alt: "Boxing fitness at Bodyjunkies" },
  { src: carouselSrc("Boxing at BJ-96.webp"), alt: "High-energy class moment" },
  { src: carouselSrc("boxing-gym-islington-fitness-classes-bodyjunkies-01 (1).webp"), alt: "Boxing gym Islington fitness classes" },
  { src: carouselSrc("boxing-studio-north-london-hiit-conditioning-bodyjunkies-02 (1).webp"), alt: "Boxing studio North London HIIT conditioning" },
  { src: carouselSrc("personal-trainer-islington-small-group-classes-bodyjunkies-03 (1).webp"), alt: "Personal trainer small-group classes" },
  { src: carouselSrc("fitness-coaching-islington-small-group-sessions-bodyjunkies-05 (1).webp"), alt: "Fitness coaching small-group sessions" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0208.webp"), alt: "Bodyjunkies training" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0302.webp"), alt: "Session in the room" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0771.webp"), alt: "Members working combinations" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0837.webp"), alt: "Coaching on the floor" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0865.webp"), alt: "Boxing drill at Bodyjunkies" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1021.webp"), alt: "Tribe in motion" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1022.webp"), alt: "Training with inner fire" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1122.webp"), alt: "Small-group standards" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1128.webp"), alt: "Boxing and conditioning" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1137.webp"), alt: "Real people, real coaching" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1148.webp"), alt: "Bodyjunkies community" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1193.webp"), alt: "Drive in the room" },
];

export function CommunityGallery() {
  const shouldReduceMotion = useReducedMotion();
  const loopedItems = [...galleryItems, ...galleryItems];

  return (
    <section
      id="gallery"
      className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
        Gallery
      </p>
      <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
        The Tribe In Motion
      </h2>
      <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
        A quick look inside sessions, coaching moments, and the people that build
        the energy in the room.
      </p>

      <div className="relative mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#221E3A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#221E3A] to-transparent" />

        {shouldReduceMotion ? (
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {galleryItems.map((item) => (
              <div
                key={item.src}
                className="group relative aspect-[4/5] w-[78vw] max-w-[21rem] shrink-0 overflow-hidden rounded-2xl border border-white/20 md:w-[18rem] lg:w-[20rem]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 78vw, (max-width: 1280px) 18rem, 20rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <motion.div
              className="flex w-max gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 85,
                repeat: Infinity,
              }}
            >
              {loopedItems.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="group relative aspect-[4/5] w-[78vw] max-w-[21rem] shrink-0 overflow-hidden rounded-2xl border border-white/20 md:w-[18rem] lg:w-[20rem]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 78vw, (max-width: 1280px) 18rem, 20rem"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
