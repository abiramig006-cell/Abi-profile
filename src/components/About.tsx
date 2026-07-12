"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useProjects } from "@/context/ProjectsContext";
import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";

export default function About() {
  const { projects } = useProjects();
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
                <h2 data-line className="text-3xl font-light text-white md:text-5xl">
                  Embedded developer building systems that connect hardware, AI and full-stack code.
                </h2>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="space-y-6">
            <p data-reveal className="text-base leading-relaxed text-white/65">
              {portfolio.summary} Strong problem-solver with hands-on experience across {projects.length}{" "}
              GitHub repositories spanning IoT agriculture, cybersecurity AI, e-commerce, smart attendance,
              and embedded robotics.
            </p>
            <p data-reveal className="text-base leading-relaxed text-white/65">
              Based in {portfolio.location}, pursuing {portfolio.education[0].degree} at{" "}
              {portfolio.education[0].institution}. Studied at Akshaya Academy School (Class 10 & 12).
              Passionate about automation, circuit design, and building technology that works in the real
              world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
