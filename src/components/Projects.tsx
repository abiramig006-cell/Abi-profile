"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useProjects } from "@/context/ProjectsContext";
import { portfolio } from "@/data/portfolio";
import { useSplitHeading } from "@/hooks/useRevealOnScroll";
import ScrambleButton from "./ScrambleButton";
import ProjectImage from "./ProjectImage";

export default function Projects() {
  const { projects } = useProjects();
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const cards = track.querySelectorAll(".project-card");
    cards.forEach((card) => {
      const media = card.querySelector(".project-media");
      const overlay = card.querySelector(".project-overlay");
      const shine = card.querySelector(".project-shine");

      const onEnter = () => {
        gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });
        gsap.to(media, { scale: 1.03, duration: 0.7, ease: "power3.out" });
        gsap.fromTo(shine, { xPercent: -100 }, { xPercent: 100, duration: 0.8, ease: "power2.inOut" });
      };
      const onLeave = () => {
        gsap.to(overlay, { opacity: 0, duration: 0.35, ease: "power2.out" });
        gsap.to(media, { scale: 1, duration: 0.7, ease: "power3.out" });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
    });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth + 120, 0);

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: pin,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance() + window.innerHeight * 0.5}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, section);

    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.clearTimeout(timeout);
      ctx.revert();
    };
  }, [projects.length]);

  return (
    <section id="work" ref={sectionRef} className="relative bg-neutral-950">
      <div ref={pinRef} className="flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 w-full max-w-7xl shrink-0 px-6 md:mb-12 md:px-10">
          <div ref={headingRef} className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="overflow-hidden">
                <h2 data-line className="text-3xl font-light text-white md:text-5xl">
                  Selected work
                </h2>
              </div>
              <div className="overflow-hidden">
                <p data-line className="mt-4 text-white/60">
                  {projects.length} featured projects across AI, computer vision, and full-stack
                  development — each with its problem, approach, and honest status.
                </p>
              </div>
            </div>
            <ScrambleButton href={portfolio.github} label="View GitHub" external className="text-white/70" />
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div ref={trackRef} className="flex w-max flex-col gap-6 px-6 md:flex-row md:gap-10 md:px-10">
            {projects.map((project, index) => (
              <a
                key={project.repo}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card group relative w-[min(88vw,380px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 md:w-[440px]"
                data-cursor
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="project-media relative min-h-[320px]">
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    gradient={project.gradient}
                    repo={project.repo}
                    language={project.language}
                    className="min-h-[320px]"
                  />
                  <div className="project-overlay absolute inset-0 bg-black/40 opacity-0" />
                  <div className="project-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100" />
                  <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/70">
                        {project.status ? `${project.status} · ` : ""}
                        {project.language}
                      </p>
                      <h3 className="text-xl font-light text-white md:text-2xl">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-t border-white/10 bg-neutral-950/80 p-5 transition-all duration-500 ${
                    active === index ? "opacity-100" : "opacity-80"
                  }`}
                >
                  <p className="line-clamp-3 text-sm leading-relaxed text-white/65">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 hidden px-6 text-xs uppercase tracking-[0.35em] text-white/35 md:block md:px-10">
          Scroll down to browse projects →
        </p>
      </div>
    </section>
  );
}
