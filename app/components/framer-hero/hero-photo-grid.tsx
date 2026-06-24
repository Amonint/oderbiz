import Image from "next/image";
import type { HeroPhotoItem } from "@/app/lib/agency-media";
import { HERO_PHOTOS } from "@/app/lib/agency-media";
import styles from "./hero-photo-grid.module.css";

export type HeroPhoto = HeroPhotoItem;
export { HERO_PHOTOS };

export function HeroPhotoThumb({
  photo,
  sizes,
  priority,
  className,
}: {
  photo: HeroPhoto;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const rootClass = [styles.cell, className].filter(Boolean).join(" ");
  return (
    <div className={rootClass} data-framer-name="Photo">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className={styles.image}
        priority={priority}
      />
    </div>
  );
}
