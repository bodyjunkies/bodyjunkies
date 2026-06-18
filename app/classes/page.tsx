import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { buildPageMetadata } from "../lib/seo";
import { SCHEDULE_PATH } from "../lib/momence-embed";
import {
  ClassDescriptions,
  type ClassDescription,
} from "../components/class-descriptions";

export const metadata = buildPageMetadata({
  title: "Classes | Bodyjunkies",
  description:
    "See the weekly Bodyjunkies class timetable — boxing, bagwork, conditioning, and outdoor fitness — plus what to expect from every session.",
  path: "/classes",
});

type Session = { time: string; name: string };
type ScheduleDay = { day: string; sessions: Session[] };

const schedule: ScheduleDay[] = [
  {
    day: "Saturday",
    sessions: [
      { time: "9:30 AM – 10:45 AM", name: "Technical Boxing & Sparring" },
      { time: "9:30 AM – 10:30 AM", name: "Bodyjunkies Outdoor Fitness 60" },
    ],
  },
  {
    day: "Sunday",
    sessions: [{ time: "9:30 AM – 10:30 AM", name: "Bagwork & Conditioning" }],
  },
  {
    day: "Monday",
    sessions: [
      { time: "7:00 AM – 7:45 AM", name: "Bagwork & Conditioning" },
      { time: "6:30 PM – 7:30 PM", name: "Combos, Pads, & Fitness (Outdoor)" },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      { time: "12:15 PM – 1:00 PM", name: "Bagwork & Conditioning" },
      { time: "6:30 PM – 7:30 PM", name: "Bodyjunkies Outdoor Fitness 60" },
      { time: "7:00 PM – 8:00 PM", name: "Bagwork & Conditioning" },
      { time: "8:15 PM – 9:00 PM", name: "Boxing Induction" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "7:00 AM – 7:45 AM", name: "Bagwork & Conditioning" },
      { time: "12:15 PM – 1:00 PM", name: "Bodyjunkies Outdoor Fitness H.I.I.T" },
      { time: "6:30 PM – 7:30 PM", name: "Combos, Pads, & Fitness" },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      { time: "12:00 PM – 12:45 PM", name: "Combos, Pads, & Fitness (Outdoor)" },
      { time: "1:00 PM – 1:45 PM", name: "Boxing Induction" },
      { time: "7:00 PM – 8:00 PM", name: "Bagwork & Conditioning" },
    ],
  },
  {
    day: "Friday",
    sessions: [
      { time: "7:00 AM – 7:45 AM", name: "Combos, Pads, & Fitness (Outdoor)" },
      { time: "12:15 PM – 1:00 PM", name: "Bagwork & Conditioning" },
    ],
  },
];

