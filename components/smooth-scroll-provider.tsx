"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function handleAnchorClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset to ensure floating navbar never overlaps section content
        const navbarHeight = window.innerWidth < 640 ? 76 : 96;
        const targetRect = targetElement.getBoundingClientRect();
        const targetTop = targetRect.top + window.pageYOffset - navbarHeight;

        // Instant, hardware-accelerated native smooth scroll (no JS loop conflict)
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });

        // Update URL hash cleanly
        if (history.pushState) {
          history.pushState(null, "", href);
        }
      }
    }

    document.addEventListener("click", handleAnchorClick, { passive: false });
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
