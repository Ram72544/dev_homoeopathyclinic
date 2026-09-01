"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-[#E8E1D5] bg-white/70 backdrop-blur-md ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode (Low Light)"}
      title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
      className={`group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E8E1D5] dark:border-white/15 bg-white/80 dark:bg-[#14261D]/90 text-[#14221B] dark:text-[#E5C583] shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-[#0E7C7B] dark:hover:border-[#E5C583] hover:scale-105 active:scale-90 cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#E5C583] transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#0E7C7B] transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