const classDescriptions: ClassDescription[] = [
  {
    name: "Bagwork & Conditioning",
    oneLiner:
      "Explosive heavy-bag combinations meet high-intensity conditioning blocks.",
    body: [
      {
        heading: "The Workout",
        paragraphs: [
          "This session is the ultimate blend of boxing technicality and metabolic conditioning. You'll rotate through explosive heavy bag combinations designed to sharpen your power and coordination, interspersed with high-intensity conditioning blocks that push your heart rate and your resilience.",
          "Whether you're looking to blow off steam after a long day in the office or want to discover your fiercest potential, this class delivers the perfect balance of sweat and skill.",
        ],
      },
      {
        heading: "What to Expect",
        bullets: [
          "Total Body Engagement: From your core to your calves, every muscle is recruited for maximum calorie burn.",
          "HIIT Training: Short, sharp intervals that keep your metabolism elevated long after you leave the studio.",
          "Mental Clarity: Release the day's tension on the bag and walk out with a clearer, more focused mindset.",
          "Expert Coaching: Personalised attention in a small-group setting to ensure your form is sharp and your safety is prioritised.",
        ],
      },
    ],
  },
  {
    name: "Combos, Pads, & Fitness",
    oneLiner:
      "Our signature high-energy session bridging boxing drills and functional fitness.",
    body: [
      {
        heading: "The Session",
        paragraphs: [
          "Combos, Pads, & Fitness is our signature high-energy boxing session designed for real people who want real grit. This isn't a box-to-the-beat cardio class; it's a technical, high-intensity workout that bridges the gap between professional boxing drills and elite functional fitness.",
        ],
      },
      {
        heading: "What to Expect",
        bullets: [
          "The Combos: Sharpen your mind and your reflexes. We move beyond basic 1-2s, teaching you fluid, powerful combinations that require focus, coordination, and discipline.",
          "The Pads: Work directly with our expert coaches or tribe partners. There is no hiding on the pads — this is where you build explosive power and accuracy.",
          "The Fitness: We integrate high-intensity interval training (HIIT) to ensure you're torching between 500 to 800 calories. Expect full-body engagement — legs, core, and shoulders — to build a lean, athletic physique.",
        ],
      },
    ],
  },
  {
    name: "Boxing Induction",
    oneLiner:
      "New to the tribe? The foundation of your fight starts here.",
    body: [
      {
        paragraphs: [
          "The first round starts here. No mirrors, no posing, just the foundation of your fight.",
          "New to the tribe? This is where it begins. Our Boxing Induction isn't a \"gym class\" — it's your entry into a high-energy, grit-fuelled world where we trade ego for effort. Led by our expert coaches, this session is designed to strip away the intimidation of boxing and replace it with real skill and raw confidence.",
        ],
      },
      {
        heading: "What to Expect",
        paragraphs: ["We're going to get you moving properly from the ground up. You'll learn:"],
        bullets: [
          "The Fundamentals: Stance, movement, and the core punches (1-2s, hooks, and uppercuts) with technical precision.",
          "The Rituals: How to wrap your hands like a pro and respect the flow of the studio.",
          "The Energy: A proper sweat that introduces you to our high-intensity, small-group training environment.",
        ],
      },
    ],
  },
  {
    name: "Technical Boxing & Sparring",
    oneLiner:
      "Where grit meets technique — refine footwork, defence, and controlled sparring.",
    body: [
      {
        paragraphs: [
          "Fuel Your Fire. Master the Craft.",
          "This isn't just another workout; this is where the grit meets the technique. Our Technical Boxing & Sparring sessions are designed for those ready to move beyond the bags and into the art of the sport. Under the guidance of our expert coaches, you will refine your footwork, sharpen your defensive shells, and learn the tactical \"why\" behind every punch.",
          "We focus on controlled, technical application in a high-energy, supportive environment. Whether you are working through partner drills or stepping into supervised sparring, the goal is growth — not ego. Build the mental toughness, resilience, and confidence that only the ring can provide.",
        ],
      },
      {
        heading: "What to Expect",
        bullets: [
          "Precision Drills: Deep dives into advanced combinations and defensive movement.",
          "Technical Sparring: Controlled, conditional sparring to apply your skills in real-time.",
          "Expert Coaching: Personalised feedback to ensure you're moving with power and safety.",
        ],
      },
      {
        heading: "Mandatory Gear",
        paragraphs: [
          "To keep our tribe safe and the standards high, the following is strictly required for this session:",
        ],
        bullets: [
          "14oz+ Boxing Gloves (essential for sparring safety).",
          "Gumshield (no gumshield, no sparring).",
        ],
      },
    ],
  },
  {
    name: "Bodyjunkies Outdoor Fitness 60",
    oneLiner:
      "A 60-minute outdoor fitness and strength session at the Emirates stadium.",
    body: [
      {
        paragraphs: [
          "Bodyjunkies Outdoor Fitness 60 is a 60 min class designed to improve fitness and strength. Learn and improve exercise technique, strength and endurance and most of all have fun doing it with like minded people.",
          "This class takes place outside the Emirates stadium where we use the stairs and blocks around the stadium.",
          "Equipment Based: Dumbbells, Slam Balls and Kettlebells.",
        ],
      },
    ],
  },
  {
    name: "Bodyjunkies Outdoor Fitness H.I.I.T",
    oneLiner:
      "A 45-minute outdoor HIIT session for cardio and serious calorie burn.",
    body: [
      {
        paragraphs: [
          "Bodyjunkies Outdoor Fitness H.I.I.T is 45 mins. This class takes place outside the Emirates stadium where we use the stairs and blocks around the stadium and bodyweight exercises using an interval timer.",
          "You will also benefit from important cardiovascular activity and sheer calorie burning effectiveness, all from one hardworking but fun and effective workout.",
        ],
      },
    ],
  },
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Classes
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            The Weekly Timetable
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Boxing, bagwork, conditioning, and outdoor fitness — every session
            coached, high-energy, and built around your drive.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schedule.map((day) => (
              <div
                key={day.day}
                className="rounded-xl border border-white/15 bg-black/20 p-4"
              >
                <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--bj-orange)]">
                  {day.day}
                </h2>
                <ul className="mt-3 space-y-3">
                  {day.sessions.map((session) => (
                    <li
                      key={`${session.time}-${session.name}`}
                      className="border-l-2 border-[var(--bj-red)] pl-3"
                    >
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                        <Clock3 className="h-3.5 w-3.5" />
                        <span className="tabular-nums">{session.time}</span>
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">
                        {session.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/60">
            Times can vary week to week. Check the live schedule for exact dates
            and availability, and to book your spot.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={SCHEDULE_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              View Live Schedule
            </a>
            <Link
              href="/starter-pack"
              className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
            >
              Starter Pack £49
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            The Sessions
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase text-white sm:text-3xl">
            What Each Class Delivers
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Tap any class to expand the full breakdown.
          </p>

          <div className="mt-6">
            <ClassDescriptions classes={classDescriptions} />
          </div>
        </section>
      </div>
    </main>
  );
}
