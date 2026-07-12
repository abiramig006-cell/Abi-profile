"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";

function SkillBar({ label, level }: { label: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const bar = barRef.current;
    if (!bar) return;

    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: level / 100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          once: true,
        },
      },
    );
  }, [level]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
        <span>{label}</span>
        <span>{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>({ stagger: 0.06 });
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const items = portfolio.skills[activeCategory].items;
  const activeSkill = portfolio.skills[activeCategory];

  return (
    <section id="skills" ref={sectionRef} className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <div className="overflow-hidden">
            <h2 data-line className="text-3xl font-light text-white md:text-5xl">
              Capabilities
            </h2>
          </div>
          <div className="overflow-hidden">
            <p data-line className="mt-4 text-white/60">
              Embedded systems, full-stack development, AI integration and production DevOps tooling.
            </p>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills.map((group) => (
            <SkillBar key={group.category} label={group.category} level={group.level} />
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-2">
            {portfolio.skills.map((group, index) => (
              <button
                key={group.category}
                type="button"
                data-reveal
                onMouseEnter={() => setActiveCategory(index)}
                onClick={() => setActiveCategory(index)}
                className={`rounded-xl px-4 py-3 text-left text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-white text-neutral-950"
                    : "text-white/50 hover:text-white"
                }`}
                data-cursor
              >
                {group.category}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div
              className="pointer-events-none absolute left-0 top-0 h-12 w-full bg-gradient-to-b from-white/[0.06] to-transparent transition-transform duration-300"
              style={{
                transform: hoveredItem !== null ? `translateY(${hoveredItem * 52}px)` : "translateY(0)",
                opacity: hoveredItem !== null ? 1 : 0,
              }}
            />
            <h3 className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">
              {activeSkill.category}
            </h3>
            <p className="mb-6 text-sm text-white/55">{activeSkill.level}% proficiency</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((item, index) => (
                <li
                  key={item}
                  data-reveal
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`rounded-xl border px-4 py-3 transition-all duration-300 ${
                    hoveredItem === index
                      ? "border-white/40 bg-white/[0.06] text-white"
                      : hoveredItem !== null
                        ? "border-white/5 text-white/35"
                        : "border-white/10 text-white/80 hover:border-white/30"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
