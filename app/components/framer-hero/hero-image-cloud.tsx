"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import type { HeroPhotoItem } from "@/app/lib/agency-media";
import styles from "./hero-image-cloud.module.css";

type CloudSlot = {
  top: string;
  left: string;
  width: string;
  height: string;
  rotate: number;
};

const CLOUD_SLOTS: CloudSlot[] = [
  { top: "1%", left: "13%", width: "73%", height: "28%", rotate: -2.4 },
  { top: "23%", left: "-1%", width: "48%", height: "30%", rotate: 2.1 },
  { top: "28%", left: "51%", width: "44%", height: "26%", rotate: -2.6 },
  { top: "49%", left: "28%", width: "73%", height: "31%", rotate: 1.9 },
  { top: "73%", left: "1%", width: "46%", height: "24%", rotate: -2.1 },
];

function parsePercent(value: string): number {
  return Number.parseFloat(value.replace("%", "")) || 0;
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function buildRandomSlots(count: number): CloudSlot[] {
  return CLOUD_SLOTS.slice(0, count).map((base) => {
    const width = parsePercent(base.width);
    const height = parsePercent(base.height);
    const maxLeft = Math.max(0, 100 - width);
    const maxTop = Math.max(0, 100 - height);
    const left = randomInRange(0, maxLeft);
    const top = randomInRange(0, maxTop);
    const rotate = base.rotate + randomInRange(-2.6, 2.6);

    return {
      ...base,
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      rotate: Number(rotate.toFixed(2)),
    };
  });
}

function FloatingImage({
  photo,
  slot,
  index,
  smoothX,
  smoothY,
}: {
  photo: HeroPhotoItem;
  slot: CloudSlot;
  index: number;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
}) {
  const depth = 1 + (index % 3) * 0.4;
  const x = useTransform(smoothX, [-0.5, 0.5], [-18 * depth, 18 * depth]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-14 * depth, 14 * depth]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: 1,
        top: slot.top,
        left: slot.left,
        rotate: slot.rotate,
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
        top: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
        left: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        x,
        y,
        position: "absolute",
        width: slot.width,
        height: slot.height,
      }}
      className={styles.imageWrapper}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="85vw"
        className={styles.image}
        priority={index === 0}
      />
    </motion.div>
  );
}

export default function HeroImageCloud({ photos }: { photos: readonly HeroPhotoItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const items = photos.slice(0, CLOUD_SLOTS.length);
  const [slots, setSlots] = useState<CloudSlot[]>(() => buildRandomSlots(items.length));

  const smoothX = useSpring(pointerX, { damping: 40, stiffness: 120 });
  const smoothY = useSpring(pointerY, { damping: 40, stiffness: 120 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      pointerX.set((clientX - rect.left) / rect.width - 0.5);
      pointerY.set((clientY - rect.top) / rect.height - 0.5);
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    };

    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);

    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("mousemove", onMouse);

    return () => {
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("mousemove", onMouse);
    };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setSlots(buildRandomSlots(items.length));
    });

    const id = window.setInterval(() => {
      setSlots(buildRandomSlots(items.length));
    }, 3200);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearInterval(id);
    };
  }, [items.length]);

  return (
    <div ref={containerRef} className={styles.cloud}>
      {items.map((photo, i) => (
        <FloatingImage
          key={photo.src}
          photo={photo}
          slot={slots[i] ?? CLOUD_SLOTS[i]}
          index={i}
          smoothX={smoothX}
          smoothY={smoothY}
        />
      ))}
    </div>
  );
}
