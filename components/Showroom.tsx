"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHECKS: Array<{ n: string; title: string; text: string }> = [
  {
    n: "01",
    title: "Paint & body",
    text: "Panel gaps, paint depth and accident repair check.",
  },
  {
    n: "02",
    title: "Engine & gearbox",
    text: "Compression, service records and a cold-start test.",
  },
  {
    n: "03",
    title: "History & mileage",
    text: "Ownership trail, mileage plausibility, lien search.",
  },
  {
    n: "04",
    title: "Road test",
    text: "30 km mixed route — brakes, steering, electronics.",
  },
];

export default function Showroom() {
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
      id="showroom"
      aria-labelledby="showroom-title"
      className="relative scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-reveal className="max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.28em] text-[#64748B] dark:text-slate-400 uppercase">
            <span aria-hidden="true" className="h-px w-10 bg-[#0F172A]" />
            The showroom
          </p>
          <h2
            id="showroom-title"
            className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-[#0F172A] dark:text-slate-100 sm:text-5xl"
          >
            Come see it in daylight.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#475569] dark:text-slate-300">
            Independent since 1998. No pressure, no scripts — coffee,
            daylight, and cars parked like they mean it.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-4 sm:gap-5 lg:grid-cols-2">
          {/* Inspection promise */}
          <div
            data-reveal
            className="rounded-2xl border border-[#E2E8F0] dark:border-white/10 bg-white dark:border-white/10 dark:bg-slate-900 p-6 sm:p-8"
          >
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] dark:text-slate-400 uppercase">
              The 212-point promise — in short
            </p>
            <ul className="mt-6 divide-y divide-[#E2E8F0] dark:divide-white/10">
              {CHECKS.map((c) => (
                <li key={c.n} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="font-mono text-xs font-bold text-[#94A3B8] dark:text-slate-500">
                    {c.n}
                  </span>
                  <span>
                    <span className="font-display block text-lg font-semibold tracking-tight text-[#0F172A] dark:text-slate-100">
                      {c.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#475569] dark:text-slate-300">
                      {c.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-[#F1F5F9] dark:bg-white/5 px-4 py-3 text-sm text-[#475569] dark:text-slate-300">
              Full inspection sheet printed for every car. Take it home,
              show your mechanic.
            </p>
          </div>

          {/* Visual */}
          <div data-reveal className="relative">
            <figure className="group relative h-full min-h-80 overflow-hidden rounded-2xl bg-[#0F172A]">
              <Image
                src="/gallery/cockpit.jpg"
                alt="Driver cockpit with dark leather seats and digital dash"
                fill
                sizes="(max-width: 1024px) 95vw, 700px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 py-1 pr-3.5 pl-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-sm">
                <span className="rounded-full bg-white px-2 py-0.5 font-bold text-[#0F172A] dark:text-slate-100">
                  4.9
                </span>
                2,140 reviews
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Visit / hours / talk strip */}
        <div
          data-reveal
          className="mt-4 grid divide-y divide-[#E2E8F0] dark:divide-white/10 rounded-2xl border border-[#E2E8F0] dark:border-white/10 bg-white dark:border-white/10 dark:bg-slate-900 sm:mt-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <div className="p-6 sm:p-7">
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] dark:text-slate-400 uppercase">
              Visit
            </p>
            <p className="font-display mt-3 text-xl font-semibold tracking-tight text-[#0F172A] dark:text-slate-100">
              Kantstraße 7, Berlin
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kantstra%C3%9Fe+7+Berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-[#0F172A] dark:text-slate-100 underline decoration-[#CBD5E1] decoration-2 underline-offset-4 transition-colors hover:decoration-[#0F172A] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
            >
              Get directions
            </a>
          </div>
          <div className="p-6 sm:p-7">
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] dark:text-slate-400 uppercase">
              Hours
            </p>
            <p className="font-display mt-3 text-xl font-semibold tracking-tight text-[#0F172A] dark:text-slate-100">
              Mon–Sat · 9:00–19:00
            </p>
            <p className="mt-2 text-sm text-[#475569] dark:text-slate-300">
              Sundays closed — the cars rest too.
            </p>
          </div>
          <div className="p-6 sm:p-7">
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] dark:text-slate-400 uppercase">
              Talk
            </p>
            <p className="font-display mt-3 text-xl font-semibold tracking-tight text-[#0F172A] dark:text-slate-100">
              +49 30 555 0107
            </p>
            <a
              href="tel:+49305550107"
              className="mt-2 inline-block text-sm font-semibold text-[#0F172A] dark:text-slate-100 underline decoration-[#CBD5E1] decoration-2 underline-offset-4 transition-colors hover:decoration-[#0F172A] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
            >
              Call the showroom
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
