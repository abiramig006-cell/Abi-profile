"use client";

import { portfolio } from "@/data/portfolio";
import ScrambleButton from "./ScrambleButton";
import AnimatedInput from "./AnimatedInput";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";

export default function Contact() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div ref={headingRef}>
            <div className="overflow-hidden">
              <h2 data-line className="text-4xl font-light leading-tight text-white md:text-6xl">
                Want to talk about a project?
              </h2>
            </div>
            <p data-reveal className="mt-6 max-w-xl text-base leading-relaxed text-white/65">
              Open to internships, IoT collaborations, embedded systems projects, and full-stack development
              opportunities.
            </p>

            <form
              data-reveal
              className="contact-form mt-10 space-y-10"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <AnimatedInput label="Name" name="name" />
              <AnimatedInput label="Email" name="email" type="email" />
              <AnimatedInput label="Message" name="message" multiline />
            </form>
          </div>

          <div data-reveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">{portfolio.name}</p>
            <p className="mt-2 text-lg text-white">{portfolio.role}</p>

            <div className="mt-8 space-y-4 text-sm text-white/70">
              <a href={`mailto:${portfolio.email}`} className="block transition-colors hover:text-white" data-cursor>
                {portfolio.email}
              </a>
              <a href={`tel:${portfolio.phone}`} className="block transition-colors hover:text-white" data-cursor>
                {portfolio.phone}
              </a>
              <p>{portfolio.location}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <ScrambleButton href={portfolio.github} label="GitHub" external className="text-white" />
              <ScrambleButton href={portfolio.linkedin} label="LinkedIn" external className="text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
