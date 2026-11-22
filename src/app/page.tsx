import HomePage from "@/components/HomePage";
import { ProjectsProvider } from "@/context/ProjectsContext";
import { getFeaturedStaticProjects, getStaticProjects } from "@/data/portfolio";

export default function Home() {
  const projects = getStaticProjects();
  const featuredProjects = getFeaturedStaticProjects(projects);

  return (
    <ProjectsProvider projects={projects} featuredProjects={featuredProjects}>
      <HomePage />
    </ProjectsProvider>
  );
}
