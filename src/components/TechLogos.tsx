"use client";

import { portfolio } from "@/data/portfolio";

export default function TechLogos() {
  const items = [...portfolio.techLogos, ...portfolio.techLogos, ...portfolio.techLogos];

  return (
    <section className="overflow-hidden border-t border-white/10 py-16">
      <div className="mb-8 px-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Tech Stack</p>
      </div>
      <div className="logo-marquee flex w-max gap-12">
        {items.map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className="whitespace-nowrap text-lg font-light uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-white/60"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
