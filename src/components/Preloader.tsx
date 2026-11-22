"use client";

import { useEffect, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import { dispatchIntroComplete } from "@/lib/events";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    registerGsap();

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.from(".preloader-text", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "expo.out",
    })
      .from(".preloader-logo", { scale: 0.8, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(".preloader-particle", { opacity: 0, scale: 0.92, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .to(".preloader-line", { scaleX: 1, duration: 1, ease: "power2.inOut" })
      .call(() => dispatchIntroComplete())
      .to(".preloader-wrap", { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.15 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="preloader-wrap fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950">
      <div className="flex flex-col items-center gap-8 px-6 text-center">
        <div className="preloader-logo flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-2xl font-light text-white">
          {portfolio.firstName.charAt(0)}
          {portfolio.lastName.charAt(0)}
        </div>
        <p className="preloader-particle text-3xl font-light uppercase tracking-tight text-white md:text-5xl">
          {portfolio.name}
        </p>
        <p className="preloader-text max-w-md text-sm uppercase tracking-[0.35em] text-white/70">
          {portfolio.role}
        </p>
        <div className="preloader-line h-px w-48 origin-left scale-x-0 bg-white/40" />
      </div>
    </div>
  );
}
