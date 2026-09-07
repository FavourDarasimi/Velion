"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    n: "01",
    title: "Tell us the car",
    text: "Plate, mileage, and how to reach you. Thirty seconds.",
  },
  {
    n: "02",
    title: "Get a real number",
    text: "A buyer — not a bot — values it within 24 hours.",
  },
  {
    n: "03",
    title: "Put it toward yours",
    text: "Trade value comes straight off your next car.",
  },
];

interface Errors {
  vehicle?: string;
  year?: string;
  mileage?: string;
  name?: string;
  phone?: string;
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] ${
    invalid
      ? "border-red-400"
      : "border-[#E2E8F0] hover:border-[#94A3B8]"
  }`;

export default function TradeIn() {
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
    const vehicle = String(data.get("vehicle") ?? "").trim();
    const year = String(data.get("year") ?? "").trim();
    const mileage = String(data.get("mileage") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (vehicle.length < 2) next.vehicle = "Tell us the make and model.";
    if (!/^(19|20)\d{2}$/.test(year)) next.year = "Four-digit year, e.g. 2019.";
    if (!/^\d[\d\s.]*$/.test(mileage)) next.mileage = "Numbers only, e.g. 84 500.";
    if (name.length < 2) next.name = "What should we call you?";
    if (phone.replace(/\D/g, "").length < 6)
      next.phone = "A number we can actually reach.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSummary(`${vehicle} · ${year} · ${mileage} km`);
    setSent(true);
  };

  return (
    <section
      ref={root}
      id="trade-in"
      aria-labelledby="trade-in-title"
      className="relative scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Explainer */}
          <div data-reveal className="flex flex-col justify-center">
            <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.28em] text-[#64748B] uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-[#0F172A]" />
              Trade-in
            </p>
            <h2
              id="trade-in-title"
              className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-[#0F172A] sm:text-5xl"
            >
              Your old car pays for the new one.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#475569]">
              No obligation, no need to buy from us. If the number works,
              it comes straight off your next car.
            </p>
            <ol className="mt-8 space-y-0 divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4 py-4">
                  <span className="font-mono text-xs font-bold text-[#94A3B8]">
                    {s.n}
                  </span>
                  <span>
                    <span className="font-display block text-lg font-semibold tracking-tight text-[#0F172A]">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-[#475569]">
                      {s.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Form card */}
          <div
            data-reveal
            className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_32px_60px_-48px_rgba(15,23,42,0.4)] sm:p-8"
          >
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
                <p className="font-display mt-5 text-3xl font-semibold tracking-tight text-[#0F172A]">
                  Request received.
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-[#64748B] uppercase">
                  {summary}
                </p>
                <p className="mx-auto mt-3 max-w-sm text-[#475569]">
                  A buyer will call you with a real valuation within 24
                  hours — no obligation attached.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] uppercase">
                  Free valuation · 30 seconds
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="trade-vehicle"
                      className="mb-1.5 block text-sm font-semibold text-[#0F172A]"
                    >
                      Make & model
                    </label>
                    <input
                      id="trade-vehicle"
                      name="vehicle"
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. VW Golf 1.5 TSI"
                      aria-invalid={!!errors.vehicle}
                      aria-describedby={
                        errors.vehicle ? "trade-vehicle-err" : undefined
                      }
                      className={inputClass(!!errors.vehicle)}
                    />
                    {errors.vehicle && (
                      <p id="trade-vehicle-err" className="mt-1.5 text-sm text-red-600">
                        {errors.vehicle}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="trade-year"
                        className="mb-1.5 block text-sm font-semibold text-[#0F172A]"
                      >
                        Year
                      </label>
                      <input
                        id="trade-year"
                        name="year"
                        type="text"
                        inputMode="numeric"
                        placeholder="2019"
                        aria-invalid={!!errors.year}
                        aria-describedby={
                          errors.year ? "trade-year-err" : undefined
                        }
                        className={inputClass(!!errors.year)}
                      />
                      {errors.year && (
                        <p id="trade-year-err" className="mt-1.5 text-sm text-red-600">
                          {errors.year}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="trade-mileage"
                        className="mb-1.5 block text-sm font-semibold text-[#0F172A]"
                      >
                        Mileage (km)
                      </label>
                      <input
                        id="trade-mileage"
                        name="mileage"
                        type="text"
                        inputMode="numeric"
                        placeholder="84 500"
                        aria-invalid={!!errors.mileage}
                        aria-describedby={
                          errors.mileage ? "trade-mileage-err" : undefined
                        }
                        className={inputClass(!!errors.mileage)}
                      />
                      {errors.mileage && (
                        <p id="trade-mileage-err" className="mt-1.5 text-sm text-red-600">
                          {errors.mileage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="trade-name"
                        className="mb-1.5 block text-sm font-semibold text-[#0F172A]"
                      >
                        Name
                      </label>
                      <input
                        id="trade-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Meyer"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "trade-name-err" : undefined
                        }
                        className={inputClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p id="trade-name-err" className="mt-1.5 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="trade-phone"
                        className="mb-1.5 block text-sm font-semibold text-[#0F172A]"
                      >
                        Phone
                      </label>
                      <input
                        id="trade-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+49 …"
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "trade-phone-err" : undefined
                        }
                        className={inputClass(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p id="trade-phone-err" className="mt-1.5 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full cursor-pointer rounded-full bg-[#0F172A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Get my estimate
                </button>
                <p className="mt-3 text-center text-xs text-[#94A3B8]">
                  Used only for your valuation. Never shared, never spammed.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
