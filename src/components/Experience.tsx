"use client";

import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";
import Timeline from "./Timeline";

export default function Experience() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>({ stagger: 0.08 });

  const items = portfolio.achievements.map((item) => ({
    id: item.title,
    period: item.kind,
    title: item.title,
    subtitle: item.kind,
    body: [item.description],
  }));

  return (
    <section id="achievements" ref={sectionRef} className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <div className="overflow-hidden">
            <p data-line className="mb-4 text-xs uppercase tracking-[0.3em] text-white/45">
              Achievements & activities
            </p>
            <h2 data-line className="text-3xl font-light text-white md:text-5xl">
              Beyond the classroom
            </h2>
          </div>
          <div className="overflow-hidden">
            <p data-line className="mt-4 text-white/60">
              Hackathons, competitions, and workshops that shaped how I build and present ideas.
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