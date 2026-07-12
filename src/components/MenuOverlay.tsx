"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import LiveClock from "./LiveClock";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" },
      );
      gsap.fromTo(
        ".menu-link-item",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.2, ease: "power4.out" },
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-neutral-950 px-6 py-8 md:px-10"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.25em] text-white/50">Menu</span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs uppercase tracking-[0.25em] text-white"
        >
          Close
        </button>
      </div>

      <div className="flex flex-col gap-4 py-16">
        {portfolio.navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="menu-link-item text-4xl font-light text-white md:text-6xl"
            data-cursor
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#contact"
          onClick={onClose}
          className="menu-link-item text-4xl font-light text-white/60 md:text-6xl"
          data-cursor
        >
          Contact
        </Link>
      </div>

      <div className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">Location</p>
          <p className="text-sm text-white/70">{portfolio.location}</p>
        </div>
        <LiveClock />
      </div>
    </div>
  );
}
