"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS: Array<{ n: number; suffix: string; label: string }> = [
  { n: 27, suffix: " yrs", label: "on the road" },
  { n: 212, suffix: " pts", label: "inspection per car" },
  { n: 7, suffix: " days", label: "money back" },
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

      // Count-up stats ride along with the entrance
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: target,
            duration: 1.6,
            ease: "expo.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          },
          0.9,
        );
      });

      // Rotating headline word: noise. → markup. → haggling. → waiting.
      const rotator =
        root.current?.querySelector<HTMLElement>("[data-rotator]");
      if (rotator) {
        const words = ["noise.", "markup.", "haggling.", "waiting."];
        let wi = 0;
        const swap = () => {
          wi = (wi + 1) % words.length;
          gsap
            .timeline()
            .to(rotator, {
              yPercent: -115,
              duration: 0.32,
              ease: "power3.in",
            })
            .add(() => {
              rotator.textContent = words[wi];
            })
            .fromTo(
              rotator,
              { yPercent: 115 },
              { yPercent: 0, duration: 0.6, ease: "expo.out" },
            );
        };
        const loop = (): void => {
          swap();
          gsap.delayedCall(2.6, loop);
        };
        gsap.delayedCall(3.2, loop);
      }

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

    // Pointer-driven spice: magnetic CTA + cursor glow (fine pointers only,
    // native listeners so they get explicit cleanup alongside ctx.revert)
    const cleanups: Array<() => void> = [];
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(pointer: fine)").matches
    ) {
      const magnet =
        root.current?.querySelector<HTMLElement>("[data-magnet]");
      if (magnet) {
        const xTo = gsap.quickTo(magnet, "x", {
          duration: 0.4,
          ease: "power3",
        });
        const yTo = gsap.quickTo(magnet, "y", {
          duration: 0.4,
          ease: "power3",
        });
        const onMove = (e: PointerEvent) => {
          const r = magnet.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        const onLeave = () =>
          gsap.to(magnet, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
          });
        magnet.addEventListener("pointermove", onMove);
        magnet.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          magnet.removeEventListener("pointermove", onMove);
          magnet.removeEventListener("pointerleave", onLeave);
        });
      }
      const glow = root.current?.querySelector<HTMLElement>("[data-glow]");
      const section = root.current;
      if (glow && section) {
        const gxTo = gsap.quickTo(glow, "x", {
          duration: 0.9,
          ease: "power3",
        });
        const gyTo = gsap.quickTo(glow, "y", {
          duration: 0.9,
          ease: "power3",
        });
        const onGlow = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          gxTo(((e.clientX - r.left) / r.width - 0.5) * 48);
          gyTo(((e.clientY - r.top) / r.height - 0.5) * 48);
        };
        section.addEventListener("pointermove", onGlow);
        cleanups.push(() =>
          section.removeEventListener("pointermove", onGlow),
        );
      }
    }
    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
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
        <div className="relative">
          <div
            aria-hidden="true"
            data-glow
            className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(199,210,254,0.55),transparent_65%)] blur-2xl"
          />
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
                minus the{" "}
                <span className="relative inline-block align-baseline">
                  <span aria-hidden="true" className="invisible">
                    haggling.
                  </span>
                  <span
                    aria-hidden="true"
                    data-rotator
                    className="absolute inset-0 text-[#0F172A]"
                  >
                    noise.
                  </span>
                  <span className="sr-only">noise.</span>
                </span>
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
              data-magnet
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F172A] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 will-change-transform hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
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
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-4 first:pl-0">
                <dt
                  data-count={s.n}
                  data-suffix={s.suffix}
                  className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]"
                >
                  {s.n}
                  {s.suffix}
                </dt>
                <dd className="mt-1 font-mono text-[10.5px] tracking-[0.16em] text-[#64748B] uppercase">
                  {s.label}
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
