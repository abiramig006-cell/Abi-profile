"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import ScrambleButton from "./ScrambleButton";
import MenuOverlay from "./MenuOverlay";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    registerGsap();
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      delay: 1.4,
      ease: "expo.out",
    });
  }, []);

  useEffect(() => {
    registerGsap();
    const inner = innerRef.current;
    if (!inner) return;

    gsap.to(inner, {
      paddingTop: scrolled ? "0.85rem" : "1.25rem",
      paddingBottom: scrolled ? "0.85rem" : "1.25rem",
      duration: 0.45,
      ease: "power2.out",
    });

    gsap.to(navRef.current, {
      backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
      duration: 0.45,
    });
  }, [scrolled]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-white/10 bg-neutral-950/85" : "bg-transparent"
        }`}
      >
        <div
          ref={innerRef}
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10"
        >
          <Link href="#" className="nav-item text-sm font-medium uppercase tracking-[0.3em] text-white">
            {portfolio.firstName}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {portfolio.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-item text-xs uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="nav-item text-xs uppercase tracking-[0.25em] text-white/80 md:hidden"
            >
              Menu
            </button>
            <ScrambleButton href="#contact" label="Get in touch" className="nav-item hidden text-white md:inline-flex" />
          </div>
        </div>
      </nav>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
