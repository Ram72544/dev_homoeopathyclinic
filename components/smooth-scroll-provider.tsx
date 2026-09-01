"use client";

import { useEffect } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function smoothScrollTo(targetPosition: number, duration = 750) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeOutExpo(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

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

        // Calculate navbar offset
        const navbarHeight = window.innerWidth < 640 ? 76 : 96;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        smoothScrollTo(Math.max(0, offsetPosition), 750);

        // Update URL hash without causing an instant jerky jump
        if (history.pushState) {
          history.pushState(null, "", href);
        }

        // Add a gentle target highlight pulse
        targetElement.classList.add("target-section-glow");
        setTimeout(() => {
          targetElement.classList.remove("target-section-glow");
        }, 1200);
      }
    }

    document.addEventListener("click", handleAnchorClick, { passive: false });
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
