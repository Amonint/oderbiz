"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

import { scrollToSectionFromHash } from "@/app/lib/scroll-to-section";

export function HashScrollOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const timer = window.setTimeout(() => {
      scrollToSectionFromHash();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToSectionFromHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
