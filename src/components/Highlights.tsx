"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import { useSplitHeading } from "@/hooks/useRevealOnScroll";

export default function Highlights() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const total = portfolio.highlights.length;

  const goTo = (next: number) => {
    const el = contentRef.current;
    if (!el) {
      setIndex(next);
      return;
    }

    gsap.to(el, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        );
      },
    });
  };

  useEffect(() => {
    registerGsap();
    const el = contentRef.current;
    if (el) {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => goTo((index + 1) % total), 5500);
    return () => window.clearInterval(id);
  }, [index, total]);

  const current = portfolio.highlights[index];

  return (
    <section className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="overflow-hidden">
              <h2 data-line className="text-3xl font-light text-white md:text-5xl">
                Featured project snapshots
              </h2>
            </div>
            <div className="overflow-hidden">
              <p data-line className="mt-4 text-white/60">
                Problem, approach, and impact across AI, computer vision, and full-stack builds.
              </p>
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            {index + 1} / {total}
          </p>
        </div>

        <div ref={contentRef} className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-2xl font-light leading-snug text-white md:text-4xl">{current.quote}</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">{current.label}</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => goTo((index - 1 + total) % total)}
                className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
                data-cursor
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => goTo((index + 1) % total)}
                className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
                data-cursor
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
