"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import styles from "./transition-section.module.css";
import { STORY_VIDEOS, type StoryVideoItem } from "@/app/lib/agency-media";
import { applySafePinnedLayout } from "@/app/lib/pinned-media-layout";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type VideoBlock = {
  videoSrc: string;
  videoPoster: string;
  alt: string;
  title: string;
  subtitle?: string;
};

type GridItem = {
  block: VideoBlock;
  size: "large" | "medium" | "small";
  colClass?: string;
  align?: "start" | "center" | "end";
  parallax?: number;
  cardClassName?: string;
  className?: string;
};

type MasonryVideoItem = {
  size: "large" | "medium" | "small";
  colClass: string;
  itemClass?: string;
  revealOrder: number;
  videoIndex: number;
};

type MasonryRowConfig = {
  items: MasonryVideoItem[];
  rowClassName: string;
};

type TransitionSectionProps = {
  id?: string;
  rows?: GridItem[][];
  heading?: string;
  subheading?: string;
  variant?: "videos" | "masonry";
};

const INTRO_KEYS = ["intro1", "intro2", "intro3"] as const;

function storyVideo(index: number): StoryVideoItem {
  return STORY_VIDEOS[index] ?? STORY_VIDEOS[0];
}

/** 7 slots periféricos sin columnas compartidas ni márgenes negativos. */
const PINNED_ROWS: MasonryRowConfig[] = [
  {
    rowClassName: styles.masonryRowTop,
    items: [
      {
        size: "large",
        colClass: "col-span-2 xl:col-span-3",
        revealOrder: 1,
        videoIndex: 0,
      },
      {
        size: "medium",
        colClass: "col-span-2 xl:col-start-9 xl:col-end-11",
        revealOrder: 2,
        videoIndex: 1,
      },
      {
        size: "medium",
        colClass: "col-span-2 xl:col-start-11 xl:col-end-13",
        revealOrder: 3,
        videoIndex: 2,
      },
    ],
  },
  {
    rowClassName: styles.masonryRowBottom,
    items: [
      {
        size: "large",
        colClass: "col-span-2 xl:col-span-3",
        revealOrder: 4,
        videoIndex: 3,
      },
      {
        size: "medium",
        colClass: "col-span-1 xl:col-start-4 xl:col-end-6 flex xl:items-end",
        revealOrder: 5,
        videoIndex: 4,
      },
      {
        size: "large",
        colClass: "col-span-2 xl:col-start-9 xl:col-end-12 flex xl:items-end",
        revealOrder: 6,
        videoIndex: 5,
      },
      {
        size: "medium",
        colClass: "col-span-1 xl:col-start-12 xl:col-end-13 flex xl:items-end",
        revealOrder: 7,
        videoIndex: 6,
      },
    ],
  },
];

