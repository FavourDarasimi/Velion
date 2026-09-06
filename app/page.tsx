import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div id="top" className="relative flex min-h-full flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* Watermark — fixed, non-interactive, sits under all content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="font-display text-[19vw] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-[#0F172A]/[0.04] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          VELION
        </span>
      </div>

      {/* Navbar canvas — page sections removed, hero lands next */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 pt-28 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] opacity-60"
        />
        <p className="relative rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] text-[#64748B] uppercase shadow-sm">
          Navbar ready — content next
        </p>
      </main>
    </div>
  );
}
