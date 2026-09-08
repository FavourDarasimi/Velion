"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Showroom", href: "#showroom" },
  { label: "Financing", href: "#financing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Glass intensifies on scroll
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scrollspy — highlights the section in view (no-op until sections exist)
  useEffect(() => {
    const sections = LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter((el): el is Element => el !== null);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock body + close on Escape when menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <>
      {/* ── Floating pill ────────────────────────────────── */}
      <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <header
          className={`mx-auto max-w-[1500px] rounded-2xl border transition-all duration-300 motion-safe:animate-rise ${
            scrolled
              ? "border-[#E2E8F0] dark:border-white/10 bg-white/85 dark:border-white/10 dark:bg-slate-950/85 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              : "border-[#E2E8F0] dark:border-white/10/70 bg-white/60 dark:border-white/10 dark:bg-slate-950/60 backdrop-blur-md"
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-4">
            {/* Mark */}
            <a
              href="#top"
              aria-label="Velion Motors — back to top"
              className="flex items-center gap-2.5 rounded-xl py-1 pr-2 pl-1 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-xl bg-[#0F172A] text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  className="size-4.5"
                >
                  <path
                    d="M4 5l8 14L20 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-semibold tracking-tight text-[#0F172A] dark:text-slate-100">
                  Velion
                </span>
                <span className="font-mono text-[9px] tracking-[0.24em] text-[#64748B] dark:text-slate-400 uppercase">
                  Motors
                </span>
              </span>
            </a>

            {/* Desktop links */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none ${
                      isActive
                        ? "bg-[#0F172A] dark:bg-white dark:text-slate-950 font-semibold text-white"
                        : "font-medium text-[#475569] dark:text-slate-300 hover:bg-[#E9EDF1] dark:hover:bg-white/10 hover:text-[#0F172A] dark:text-slate-100"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <p className="hidden items-center gap-2 rounded-full border border-[#E2E8F0] dark:border-white/10 bg-white dark:border-white/10 dark:bg-slate-900 px-3.5 py-2 font-mono text-[11px] tracking-[0.08em] text-[#475569] dark:text-slate-300 xl:flex">
                <span
                  aria-hidden="true"
                  className="relative flex size-1.5"
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                48 in stock
              </p>
              <a
                href="#visit"
                className="group hidden items-center gap-1.5 rounded-full bg-[#0F172A] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none sm:flex"
              >
                Book test drive
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Open menu"
                className="flex size-10 cursor-pointer items-center justify-center rounded-full text-[#0F172A] dark:text-slate-100 transition-colors hover:bg-[#E9EDF1] dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none lg:hidden"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-5"
                >
                  <path d="M4 8h16M4 16h16" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ── Mobile sheet ─────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0 motion-reduce:visible"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <p className="font-display text-[17px] font-semibold tracking-tight">
            Velion
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle className="bg-[#F1F5F9] dark:bg-white/10" />
            <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            autoFocus={open}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#0F172A] text-white transition-colors hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2 focus-visible:outline-none"
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

        <nav
          aria-label="Mobile"
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
        >
          <ul className="space-y-1">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-300 ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${60 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors hover:bg-[#F1F5F9] dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-[#94A3B8] dark:text-slate-500">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[22px] font-medium tracking-tight text-[#0F172A] dark:text-slate-100">
                      {l.label}
                    </span>
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-5 text-[#94A3B8] dark:text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-[#0F172A] dark:text-slate-100"
                  >
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 px-4 pb-8 sm:px-6">
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="flex items-center justify-center rounded-full bg-[#0F172A] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
          >
            Book test drive
          </a>
          <a
            href="tel:+49305550107"
            tabIndex={open ? 0 : -1}
            className="flex items-center justify-center rounded-full border border-[#E2E8F0] dark:border-white/10 dark:text-slate-100 px-5 py-3.5 text-sm font-medium text-[#0F172A] dark:text-slate-100 transition-colors hover:bg-[#F1F5F9] dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
          >
            +49 30 555 0107
          </a>
        </div>
      </div>
    </>
  );
}
