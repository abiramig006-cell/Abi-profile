"use client";

import { portfolio } from "@/data/portfolio";
import ScrambleButton from "./ScrambleButton";
import AnimatedInput from "./AnimatedInput";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";

export default function Contact() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>();

  const mailtoBody = encodeURIComponent("Hi Abirami,\n\n");

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div ref={headingRef}>
            <div className="overflow-hidden">
              <h2 data-line className="text-4xl font-light leading-tight text-white md:text-6xl">
                Have an idea worth building?
              </h2>
            </div>
            <p data-reveal className="mt-6 max-w-xl text-base leading-relaxed text-white/65">
              I&apos;m interested in internships, learning opportunities, collaborations, and building
              meaningful technology.
            </p>

            <form
              data-reveal
              className="contact-form mt-10 space-y-10"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <AnimatedInput label="Your name" name="name" />
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
              <a href={portfolio.phoneHref} className="block transition-colors hover:text-white" data-cursor>
                {portfolio.phone}
              </a>
              <p>{portfolio.location}</p>
              <p>{portfolio.languages.join(" · ")}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <ScrambleButton href={portfolio.github} label="GitHub" external className="text-white" />
              <ScrambleButton href={portfolio.linkedin} label="LinkedIn" external className="text-white/70" />
              <ScrambleButton href={portfolio.leetcode} label="LeetCode" external className="text-white/70" />
            </div>

            <a
              href={`mailto:${portfolio.email}?subject=${encodeURIComponent("Portfolio contact")}&body=${mailtoBody}`}
              className="mt-10 inline-block text-xs uppercase tracking-[0.25em] text-emerald-300/90 transition-colors hover:text-emerald-200"
              data-cursor
            >
              Compose email →
            </a>
          </div>
        </div>

        <div data-reveal className="mt-16 border-t border-white/10 pt-10">
          <ScrambleButton
            href={portfolio.resume}
            label="Download resume"
            download
            className="whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-white backdrop-blur-sm"
          />
        </div>
      </div>
    </section>
  );
}