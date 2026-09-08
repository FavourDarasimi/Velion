"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARS = ["911 Carrera S", "Velion Roadster", "Velion Tourer", "Not sure yet"];

interface Errors {
  name?: string;
  phone?: string;
  date?: string;
}

const inputClass = (invalid: boolean, dark = false) =>
  `w-full rounded-xl border px-4 py-3 text-[15px] transition-colors focus:outline-none focus-visible:ring-2 ${
    dark
      ? "border-white/20 bg-white/[0.07] text-white placeholder:text-white/40 focus-visible:ring-white"
      : "border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-[#0F172A] dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-white"
  } ${invalid ? (dark ? "border-red-400" : "border-red-400") : dark ? "hover:border-white/40" : "hover:border-[#94A3B8]"}`;

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function Visit() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const car = String(data.get("car") ?? CARS[0]);

    if (name.length < 2) next.name = "What should we call you?";
    if (phone.replace(/\D/g, "").length < 6)
      next.phone = "A number we can actually reach.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayISO())
      next.date = "Pick today or a future day.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const nice = new Date(`${date}T12:00:00`).toLocaleDateString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setSummary(`${car} · ${nice}`);
    setSent(true);
  };

  return (
    <section
      ref={root}
      id="visit"
      aria-labelledby="visit-title"
      className="relative scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div
          data-reveal
          className="grid gap-10 overflow-hidden rounded-3xl bg-[#0F172A] p-6 text-white sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-14 dark:border dark:border-white/10"
        >
          {/* Pitch */}
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.28em] text-white/55 uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-white/60" />
              Visit
            </p>
            <h2
              id="visit-title"
              className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl"
            >
              Test drive in 30 seconds.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Pick a day, we warm up the car and the coffee. No deposit,
              no paperwork before you drive.
            </p>
            <dl className="mt-8 space-y-4">
              {[
                ["Showroom", "Kantstraße 7, Berlin"],
                ["Hours", "Mon–Sat · 9:00–19:00"],
                ["Direct", "+49 30 555 0107"],
              ].map(([t, d]) => (
                <div key={t} className="flex items-baseline gap-4">
                  <dt className="w-24 shrink-0 font-mono text-[11px] tracking-[0.22em] text-white/50 uppercase">
                    {t}
                  </dt>
                  <dd className="font-display text-xl font-medium tracking-tight">
                    {d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-6 text-[#0F172A] sm:p-8 dark:bg-slate-900 dark:text-slate-100 dark:border dark:border-white/10">
            {sent ? (
              <div aria-live="polite" className="flex h-full flex-col justify-center py-8 text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="size-6 text-emerald-700"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="font-display mt-5 text-3xl font-semibold tracking-tight">
                  You&apos;re booked in.
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-[#64748B] dark:text-slate-400 uppercase">
                  {summary}
                </p>
                <p className="mx-auto mt-3 max-w-sm text-[#475569] dark:text-slate-300">
                  We&apos;ll confirm by phone shortly. The coffee part is
                  guaranteed.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] uppercase">
                  Book a test drive
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="visit-car"
                      className="mb-1.5 block text-sm font-semibold"
                    >
                      Car
                    </label>
                    <select
                      id="visit-car"
                      name="car"
                      defaultValue={CARS[0]}
                      className={`${inputClass(false)} cursor-pointer`}
                    >
                      {CARS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="visit-name"
                        className="mb-1.5 block text-sm font-semibold"
                      >
                        Name
                      </label>
                      <input
                        id="visit-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Meyer"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "visit-name-err" : undefined
                        }
                        className={inputClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p id="visit-name-err" className="mt-1.5 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="visit-phone"
                        className="mb-1.5 block text-sm font-semibold"
                      >
                        Phone
                      </label>
                      <input
                        id="visit-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+49 …"
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "visit-phone-err" : undefined
                        }
                        className={inputClass(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p id="visit-phone-err" className="mt-1.5 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="visit-date"
                      className="mb-1.5 block text-sm font-semibold"
                    >
                      Preferred day
                    </label>
                    <input
                      id="visit-date"
                      name="date"
                      type="date"
                      min={todayISO()}
                      aria-invalid={!!errors.date}
                      aria-describedby={
                        errors.date ? "visit-date-err" : undefined
                      }
                      className={`${inputClass(!!errors.date)} cursor-pointer`}
                    />
                    {errors.date && (
                      <p id="visit-date-err" className="mt-1.5 text-sm text-red-600">
                        {errors.date}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full cursor-pointer rounded-full bg-[#0F172A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Book my drive
                </button>
                <p className="mt-3 text-center text-xs text-[#94A3B8]">
                  Or just walk in — Mon–Sat, 9:00–19:00.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
