"use client";

import { useTheme } from "@/context/ThemeContext";
import { useHaptic } from "@/hooks/useHaptic";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const haptic = useHaptic();

  return (
    <button
      type="button"
      onClick={() => {
        haptic(6);
        toggleTheme();
      }}
      className="nav-item rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
