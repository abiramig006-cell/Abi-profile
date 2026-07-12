import HomePage from "@/components/HomePage";
import { ProjectsProvider } from "@/context/ProjectsContext";
import { fetchGitHubProjects, getFeaturedProjects } from "@/lib/github-repos";

export default async function Home() {
  const projects = await fetchGitHubProjects();
  const featuredProjects = getFeaturedProjects(projects);

  return (
    <ProjectsProvider projects={projects} featuredProjects={featuredProjects}>
      <HomePage />
    </ProjectsProvider>
  );
}
