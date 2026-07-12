import type { Project, ProjectCategory } from "@/data/portfolio";

export type RepoOverride = {
  title?: string;
  tags?: string[];
  category?: Exclude<ProjectCategory, "All">[];
  description?: string;
  featured?: boolean;
  gradient?: string;
  language?: string;
  image?: string;
};

const repoImageSlug: Record<string, string> = {
  "-Cell-Phone-Controlled-Robotic-Vehicle": "robotic-vehicle",
  "README.md": "readme-md",
};

export function getLocalProjectImage(repo: string) {
  const slug = repoImageSlug[repo] ?? repo;
  return `/projects/${slug}.jpg`;
}

export const repoOverrides: Record<string, RepoOverride> = {
  "multi-vendor-ecommerce": {
    title: "Multi-Vendor E-Commerce",
    tags: ["Full-Stack", "Next.js"],
    category: ["Full-Stack"],
    featured: true,
    gradient: "from-violet-900/80 via-purple-950/60 to-neutral-950",
    description:
      "Full-stack multi-vendor marketplace with Next.js 14, Prisma, PostgreSQL, NextAuth, Express REST API, Stripe payments, and mobile scaffold.",
  },
  "CyberGuard-AI-project": {
    title: "CyberGuard AI",
    tags: ["AI", "Security"],
    category: ["AI", "Full-Stack"],
    featured: true,
    gradient: "from-red-900/80 via-rose-950/60 to-neutral-950",
    description:
      "Personal Cybersecurity SOC — collects system telemetry, scores threats, runs Ollama + Llama 3 analysis, and detects USB hardware attacks.",
  },
  "agri-smart": {
    title: "Agri-Smart IoT Platform",
    tags: ["IoT", "Full-Stack"],
    category: ["IoT", "Full-Stack"],
    featured: true,
    gradient: "from-emerald-900/80 via-green-950/60 to-neutral-950",
    description:
      "Enterprise smart agriculture monitoring with React, Node.js, MongoDB, MQTT sensors, weather APIs, irrigation automation and admin dashboard.",
  },
  "ai-smart-attendance": {
    title: "AI Smart Attendance",
    tags: ["AI", "Enterprise"],
    category: ["AI", "Full-Stack"],
    featured: true,
    gradient: "from-cyan-900/80 via-sky-950/60 to-neutral-950",
    description:
      "Enterprise attendance system with AI face recognition, GPS verification, insider threat detection, MFA, Docker and Grafana monitoring.",
  },
  "whatsapp-event-platform": {
    title: "WhatsApp Event Platform",
    tags: ["Full-Stack", "API"],
    category: ["Full-Stack"],
    featured: true,
    gradient: "from-teal-900/80 via-emerald-950/60 to-neutral-950",
    description:
      "Enterprise event platform with Meta WhatsApp Cloud API, PostgreSQL, Prisma, Redis, BullMQ queues, Docker, Prometheus and Grafana.",
  },
  "ElderCare-Monitor": {
    title: "ElderCare Monitor",
    tags: ["IoT", "Healthcare"],
    category: ["IoT", "Full-Stack"],
    gradient: "from-pink-900/80 via-fuchsia-950/60 to-neutral-950",
    description:
      "Elderly health monitoring with vitals tracking, fall detection, family portal, telemedicine, mobile app and Tamil/English support.",
  },
  "AI-Fitness-Coach": {
    title: "AI Fitness Coach",
    tags: ["AI", "Health"],
    category: ["AI", "Full-Stack"],
    gradient: "from-orange-900/80 via-amber-950/60 to-neutral-950",
    description:
      "Production AI fitness coaching app for diabetics and BP patients with OpenAI, Prisma, PWA, 27 features and English/Tamil i18n.",
  },
  "multiplayer-game-platform": {
    title: "Multiplayer Game Platform",
    tags: ["Real-time", "WebSocket"],
    category: ["Full-Stack"],
    gradient: "from-indigo-900/80 via-blue-950/60 to-neutral-950",
    description:
      "Real-time multiplayer gaming hub with Chess, Ludo, Quiz — built with React, Node.js, Socket.io, MongoDB and Redis.",
  },
  "Smart-Home-Automation-Using-IoT": {
    title: "Smart Home Automation",
    tags: ["IoT", "ESP8266"],
    category: ["IoT", "Embedded"],
    gradient: "from-lime-900/80 via-green-950/60 to-neutral-950",
    description:
      "Remote home appliance control using ESP8266 NodeMCU, relay modules, sensors and cloud connectivity via Blynk or MQTT.",
  },
  "Library-Automation-Using-RFID": {
    title: "Library Automation RFID",
    tags: ["RFID", "Embedded"],
    category: ["Embedded", "IoT"],
    gradient: "from-yellow-900/80 via-amber-950/60 to-neutral-950",
    description:
      "Complete RFID library system with Flask web app, PostgreSQL database and Arduino hardware prototype for book issue/return.",
  },
  "-Cell-Phone-Controlled-Robotic-Vehicle": {
    title: "Robotic Vehicle",
    tags: ["Arduino", "Robotics"],
    category: ["Embedded"],
    gradient: "from-blue-900/80 via-indigo-950/60 to-neutral-950",
    description:
      "DIY Bluetooth robot with Arduino, L298N motor driver, HC-05 module and sleek Android controller app for directional movement.",
  },
  "birthday-surprise": {
    title: "Birthday Surprise",
    tags: ["Frontend", "Animation"],
    category: ["Full-Stack"],
    gradient: "from-rose-900/80 via-pink-950/60 to-neutral-950",
    description:
      "Interactive animated birthday surprise built with HTML, CSS and JavaScript — deployed on Vercel with customizable names and smooth motion effects.",
  },
  portfolio: {
    title: "Glassmorphism Portfolio",
    tags: ["Portfolio", "Frontend"],
    category: ["Full-Stack"],
    gradient: "from-slate-900/80 via-zinc-950/60 to-neutral-950",
    description:
      "Previous glassmorphism portfolio website for Embedded Systems & IoT Developer — hosted on GitHub Pages with modern UI and project showcase.",
  },
  selvendran254: {
    title: "GitHub Profile README",
    tags: ["GitHub", "Profile"],
    category: ["Full-Stack"],
    gradient: "from-neutral-800/80 via-neutral-900/60 to-neutral-950",
    description:
      "Special GitHub profile repository with animated stats, tech stack badges, featured projects, work experience and certifications showcase.",
    language: "Markdown",
  },
  "README.md": {
    title: "Profile Stats README",
    tags: ["GitHub", "Markdown"],
    category: ["Full-Stack"],
    gradient: "from-stone-900/80 via-neutral-950/60 to-neutral-950",
    description:
      "GitHub profile README with animated statistics, project highlights, skills visualization and professional portfolio presentation.",
    language: "Markdown",
  },
};

