"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const APR = 3.9;
const TERMS = [24, 36, 48, 60, 72, 84];

const eur = (v: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(v);

function monthlyPayment(principal: number, apr: number, months: number) {
  if (principal <= 0) return 0;
  const r = apr / 100 / 12;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Financing() {
  const root = useRef<HTMLElement>(null);
  const [price, setPrice] = useState(45000);
  const [down, setDown] = useState(9000);
  const [term, setTerm] = useState(48);

  const principal = Math.max(0, price - down);
  const monthly = monthlyPayment(principal, APR, term);
  const total = monthly * term + down;

  const monthlyNode = useRef<HTMLParagraphElement>(null);
  const fromRef = useRef(monthly);

  // Reveal on scroll
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced()) return;
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

  // Glide the monthly figure toward its new value by writing
  // straight to the node — no re-render per frame
  useEffect(() => {
    const node = monthlyNode.current;
    if (!node) return;
    const render = (v: number) => {
      const label = eur(Math.round(v));
      node.textContent = label;
      node.setAttribute("aria-label", `Estimated monthly payment ${label}`);
    };
    if (reduced()) {
      fromRef.current = monthly;
      render(monthly);
      return;
    }
    const o = { v: fromRef.current };
    const tween = gsap.to(o, {
      v: monthly,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => render(o.v),
    });
    fromRef.current = monthly;
    return () => {
      tween.kill();
    };
  }, [monthly]);

  const downMax = Math.min(100000, price);

  return (
    <section
      ref={root}
      id="financing"
      aria-labelledby="financing-title"
      className="relative scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-reveal className="max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.28em] text-[#64748B] uppercase">
            <span aria-hidden="true" className="h-px w-10 bg-[#0F172A]" />
            Financing
          </p>
          <h2
            id="financing-title"
            className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-[#0F172A] sm:text-5xl dark:text-slate-100"
          >
            Plain numbers, printed large.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
            Move the sliders. What you see is what you pay — no arrangement
            fees hiding in footnotes.
          </p>
        </div>

        <div
          data-reveal
          className="mt-10 grid gap-6 overflow-hidden rounded-3xl bg-[#0F172A] p-6 text-white sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 dark:border dark:border-white/10"
        >
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="fin-price"
                  className="font-mono text-[11px] tracking-[0.24em] text-white/55 uppercase"
                >
                  Vehicle price
                </label>
                <output
                  htmlFor="fin-price"
                  className="font-display text-2xl font-semibold tracking-tight"
                >
                  {eur(price)}
                </output>
              </div>
              <input
                id="fin-price"
                type="range"
                min={10000}
                max={200000}
                step={1000}
                value={price}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setPrice(v);
                  setDown((d) => Math.min(d, v));
                }}
                className="mt-3 w-full cursor-pointer accent-white"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="fin-down"
                  className="font-mono text-[11px] tracking-[0.24em] text-white/55 uppercase"
                >
                  Down payment
                </label>
                <output
                  htmlFor="fin-down"
                  className="font-display text-2xl font-semibold tracking-tight"
                >
                  {eur(down)}
                </output>
              </div>
              <input
                id="fin-down"
                type="range"
                min={0}
                max={downMax}
                step={500}
                value={Math.min(down, downMax)}
                onChange={(e) => setDown(Number(e.target.value))}
                className="mt-3 w-full cursor-pointer accent-white"
              />
            </div>

            <div>
              <p
                id="fin-term-label"
                className="font-mono text-[11px] tracking-[0.24em] text-white/55 uppercase"
              >
                Term
              </p>
              <div
                role="group"
                aria-labelledby="fin-term-label"
                className="mt-3 flex flex-wrap gap-2"
              >
                {TERMS.map((t) => {
                  const isActive = term === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTerm(t)}
                      aria-pressed={isActive}
                      className={`cursor-pointer rounded-full px-4 py-2 font-mono text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                        isActive
                          ? "bg-white font-bold text-[#0F172A]"
                          : "bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {t} mo
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-between rounded-2xl bg-white/[0.06] p-6 sm:p-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.24em] text-white/55 uppercase">
                Your monthly rate · {APR}% APR
              </p>
              <p
                ref={monthlyNode}
                aria-label={`Estimated monthly payment ${eur(Math.round(monthly))}`}
                className="font-display mt-2 text-6xl font-semibold tracking-tight tabular-nums sm:text-7xl"
              >
                {eur(Math.round(monthly))}
              </p>
              <p className="mt-3 text-sm text-white/60">
                {eur(total)} total · {eur(principal)} financed over {term}{" "}
                months. 0.9% APR available on selected stock.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#visit"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#E9EDF1] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Get pre-approved
              </a>
              <a
                href="tel:+49305550107"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Talk to finance
              </a>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-3 sm:gap-5"
        >
          {[
            ["Approval fast", "Decision while your coffee is still hot."],
            ["Every credit story", "First car or fresh start — talk to us."],
            ["Zero fine print", "Fees listed next to the rate, not under it."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-white/10 dark:bg-slate-900"
            >
              <p className="font-display text-lg font-semibold tracking-tight text-[#0F172A] dark:text-slate-100">
                {t}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#475569] dark:text-slate-300">
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
