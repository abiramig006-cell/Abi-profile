"use client";

import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";
import Timeline from "./Timeline";

export default function Experience() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const { internship } = portfolio;

  const items = [
    {
      id: "internship",
      period: internship.date,
      title: internship.role,
      subtitle: internship.company,
      body: internship.points,
    },
  ];

  return (
    <section ref={sectionRef} className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <div className="overflow-hidden">
            <h2 data-line className="text-3xl font-light text-white md:text-5xl">
              Experience
            </h2>
          </div>
        </div>

        <article data-reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <Timeline items={items} />
        </article>
      </div>
    </section>
  );
}
