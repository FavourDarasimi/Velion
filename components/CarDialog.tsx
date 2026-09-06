"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { COLLECTION_HASH, SHOTS } from "@/components/car-images";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Full-screen car gallery dialog, hash-routed on #collection:
 * "View car" links and the nav Collection anchor open it, the back
 * button and Escape close it, and the URL is shareable.
 */
export default function CarDialog() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const dirRef = useRef(1);

  const go = useCallback((dir: number) => {
    dirRef.current = dir;
    setIndex((i) => (i + dir + SHOTS.length) % SHOTS.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      dirRef.current = i >= index ? 1 : -1;
      setIndex(i);
    },
    [index],
  );

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    if (window.location.hash === COLLECTION_HASH) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    if (openerRef.current?.isConnected) openerRef.current.focus();
  }, []);

  // Hash sync — open on #collection, silent-close on back navigation
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === COLLECTION_HASH) {
        if (document.activeElement instanceof HTMLElement) {
          openerRef.current = document.activeElement;
        }
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Lock scroll + focus + entrance on open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current
      ?.querySelector<HTMLElement>("[data-autofocus]")
      ?.focus();
    if (!reduced()) {
      gsap.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, scale: 0.97, y: 16 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "expo.out" },
      );
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  // Slide transition between shots
  useEffect(() => {
    if (!open || reduced()) return;
    gsap.fromTo(
      stageRef.current,
      { autoAlpha: 0, x: 28 * dirRef.current },
      { autoAlpha: 1, x: 0, duration: 0.45, ease: "expo.out" },
    );
  }, [index, open ]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowRight") {
      go(1);
    } else if (e.key === "ArrowLeft") {
      go(-1);
    } else if (e.key === "Tab") {
      const root = panelRef.current;
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!open) return null;
  const shot = SHOTS[index];

  return (
    <div
      ref={backdropRef}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[70]"
    >
      <div
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 cursor-pointer bg-[#0F172A]/85 backdrop-blur-sm"
      />
      <div className="relative flex h-full items-center justify-center overflow-y-auto p-3 sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`911 Carrera S gallery — ${shot.label}`}
          className="w-full max-w-5xl rounded-3xl bg-[#0F172A] p-4 text-white shadow-2xl sm:p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-1 pb-4">
            <p className="font-mono text-[11px] tracking-[0.24em] text-white/55 uppercase">
              911 Carrera S — Gallery
            </p>
            <div className="flex items-center gap-3">
              <p
                aria-live="polite"
                className="font-mono text-[11px] tracking-[0.2em] text-white/70"
              >
                {shot.n} / 07
              </p>
              <button
                type="button"
                data-autofocus
                onClick={close}
                aria-label="Close gallery"
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-5"
                >
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            ref={stageRef}
            className="relative aspect-video overflow-hidden rounded-2xl bg-black/40"
          >
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 1024px) 94vw, 1024px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
              >
                <path
                  d="M19 12H5m6 6-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Caption */}
          <p
            aria-live="polite"
            className="px-1 pt-4 font-mono text-[11px] tracking-[0.22em] text-white/60 uppercase"
          >
            {shot.n} — {shot.label}
          </p>

          {/* Filmstrip */}
          <div
            role="group"
            aria-label="Gallery thumbnails"
            className="flex gap-2 overflow-x-auto pt-3 pb-1"
          >
            {SHOTS.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View ${s.label}`}
                aria-current={i === index}
                className={`relative h-16 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                  i === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-90"
                }`}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4">
            <p className="font-display text-2xl font-semibold tracking-tight">
              €129,900
            </p>
            <a
              href="#visit"
              onClick={close}
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#E9EDF1] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Book test drive
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
