"use client";

import { portfolio } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";

export default function Certifications() {
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>({ stagger: 0.08 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <div className="overflow-hidden">
            <h2 data-line className="text-3xl font-light text-white md:text-5xl">
              Certifications
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {portfolio.certifications.map((cert) => (
            <article key={`${cert.org}-${cert.title}`} data-reveal className="cert-flip h-44 [perspective:1000px]" data-cursor>
              <div className="cert-flip-inner relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 [backface-visibility:hidden]">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">{cert.org}</p>
                  <h3 className="mt-3 text-xl font-light text-white">{cert.title}</h3>
                  {cert.year ? <p className="mt-2 text-sm text-white/60">{cert.year}</p> : null}
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-center text-sm uppercase tracking-[0.25em] text-emerald-300">
                    Certification · {cert.org}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
