"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  subtitle?: string;
  body?: string[];
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <div ref={sectionRef} className="relative pl-8 md:pl-10">
      <div
        ref={lineRef}
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-emerald-400/80 via-white/25 to-transparent md:left-[9px]"
      />

      <div className="space-y-10">
        {items.map((item) => (
          <article key={item.id} className="timeline-item relative">
            <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border border-emerald-400/70 bg-neutral-950 md:-left-10" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">{item.period}</p>
            <h3 className="mt-2 text-xl font-light text-white md:text-2xl">{item.title}</h3>
            {item.subtitle && <p className="mt-1 text-sm text-white/60">{item.subtitle}</p>}
            {item.body && (
              <ul className="mt-4 space-y-2">
                {item.body.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-white/65">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
