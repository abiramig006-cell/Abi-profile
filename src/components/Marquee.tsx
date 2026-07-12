"use client";

import { portfolio } from "@/data/portfolio";

export default function Marquee() {
  const items = [...portfolio.marqueeItems, ...portfolio.marqueeItems];

  return (
    <section className="overflow-hidden border-y border-white/10 py-6">
      <div className="marquee-track flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-sm uppercase tracking-[0.35em] text-white/40"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
