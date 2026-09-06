"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS: Array<[string, string]> = [
  ["27 yrs", "on the road"],
  ["212 pts", "inspection per car"],
  ["7 days", "money back"],
];

const BRANDS = [
  "Porsche",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Tesla",
  "Volkswagen",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Non-essential motion off → content renders in its final state
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap.registerPlugin(ScrollTrigger);

      // Entrance: masked line reveals + soft staggered rises, expo.out
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from('[data-hero="eyebrow"]', {
        y: 14,
        autoAlpha: 0,
        duration: 0.7,
      }, 0.1)
        .from('[data-hero="line"]', {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.12,
        }, 0.15)
        .from('[data-hero="fade"]', {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.09,
        }, 0.55)
        .from('[data-hero="card"]', {
          y: 44,
          autoAlpha: 0,
          scale: 0.97,
          duration: 1.1,
        }, 0.6)
        .from('[data-hero="brands"]', {
          autoAlpha: 0,
          duration: 0.8,
        }, 1.0);

      // Scroll: hero drifts and softens away (scrubbed, no pinning)
      gsap.to('[data-hero="scroll"]', {
        y: -60,
        autoAlpha: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-14 sm:pt-32"
    >
      <div
        data-hero="scroll"
        className="mx-auto grid w-full max-w-[1500px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10"
      >
        {/* Copy */}
        <div>
          <p
            data-hero="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] text-[#475569] uppercase shadow-sm"
          >
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 motion-safe:animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            48 cars in stock — Berlin
          </p>

          <h1
            id="hero-title"
            className="font-display mt-6 text-[clamp(3rem,7vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-balance text-[#0F172A]"
          >
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span data-hero="line" className="block">
                Your next car,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span data-hero="line" className="block text-[#64748B]">
                minus the noise.
              </span>
            </span>
          </h1>

          <p
            data-hero="fade"
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#475569]"
          >
            Hand-picked stock, a 212-point inspection and fixed prices in
            plain print. Come for a coffee, leave for a test drive.
          </p>

          <div data-hero="fade" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F172A] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Browse collection
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#visit"
              className="inline-flex items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-7 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors duration-200 hover:border-[#0F172A] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
            >
              Book test drive
            </a>
          </div>

          <dl
            data-hero="fade"
            className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-[#E2E8F0] border-y border-[#E2E8F0]"
          >
            {STATS.map(([v, l]) => (
              <div key={l} className="px-4 py-4 first:pl-0">
                <dt className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
                  {v}
                </dt>
                <dd className="mt-1 font-mono text-[10.5px] tracking-[0.16em] text-[#64748B] uppercase">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Featured card */}
        <div data-hero="card" className="relative">
          <figure className="overflow-hidden rounded-3xl bg-[#0F172A] text-white shadow-[0_48px_90px_-48px_rgba(15,23,42,0.55)]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5 font-mono text-[10.5px] tracking-[0.22em] uppercase">
              <span className="text-white/60">Featured</span>
              <span className="text-white/60">01 / 48</span>
            </div>
            <div className="px-6 pt-6 sm:px-8">
              <p className="font-display text-4xl leading-[1.02] font-semibold tracking-tight sm:text-5xl">
                911 Carrera S
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-white/55 uppercase">
                2022 · 18,400 km · PDK
              </p>
            </div>
            <div className="group relative mx-4 mt-6 aspect-video overflow-hidden rounded-2xl sm:mx-5">
              <Image
                src="/coupe.jpg"
                alt="Midnight-blue sports coupe in a dark studio"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-[#0F172A] uppercase">
                New in
              </span>
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
              <span>
                <span className="font-display block text-2xl font-semibold tracking-tight">
                  €129,900
                </span>
                <span className="mt-1 block font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                  AI studio render
                </span>
              </span>
              <a
                href="#collection"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors duration-200 hover:bg-[#E9EDF1] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                View car
              </a>
            </figcaption>
          </figure>
        </div>

        {/* Brands */}
        <div
          data-hero="brands"
          className="lg:col-span-2 lg:pt-4"
        >
          <ul
            aria-label="Brands in stock"
            className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#E2E8F0] pt-6"
          >
            {BRANDS.map((b) => (
              <li
                key={b}
                className="font-mono text-[11px] tracking-[0.24em] text-[#94A3B8] uppercase transition-colors hover:text-[#0F172A]"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
