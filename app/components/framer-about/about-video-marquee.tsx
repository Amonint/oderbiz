"use client";

import { useMemo } from "react";

import type { HeroVideoItem } from "@/app/lib/agency-media";
import { LazyVideoCell } from "@/app/components/shared/lazy-video-cell";
import styles from "./about-video-marquee.module.css";

const REPEAT_COUNT = 2;

export function AboutVideoMarquee({ videos }: { videos: readonly HeroVideoItem[] }) {
  const sequence = useMemo(
    () => Array.from({ length: REPEAT_COUNT }, () => videos).flat(),
    [videos],
  );
  const loop = useMemo(() => [...sequence, ...sequence], [sequence]);

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.track}>
        {loop.map((item, i) => (
          <div key={`${item.src}-${i}`} className={styles.cell}>
            <LazyVideoCell
              item={item}
              mediaClassName={styles.video}
              eager={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
