"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVIEWS = [
  {
    quote:
      "Inspection sheet in hand before I even asked. Found two stone chips they had already marked — that honesty sold me the car.",
    name: "Jonas K.",
    context: "Bought a Golf · March 2026",
  },
  {
    quote:
      "Test drive booked in a minute, approved financing over one coffee. Drove home the same afternoon. Unreal.",
    name: "Priya S.",
    context: "Bought a 3 Series · January 2026",
  },
  {
    quote:
      "Traded my old Polo, fair number in 24 hours as promised, and they handled every paper. Zero dealership theatre.",
    name: "Marta L.",
    context: "Traded + bought · November 2025",
  },
];

function Stars() {
  return (
    <span
      role="img"
      aria-label="Rated 5 out of 5 stars"
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4 text-[#0F172A]"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const root = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={root}
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.28em] text-[#64748B] uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-[#0F172A]" />
              Reviews
            </p>
            <h2
              id="reviews-title"
              className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-[#0F172A] sm:text-5xl"
            >
              2,140 neighbours rate us 4.9.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4">
            <p className="font-display text-4xl font-semibold tracking-tight text-[#0F172A]">
              4.9
            </p>
            <span>
              <Stars />
              <span className="mt-1 block font-mono text-[10.5px] tracking-[0.16em] text-[#64748B] uppercase">
                Google · 2,140 reviews
              </span>
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              data-reveal
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-7"
            >
              <div>
                <Stars />
                <blockquote className="mt-4 text-[17px] leading-relaxed text-[#0F172A]">
                  “{r.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-[#E2E8F0] pt-4">
                <p className="font-semibold text-[#0F172A]">{r.name}</p>
                <p className="mt-0.5 font-mono text-[10.5px] tracking-[0.16em] text-[#64748B] uppercase">
                  {r.context}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
