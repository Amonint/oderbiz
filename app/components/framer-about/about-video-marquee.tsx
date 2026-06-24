"use client";

import { useEffect, useMemo, useRef } from "react";

import type { HeroVideoItem } from "@/app/lib/agency-media";
import styles from "./about-video-marquee.module.css";

const REPEAT_COUNT = 3;

function MarqueeCell({
  item,
  eager,
}: {
  item: HeroVideoItem;
  eager?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.cell}>
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        className={styles.video}
        aria-label={item.alt}
      />
    </div>
  );
}

export function AboutVideoMarquee({ videos }: { videos: readonly HeroVideoItem[] }) {
  const selected = useMemo(() => videos, [videos]);
  const sequence = useMemo(
    () => Array.from({ length: REPEAT_COUNT }, () => selected).flat(),
    [selected],
  );
  const loop = useMemo(() => [...sequence, ...sequence], [sequence]);

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.track}>
        {loop.map((item, i) => (
          <MarqueeCell
            key={`${item.src}-${i}`}
            item={item}
            eager={i < 3}
          />
        ))}
      </div>
    </div>
  );
}
