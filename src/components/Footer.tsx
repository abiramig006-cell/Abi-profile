"use client";

import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import LiveClock from "./LiveClock";
import ScrambleButton from "./ScrambleButton";
import MiniParticleText from "./MiniParticleText";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-10">
          <MiniParticleText word={portfolio.firstName.toLowerCase()} />
        </div>

        <div className="mb-16 overflow-hidden">
          <h2 className="text-5xl font-light leading-none text-white md:text-7xl">
            Let&apos;s build
            <br />
            something together
          </h2>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <ScrambleButton href="#contact" label="Get in touch" className="text-white" />
          <ScrambleButton href={portfolio.github} label="View GitHub" external className="text-white/70" />
          <ScrambleButton href={portfolio.linkedin} label="Connect on LinkedIn" external className="text-white/70" />
        </div>

        <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">Location</p>
            <p className="text-sm text-white/70">{portfolio.location}</p>
          </div>
          <LiveClock />
          <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-white/50">
            {portfolio.navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-white/30">
          © {portfolio.firstName} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