function Card({
  block,
  size,
  parallax,
  cardClassName,
}: {
  block: VideoBlock;
  size: string;
  parallax?: number;
  cardClassName?: string;
}) {
  return (
    <div className={[styles.cardFrame, cardClassName].filter(Boolean).join(" ")} data-size={size}>
      <div data-parallax data-speed={parallax ?? ""} className={styles.parallaxLayer}>
        <video
          src={block.videoSrc}
          poster={block.videoPoster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className={styles.media}
          aria-label={block.alt}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h3 className={styles.title}>{block.title}</h3>
          {block.subtitle && <p className={styles.subtitle}>{block.subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function MasonryVideoCell({
  item,
  video,
}: {
  item: MasonryVideoItem;
  video: StoryVideoItem;
}) {
  return (
    <div
      data-masonry-reveal
      data-reveal-order={item.revealOrder}
      data-size={item.size}
      data-layout-visible="true"
      className={[styles.masonryCell, item.colClass].filter(Boolean).join(" ")}
    >
      <div
        className={[styles.worksGridItem, item.itemClass || ""].filter(Boolean).join(" ")}
        data-masonry-tile
        data-size={item.size}
        data-orientation={video.orientation}
      >
        <div className={styles.worksGridImage}>
          <div className={styles.videoInner}>
            <figure className={styles.videoFigure}>
              <video
                src={video.src}
                poster={video.poster}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className={styles.pinnedMedia}
                aria-label={video.alt}
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

function gridCols(size: string, colClass?: string): string {
  if (colClass) return colClass;
  switch (size) {
    case "large":
      return "col-span-3 xl:col-span-3";
    case "medium":
      return "col-span-2 xl:col-span-2";
    case "small":
      return "col-span-1 xl:col-span-1";
    default:
      return "col-span-2";
  }
}

function alignClass(align?: string): string {
  if (align === "end") return "flex items-end";
  if (align === "center") return "flex items-center";
  return "";
}

function layoutPinnedMedia(section: HTMLElement) {
  const pinViewport = section.querySelector<HTMLElement>("[data-pin-viewport]");
  const textStage = section.querySelector<HTMLElement>("[data-text-stage]");
  if (!pinViewport || !textStage) return;
  applySafePinnedLayout(pinViewport, textStage);
}

function setupPinnedScroll(section: HTMLElement) {
  const pinTrigger = section.querySelector<HTMLElement>("[data-pin-trigger]");
  const pinViewport = section.querySelector<HTMLElement>("[data-pin-viewport]");
  if (!pinTrigger || !pinViewport) return;

  layoutPinnedMedia(section);

  const cells = gsap.utils
    .toArray<HTMLElement>("[data-masonry-reveal]")
    .filter((cell) => cell.dataset.layoutVisible !== "false");
  cells.sort(
    (a, b) =>
      Number(a.getAttribute("data-reveal-order")) - Number(b.getAttribute("data-reveal-order")),
  );

  const slides = gsap.utils.toArray<HTMLElement>("[data-text-slide]");
  const introSlide = slides[0];
  const lineSlides = slides.slice(1);

  const scrollDistance = () => window.innerHeight * 2.8;

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: pinTrigger,
      pin: pinViewport,
      start: "top top",
      end: () => `+=${scrollDistance()}`,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  if (introSlide) {
    master.to(introSlide, { autoAlpha: 0, y: -20, duration: 0.12, ease: "none" }, 0.06);
  }

  lineSlides.forEach((slide, index) => {
    const enterAt = 0.12 + index * 0.24;
    const exitAt = enterAt + 0.18;

    master.fromTo(
      slide,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.14, ease: "none" },
      enterAt,
    );

    if (index < lineSlides.length - 1) {
      master.to(slide, { autoAlpha: 0, y: -18, duration: 0.1, ease: "none" }, exitAt);
    }
  });

  const cellStart = 0.04;
  const cellSpan = 0.72;
  const cellStep = cells.length > 1 ? cellSpan / (cells.length - 1) : cellSpan;

  cells.forEach((cell, index) => {
    const order = Number(cell.getAttribute("data-reveal-order")) || index + 1;
    const fromTop = order <= 4;
    const fromX = index % 2 === 0 ? -24 : 24;
    const fromY = fromTop ? 12 : -12;
    const at = cellStart + index * cellStep;

    gsap.set(cell, { x: fromX, y: fromY, force3D: true });

    master.fromTo(
      cell,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.1, ease: "none" },
      at,
    );

    master.fromTo(
      cell,
      { x: fromX, y: fromY },
      { x: 0, y: 0, duration: 0.1, ease: "none" },
      at,
    );
  });
}

export function TransitionSection({
  id,
  rows = [],
  heading,
  subheading,
  variant = "videos",
}: TransitionSectionProps) {
  const t = useTranslations("ourStory");
  const sectionRef = useRef<HTMLElement>(null);

  const displayHeading = heading ?? t("heading");
  const displaySubheading = subheading ?? t("subheading");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (variant === "masonry") {
        layoutPinnedMedia(section);
      }

      if (reducedMotion) {
        gsap.set(section.querySelectorAll("[data-masonry-reveal][data-layout-visible='true']"), {
          autoAlpha: 1,
          x: 0,
          y: 0,
        });
        gsap.set(section.querySelectorAll("[data-text-slide]"), {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
        });
        return;
      }

      if (variant === "masonry") {
        setupPinnedScroll(section);
      }

      const videoItems = section.querySelectorAll<HTMLElement>("[data-parallax]");
      videoItems.forEach((el) => {
        const trigger = el.parentElement;
        if (!trigger) return;

        const size = trigger.getAttribute("data-size") || "medium";
        const raw = el.getAttribute("data-speed") || "";
        const custom = parseFloat(raw);
        const speedMap: Record<string, number> = { large: 0, medium: 0.35, small: 0.7 };
        const speed = !Number.isNaN(custom) ? custom : (speedMap[size] ?? 0.35);
        const offset = 250 * speed;

        if (speed === 0) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          el,
          { y: -offset, opacity: 0 },
          {
            y: offset,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const onRefreshInit = () => {
        if (variant === "masonry") {
          layoutPinnedMedia(section);
        }
      };

      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      let resizeTimer: ReturnType<typeof setTimeout>;
      const scheduleRefresh = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
      };

      window.addEventListener("resize", scheduleRefresh);

      const pinViewport = section.querySelector<HTMLElement>("[data-pin-viewport]");
      const textStage = section.querySelector<HTMLElement>("[data-text-stage]");
      const resizeObserver =
        variant === "masonry" && pinViewport && textStage
          ? new ResizeObserver(scheduleRefresh)
          : null;
      resizeObserver?.observe(pinViewport!);
      resizeObserver?.observe(textStage!);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
        window.removeEventListener("resize", scheduleRefresh);
        resizeObserver?.disconnect();
        clearTimeout(resizeTimer);
      };
    },
    { scope: sectionRef, dependencies: [rows, variant, displayHeading, displaySubheading] },
  );

  const isMasonry = variant === "masonry";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.root} ${isMasonry ? styles.masonrySection : ""} flex flex-col overflow-hidden`}
    >
      {isMasonry ? (
        <div className={styles.pinOuter} data-pin-trigger>
          <div className={styles.pinnedViewport} data-pin-viewport>
            <div className={styles.textStage} data-text-stage aria-live="polite">
              <div
                className={`${styles.textSlide} ${styles.textSlideInitial}`}
                data-text-slide
              >
                {displayHeading && <h2 className={styles.sectionHeading}>{displayHeading}</h2>}
                {displaySubheading && (
                  <p className={styles.sectionSubheading}>{displaySubheading}</p>
                )}
              </div>
              {INTRO_KEYS.map((key, index) => (
                <p
                  key={key}
                  data-text-slide
                  className={[
                    styles.textSlide,
                    styles.introLine,
                    index >= 1 ? styles.introLineDark : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {t(key)}
                </p>
              ))}
            </div>

            <div className={styles.masonryCanvas}>
              {PINNED_ROWS.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={[
                    styles.masonryRowLayer,
                    "grid grid-cols-6 xl:grid-cols-12 gap-x-gutter",
                    row.rowClassName,
                  ].join(" ")}
                >
                  {row.items.map((item) => (
                    <MasonryVideoCell
                      key={item.revealOrder}
                      item={item}
                      video={storyVideo(item.videoIndex)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-[60px] xl:gap-y-[100px]">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className="grid grid-cols-6 xl:grid-cols-12 gap-3 xl:gap-4 px-4 xl:px-12"
            >
              {row.map((item, ci) => (
                <div
                  key={ci}
                  className={[
                    gridCols(item.size, item.colClass),
                    alignClass(item.align),
                    item.className || "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Card
                    block={item.block}
                    size={item.size}
                    parallax={item.parallax}
                    cardClassName={item.cardClassName}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
