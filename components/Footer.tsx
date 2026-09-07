const NAV = [
  { label: "Collection", href: "#collection" },
  { label: "Showroom", href: "#showroom" },
  { label: "Financing", href: "#financing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              aria-label="Velion Motors — back to top"
              className="inline-flex items-center gap-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
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
                  className="size-4"
                >
                  <path
                    d="M4 5l8 14L20 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-[17px] font-semibold tracking-tight text-[#0F172A]">
                Velion
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#475569]">
              Independent dealer since 1998. Hand-picked cars, printed
              prices, coffee always on.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] uppercase">
              Sections
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-[#334155] transition-colors rounded-sm hover:text-[#0F172A] focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#64748B] uppercase">
              Find us
            </p>
            <address className="mt-4 space-y-2.5 text-sm not-italic text-[#334155]">
              <p>Kantstraße 7, Berlin</p>
              <p>Mon–Sat · 9:00–19:00</p>
              <p>
                <a
                  href="tel:+49305550107"
                  className="font-semibold text-[#0F172A] rounded-sm hover:underline focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:outline-none"
                >
                  +49 30 555 0107
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#E2E8F0] pt-6 font-mono text-[11px] tracking-[0.18em] text-[#94A3B8] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Velion Motors</p>
          <p>Set in Outfit & Inter</p>
        </div>
      </div>
    </footer>
  );
}
