"use client";

import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";
import Timeline from "./Timeline";

export default function Education() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>({ stagger: 0.1 });

  const items = portfolio.education.map((item) => ({
    id: item.degree,
    period: item.period,
    title: item.degree,
    subtitle: item.institution,
    body: item.note ? [item.note] : undefined,
  }));

  return (
    <section id="education" ref={sectionRef} className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <div className="overflow-hidden">
            <p data-line className="mb-4 text-xs uppercase tracking-[0.3em] text-white/45">
              Education
            </p>
            <h2 data-line className="text-3xl font-light text-white md:text-5xl">
              Where I study
            </h2>
          </div>
          <div className="overflow-hidden">
            <p data-line className="mt-4 text-white/60">
              Engineering at PSNA College and school foundations at St. Anne&apos;s Academy, Dindigul.
            </p>
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <Timeline items={items} />
        </div>
      </div>
    </section>
  );
}