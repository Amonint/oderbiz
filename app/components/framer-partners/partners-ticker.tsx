"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./framer-partners-exact.module.css";
import type { PartnerLogo } from "./partners-data";

const DURATION_SEC = 35;
/** Desfase horizontal del segundo ticker en el HTML exportado de Framer (px). */
const FRAMER_TICK2_OFFSET_PX = 6336;

function useFirstUlLoopPx(items: readonly PartnerLogo[]) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [loopPx, setLoopPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const firstUl = row.querySelector("ul");
    if (!firstUl) return;

    const measure = () => {
      const rowStyles = getComputedStyle(row);
      const gap = parseFloat(rowStyles.columnGap || rowStyles.gap || "0") || 48;
      setLoopPx(firstUl.scrollWidth + gap);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(firstUl);
    ro.observe(row);
    return () => ro.disconnect();
  }, [items]);

  return { rowRef, loopPx };
}

export function PartnersFramerTicker({
  variant,
  items,
  ariaLabel,
}: {
  variant: 1 | 2;
  items: readonly PartnerLogo[];
  ariaLabel: string;
}) {
  const { rowRef, loopPx } = useFirstUlLoopPx(items);
  const ready = loopPx != null && loopPx > 0;

  const delaySec =
    variant === 2 && ready
      ? -((FRAMER_TICK2_OFFSET_PX % loopPx) / loopPx) * DURATION_SEC
      : 0;

  const rowStyle = {
    "--partners-loop": loopPx ? `${loopPx}px` : "0px",
    animationDuration: `${DURATION_SEC}s`,
    animationDelay: `${delaySec}s`,
    animationDirection: variant === 2 ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <section
      className={`framer-p9tick ${styles.ticker}`}
      data-framer-name={variant === 1 ? "tick 1" : "tick 2"}
      aria-label={ariaLabel}
    >
      <div className={`framer-p9mask ${styles.mask}`}>
        <div
          ref={rowRef}
          className={`${styles.marqueeRow} ${ready ? styles.marqueeRowActive : ""}`}
          data-ready={ready ? "true" : undefined}
          style={rowStyle}
        >
          {[0, 1, 2].map((copy) => (
            <ul
              key={copy}
              className={`${styles.list} ${copy > 0 ? styles.listDup : ""}`}
              role={copy === 0 ? "list" : "presentation"}
              aria-hidden={copy > 0 ? true : undefined}
            >
              {items.map((item) => (
                <li key={`${item.id}-${copy}`} className={styles.item}>
                  <div className={styles.logoFrame} data-framer-name="Logo">
                    <Image
                      className={styles.logo}
                      src={item.src}
                      alt={copy === 0 ? item.alt : ""}
                      width={180}
                      height={143}
                      sizes="180px"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
