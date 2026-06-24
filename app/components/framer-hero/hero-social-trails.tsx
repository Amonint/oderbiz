"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./hero-social-trails.module.css";

type SocialIcon = {
  name: string;
  svg: string;
};

/** Iconos de redes sociales (no logos de clientes). */
const SOCIAL_ICONS: SocialIcon[] = [
  {
    name: "Instagram",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  },
  {
    name: "Facebook",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>`,
  },
  {
    name: "TikTok",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
  },
  {
    name: "LinkedIn",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.17-8.424-6.907-11.018-3.377v-2.194z"/></svg>`,
  },
  {
    name: "YouTube",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>`,
  },
  {
    name: "X",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
];

const SPAWN_THROTTLE_MS = 60;
const MAX_PARTICLES = 35;
const PARTICLE_LIFETIME_MS = 1200;
const MIN_DISTANCE_PX = 20;

export default function HeroSocialTrails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const particleCountRef = useRef(0);
  const iconIndexRef = useRef(0);

  const spawnParticle = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container || particleCountRef.current >= MAX_PARTICLES) return;

    const now = performance.now();
    if (now - lastSpawnRef.current < SPAWN_THROTTLE_MS) return;

    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE_PX) return;

    lastSpawnRef.current = now;
    lastPosRef.current = { x, y };

    const el = document.createElement("div");
    el.className = styles.particle;
    el.setAttribute("role", "presentation");

    const icon = SOCIAL_ICONS[iconIndexRef.current % SOCIAL_ICONS.length];
    iconIndexRef.current = (iconIndexRef.current + 1) % SOCIAL_ICONS.length;

    const rotation = Math.random() * 40 - 20;
    const driftX = (Math.random() - 0.5) * 60;
    const driftY = -(Math.random() * 40 + 20);
    const scale = 0.6 + Math.random() * 0.5;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--drift-x", `${driftX}px`);
    el.style.setProperty("--drift-y", `${driftY}px`);
    el.style.setProperty("--rotation", `${rotation}deg`);
    el.style.setProperty("--start-scale", `${scale}`);

    const iconWrap = document.createElement("span");
    iconWrap.className = styles.icon;
    iconWrap.setAttribute("aria-label", icon.name);
    iconWrap.innerHTML = icon.svg;
    el.appendChild(iconWrap);

    container.appendChild(el);
    particleCountRef.current++;

    setTimeout(() => {
      el.remove();
      particleCountRef.current--;
    }, PARTICLE_LIFETIME_MS);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heroSection = container.parentElement;
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      spawnParticle(e.clientX - rect.left, e.clientY - rect.top);
    };

    heroSection.addEventListener("mousemove", handleMouseMove);
    return () => heroSection.removeEventListener("mousemove", handleMouseMove);
  }, [spawnParticle]);

  return <div ref={containerRef} className={styles.trailContainer} />;
}
