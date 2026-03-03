"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../lib/analytics";
import {
  MOMENCE_HOST_ID,
  getTimeoutMultiplier,
  isMomenceOrigin,
  withReturnUrl,
} from "../lib/momence-embed";
import { useMomenceIframe } from "../hooks/use-momence-iframe";

const APPOINTMENTS_BASE_URL =
  "https://momence.com/appointments/appointment-reservation/93353?boardId=94755";
const APPOINTMENTS_URL = withReturnUrl(APPOINTMENTS_BASE_URL);
const FALLBACK_BOOKING_URL = APPOINTMENTS_BASE_URL;

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
  const appointments = useMomenceIframe({
    src: APPOINTMENTS_URL,
    timeoutMs: 15_000,
    analyticsSource: "momence_post_message",
  });

  const leadFormRef = useRef<HTMLDivElement>(null);
  const hasTrackedLeadSubmitRef = useRef(false);
  const [leadFormStatus, setLeadFormStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [leadFormKey, setLeadFormKey] = useState(0);

  // Lead-form–specific postMessage listener for submit analytics
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

  // Lead form script injection (with 1 cache-bust retry + timeout)
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
      script.setAttribute("fields", "firstName,lastName,email,phoneNumber");
      script.setAttribute("token", "zyXo3KnqXB");
      script.setAttribute("country_code", "gb");
      script.setAttribute(
        "data-field-def",
        '{"firstName":{"type":"text","label":"First name","required":true},"lastName":{"type":"text","label":"Last name","required":true},"email":{"type":"email","label":"Email","required":true},"phoneNumber":{"type":"phone-number","label":"Phone number","required":true}}',
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
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Choose Your Route
        </p>
        <p className="mt-2 text-sm text-white/80 sm:text-base">
          New to 1:1 coaching? Share your goal first. Ready now? Book your slot straight away.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href="#pt-goal"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Share Goal First
          </a>
          <a
            href="#pt-book"
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Slot Now
          </a>
        </div>
      </div>

      <motion.article
        id="pt-book"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -3 }}
        className="group rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Appointments
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
          Book Personal Training
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          Choose a 1:1 slot that fits your week and lock it in directly below.
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-white/15 bg-black/20 p-2 sm:p-3">
          {appointments.status === "loading" && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-5 text-center">
              <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                Loading Personal Training Appointments
              </p>
            </div>
          )}
          {appointments.status === "error" && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
              <p className="max-w-md text-sm text-white/80">
                Booking did not load. Try again or open appointments in a new tab.
              </p>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={appointments.retry}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Try Again
                </button>
                <a
                  href={FALLBACK_BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Open Booking In New Tab
                </a>
              </div>
            </div>
          )}
          {appointments.status !== "error" && (
            <iframe
              key={appointments.retryKey}
              ref={appointments.iframeRef}
              src={appointments.iframeSrc}
              className="min-h-[60vh] w-full border-0"
              allowFullScreen
              scrolling="yes"
              loading="eager"
              title="Bodyjunkies Personal Training Appointments"
              onLoad={appointments.onLoad}
              onError={appointments.onError}
            />
          )}
        </div>
      </motion.article>

      <motion.article
        id="pt-goal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, delay: 0.04 }}
        whileHover={{ y: -3 }}
        className="group rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Lead Form
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
          Share Your Goal First
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
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
                Form did not load. Try again or use appointments and add goals in your note.
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
                  href={FALLBACK_BOOKING_URL}
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
