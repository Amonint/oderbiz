"use client";

import type { HeroVideoItem } from "@/app/lib/agency-media";
import { LazyVideoCell } from "@/app/components/shared/lazy-video-cell";
import styles from "./hero-vertical-video-grid.module.css";

function VideoCard({
  item,
  eager,
}: {
  item: HeroVideoItem;
  eager?: boolean;
}) {
  return (
    <div className={styles.cardWrap}>
      <div className={styles.card}>
        <LazyVideoCell
          item={item}
          mediaClassName={styles.video}
          eager={eager}
        />
      </div>
    </div>
  );
}

function VideoColumn({
  videos,
  direction,
  eagerFirst,
}: {
  videos: readonly HeroVideoItem[];
  direction: "up" | "down";
  eagerFirst?: boolean;
}) {
  const loop = [...videos, ...videos];
  const trackClass = direction === "up" ? styles.trackUp : styles.trackDown;

  return (
    <div className={styles.column}>
      <div className={`${styles.track} ${trackClass}`}>
        {loop.map((item, i) => (
          <VideoCard
            key={`${item.src}-${i}`}
            item={item}
            eager={eagerFirst && i === 0}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroVerticalVideoGrid({
  columnA,
  columnB,
  columnC,
}: {
  columnA: readonly HeroVideoItem[];
  columnB: readonly HeroVideoItem[];
  columnC: readonly HeroVideoItem[];
}) {
  return (
    <div className={styles.root} aria-hidden>
      <VideoColumn videos={columnA} direction="up" eagerFirst />
      <VideoColumn videos={columnB} direction="down" />
      <VideoColumn videos={columnC} direction="up" />
    </div>
  );
}
