"use client";

import { useEffect } from "react";

// Luxury cinematic ease-in-out cubic curve (accelerates smoothly, glides, then softly cushions into place)
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

let activeScrollAnimationId: number | null = null;

function cinematicScrollTo(targetY: number, duration = 850) {
  if (activeScrollAnimationId !== null) {
    cancelAnimationFrame(activeScrollAnimationId);
    activeScrollAnimationId = null;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const distance = targetY - startY;

  // If already at or very close to destination, do a clean instant position
  if (Math.abs(distance) < 8) {
    window.scrollTo(0, targetY);
    return;
  }

  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    const nextY = Math.round(startY + distance * ease);
    window.scrollTo(0, nextY);

    if (progress < 1) {
      activeScrollAnimationId = requestAnimationFrame(animate);
    } else {
      activeScrollAnimationId = null;
    }
  }

  activeScrollAnimationId = requestAnimationFrame(animate);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // If the user manually scrolls or touches during animation, seamlessly release control
    function handleUserInterrupt() {
      if (activeScrollAnimationId !== null) {
        cancelAnimationFrame(activeScrollAnimationId);
        activeScrollAnimationId = null;
      }
    }

    function handleAnchorClick(e: MouseEvent) {
      // Look for any <a> tag with href starting with # or containing # (e.g. /#contact or #contact)
      const targetAnchor = (e.target as HTMLElement).closest('a[href*="#"]');
      if (!targetAnchor) return;

      const rawHref = targetAnchor.getAttribute("href");
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf("#");
      if (hashIndex === -1) return;

      const targetId = rawHref.slice(hashIndex + 1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate dynamic navbar height clearance
        const navbarHeight = window.innerWidth < 640 ? 76 : 92;
        const elementRect = targetElement.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
        const finalTargetY = Math.max(0, absoluteElementTop - navbarHeight);

        // Execute cinematic smooth glide
        cinematicScrollTo(finalTargetY, 900);

        // Update URL hash safely without triggering native browser jumping
        if (window.history.pushState) {
          window.history.pushState(null, "", `#${targetId}`);
        }

        // Add soft subtle arrival highlight ring
        targetElement.classList.add("section-arrival-glow");
        setTimeout(() => {
          targetElement.classList.remove("section-arrival-glow");
        }, 1400);
      }
    }

    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchmove", handleUserInterrupt, { passive: true });
    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchmove", handleUserInterrupt);
      document.removeEventListener("click", handleAnchorClick);
      if (activeScrollAnimationId !== null) {
        cancelAnimationFrame(activeScrollAnimationId);
      }
    };
  }, []);

  return <>{children}</>;
}