const defaultGradients = [
  "from-violet-900/80 via-purple-950/60 to-neutral-950",
  "from-emerald-900/80 via-green-950/60 to-neutral-950",
  "from-cyan-900/80 via-sky-950/60 to-neutral-950",
  "from-orange-900/80 via-amber-950/60 to-neutral-950",
  "from-indigo-900/80 via-blue-950/60 to-neutral-950",
];

export function getProjectImage(repo: string) {
  const override = repoOverrides[repo];
  if (override?.image) return override.image;
  return getLocalProjectImage(repo);
}

export function formatRepoTitle(name: string) {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function guessCategory(language: string | null): Exclude<ProjectCategory, "All">[] {
  if (!language) return ["Full-Stack"];
  const lang = language.toLowerCase();
  if (["c", "c++", "java"].includes(lang)) return ["Embedded"];
  if (lang === "python") return ["AI"];
  return ["Full-Stack"];
}

export function pickGradient(name: string) {
  const index = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return defaultGradients[index % defaultGradients.length];
}

export function formatGitHubDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function buildProjectFromGithub(repo: {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
}): Project {
  const override = repoOverrides[repo.name] ?? {};
  const language = override.language ?? repo.language ?? "Code";
  const category = override.category ?? guessCategory(repo.language);

  return {
    repo: repo.name,
    title: override.title ?? formatRepoTitle(repo.name),
    tags: override.tags ?? [language, "GitHub"],
    category,
    date: formatGitHubDate(repo.updated_at),
    language,
    description:
      override.description ??
      repo.description ??
      `Open-source project hosted on GitHub — ${repo.name} by Selvendran Palanisamy.`,
    url: repo.html_url,
    image: getProjectImage(repo.name),
    featured: override.featured ?? false,
    gradient: override.gradient ?? pickGradient(repo.name),
  };
}
