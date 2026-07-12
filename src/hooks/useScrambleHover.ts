"use client";

import { useCallback, useRef } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useScrambleHover(finalText: string) {
  const frameRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const scramble = useCallback(
    (el: HTMLElement) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = finalText;
        return;
      }

      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      let iteration = 0;
      intervalRef.current = window.setInterval(() => {
        el.textContent = finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return finalText[i];
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("");
        iteration += 0.5;
        if (iteration >= finalText.length) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          el.textContent = finalText;
        }
      }, 30);
    },
    [finalText],
  );

  const reset = useCallback(
    (el: HTMLElement) => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      el.textContent = finalText;
    },
    [finalText],
  );

  return { scramble, reset };
}
