"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useProjects } from "@/context/ProjectsContext";
import { portfolio, type ProjectCategory } from "@/data/portfolio";
import { useRevealOnScroll, useSplitHeading } from "@/hooks/useRevealOnScroll";
import ScrambleButton from "./ScrambleButton";
import ProjectImage from "./ProjectImage";

export default function AllProjects() {
  const { projects: allProjects } = useProjects();
  const headingRef = useSplitHeading<HTMLDivElement>();
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const filtered =
    filter === "All" ? allProjects : allProjects.filter((p) => p.category.includes(filter));

  useEffect(() => {
    registerGsap();
    const grid = gridRef.current;
    if (!grid) return;

    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      },
    );
  }, [filter]);

  return (
    <section id="all-projects" ref={sectionRef} className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headingRef} className="mb-10 max-w-3xl">
          <div className="overflow-hidden">
            <h2 data-line className="text-3xl font-light text-white md:text-5xl">
              All GitHub Repositories
            </h2>
          </div>
          <div className="overflow-hidden">
            <p data-line className="mt-4 text-white/60">
              {allProjects.length} repositories synced live from{" "}
              <a href={portfolio.github} className="underline underline-offset-4 hover:text-white" data-cursor>
                github.com/selvendran254
              </a>
            </p>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {portfolio.projectFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                filter === cat
                  ? "border-white bg-white text-neutral-950"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
              data-cursor
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              data-cursor
            >
              <ProjectImage
                src={project.image}
                alt={project.title}
                gradient={project.gradient}
                repo={project.repo}
                language={project.language}
              />
              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-light text-white transition-transform duration-300 group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/55">{project.description}</p>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
                  <span>{project.language}</span>
                  <span>{project.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <ScrambleButton href={portfolio.github} label="See all on GitHub" external className="text-white" />
        </div>
      </div>
    </section>
  );
}
