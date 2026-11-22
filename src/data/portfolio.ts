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
  points?: string[];
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
  role: "Full Stack Web Development & Artificial Intelligence",
  heroEyebrow: "Computer Science Engineering Student",
  tagline: "Responsive web applications and AI-driven solutions.",
  summary:
    "Computer Science Engineering student with a strong foundation in Full Stack Web Development and Artificial Intelligence. Proficient in Java, Python, HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and SQL. Experienced in building responsive web applications and participating in hackathons to solve real-world problems. Passionate about developing scalable software and AI-driven solutions while continuously learning emerging technologies.",
  aboutTitle: "Full Stack Web Development and Artificial Intelligence.",
  aboutParagraphs: [
    "Computer Science Engineering student with a strong foundation in Full Stack Web Development and Artificial Intelligence. Proficient in Java, Python, HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and SQL.",
    "Experienced in building responsive web applications and participating in hackathons to solve real-world problems. Passionate about developing scalable software and AI-driven solutions while continuously learning emerging technologies.",
  ],
  exploring: ["Full Stack Web Development", "Artificial Intelligence", "Responsive Web Applications", "Emerging Technologies"],
  location: "Dindigul, Tamil Nadu, India",
  locationShort: "Dindigul, Tamil Nadu, India",
  email: "abiramig006@gmail.com",
  phone: "+91 63807 03697",
  phoneHref: "tel:+916380703697",
  resume: "/Abirami-G-Resume.pdf",
  github: "https://github.com/abiramig006",
  linkedin: "https://www.linkedin.com/in/abirami-g-956264331/",
  leetcode: "https://leetcode.com/u/abi_gopal",
  languages: ["English", "Tamil"],
  services: ["Full Stack", "Artificial Intelligence", "React", "Python"],
  projectFilters: ["All", "AI", "Computer Vision", "Full-Stack", "Web App"] as ProjectCategory[],
  highlights: [
    {
      quote:
        "Talent Track is a full-stack app in React, Node.js, Express.js, and MongoDB, with REST APIs for athlete data, video uploads, athlete profiles, and AI-based performance analysis.",
      label: "Talent Track · React + Node.js + MongoDB",
    },
    {
      quote:
        "AI Resume Builder is a responsive React app with live preview, PDF download, Local Storage, AI-assisted content, and a mobile-friendly dark mode.",
      label: "AI Resume Builder · React",
    },
    {
      quote:
        "The weather app uses NOAA data and machine learning to predict forecast errors and bust probability, with confidence maps, error graphs, and 10-day reliability.",
      label: "Weather Forecast Bust Detection · NOAA",
    },
    {
      quote:
        "TextileGuard AI generates synthetic textile defects with GANs and classifies Broken Stitch, Skipped Stitch, and Normal with a CNN, in a Streamlit app.",
      label: "TextileGuard AI · GAN + CNN + Streamlit",
    },
  ],
  skills: [
    { category: "Programming", level: 88, items: ["Java", "Python", "JavaScript"] },
    { category: "Frontend", level: 85, items: ["HTML", "CSS", "React"] },
    { category: "Backend", level: 82, items: ["Node.js", "Express.js"] },
    { category: "Databases", level: 80, items: ["MongoDB", "SQL"] },
  ],
  techLogos: [
    "Java",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Streamlit",
    "GAN",
    "CNN",
  ],
  achievements: [
    {
      title: "Smart India Hackathon — Internal Round Winner (2 Times)",
      description:
        "Won the internal-level competition twice by collaborating with team members, analysing problem statements, and developing innovative solutions.",
      kind: "Hackathon",
    },
    {
      title: "CIH Hackathon — Finalist",
      description:
        "Selected among the top 300 finalists out of 6,000 participants, demonstrating strong problem-solving, innovation, and technical skills.",
      kind: "Hackathon",
    },
    {
      title: "MSME Hackathon — Participant (2 Times)",
      description:
        "Participated in two MSME hackathon events, contributing to problem analysis, solution ideation, and developing practical solutions through teamwork.",
      kind: "Hackathon",
    },
    {
      title: "Paper Presentation — 2nd Prize",
      description:
        "Secured 2nd Prize in Paper Presentation Competition at NPR College of Engineering and Technology.",
      kind: "Presentation",
    },
    {
      title: "UI/UX Design — 3rd Prize",
      description: "Won 3rd Prize in UI/UX Design Competition at Ramco Institute of Technology.",
      kind: "Design",
    },
    {
      title: "Upside Down — 2nd Prize",
      description: "Secured 2nd Prize in Upside Down Competition at Sethu Institute of Technology.",
      kind: "Competition",
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
      degree: "Bachelor of Engineering in Computer Science",
      period: "Sep 2024 – May 2028",
      institution: "PSNA College of Engineering and Technology, Dindigul",
      note: "CGPA 8.5",
    },
    {
      degree: "Secondary and higher secondary education",
      period: "Jun 2021 – May 2024",
      institution: "St. Anne's Academy Matriculation Hr. Sec. School",
      note: "10th — 89% · 12th — 84.5%",
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
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
    "GANs",
    "CNNs",
    "Streamlit",
    "Full-Stack",
    "Hackathons",
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
    "JavaScript",
    "Full-Stack",
    "Hackathons",
    "PSNA",
    "Java",
    "MongoDB",
    "Streamlit",
    "Talent Track",
    "Web Development",
    "SQL",
  ],
  projects: [
    {
      title: "Talent Track — AI-Based Sports Talent Assessment Platform",
      repo: "talent-track",
      tags: ["React", "Node.js", "Express.js", "MongoDB"],
      category: ["AI", "Full-Stack"],
      date: "",
      language: "React · Node.js · Express.js · MongoDB",
      status: "Developed",
      description:
        "Developed a full-stack web application using React, Node.js, Express.js, and MongoDB. Built REST APIs for athlete data management and performance tracking. Designed a responsive interface for video uploads and athlete profiles. Structured the application to support AI-based performance analysis.",
      points: [
        "Developed a full-stack web application using React, Node.js, Express.js, and MongoDB.",
        "Built REST APIs for athlete data management and performance tracking.",
        "Designed a responsive interface for video uploads and athlete profiles.",
        "Structured the application to support AI-based performance analysis.",
      ],
      url: "https://github.com/abiramig006",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-rose-900/80 via-red-950/60 to-neutral-950",
    },
    {
      title: "AI Resume Builder",
      repo: "ai-resume-builder",
      tags: ["React", "JavaScript"],
      category: ["AI", "Full-Stack"],
      date: "",
      language: "React",
      status: "Developed",
      description:
        "Developed a responsive resume builder using React with live preview and PDF download. Implemented Local Storage for automatic data saving and retrieval. Integrated AI-assisted resume content generation. Designed a mobile-friendly interface with Dark Mode support.",
      points: [
        "Developed a responsive resume builder using React with live preview and PDF download.",
        "Implemented Local Storage for automatic data saving and retrieval.",
        "Integrated AI-assisted resume content generation.",
        "Designed a mobile-friendly interface with Dark Mode support.",
      ],
      url: "https://abiramig006.github.io/AI-Resume-builder/",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-violet-900/80 via-indigo-950/60 to-neutral-950",
    },
    {
      title: "AI-Based Weather Forecast Bust Detection App",
      repo: "weather-forecast-bust",
      tags: ["Machine Learning", "NOAA"],
      category: ["AI"],
      date: "",
      language: "Machine Learning · NOAA",
      status: "Developed",
      description:
        "Developed an AI-powered weather forecast reliability detection web application. Integrated NOAA weather data for real-time weather information and forecast analysis. Built machine learning models to predict forecast errors and bust probability. Designed an interactive dashboard with confidence maps, historical error graphs, and 10-day forecast reliability. Implemented error-prone area detection, explainable AI, and weather reliability alerts.",
      points: [
        "Developed an AI-powered weather forecast reliability detection web application.",
        "Integrated NOAA weather data for real-time weather information and forecast analysis.",
        "Built machine learning models to predict forecast errors and bust probability.",
        "Designed an interactive dashboard with confidence maps, historical error graphs, and 10-day forecast reliability.",
        "Implemented error-prone area detection, explainable AI, and weather reliability alerts.",
      ],
      url: "https://github.com/abiramig006",
      image:
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-sky-900/80 via-blue-950/60 to-neutral-950",
    },
    {
      title: "TextileGuard AI — GAN-Based Textile Defect Detection System",
      repo: "textileguard-ai",
      tags: ["GAN", "CNN", "Streamlit"],
      category: ["Computer Vision", "AI"],
      date: "",
      language: "GAN · CNN · Streamlit",
      status: "Developed",
      description:
        "Developed a GAN-based textile defect generation and deep learning classification system. Implemented Generative Adversarial Networks (GANs) to generate synthetic textile defect images. Built a CNN-based model to classify textile defects such as Broken Stitch, Skipped Stitch, and Normal. Trained and evaluated the model using a textile defect image dataset. Developed a Streamlit web application for textile defect prediction and visualization.",
      points: [
        "Developed a GAN-based textile defect generation and deep learning classification system.",
        "Implemented Generative Adversarial Networks (GANs) to generate synthetic textile defect images.",
        "Built a CNN-based model to classify textile defects such as Broken Stitch, Skipped Stitch, and Normal.",
        "Trained and evaluated the model using a textile defect image dataset.",
        "Developed a Streamlit web application for textile defect prediction and visualization.",
      ],
      url: "https://github.com/abiramig006",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-amber-900/80 via-orange-950/60 to-neutral-950",
    },
    {
      title: "VISION — Smart Waste Management",
      repo: "Vision-Clean",
      tags: ["HTML", "Firebase"],
      category: ["Web App"],
      date: "",
      language: "HTML · Firebase",
      status: "Developed",
      description:
        "A smart waste management web app for creating an account, resetting access through Firebase, and tracking collection so spaces stay cleaner.",
      points: [
        "Built the VISION web app for smarter waste collection and cleaner spaces.",
        "Added account creation and a Firebase password reset flow.",
      ],
      url: "https://abiramig006.github.io/Vision-Clean/",
      image:
        "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gradient: "from-emerald-900/80 via-teal-950/60 to-neutral-950",
    },
  ] as Project[],
  getImpactStats: (repoCount: number) => [
    {
      value: `${repoCount}`,
      text: "Projects across textile vision, weather analytics, sports talent tracking, and full-stack apps.",
    },
    {
      value: "8.5",
      text: "CGPA in Computer Science Engineering at PSNA College of Engineering and Technology.",
    },
    {
      value: "2×",
      text: "Smart India Hackathon internal-round wins. MSME Hackathon participation, also twice.",
    },
    {
      value: "300",
      text: "CIH Hackathon finalist — selected from 6,000 participants.",
    },
    {
      value: "2nd",
      text: "Paper presentation at NPR College of Engineering and Technology, and Upside Down at Sethu Institute of Technology.",
    },
    {
      value: "3rd",
      text: "UI/UX design prize at Ramco Institute of Technology.",
    },
    {
      value: "5",
      text: "Certifications from IBM, AWS, Cisco, and Oracle across Java, Python, MongoDB, and AI.",
    },
    {
      value: "GAN",
      text: "TextileGuard AI generates synthetic defects and classifies Broken Stitch, Skipped Stitch, and Normal.",
    },
    {
      value: "NOAA",
      text: "Weather bust detection scores forecast error, confidence maps, and 10-day reliability from NOAA data.",
    },
    {
      value: "MERN",
      text: "Talent Track uses React, Node.js, Express, and MongoDB for athlete profiles, video uploads, and performance APIs.",
    },
    {
      value: "PDF",
      text: "AI Resume Builder offers live preview, PDF download, local storage, and dark mode.",
    },
    {
      value: "IBM",
      text: "Certified in Java and MongoDB through IBM.",
    },
    {
      value: "AWS",
      text: "AWS AI certification alongside Cisco Python and Oracle Java.",
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
