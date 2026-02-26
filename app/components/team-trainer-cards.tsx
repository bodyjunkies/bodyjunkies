"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Trainer = {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  professionalInfo: string;
  personalStyle: string;
};

const trainers: Trainer[] = [
  {
    id: "alan",
    name: "Alan",
    role: "Combat Sports Coach",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Trainer profile image for Alan at Bodyjunkies",
    professionalInfo:
      "With over 30 years of experience in combat sports, Alan is a former British Taekwondo Champion who grew up in an era where grit, sweat, and hard work were part of everyday life. He has coached both amateur and professional fighters, helping them sharpen technique, build relentless stamina, and develop mental toughness in and out of the ring.",
    personalStyle:
      "High-energy and no-nonsense. Alan builds every session on determination, resilience, and respect. Expect to train hard, push your limits, and earn every drop of progress. \"No shortcuts. Just sweat, skill, and spirit.\"",
  },
  {
    id: "jason",
    name: "Jason",
    role: "England Boxing & BBBoC Coach",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Trainer profile image for Jason at Bodyjunkies",
    professionalInfo:
      "With over a decade coaching in the ring and two decades in professional fitness, Jason is a certified England Boxing Level 1 Amateur Coach and a British Boxing Board of Control (BBBoC) Licensed Professional Coach. He has trained everyone from complete beginners to competitive fighters, with specialties in technical and tactical boxing, amateur/professional/white-collar fight prep, and strength, conditioning, and endurance training.",
    personalStyle:
      "Jason combines technical detail, conditioning, and mindset development to help boxers improve fitness, refine technique, and build confidence inside and outside the ring. \"Boxing builds character, every session is an opportunity to grow - physically, mentally, and emotionally. Come and join one of my sessions and you won't regret it.\"",
  },
  {
    id: "sabrina",
    name: "Sabrina",
    role: "Boxing Coach & Active Competitor",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Trainer profile image for Sabrina at Bodyjunkies",
    professionalInfo:
      "Sabrina began her boxing journey in Australia before moving to London and continuing her progression as a dedicated member of Bodyjunkies. She competed in white-collar bouts before stepping into the amateur boxing circuit, and now coaches while actively competing.",
    personalStyle:
      "Detailed, technical, and tough. Sabrina helps boxers of all levels build strong fundamentals while enjoying the process. Her sessions blend expert guidance, motivation, and a genuine love for the sport.",
  },
  {
    id: "chudi",
    name: "Chudi",
    role: "ABA Level 2 Coach & Head Trainer",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Trainer profile image for Chudi at Bodyjunkies",
    professionalInfo:
      "Chudi is an Amateur Boxing Alliance Level 2 coach and head trainer of Trojan ABC, with 15 years in the sport as both a boxer and a teacher.",
    personalStyle:
      "Focused on fundamentals and technique, Chudi's coaching gets you fighting fit and ring ready.",
  },
  {
    id: "stephen",
    name: "Stephen",
    role: "Personal Trainer",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Trainer profile image for Stephen at Bodyjunkies",
    professionalInfo:
      "Stephen is a highly experienced personal trainer who has helped individuals achieve their fitness goals for the past 15 years.",
    personalStyle:
      "Specializing in HIIT and weight training, Stephen's sessions are built to increase muscle, burn fat, and improve overall fitness.",
  },
];

export function TeamTrainerCards() {
  const [openId, setOpenId] = useState<string | null>(trainers[0]?.id ?? null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {trainers.map((trainer) => {
        const isOpen = trainer.id === openId;
        const panelId = `trainer-panel-${trainer.id}`;

        return (
          <motion.article
            key={trainer.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId((current) => (current === trainer.id ? null : trainer.id))}
              className="group block w-full text-left"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <div>
                    <p className="text-xl font-black uppercase text-white">{trainer.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                      {trainer.role}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/30 bg-white/10 p-2 text-white backdrop-blur-sm">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 border-t border-white/10 p-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        Professional
                      </p>
                      <p className="mt-2 text-sm text-white/85">{trainer.professionalInfo}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        Personal Style
                      </p>
                      <p className="mt-2 text-sm text-white/85">{trainer.personalStyle}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
