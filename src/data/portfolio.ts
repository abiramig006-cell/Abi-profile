export type ProjectCategory =
  | "All"
  | "AI"
  | "Full-Stack"
  | "Computer Vision"
  | "Web App"
  | "IoT"
  | "Embedded";

export type Project = {
  title: string;
  repo: string;
  tags: string[];
  category: Exclude<ProjectCategory, "All">[];
  date: string;
  language: string;
  description: string;
  url: string;
  image: string;
  featured: boolean;
  gradient: string;
  status?: string;
};

export type Achievement = {
  title: string;
  description: string;
  kind: string;
};

export const portfolio = {
  name: "Abirami G",
  firstName: "Abirami",
  lastName: "G",
  role: "AI/ML Engineer & Full-Stack Developer",
  heroEyebrow: "Computer Science Engineering Student",
  tagline: "Building intelligent solutions for real-world problems.",
  summary:
    "Hi, I'm Abirami G, an aspiring AI/ML Engineer and Full-Stack Developer passionate about artificial intelligence, computer vision, and building practical web applications. I enjoy transforming ideas into useful solutions through experimentation, problem-solving, and continuous learning.",
  aboutTitle: "Curious mind. Practical builder.",
  aboutParagraphs: [
    "I'm a Computer Science Engineering student interested in combining artificial intelligence with full-stack development. My learning journey includes building machine learning models, experimenting with computer vision, developing web interfaces, and designing solutions to real-world problems.",
    "Through academic projects, hackathons, and technical activities, I continue to strengthen my programming, analytical thinking, and development skills. My goal is to build technology that is useful, accessible, and meaningful.",
  ],
  exploring: ["Deep Learning", "Generative Models", "Computer Vision", "Full-Stack Application Development"],
  location: "Dindigul, Tamil Nadu, India",
  locationShort: "Dindigul, Tamil Nadu, India",
  email: "abiramig006@gmail.com",
  github: "https://github.com/abiramig006-cell",
  linkedin: "https://linkedin.com/in/abirami-g-956264331",
  leetcode: "https://leetcode.com/u/abi_gopal",
  languages: ["English", "Tamil"],
  services: ["AI/ML", "Computer Vision", "Full-Stack", "Deep Learning"],
  projectFilters: ["All", "AI", "Computer Vision", "Full-Stack", "Web App"] as ProjectCategory[],
  highlights: [
    {
      quote:
        "Textile defect inspection classifies fabric into Normal, Broken Stitch, and Skipped Stitch — with GAN-generated synthetic data to strengthen CNN training.",
      label: "Textile Defect Detection · PyTorch + Streamlit",
    },
    {
      quote:
        "AI Resume Builder helps users craft professional, ATS-friendly resumes from skills, education, projects, and experience.",
      label: "AI Resume Builder · React + Tailwind",
    },
    {
      quote:
        "Talent Track brings AI-powered sports talent assessment to students in rural communities who may have limited access to professional coaching.",
      label: "Talent Track · TensorFlow + OpenCV",
    },
    {
      quote:
        "Smart Waste Management Dashboard centralizes monitoring, classification, collection tracking, and operational decisions for smart cities.",
      label: "Smart Waste Dashboard · MERN Stack",
    },
    {
      quote:
        "Weather forecast bust detection surfaces unreliable medium-range forecasts by analyzing errors, confidence, and error-prone regions.",
      label: "Weather Bust Detection · ML + Visualization",
    },
  ],
  skills: [
    { category: "Programming", level: 88, items: ["Python", "Java", "JavaScript", "C", "C++"] },
    { category: "Frontend", level: 85, items: ["HTML", "CSS", "React"] },
    { category: "Backend", level: 82, items: ["Node.js", "Express.js"] },
    { category: "Databases", level: 80, items: ["MongoDB", "Firebase", "SQL"] },
    {
      category: "AI & Machine Learning",
      level: 86,
      items: [
        "Convolutional Neural Networks (CNNs)",
        "Generative Adversarial Networks (GANs)",
        "Computer Vision",
        "Image Classification",
      ],
    },
    { category: "Tools", level: 84, items: ["Git", "GitHub", "VS Code", "Canva", "Figma"] },
  ],
  techLogos: [
    "Python",
    "React",
    "Node.js",
    "Java",
    "JavaScript",
    "MongoDB",
    "TensorFlow",
    "OpenCV",
    "Firebase",
    "Git",
    "PyTorch",
    "Express.js",
    "SQL",
    "HTML",
    "CSS",
    "Figma",
  ],
  achievements: [
    {
      title: "Smart India Hackathon — Pre-final round",
      description:
        "Reached the pre-final round, contributing to problem analysis and solution design as part of a team in a time-bound environment.",
      kind: "Hackathon",
    },
    {
      title: "MSME Hackathon — Participant",
      description:
        "Worked on solution ideation and basic implementation, collaborating with team members and presenting the proposed solution.",
      kind: "Hackathon",
    },
    {
      title: "Three hackathons and counting",
      description:
        "Participated in three hackathons, including Smart India Hackathon-related participation and other hackathon activities.",
      kind: "Hackathon",
    },
    {
      title: "Paper presentation competitions — Winner ×2",
      description: "Won two paper presentation competitions.",
      kind: "Presentation",
    },
    {
      title: "UI/UX competition — Winner",
      description: "Won one UI/UX design competition.",
      kind: "Design",
    },
    {
      title: "Technical workshops",
      description: "Participated in technical workshops, including a Snowflake workshop.",
      kind: "Learning",
    },
  ] satisfies Achievement[],
  certifications: [
    { title: "Java", org: "IBM", year: "" },
    { title: "MongoDB", org: "IBM", year: "" },
    { title: "AI", org: "AWS", year: "" },
    { title: "Python", org: "Cisco", year: "" },
    { title: "Java", org: "Oracle", year: "" },
  ],
  education: [
    {
      degree: "Bachelor of Engineering — Computer Science and Engineering",
      period: "Nov 2024 – May 2028 (expected)",
      institution: "PSNA College of Engineering and Technology, Dindigul",
      note: "Currently in third year · CGPA 8.5",
    },
    {
      degree: "Secondary and higher secondary education",
      period: "Jun 2021 – May 2024",
      institution: "St. Anne's Academy Matriculation Hr. Sec. School",
      note: "12th class — 84.5% · 10th class — 89%",
    },
  ],
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#work" },
    { label: "Achievements", href: "#achievements" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  marqueeItems: [
    "Python",
    "PyTorch",
    "TensorFlow",
    "Computer Vision",
    "GANs",
    "CNNs",
    "React",
    "Node.js",
    "MongoDB",
    "Firebase",
    "OpenCV",
    "Streamlit",
    "Deep Learning",
    "Full-Stack",
    "Java",
    "JavaScript",
    "Express.js",
    "Hackathons",
    "Figma",
    "Git",
  ],
  scrollLocations: [
    "Dindigul",
    "Tamil Nadu",
    "India",
    "AI",
    "Machine Learning",
    "Computer Vision",
    "React",
    "Node.js",
    "Python",
    "Deep Learning",
    "Full-Stack",
    "Hackathons",
    "PSNA",
    "TensorFlow",
    "MongoDB",
    "Firebase",
    "Generative Models",
    "Sports Tech",
    "Web Development",
    "OpenCV",
  ],
  projects: [
    {
      title: "Textile Defect Detection Using GANs and CNNs",
      repo: "textile-defect-detection",
      tags: ["Python", "PyTorch", "CNN", "GAN", "Streamlit"],
      category: ["Computer Vision", "AI"],
      date: "2025",
      language: "Computer Vision · Deep Learning",
      status: "Academic project",
      description:
        "A computer vision project focused on identifying textile stitching defects using deep learning. The system classifies images into Normal, Broken Stitch, and Skipped Stitch categories. GAN-generated synthetic images augment training data and investigate their effect on defect classification.",
      url: "https://github.com/abiramig006-cell",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-amber-900/80 via-orange-950/60 to-neutral-950",
    },
    {
      title: "AI Resume Builder",
      repo: "ai-resume-builder",
      tags: ["React", "JavaScript", "Tailwind CSS", "AI API"],
      category: ["AI", "Full-Stack"],
      date: "2025",
      language: "AI · Full-Stack Development",
      status: "Built",
      description:
        "An AI-powered web application that helps users create professional, ATS-friendly resumes based on their skills, education, projects, and experience.",
      url: "https://github.com/abiramig006-cell",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-violet-900/80 via-indigo-950/60 to-neutral-950",
    },
    {
      title: "Smart Waste Management Dashboard",
      repo: "smart-waste-dashboard",
      tags: ["React", "Node.js", "Express.js", "MongoDB"],
      category: ["Web App", "Full-Stack"],
      date: "2025",
      language: "Smart City · Web Application",
      status: "Proposed concept",
      description:
        "A proposed smart waste management solution designed to support waste monitoring, waste classification, collection tracking, and operational decision-making through a centralized dashboard.",
      url: "https://github.com/abiramig006-cell",
      image:
        "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-emerald-900/80 via-teal-950/60 to-neutral-950",
    },
    {
      title: "AI-Based Weather Forecast Bust Detection",
      repo: "weather-forecast-bust",
      tags: ["Python", "Machine Learning", "Data Visualization"],
      category: ["AI"],
      date: "2025",
      language: "Artificial Intelligence · Weather Analytics",
      status: "Proposed concept",
      description:
        "An AI-based project concept focused on identifying potentially unreliable medium-range weather forecasts by analyzing forecast errors, confidence levels, and error-prone geographical regions.",
      url: "https://github.com/abiramig006-cell",
      image:
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-sky-900/80 via-blue-950/60 to-neutral-950",
    },
    {
      title: "Talent Track — AI-Powered Sports Talent Assessment",
      repo: "talent-track",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "Python", "TensorFlow", "OpenCV", "Firebase"],
      category: ["AI", "Full-Stack"],
      date: "2025",
      language: "AI · Sports Technology",
      status: "In development",
      description:
        "Talent Track is an AI-powered sports talent assessment platform designed to make sports evaluation more accessible to aspiring athletes, especially students in rural communities who may have limited access to professional coaching.",
      url: "https://github.com/abiramig006-cell",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-rose-900/80 via-red-950/60 to-neutral-950",
    },
  ] as Project[],
  getImpactStats: (repoCount: number) => [
    {
      value: `${repoCount}`,
      text: "Featured projects across AI, computer vision, smart city concepts, and full-stack development.",
    },
    {
      value: "8.5",
      text: "CGPA in third year of Computer Science Engineering at PSNA College of Engineering and Technology.",
    },
    {
      value: "3+",
      text: "Hackathons including Smart India Hackathon pre-final round and MSME Hackathon participation.",
    },
    {
      value: "2×",
      text: "Paper presentation competition wins alongside a UI/UX design competition victory.",
    },
    {
      value: "5",
      text: "Industry certifications from IBM, AWS, Cisco, and Oracle across Java, Python, MongoDB, and AI.",
    },
    {
      value: "CV",
      text: "Hands-on computer vision work with CNNs, GANs, and Streamlit for textile defect inspection.",
    },
    {
      value: "AI",
      text: "AI Resume Builder and Talent Track combine modern web stacks with machine learning APIs and models.",
    },
    {
      value: "GAN",
      text: "Explores synthetic image generation to improve defect classification on limited real-world datasets.",
    },
    {
      value: "MERN",
      text: "Full-stack dashboards and apps using React, Node.js, Express, MongoDB, and Firebase.",
    },
    {
      value: "Rural",
      text: "Talent Track focuses on accessible sports assessment for students outside major coaching hubs.",
    },
    {
      value: "IBM",
      text: "Certified in Java and MongoDB through IBM SkillsBuild learning paths.",
    },
    {
      value: "AWS",
      text: "AWS AI certification supporting practical machine learning and cloud-aware project work.",
    },
  ],
};

export function getStaticProjects() {
  return portfolio.projects;
}

export function getFeaturedStaticProjects(projects: Project[]) {
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects;
}
