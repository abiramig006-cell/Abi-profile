"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

type ProjectImageProps = {
  src: string;
  alt: string;
  gradient: string;
  repo: string;
  language: string;
  className?: string;
};

export default function ProjectImage({
  src,
  alt,
  gradient,
  language,
  className = "min-h-[340px]",
}: ProjectImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const image = imageRef.current;
    if (!wrap || !image || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
      gsap.to(image, { x, y, duration: 0.45, ease: "power2.out" });
    };

    const reset = () => {
      gsap.to(image, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    };

    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseleave", reset);

    return () => {
      wrap.removeEventListener("mousemove", move);
      wrap.removeEventListener("mouseleave", reset);
    };
  }, []);

  useEffect(() => {
    registerGsap();
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { y: 24 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} role="img" aria-label={alt}>
      <div
        ref={imageRef}
        className="absolute inset-[-8%] bg-cover bg-center bg-neutral-900 will-change-transform"
        style={{ backgroundImage: `url("${src}")` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 mix-blend-multiply`} />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/15 to-transparent" />
      <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
        {language}
      </div>
    </div>
  );
}
