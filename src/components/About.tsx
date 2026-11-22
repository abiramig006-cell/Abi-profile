"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";

export default function About() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const ctx = gsap.context(() => {
      gsap.to(left, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: left,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(right, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: right,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div ref={leftRef}>
            <div ref={headingRef}>
              <div className="overflow-hidden">
                <p data-line className="mb-4 text-xs uppercase tracking-[0.3em] text-white/45">
                  About me
                </p>
                <h2 data-line className="text-3xl font-light text-white md:text-5xl">
                  {portfolio.aboutTitle}
                </h2>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="space-y-6">
            {portfolio.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} data-reveal className="text-base leading-relaxed text-white/65">
                {paragraph}
              </p>
            ))}

            <div data-reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/45">Focus</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {portfolio.exploring.map((item) => (
                  <li key={item} className="text-sm text-white/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}