"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    registerGsap();
    const next = theme === "dark" ? "light" : "dark";

    gsap.to(document.body, {
      opacity: 0.85,
      duration: 0.2,
      onComplete: () => {
        setTheme(next);
        gsap.to(document.body, { opacity: 1, duration: 0.35, ease: "power2.out" });
      },
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
