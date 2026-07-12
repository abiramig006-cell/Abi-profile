"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/context/LenisContext";
import { AUTO_SCROLL_CANCEL_EVENT } from "@/lib/events";

type AutoScrollFromStartProps = {
  enabled?: boolean;
};

const GESTURE_GAP_MS = 220;

function getDuration(distance: number, direction: 1 | -1) {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const pxPerSec =
    direction > 0
      ? isMobile
        ? 220
        : 270
      : isMobile
        ? 300
        : 420;
  return Math.min(120, Math.max(2, distance / pxPerSec));
}

export default function AutoScrollFromStart({ enabled = true }: AutoScrollFromStartProps) {
  const lenis = useLenis();
  const runningRef = useRef(false);
  const directionRef = useRef<1 | -1>(1);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollRef = useRef({ y: 0 });

  useEffect(() => {
    if (!enabled || !lenis) return;

    const stopAutoScroll = () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
      runningRef.current = false;
      lenis.isLocked = false;
    };

    const startAutoScroll = (direction: 1 | -1) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      tweenRef.current?.kill();
      tweenRef.current = null;

      lenis.resize();

      const current = lenis.scroll;
      const target = direction > 0 ? lenis.limit : 0;
      const distance = Math.abs(target - current);

      if (distance < 2) {
        runningRef.current = false;
        lenis.isLocked = false;
        return;
      }

      runningRef.current = true;
      directionRef.current = direction;
      lenis.isLocked = true;
      scrollRef.current.y = current;

      tweenRef.current = gsap.to(scrollRef.current, {
        y: target,
        duration: getDuration(distance, direction),
        ease: "none",
        overwrite: true,
        onUpdate: () => {
          lenis.scrollTo(scrollRef.current.y, {
            immediate: true,
            force: true,
            lock: true,
          });
        },
        onComplete: () => {
          runningRef.current = false;
          lenis.isLocked = false;
          tweenRef.current = null;
        },
        onInterrupt: () => {
          runningRef.current = false;
          lenis.isLocked = false;
          tweenRef.current = null;
        },
      });
    };

    const handleScrollIntent = (direction: 1 | -1, newGesture: boolean) => {
      if (!runningRef.current) {
        if (newGesture) startAutoScroll(direction);
        return;
      }

      if (direction !== directionRef.current) {
        startAutoScroll(direction);
        return;
      }

      if (newGesture) {
        stopAutoScroll();
      }
    };

    let lastWheelTime = 0;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) return;

      const now = Date.now();
      const newGesture = now - lastWheelTime > GESTURE_GAP_MS;
      lastWheelTime = now;

      handleScrollIntent(event.deltaY > 0 ? 1 : -1, newGesture);
    };

    let touchStartY = 0;
    let lastTouchY = 0;
    let touchMoved = false;
    let touchDirection: 1 | -1 = 1;
    let lastTouchTime = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      lastTouchY = touchStartY;
      touchMoved = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? lastTouchY;
      const delta = lastTouchY - currentY;

      if (Math.abs(currentY - touchStartY) > 8) {
        touchMoved = true;
      }
      if (Math.abs(delta) > 2) {
        touchDirection = delta > 0 ? 1 : -1;
      }

      lastTouchY = currentY;
    };

    const onTouchEnd = () => {
      if (!touchMoved) return;

      const now = Date.now();
      const newGesture = now - lastTouchTime > GESTURE_GAP_MS;
      lastTouchTime = now;

      handleScrollIntent(touchDirection, newGesture);
    };

    window.addEventListener(AUTO_SCROLL_CANCEL_EVENT, stopAutoScroll);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      stopAutoScroll();
      window.removeEventListener(AUTO_SCROLL_CANCEL_EVENT, stopAutoScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled, lenis]);

  return null;
}
