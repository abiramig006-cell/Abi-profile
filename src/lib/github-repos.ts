import type { Project } from "@/data/portfolio";
import { buildProjectFromGithub, repoOverrides } from "@/data/repo-overrides";

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
};

const fallbackRepos: GitHubRepo[] = Object.keys(repoOverrides).map((name) => ({
  name,
  html_url: `https://github.com/selvendran254/${encodeURIComponent(name)}`,
  description: repoOverrides[name].description ?? null,
  language: repoOverrides[name].language ?? "Code",
  updated_at: new Date().toISOString(),
}));

function mapRepos(repos: GitHubRepo[]) {
  return repos
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .map((repo) => buildProjectFromGithub(repo));
}

export async function fetchGitHubProjects(): Promise<Project[]> {
  try {
    const response = await fetch("https://api.github.com/users/selvendran254/repos?per_page=100&sort=updated", {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];
    if (!repos.length) return mapRepos(fallbackRepos);

    return mapRepos(repos);
  } catch {
    return mapRepos(fallbackRepos);
  }
}

export function getFeaturedProjects(projects: Project[]) {
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 5);
}
