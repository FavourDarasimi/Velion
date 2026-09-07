"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARS, FILTERS, type Car } from "@/components/cars";
import { DIALOG_HASH } from "@/components/car-images";

function CarCard({ car }: { car: Car }) {
  if (car.status === "soon") {
    return (
      <article
        data-reveal
        className="flex min-h-80 flex-col justify-between overflow-hidden rounded-2xl bg-[#0F172A] p-6 text-white sm:p-7"
      >
        <p className="font-mono text-[11px] tracking-[0.24em] text-white/50 uppercase">
          {car.bodyType} — Soon
        </p>
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight">
            {car.name}
          </h3>
          <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-white/55 uppercase">
            {car.tagline}
          </p>
        </div>
        <a
          href="#visit"
          className="mt-6 inline-flex w-fit items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          Notify me
        </a>
      </article>
    );
  }

  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {car.image && (
          <Image
            src={car.image}
            alt={car.imageAlt ?? car.name}
            fill
            sizes="(max-width: 1024px) 95vw, 460px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        {car.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-[#0F172A] uppercase shadow-sm">
            {car.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-sm">
          {car.bodyType}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#64748B] uppercase">
          {car.tagline}
        </p>
        <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#0F172A]">
          {car.name}
        </h3>
        <div className="mt-4 flex items-baseline justify-between border-t border-[#E2E8F0] pt-4">
          <p className="font-display text-xl font-semibold text-[#0F172A]">
            {car.price}
          </p>
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#64748B]">
            {car.monthly}
          </p>
        </div>
        <a
          href={DIALOG_HASH}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          View car
        </a>
      </div>
    </article>
  );
}

export default function Collection() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

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

  const visible =
    filter === "All" ? CARS : CARS.filter((c) => c.bodyType === filter);
  const countFor = (f: (typeof FILTERS)[number]) =>
    f === "All" ? CARS.length : CARS.filter((c) => c.bodyType === f).length;

  return (
    <section
      ref={root}
      id="collection"
      aria-labelledby="collection-title"
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
              The collection
            </p>
            <h2
              id="collection-title"
              className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-[#0F172A] sm:text-5xl"
            >
              Fresh on the lot.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#475569]">
              Every car inspected over 212 points and priced in plain
              print. New stock lands every Thursday.
            </p>
          </div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#94A3B8] uppercase">
            {CARS.filter((c) => c.status === "available").length} available
          </p>
        </div>

        <div
          data-reveal
          role="group"
          aria-label="Filter by body type"
          className="mt-8 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none ${
                  isActive
                    ? "border-[#0F172A] bg-[#0F172A] font-semibold text-white"
                    : "border-[#E2E8F0] bg-white font-medium text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A]"
                }`}
              >
                {f}
                <span
                  className={`font-mono text-[11px] ${isActive ? "text-white/70" : "text-[#94A3B8]"}`}
                >
                  {countFor(f)}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? "car" : "cars"} shown
        </p>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
            {visible.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div
            data-reveal
            className="mt-8 rounded-2xl border border-dashed border-[#CBD5E1] bg-white/60 px-6 py-16 text-center"
          >
            <p className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              Nothing here right now.
            </p>
            <p className="mt-2 text-[#475569]">
              New stock lands every Thursday — check back soon.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="mt-6 cursor-pointer rounded-full bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Browse everything
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
