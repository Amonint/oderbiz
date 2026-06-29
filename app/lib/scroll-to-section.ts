"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

export const NAV_OFFSET_PX = 88;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToSectionNative(sectionId: string) {
  const id = sectionId.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return false;

  const reduceMotion = prefersReducedMotion();
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion ? "auto" : "smooth",
  });

  return true;
}

export function useScrollToSection() {
  const lenis = useLenis();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const id = sectionId.replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return false;

      const reduceMotion = prefersReducedMotion();

      if (lenis && !reduceMotion) {
        lenis.scrollTo(`#${id}`, { offset: -NAV_OFFSET_PX });
      } else if (!scrollToSectionNative(sectionId)) {
        return false;
      }

      window.history.replaceState(null, "", `#${id}`);
      return true;
    },
    [lenis],
  );

  const scrollToSectionFromHash = useCallback(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    requestAnimationFrame(() => {
      scrollToSection(id);
    });
  }, [scrollToSection]);

  return { scrollToSection, scrollToSectionFromHash };
}
