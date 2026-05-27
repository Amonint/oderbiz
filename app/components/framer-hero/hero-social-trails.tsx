"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./hero-social-trails.module.css";

const LOGO_IMAGES = [
  "/assets/marcas3/domingo_savio-300x143.png",
  "/assets/marcas3/formacion_permanente-2-300x143.png",
  "/assets/marcas3/logo-blanco-utpl-300x113.png",
  "/assets/marcas3/maxxnet.png",
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

    const src = LOGO_IMAGES[iconIndexRef.current % LOGO_IMAGES.length];
    iconIndexRef.current = (iconIndexRef.current + 1) % LOGO_IMAGES.length;

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

    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.draggable = false;
    el.appendChild(img);

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
