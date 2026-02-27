"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import { GOOGLE_REVIEWS } from "../lib/reviews";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place//data=!4m4!3m3!1s0x48761b7473021b31:0x1958817c0ec4e2a6!9m1!1b1";

const loopedReviews = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

function ReviewCard({ quote, author, rating }: { quote: string; author: string; rating: number }) {
  return (
    <Link
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[82vw] max-w-[22rem] shrink-0 sm:w-[22rem] transition-transform hover:scale-[1.02] active:scale-[0.99]"
      aria-label="View Bodyjunkies reviews on Google"
    >
      <article className="relative h-full rounded-2xl border border-white/15 bg-white/[0.04] p-5">
        <div className="mb-3 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-[#F69523] text-[#F69523]" aria-hidden="true" />
          ))}
        </div>
        <p className="line-clamp-5 text-sm leading-relaxed text-white/85">&ldquo;{quote}&rdquo;</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">{author}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-white/45">Google Review</p>
      </article>
    </Link>
  );
}

export function ReviewsCarousel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#221E3A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#221E3A] to-transparent" />

      {shouldReduceMotion ? (
        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {GOOGLE_REVIEWS.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 60,
              repeat: Infinity,
            }}
          >
            {loopedReviews.map((review, index) => (
              <ReviewCard key={`${review.author}-${index}`} {...review} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
