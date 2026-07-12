"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useProjects } from "@/context/ProjectsContext";
import { portfolio } from "@/data/portfolio";
import { useSplitHeading } from "@/hooks/useRevealOnScroll";

function OdometerDigit({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const rollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const roller = rollerRef.current;
    if (!roller) return;

    gsap.fromTo(
      roller,
      { y: 0 },
      {
        y: `-${value * 100}%`,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: roller,
          start: "top 90%",
          once: true,
        },
      },
    );
  }, [value, duration]);

  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <span ref={rollerRef} className="flex flex-col">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1em] leading-none">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function OdometerValue({ value, suffix }: { value: number; suffix: string }) {
  const digits = String(value).split("").map(Number);

  return (
    <span className="inline-flex items-end text-5xl font-light text-white md:text-7xl">
      {digits.map((digit, i) => (
        <OdometerDigit key={`${digit}-${i}`} value={digit} duration={1.8} />
      ))}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export default function Stats() {
  const { projects } = useProjects();
  const headingRef = useSplitHeading<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const repoCount = projects.length;

  const stats = [
    { label: "Since", value: 2022, suffix: "" },
    { label: "Projects", value: repoCount, suffix: "+" },
    { label: "GitHub Repos", value: repoCount, suffix: "" },
    { label: "Certifications", value: 4, suffix: "+" },
  ];

  const impactStats = portfolio.getImpactStats(repoCount);

  useEffect(() => {
    registerGsap();
    const track = trackRef.current;
    const impact = impactRef.current;
    if (!track || !impact) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: impact,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, impact);

    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, [repoCount]);

  return (
    <>
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div ref={headingRef} className="mb-16 max-w-3xl">
            <div className="overflow-hidden">
              <h2 data-line className="text-3xl font-light text-white md:text-5xl">
                Nothing here happened overnight.
              </h2>
            </div>
            <div className="overflow-hidden">
              <p data-line className="mt-4 text-white/60">
                Each number represents real GitHub projects, certifications, and hands-on embedded
                experience.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/15 pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/45">{stat.label}</p>
                <OdometerValue value={stat.value} suffix={stat.suffix} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={impactRef} className="overflow-hidden border-y border-white/10 py-20 md:py-24">
        <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-12 md:px-10">
          <h3 className="text-2xl font-light text-white md:text-3xl">
            What happens after the work goes live.
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-white/55 md:text-base">
            Real outcomes from IoT, AI, embedded and full-stack projects.
          </p>
        </div>
        <div ref={trackRef} className="flex w-max gap-6 px-6 md:gap-8 md:px-10">
          {[...impactStats, ...impactStats].map((item, i) => (
            <div
              key={`${item.value}-${i}`}
              className="w-[280px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:w-[340px]"
            >
              <p className="mb-4 text-3xl font-light text-white">{item.value}</p>
              <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
