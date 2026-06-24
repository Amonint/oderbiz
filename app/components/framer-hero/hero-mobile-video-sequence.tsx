"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { HeroVideoItem } from "@/app/lib/agency-media";
import styles from "./hero-mobile-video-sequence.module.css";

export function HeroMobileVideoSequence({
  videos,
}: {
  videos: readonly HeroVideoItem[];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const current = videos[index] ?? videos[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    video.load();
    void video.play().catch(() => {});
  }, [index, reduceMotion, current?.src]);

  const handleEnded = useCallback(() => {
    setIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  if (!current) return null;

  return (
    <div className={styles.root} aria-hidden>
      <video
        key={current.src}
        ref={videoRef}
        src={current.src}
        poster={current.poster}
        muted
        playsInline
        preload="auto"
        className={styles.video}
        onEnded={reduceMotion ? undefined : handleEnded}
      />
      <div className={styles.overlay} />
    </div>
  );
}
