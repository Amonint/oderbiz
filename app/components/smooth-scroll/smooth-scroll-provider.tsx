"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

import { NAV_OFFSET_PX } from "@/app/lib/scroll-to-section";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotion() {
  return false;
}

function hasHorizontalScroll(node: HTMLElement) {
  const { overflowX } = window.getComputedStyle(node);
  if (overflowX !== "auto" && overflowX !== "scroll") return false;
  return node.scrollWidth > node.clientWidth;
}

const lenisOptions: LenisOptions = {
  autoRaf: true,
  lerp: 0.1,
  smoothWheel: true,
  anchors: { offset: -NAV_OFFSET_PX },
  prevent: (node) => node instanceof HTMLElement && hasHorizontalScroll(node),
};

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
