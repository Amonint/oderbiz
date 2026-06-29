"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

import { useScrollToSection } from "@/app/lib/scroll-to-section";

export function HashScrollOnLoad() {
  const pathname = usePathname();
  const { scrollToSectionFromHash } = useScrollToSection();

  useEffect(() => {
    if (pathname !== "/") return;

    const timer = window.setTimeout(() => {
      scrollToSectionFromHash();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname, scrollToSectionFromHash]);

  useEffect(() => {
    const onHashChange = () => scrollToSectionFromHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [scrollToSectionFromHash]);

  return null;
}
