"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CURSOR_WORDS = ["View", "Explore", "Open", "Build", "Code"];

function scrambleText(el: HTMLElement, finalText: string) {
  let iteration = 0;
  const interval = window.setInterval(() => {
    el.textContent = finalText
      .split("")
      .map((char, i) => (i < iteration ? finalText[i] : CHARSET[Math.floor(Math.random() * CHARSET.length)]))
      .join("");
    iteration += 0.5;
    if (iteration >= finalText.length) {
      window.clearInterval(interval);
      el.textContent = finalText;
    }
  }, 30);
  return interval;
}

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    registerGsap();

    const ring = ringRef.current;
    const dot = dotRef.current;
    const text = textRef.current;
    if (!ring || !dot || !text) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power3.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power3.out" });
    };

    const onEnter = () => {
      const word = CURSOR_WORDS[Math.floor(Math.random() * CURSOR_WORDS.length)];
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = scrambleText(text, word);
      gsap.to(ring, { scale: 3, opacity: 0.35, duration: 0.35, ease: "power2.out" });
      gsap.to(text, { opacity: 1, duration: 0.2 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeave = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      text.textContent = "";
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(text, { opacity: 0, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const bind = () => document.querySelectorAll("[data-cursor]");
    const attach = () => {
      bind().forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", move);
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
      />
      <span
        ref={textRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.35em] text-white opacity-0 md:block"
      />
    </>
  );
}
