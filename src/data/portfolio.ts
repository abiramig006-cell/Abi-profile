export type ProjectCategory = "All" | "IoT" | "AI" | "Full-Stack" | "Embedded";

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
};

export const portfolio = {
  name: "Selvendran Palanisamy",
  firstName: "Selvendran",
  lastName: "Palanisamy",
  role: "Embedded Systems, IoT & Full-Stack Developer",
  tagline: "Embedded Systems, IoT, AI & Full-Stack Code. One integrated vision.",
  summary:
    "Embedded Systems and IoT Developer skilled in microcontroller programming, sensor integration and hardware–software interfacing. Building production-grade full-stack apps, AI systems, and real-time IoT platforms.",
  location: "Dindigul, Tamil Nadu",
  locationShort: "Dindigul, India / Working Globally",
  email: "selvendranapalanisamy@gmail.com",
  phone: "9025773867",
  github: "https://github.com/selvendran254",
  linkedin: "https://linkedin.com/in/selvendran-p",
  services: ["Embedded", "IoT", "AI", "Full-Stack"],
  projectFilters: ["All", "IoT", "AI", "Full-Stack", "Embedded"] as ProjectCategory[],
  highlights: [
    {
      quote:
        "CyberGuard AI builds a full Security Operations Center on your machine — telemetry, threat scoring, Llama 3 analysis and USB attack detection.",
      label: "CyberGuard AI · Python + Ollama",
    },
    {
      quote:
        "Agri-Smart connects soil sensors, weather data and MQTT irrigation into one enterprise agriculture dashboard with real-time alerts.",
      label: "Agri-Smart · IoT Platform",
    },
    {
      quote:
        "Multi-vendor e-commerce spans storefront, vendor panel, admin dashboard, REST API and Stripe — a complete marketplace architecture.",
      label: "E-Commerce · Next.js 14",
    },
    {
      quote:
        "AI Smart Attendance combines face recognition, GPS verification and insider threat detection into an enterprise HR security system.",
      label: "Smart Attendance · AI + Docker",
    },
    {
      quote:
        "WhatsApp Event Platform automates reminders via Meta Cloud API with BullMQ queues, RBAC and full observability stack.",
      label: "WhatsApp Platform · Node.js",
    },
  ],
  skills: [
    {
      category: "Embedded & IoT",
      level: 92,
      items: [
        "Arduino",
        "ESP8266/ESP32",
        "RFID Modules",
        "MQTT",
        "Sensor Integration",
        "Motor Drivers",
        "Blynk Cloud",
        "Bluetooth HC-05",
      ],
    },
    {
      category: "Full-Stack Development",
      level: 88,
      items: [
        "Next.js 14",
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Socket.io",
        "Redis",
      ],
    },
    {
      category: "AI & Data",
      level: 85,
      items: [
        "Python",
        "OpenAI API",
        "Ollama / Llama 3",
        "Face Recognition",
        "NumPy",
        "Pandas",
        "Threat Detection",
        "GPS Verification",
      ],
    },
    {
      category: "DevOps & Tools",
      level: 80,
      items: ["Docker", "Grafana", "Prometheus", "GitHub", "VS Code", "BullMQ", "Stripe", "Vercel"],
    },
    {
      category: "Programming",
      level: 90,
      items: ["TypeScript", "JavaScript", "Python", "C", "C++", "Java", "HTML/CSS"],
    },
  ],
  techLogos: [
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "Arduino",
    "ESP8266",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Redis",
    "Prisma",
    "TypeScript",
    "MQTT",
    "OpenAI",
    "Socket.io",
    "Grafana",
  ],
  internship: {
    role: "Embedded Systems Intern",
    company: "CodTech IT Solutions",
    date: "Aug 2025",
    points: [
      "Worked on embedded programming, IoT device control and sensor-based automation.",
      "Hands-on experience with microcontrollers, ESP modules and real-time embedded systems.",
    ],
  },
  certifications: [
    { title: "Generative AI in Action", org: "IBM SkillsBuild", year: "2025" },
    { title: "Embedded System with IoT", org: "Skill Intern", year: "2025" },
    { title: "Arduino Project (Basic)", org: "Simplilearn SkillUp", year: "2025" },
    { title: "Technology Job Simulation", org: "Deloitte Forage", year: "2025" },
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      period: "2022 – 2026",
      institution: "Christian College of Engineering and Technology, Tamil Nadu",
    },
    {
      degree: "Higher Secondary (Class 12)",
      period: "2022",
      institution: "Akshaya Academy School",
    },
    {
      degree: "Secondary (Class 10)",
      period: "2020",
      institution: "Akshaya Academy School",
    },
  ],
  navLinks: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  marqueeItems: [
    "Arduino",
    "ESP8266",
    "IoT",
    "MQTT",
    "Next.js",
    "Python",
    "AI",
    "Docker",
    "PostgreSQL",
    "Socket.io",
    "RFID",
    "Robotics",
    "OpenAI",
    "Prisma",
    "Redis",
    "Grafana",
    "TypeScript",
    "Embedded C",
    "Real-time Systems",
    "Smart Agriculture",
  ],
  scrollLocations: [
    "Dindigul",
    "Chennai",
    "Bangalore",
    "Coimbatore",
    "Madurai",
    "Tamil Nadu",
    "India",
    "IoT",
    "Embedded Systems",
    "Arduino",
    "ESP8266",
    "MQTT",
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "AI",
    "Full-Stack",
    "Docker",
    "GitHub",
    "RFID",
    "Robotics",
  ],
  getImpactStats: (repoCount: number) => [
    {
      value: `+${repoCount}`,
      text: "GitHub repositories synced live from github.com/selvendran254 — IoT, AI, embedded and full-stack.",
    },
    { value: "+8", text: "Games, e-commerce, WhatsApp automation, and real-time platforms with production patterns." },
    { value: "+4", text: "Industry certifications across AI, IoT, Arduino and Deloitte tech simulation." },
    { value: "AI", text: "CyberGuard SOC, Smart Attendance face recognition, and AI Fitness Coach with Tamil support." },
    { value: "IoT", text: "Agri-Smart irrigation, Smart Home ESP8266, ElderCare vitals monitoring and fall detection." },
    { value: "RFID", text: "Library automation with Flask, PostgreSQL and Arduino hardware prototype." },
    { value: "+MQTT", text: "Enterprise agriculture platform with sensors, weather APIs and automated irrigation." },
    { value: "BT", text: "Bluetooth robotic vehicle with Arduino, L298N motor driver and Android controller." },
    { value: "Docker", text: "Multiple projects with Docker, Redis, Grafana, Prometheus and observability stacks." },
    { value: "95%", text: "Focus on hardware–software integration, real-time systems and scalable architecture." },
    { value: "+27", text: "AI Fitness Coach ships 27 features including PWA, i18n and OpenAI integration." },
    { value: "Stripe", text: "Multi-vendor e-commerce with Next.js 14, Prisma, PostgreSQL and payment integration." },
  ],
};
