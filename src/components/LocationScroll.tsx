"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";

export default function LocationScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...portfolio.scrollLocations, ...portfolio.scrollLocations];

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getDistance = () => Math.max(track.scrollWidth / 2, 0);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden border-y border-white/10 py-14 md:py-20">
      <div ref={trackRef} className="flex w-max items-center gap-6 px-6 md:gap-10 md:px-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap text-2xl font-light text-white/25 md:text-4xl lg:text-5xl"
          >
            {item},
          </span>
        ))}
      </div>
    </section>
  );
}
