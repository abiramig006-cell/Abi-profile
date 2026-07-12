"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import ScrambleButton from "./ScrambleButton";
import ParticleText from "./ParticleText";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section) return;

    const tl = gsap.timeline({ delay: 1.2 });

    tl.from(".hero-label", { y: 30, opacity: 0, duration: 0.7, ease: "expo.out" })
      .from(".hero-particle", { opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.2")
      .from(".hero-copy", { y: 30, opacity: 0, duration: 0.7, ease: "expo.out" }, "-=0.5")
      .from(".hero-pill", { y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: "expo.out" }, "-=0.3")
      .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, ease: "expo.out" }, "-=0.2");

    if (bg) {
      gsap.to(bg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    gsap.to(".hero-orb-1", {
      x: 40,
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".hero-orb-2", {
      x: -30,
      y: 40,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-x-clip pt-28">
      <div ref={bgRef} className="hero-bg absolute inset-0">
        <div className="hero-orb-1 absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="hero-orb-2 absolute right-[15%] top-[25%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-neutral-950/60" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col px-4 md:px-10">
        <p className="hero-label mb-8 text-xs uppercase tracking-[0.35em] text-white/50">
          {portfolio.locationShort}
        </p>

        <div className="hero-particle relative left-1/2 flex w-screen max-w-[100vw] -translate-x-1/2 flex-1 items-center justify-center px-4 py-6 md:px-8 md:py-10">
          <ParticleText
            words={[portfolio.firstName.toLowerCase(), portfolio.lastName.toLowerCase()]}
            hintLetter="e"
            stacked
            className="h-[46vh] min-h-[300px] max-h-[540px] w-full"
          />
        </div>

        <div className="pb-20">
          <p className="hero-copy mb-4 max-w-2xl text-sm uppercase tracking-[0.28em] text-white/45 md:text-base">
            {portfolio.role}
          </p>

          <p className="hero-copy mb-10 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {portfolio.summary}
          </p>

          <div className="mb-12 flex flex-wrap gap-3">
            {portfolio.services.map((service) => (
              <span
                key={service}
                className="hero-pill rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 transition-colors hover:border-white/40 hover:bg-white/5"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="hero-cta flex flex-wrap gap-8">
            <ScrambleButton href="#work" label="See all projects" className="text-white" />
            <ScrambleButton href="#about" label="Know me better" className="text-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
