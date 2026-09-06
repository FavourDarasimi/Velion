import CarDialog from "@/components/CarDialog";
import Hero from "@/components/Hero";
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

      {/* Grid — page backdrop, feathered top and bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] opacity-60"
      />

      <main className="relative z-10 flex flex-1 flex-col">
        <Hero />
      </main>

      {/* Dialog sits at page root so its backdrop covers the navbar too */}
      <CarDialog />
    </div>
  );
}
