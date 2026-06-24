"use client";

import Image from "next/image";
import type { HeroPhotoItem } from "@/app/lib/agency-media";
import styles from "./hero-vertical-carousel.module.css";

function CarouselColumn({
  photos,
  direction,
  priorityFirst,
}: {
  photos: readonly HeroPhotoItem[];
  direction: "up" | "down";
  priorityFirst?: boolean;
}) {
  const loop = [...photos, ...photos];
  const trackClass = direction === "up" ? styles.trackUp : styles.trackDown;

  return (
    <div className={styles.column}>
      <div className={`${styles.track} ${trackClass}`}>
        {loop.map((photo, i) => (
          <div key={`${photo.src}-${i}`} className={styles.cardWrap}>
            <div className={styles.card}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1023px) 156px, 25vw"
                className={styles.image}
                priority={priorityFirst && i === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroVerticalCarousel({
  columnA,
  columnB,
}: {
  columnA: readonly HeroPhotoItem[];
  columnB: readonly HeroPhotoItem[];
}) {
  return (
    <div className={styles.root} aria-label="Galería de proyectos Oderbiz">
      <CarouselColumn photos={columnA} direction="up" priorityFirst />
      <CarouselColumn photos={columnB} direction="down" />
    </div>
  );
}
