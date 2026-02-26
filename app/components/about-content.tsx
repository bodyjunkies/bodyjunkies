"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, ShieldCheck, Users } from "lucide-react";

const STARTER_PACK_PATH = "/starter-pack";
const HERO_IMAGE = "/assets/Boxing%20at%20BJ.jpg";

const values = [
  {
    title: "Community",
    copy: "You are never just another face in class. We train hard, learn names quickly, and back each other when sessions get real. The room feels welcoming from your first round.",
  },
  {
    title: "Accountability",
    copy: "Progress comes from showing up with intent. Coaches track your effort, your form, and your consistency so you know where you are and where you are going next.",
  },
  {
    title: "Empowerment",
    copy: "We coach you to move with purpose and hold your ground under pressure. That confidence carries beyond the pads, into work, family, and everything else life throws at you.",
  },
  {
    title: "Growth",
    copy: "There is always another level. Whether you are learning your first jab or sharpening fight fitness, we push standards higher and celebrate every step earned.",
  },
];

export function AboutContent() {
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-white/15"
        >
          <Image
            src={HERO_IMAGE}
            alt="Bodyjunkies members training together with wraps on, smiling and standing proud after class"
            fill
            priority
            className="object-cover object-[50%_16%] sm:object-[50%_20%] lg:object-[50%_24%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.56)_52%,rgba(0,0,0,0.76)_100%)]" />
          <div className="relative z-10 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Fuel Your Fire
            </p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl">
              Built For
              <br />
              Real People
            </h1>
            <p className="mt-4 max-w-3xl text-sm text-white/90 sm:text-base">
              The vibe is simple: wraps on, heads up, standards high. You walk in
              and feel the energy straight away, a diverse crew training hard,
              smiling between rounds, and backing each other to the final bell.
            </p>
            <p className="mt-3 max-w-3xl text-sm text-white/90 sm:text-base">
              We are a boutique London studio with grit in the room and real
              coaching on the floor. Beginners, busy parents, athletes, and
              fighters all train side by side with one shared mindset: show up
              with inner fire.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <motion.a
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                href={STARTER_PACK_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bj-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
              >
                Starter Pack £49
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
              >
                Book a Class
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                href="/team"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
              >
                Meet the Coaches
              </motion.a>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Our Story
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Grit Back In The Room
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
            Bodyjunkies started with a clear idea: boxing should build people,
            not just burn calories. We wanted small-group sessions where coaching
            is personal, standards are high, and every round has purpose.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-white/85 sm:text-base">
            That is why we coach close, correct details, and keep the group tight.
            You do not get lost in the crowd here. You get seen, challenged, and
            supported by coaches and members who train like a tribe.
          </p>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Mission
            </p>
            <h2 className="mt-3 text-2xl font-black uppercase text-white sm:text-3xl">
              Train Hard. Build Real Power.
            </h2>
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              We bring the grit back to boxing through dynamic, people-focused
              small-group classes. Our protocols are built to help anyone with
              inner fire test limits and prove power, in and out of the ring.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.04 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Vision
            </p>
            <h2 className="mt-3 text-2xl font-black uppercase text-white sm:text-3xl">
              Strength For Life
            </h2>
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              We help people build physical strength, mental fortitude, and real
              confidence through a healthier, long-term relationship with training.
            </p>
          </motion.article>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Our Approach
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Small Group. Big Standards.
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/5 p-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <ShieldCheck className="h-4 w-4 text-white" />
              </span>
              <h3 className="mt-3 text-lg font-extrabold uppercase text-white">
                Coach-Led Sessions
              </h3>
              <p className="mt-2 text-sm text-white/85">
                Tight group sizes mean real coaching on every round, not just a
                stopwatch and a playlist.
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/5 p-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </span>
              <h3 className="mt-3 text-lg font-extrabold uppercase text-white">
                Accountability
              </h3>
              <p className="mt-2 text-sm text-white/85">
                Personal guidance, progress tracking, and recognition keep
                momentum high and standards honest.
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/5 p-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Flame className="h-4 w-4 text-white" />
              </span>
              <h3 className="mt-3 text-lg font-extrabold uppercase text-white">
                Open To All Levels
              </h3>
              <p className="mt-2 text-sm text-white/85">
                Beginners are welcome. Fighters are welcome. Busy parents,
                athletes, and anyone with inner fire has a place here.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Our Community
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            A Tribe That Rises Together
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
            The people in our room look different, train for different reasons,
            and bring different stories, but they share one thing: they show up
            for each other. Friendships are built in rounds, recovery, and every
            hard rep finished together.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-white/85 sm:text-base">
            We keep that connection alive beyond the studio too, with bootcamps
            abroad, boxing events, and regular socials that bring the tribe
            together on and off the gym floor.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Our Values
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            What We Stand For
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <motion.article
                key={value.title}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/20 bg-white/5 p-5"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <Users className="h-4 w-4 text-[var(--bj-orange)]" />
                </span>
                <h3 className="mt-3 text-xl font-black uppercase text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-white/85">{value.copy}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Closing Round
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Bring Your Fire. We Will Meet You There.
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
            This is not about being perfect before you start. It is about showing
            up, putting the work in, and building confidence round by round with
            people who want to see you win.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-white/85 sm:text-base">
            Step in for your first class and feel what training with a real tribe
            feels like.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={STARTER_PACK_PATH}
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
            >
              Try a First Class
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/schedule"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
            >
              Book Session
            </motion.a>
          </div>
        </motion.section>
      </div>

    </>
  );
}
