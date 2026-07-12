"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

type RevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  delay?: number;
};

export function useRevealOnScroll<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: options.y ?? 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.8,
          stagger: options.stagger ?? 0.08,
          ease: "expo.out",
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 80%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [options.delay, options.duration, options.stagger, options.start, options.y]);

  return ref;
}

export function useSplitHeading<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const lines = el.querySelectorAll("[data-line]");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useScrollTriggerRefresh() {
  useEffect(() => {
    registerGsap();
    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(timeout);
  }, []);
}
