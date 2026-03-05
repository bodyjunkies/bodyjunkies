"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, MessageSquareText } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import {
  MOMENCE_HOST_ID,
  getTimeoutMultiplier,
  isMomenceOrigin,
} from "../lib/momence-embed";

const APPOINTMENTS_URL =
  "https://momence.com/appointments/appointment-reservation/93353?boardId=94755";

const LEAD_FORM_SCRIPT_SRC = "https://momence.com/plugin/lead-form/lead-form.js";
const LEAD_FORM_CONTAINER_ID = "momence-plugin-lead-form";
const LEAD_FORM_TIMEOUT_MS = 8_000;
const LEAD_SUBMIT_PATTERN = /(lead|form).*(submit|success)|enquiry|inquiry/;

const loadedLeadFormUrls = new Set<string>();

function uniqueLeadFormUrl(bust: boolean): string {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  let url = bust ? `${LEAD_FORM_SCRIPT_SRC}?_r=${suffix}` : LEAD_FORM_SCRIPT_SRC;
  if (loadedLeadFormUrls.has(url)) {
    url = `${LEAD_FORM_SCRIPT_SRC}?_r=${suffix}`;
  }
  loadedLeadFormUrls.add(url);
  return url;
}

export function MomencePersonalTrainingEmbed() {
  const leadFormRef = useRef<HTMLDivElement>(null);
  const hasTrackedLeadSubmitRef = useRef(false);
  const [leadFormStatus, setLeadFormStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [leadFormKey, setLeadFormKey] = useState(0);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!isMomenceOrigin(event.origin)) return;
      if (hasTrackedLeadSubmitRef.current) return;

      const text =
        typeof event.data === "string"
          ? event.data.toLowerCase()
          : typeof event.data === "object" && event.data
            ? ["type", "event", "status", "message", "action", "name"]
                .map((k) => (event.data as Record<string, unknown>)[k])
                .filter((v): v is string => typeof v === "string")
                .map((v) => v.toLowerCase())
                .join(" ")
            : "";

      if (LEAD_SUBMIT_PATTERN.test(text)) {
        hasTrackedLeadSubmitRef.current = true;
        trackEvent("pt_form_submit", {
          source: "lead_form_post_message",
          path: window.location.pathname,
        });
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const container = leadFormRef.current;
    if (!container) return;

    let settled = false;
    let retryDone = false;
    const mult = getTimeoutMultiplier();
    const timers: number[] = [];

    const markReady = () => {
      if (settled) return;
      settled = true;
      for (const t of timers) window.clearTimeout(t);
      setLeadFormStatus("ready");
    };

    const markError = () => {
      if (settled) return;
      settled = true;
      for (const t of timers) window.clearTimeout(t);
      setLeadFormStatus("error");
    };

    const injectScript = (bust: boolean) => {
      const script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.id = "momence-plugin-lead-form-src";
      script.setAttribute("fetchpriority", "high");
      script.setAttribute("host_id", MOMENCE_HOST_ID);
      script.setAttribute(
        "fields",
        "firstName,lastName,email,phoneNumber,Typeofsession,dayWeek,preferredTime,additionalInformation",
      );
      script.setAttribute("token", "zyXo3KnqXB");
      script.setAttribute("country_code", "gb");
      script.setAttribute(
        "data-field-def",
        '{"firstName":{"type":"text","label":"First name","required":true},"lastName":{"type":"text","label":"Last name","required":true},"email":{"type":"email","label":"Email","required":true},"phoneNumber":{"type":"phone-number","label":"Phone number","required":true},"Typeofsession":{"type":"dropdown","label":"Type of session","required":true,"hidden":false,"selectOptions":["Boxing","Strength ","HIIT ","Not sure"]},"dayWeek":{"type":"multiselect","label":"Day of Week","required":true,"hidden":false,"selectOptions":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]},"preferredTime":{"type":"multiselect","label":"Preferred Time","required":true,"hidden":false,"selectOptions":["6am - 11am","12pm - 5pm","6pm - 9pm"]},"additionalInformation":{"type":"text","label":"Additional Information (optional)","required":false,"hidden":false}}',
      );
      script.onload = markReady;
      script.onerror = () => {
        if (!retryDone) {
          retryDone = true;
          mountLeadForm(true);
          return;
        }
        markError();
      };
      script.src = uniqueLeadFormUrl(bust);
      return script;
    };

    const mountLeadForm = (bust: boolean) => {
      container.innerHTML = "";
      const wrapper = document.createElement("div");
      wrapper.id = LEAD_FORM_CONTAINER_ID;
      container.appendChild(wrapper);
      container.appendChild(injectScript(bust));
    };

    const onSubmit = () => {
      if (hasTrackedLeadSubmitRef.current) return;
      hasTrackedLeadSubmitRef.current = true;
      trackEvent("pt_form_submit", { source: "lead_form", path: window.location.pathname });
    };
    container.addEventListener("submit", onSubmit, true);

    const deferredMountId = window.setTimeout(() => {
      if (settled) return;
      mountLeadForm(false);
      timers.push(
        window.setTimeout(() => {
          if (!settled) markError();
        }, LEAD_FORM_TIMEOUT_MS * mult),
      );
    }, 0);

    return () => {
      settled = true;
      window.clearTimeout(deferredMountId);
      for (const t of timers) window.clearTimeout(t);
      container.removeEventListener("submit", onSubmit, true);
      container.querySelector("#momence-plugin-lead-form-src")?.remove();
    };
  }, [leadFormKey]);

  const retryLeadForm = useCallback(() => {
    setLeadFormStatus("loading");
    setLeadFormKey((k) => k + 1);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[5fr_7fr] lg:gap-6 lg:items-start">
      {/* Left column — Book directly */}
      <motion.article
        id="pt-book"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/15 bg-white/[0.02] p-5 sm:p-6 lg:sticky lg:top-24"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
          <CalendarCheck className="h-5 w-5 text-[var(--bj-red)]" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Ready to Train
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
          Book a Session
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
          Know what you want? Pick a 1:1 slot that fits your week and lock it in.
        </p>
        <a
          href={APPOINTMENTS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          View Appointments & Book
          <ArrowRight className="h-4 w-4" />
        </a>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Not sure yet?
          </p>
          <p className="mt-1.5 text-sm text-white/70">
            Fill in the form and we&apos;ll help you figure out the right sessions for
            your goals.
          </p>
          <a
            href="#pt-goal"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
          >
            Share your goal
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.article>

      {/* Right column — Lead form */}
      <motion.article
        id="pt-goal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="rounded-2xl border border-white/15 bg-white/[0.02] p-5 sm:p-6"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
          <MessageSquareText className="h-5 w-5 text-[var(--bj-orange)]" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          New to 1:1
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
          Share Your Goal First
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
          Reach out and we&apos;ll discuss where you are now and what you want from your
          sessions.
        </p>
        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3 sm:p-4">
          {leadFormStatus === "loading" && (
            <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 px-5 text-center">
              <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                Loading Goal Form
              </p>
            </div>
          )}
          {leadFormStatus === "error" && (
            <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 px-5 text-center">
              <p className="max-w-md text-sm text-white/80">
                Form did not load. Try again or book directly and add your goals in the
                note.
              </p>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={retryLeadForm}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Try Again
                </button>
                <a
                  href={APPOINTMENTS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Open Appointments
                </a>
              </div>
            </div>
          )}
          <div ref={leadFormRef} className="min-h-[140px]" />
        </div>
      </motion.article>
    </div>
  );
}
