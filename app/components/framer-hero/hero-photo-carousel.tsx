"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { HeroPhotoItem } from "@/app/lib/agency-media";
import styles from "./hero-photo-carousel.module.css";

export function HeroPhotoCarousel({ photos }: { photos: readonly HeroPhotoItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const slide = track.children[index] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({ left: slide.offsetLeft - (track.offsetWidth - slide.offsetWidth) / 2, behavior: "smooth" });
    },
    [],
  );

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % photos.length;
        scrollTo(next);
        return next;
      });
    }, 4000);
  }, [photos.length, scrollTo]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const center = track.scrollLeft + track.offsetWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const child = track.children[i] as HTMLElement;
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(center - childCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
        setActive(closest);
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const handleDotClick = (index: number) => {
    scrollTo(index);
    setActive(index);
    resetAutoplay();
  };

  const handleTouchStart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTouchEnd = () => {
    resetAutoplay();
  };

  return (
    <div>
      <div
        ref={trackRef}
        className={styles.track}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, i) => (
          <div key={photo.src} className={styles.slide}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="85vw"
              className={styles.image}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {photos.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot}${i === active ? ` ${styles.dotActive}` : ""}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Ir a foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
