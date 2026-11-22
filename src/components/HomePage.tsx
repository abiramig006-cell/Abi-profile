"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import ScrollSetup from "@/components/ScrollSetup";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import TechLogos from "@/components/TechLogos";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LocationScroll from "@/components/LocationScroll";
import SectionReveal from "@/components/SectionReveal";
import { ThemeProvider } from "@/context/ThemeContext";
import { useScrollTriggerRefresh } from "@/hooks/useRevealOnScroll";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  useScrollTriggerRefresh();

  return (
    <ThemeProvider>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <ScrollSetup>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main className="bg-neutral-950 text-white">
          <Hero />
          <SectionReveal>
            <Marquee />
          </SectionReveal>
          <Projects />
          <SectionReveal>
            <Skills />
          </SectionReveal>
          <LocationScroll />
          <Stats />
          <SectionReveal>
            <About />
          </SectionReveal>
          <SectionReveal>
            <Highlights />
          </SectionReveal>
          <SectionReveal>
            <TechLogos />
          </SectionReveal>
          <SectionReveal>
            <Experience />
          </SectionReveal>
          <SectionReveal>
            <Certifications />
          </SectionReveal>
          <SectionReveal>
            <Education />
          </SectionReveal>
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>
        <Footer />
      </ScrollSetup>
    </ThemeProvider>
  );
}
