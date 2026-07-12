"use client";

import { createContext, useContext } from "react";
import type { Project } from "@/data/portfolio";

type ProjectsContextValue = {
  projects: Project[];
  featuredProjects: Project[];
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({
  projects,
  featuredProjects,
  children,
}: ProjectsContextValue & { children: React.ReactNode }) {
  return (
    <ProjectsContext.Provider value={{ projects, featuredProjects }}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
}
