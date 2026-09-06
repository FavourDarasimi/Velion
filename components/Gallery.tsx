"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Shot {
  src: string;
  alt: string;
  label: string;
  n: string;
}

const BANNER: Shot = {
  src: "/gallery/side.jpg",
  alt: "Midnight-blue sports coupe, pure side profile in a dark studio",
  label: "Side profile",
  n: "01",
};

const PAIRS: Shot[] = [
  {
    src: "/gallery/front-34.jpg",
    alt: "Midnight-blue sports coupe, front three-quarter view",
    label: "Front three-quarter",
    n: "02",
  },
  {
    src: "/gallery/rear-34.jpg",
    alt: "Midnight-blue sports coupe, rear three-quarter view",
    label: "Rear three-quarter",
    n: "03",
  },
];

const TRIPLES: Shot[] = [
  {
    src: "/gallery/front.jpg",
    alt: "Midnight-blue sports coupe, direct front view with headlights on",
    label: "Front",
    n: "04",
  },
  {
    src: "/gallery/rear.jpg",
    alt: "Midnight-blue sports coupe, direct rear view with lit taillights",
    label: "Rear",
    n: "05",
  },
  {
    src: "/gallery/wheel.jpg",
    alt: "Close-up of the silver multi-spoke forged wheel and brake caliper",
    label: "Forged wheel",
    n: "06",
  },
];

const CLOSER: Shot = {
  src: "/gallery/cockpit.jpg",
  alt: "Driver cockpit with dark leather seats and digital dash",
  label: "Cockpit",
  n: "07",
};

function Tile({
  shot,
  className = "",
  sizes,
}: {
  shot: Shot;
  className?: string;
  sizes: string;
}) {
  return (
    <figure
      data-reveal
      className={`group relative overflow-hidden rounded-2xl bg-[#0F172A] ${className}`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 py-1 pr-3.5 pl-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-sm">
        <span className="rounded-full bg-white px-2 py-0.5 font-bold text-[#0F172A]">
          {shot.n}
        </span>
        {shot.label}
      </figcaption>
    </figure>
  );
}

export default function Gallery() {
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
      id="collection"
      aria-labelledby="collection-title"
      className="relative scroll-mt-28 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.28em] text-[#64748B] uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-[#0F172A]" />
              01 — The collection
            </p>
            <h2
              id="collection-title"
              className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-[#0F172A] sm:text-5xl"
            >
              One car, every angle.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#475569]">
              Shot in-studio, unretouched. What you see is what is parked
              on Kantstraße — come verify in person.
            </p>
          </div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#94A3B8] uppercase">
            07 views
          </p>
        </div>

        <div className="mt-10 space-y-4 sm:space-y-5">
          <Tile
            shot={BANNER}
            className="aspect-[16/10] sm:aspect-[21/9]"
            sizes="(max-width: 1024px) 95vw, 1420px"
          />
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {PAIRS.map((shot) => (
              <Tile
                key={shot.src}
                shot={shot}
                className="aspect-[16/10]"
                sizes="(max-width: 1024px) 95vw, 700px"
              />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {TRIPLES.map((shot) => (
              <Tile
                key={shot.src}
                shot={shot}
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 460px"
              />
            ))}
          </div>
          <Tile
            shot={CLOSER}
            className="aspect-[16/10] sm:aspect-[21/8]"
            sizes="(max-width: 1024px) 95vw, 1420px"
          />
        </div>
      </div>
    </section>
  );
}
