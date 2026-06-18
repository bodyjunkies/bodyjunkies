"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type ClassBodySection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ClassDescription = {
  name: string;
  oneLiner: string;
  body: ClassBodySection[];
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

export function ClassDescriptions({ classes }: { classes: ClassDescription[] }) {
  const [openName, setOpenName] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {classes.map((item) => {
        const isOpen = openName === item.name;
        const panelId = `class-panel-${item.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

        return (
          <article
            key={item.name}
            className="overflow-hidden rounded-xl border border-white/15 bg-black/20"
          >
            <button
              type="button"
              onClick={() => setOpenName((prev) => (prev === item.name ? null : item.name))}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-start gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04] sm:px-5"
            >
              <span className="flex-1">
                <span className="block text-sm font-extrabold uppercase tracking-[0.08em] text-white sm:text-base">
                  {item.name}
                </span>
                <span className="mt-1 block text-sm text-white/70">
                  {item.oneLiner}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.24, ease: PANEL_EASE }}
                className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: PANEL_EASE }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 border-t border-white/10 px-4 pb-5 pt-4 sm:px-5">
                    {item.body.map((section, index) => (
                      <div key={index} className="space-y-2">
                        {section.heading ? (
                          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--bj-orange)]">
                            {section.heading}
                          </h3>
                        ) : null}
                        {section.paragraphs?.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-sm leading-relaxed text-white/85"
                          >
                            {paragraph}
                          </p>
                        ))}
                        {section.bullets?.length ? (
                          <ul className="space-y-1.5 text-sm text-white/85">
                            {section.bullets.map((bullet, bIndex) => (
                              <li key={bIndex} className="flex gap-2">
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bj-red)]"
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
