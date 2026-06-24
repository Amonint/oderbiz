import Image from "next/image";
import type { HeroPhotoItem } from "@/app/lib/agency-media";
import styles from "./hero-masonry-grid.module.css";

type MasonrySlot = {
  photo: HeroPhotoItem;
  className: string;
  priority?: boolean;
};

const MASONRY_LAYOUT: Omit<MasonrySlot, "photo">[] = [
  { className: styles.tileA },
  { className: styles.tileB },
  { className: styles.tileC },
  { className: styles.tileD },
  { className: styles.tileE },
  { className: styles.tileF },
  { className: styles.tileG },
  { className: styles.tileH },
  { className: styles.tileI },
];

export function HeroMasonryGrid({ photos }: { photos: readonly HeroPhotoItem[] }) {
  const slots: MasonrySlot[] = MASONRY_LAYOUT.map((layout, i) => ({
    ...layout,
    photo: photos[i % photos.length],
    priority: i < 2,
  }));

  return (
    <div className={styles.root} aria-hidden>
      {slots.map((slot, i) => (
        <div key={`${slot.photo.src}-${i}`} className={`${styles.tile} ${slot.className}`}>
          <Image
            src={slot.photo.src}
            alt={slot.photo.alt}
            fill
            sizes="(max-width: 1023px) 45vw, 25vw"
            className={styles.image}
            priority={slot.priority}
          />
        </div>
      ))}
    </div>
  );
}
