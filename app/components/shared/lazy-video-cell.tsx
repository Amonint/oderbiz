"use client";

import { useEffect, useRef, useState } from "react";

import type { HeroVideoItem } from "@/app/lib/agency-media";

type LazyVideoCellProps = {
  item: HeroVideoItem;
  mediaClassName?: string;
  loop?: boolean;
  eager?: boolean;
  onEnded?: () => void;
  rootMargin?: string;
};

export function LazyVideoCell({
  item,
  mediaClassName,
  loop = true,
  eager = false,
  onEnded,
  rootMargin = "100px",
}: LazyVideoCellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    if (eager) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.15, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    void video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [active, item.src]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {active ? (
        <video
          key={item.src}
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop={loop}
          playsInline
          preload="none"
          className={mediaClassName}
          aria-label={item.alt}
          onEnded={onEnded}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.poster}
          alt=""
          className={mediaClassName}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
