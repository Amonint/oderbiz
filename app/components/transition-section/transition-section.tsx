"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

import styles from "./transition-section.module.css";
import { publicMediaUrl } from "@/app/lib/agency-media";

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

type MasonryItem = {
  imageSrc: string;
  alt: string;
  size: "large" | "medium" | "small";
  colClass: string;
  alignClass?: string;
  orderClass?: string;
  cellClassName?: string;
  ratio: string;
  revealOrder: number;
};

type MasonryRowConfig = {
  items: MasonryItem[];
  rowClassName?: string;
};

type TransitionSectionProps = {
  id?: string;
  rows?: GridItem[][];
  heading?: string;
  subheading?: string;
  variant?: "videos" | "masonry";
};

const INTRO_KEYS = ["intro1", "intro2", "intro3"] as const;

const IMAGES = {
  coopsem: publicMediaUrl("/assets/servicios/coopsem-web-1024x1536.png"),
  padreJulian: publicMediaUrl("/assets/servicios/JULIAN-web-1024x683.png"),
  nettplus: publicMediaUrl("/assets/servicios/nettplus-web (1).png"),
  odertek: publicMediaUrl("/assets/servicios/odertek-web.png"),
  rectoralBoard: publicMediaUrl("/assets/servicios/RECTORAL-board-web.png"),
  sinCulpa: publicMediaUrl("/assets/servicios/SIN-CULPA-web.png"),
  uniods: publicMediaUrl("/assets/servicios/UNIODS-web-1152x1536.png"),
  formacionPermanente: publicMediaUrl("/assets/servicios/formacionpermanente-servicios.jpeg"),
  nedetel: publicMediaUrl("/assets/servicios/nedetel-servicios.jpeg"),
  ozServicios: publicMediaUrl("/assets/servicios/oz-servicios.jpeg"),
  ozServicios2: publicMediaUrl("/assets/servicios/oz-servicios2.jpeg"),
  nettplusAlt: publicMediaUrl("/assets/servicios/nettplus.jpeg"),
  odertekServicios: publicMediaUrl("/assets/servicios/odertekservicios.jpeg"),
  utplMaestrias: publicMediaUrl("/assets/servicios/utpl-maestrias-portafolio-1024x683.png"),
  dsc09839: publicMediaUrl("/assets/varios/DSC09839-scaled.jpg"),
};

const MASONRY_ROWS: MasonryRowConfig[] = [
  {
    items: [
      {
        imageSrc: IMAGES.coopsem,
        alt: "Coopsem",
        size: "large",
        colClass: "col-span-3",
        orderClass: "-ml-col-2 xl:-ml-col-1",
        ratio: "66.65%",
        revealOrder: 1,
      },
      {
        imageSrc: IMAGES.padreJulian,
        alt: "Padre Julián Lorente",
        size: "small",
        colClass: "col-span-1",
        alignClass: "flex items-end",
        orderClass: "max-xl:-ml-col-1 translate-y-1/2",
        ratio: "100%",
        revealOrder: 2,
      },
      {
        imageSrc: IMAGES.nettplus,
        alt: "Nettplus",
        size: "medium",
        colClass: "col-start-5 col-end-7 xl:col-start-6 xl:col-end-8",
        alignClass: "flex items-center",
        orderClass: "opacity-40",
        ratio: "149.925%",
        revealOrder: 3,
      },
      {
        imageSrc: IMAGES.odertek,
        alt: "Odertek",
        size: "medium",
        colClass: "col-span-2 xl:col-start-9 xl:col-end-11",
        orderClass: "max-xl:mt-150 max-xl:-ml-col-1 xl:-translate-y-1/2",
        ratio: "149.925%",
        revealOrder: 4,
      },
      {
        imageSrc: IMAGES.rectoralBoard,
        alt: "Rectoral Board",
        size: "small",
        colClass: "col-start-6 col-end-7 xl:col-start-12 xl:col-end-13",
        alignClass: "flex items-center max-xl:mt-65",
        orderClass: "opacity-20 -translate-y-1/2",
        ratio: "127.936%",
        revealOrder: 5,
      },
    ],
  },
  {
    items: [
      {
        imageSrc: IMAGES.sinCulpa,
        alt: "Sin Culpa",
        size: "medium",
        colClass: "col-span-2",
        alignClass: "flex items-end xl:items-center",
        orderClass: "translate-y-1/2 xl:-ml-col-1 xl:-translate-y-1/4",
        ratio: "149.925%",
        revealOrder: 6,
      },
      {
        imageSrc: IMAGES.nedetel,
        alt: "Nedetel",
        size: "small",
        colClass: "col-span-1 xl:col-start-3 xl:col-end-4",
        alignClass: "flex xl:items-end",
        orderClass: "opacity-20 -translate-y-1/2 xl:translate-y-1/2",
        ratio: "53%",
        revealOrder: 7,
      },
      {
        imageSrc: IMAGES.formacionPermanente,
        alt: "Formación Permanente",
        size: "medium",
        colClass: "col-span-3 xl:col-start-5 xl:col-end-7",
        alignClass: "flex items-center max-xl:translate-x-col-1",
        ratio: "149.925%",
        revealOrder: 8,
      },
      {
        imageSrc: IMAGES.ozServicios,
        alt: "Oz",
        size: "small",
        colClass: "col-start-6 col-end-7 xl:col-start-8 xl:col-end-9 max-xl:hidden",
        orderClass: "opacity-20 max-xl:mt-180 xl:-translate-y-1/2",
        ratio: "100%",
        revealOrder: 9,
      },
      {
        imageSrc: IMAGES.uniods,
        alt: "UniODS",
        size: "large",
        colClass: "col-start-4 col-end-5 xl:col-start-10 xl:col-end-13 max-xl:hidden",
        alignClass: "flex xl:items-center pb-64",
        cellClassName: "masonryCellLarge",
        ratio: "149.882%",
        revealOrder: 10,
      },
    ],
  },
  {
    items: [
      {
        imageSrc: IMAGES.ozServicios2,
        alt: "Oz servicios",
        size: "large",
        colClass: "col-span-3 max-xl:order-last max-xl:translate-x-col-2",
        orderClass: "xl:-ml-col-1",
        ratio: "149.925%",
        revealOrder: 11,
      },
      {
        imageSrc: IMAGES.utplMaestrias,
        alt: "UTPL Maestrías",
        size: "small",
        colClass: "col-span-1",
        alignClass: "flex xl:items-end",
        orderClass: "opacity-20 -translate-y-1/2 xl:translate-y-1/2",
        ratio: "56.25%",
        revealOrder: 12,
      },
      {
        imageSrc: IMAGES.nettplusAlt,
        alt: "Nettplus",
        size: "medium",
        colClass: "col-start-2 col-end-4 xl:col-start-9 xl:col-end-11",
        alignClass: "flex items-end xl:items-center max-xl:translate-y-1/2",
        ratio: "126.782%",
        revealOrder: 13,
      },
      {
        imageSrc: IMAGES.odertekServicios,
        alt: "Odertek servicios",
        size: "small",
        colClass: "col-start-12 col-end-13 max-xl:hidden",
        orderClass: "opacity-20",
        ratio: "56.25%",
        revealOrder: 14,
      },
    ],
  },
  {
    rowClassName: styles.masonryRowDesktopOnly,
    items: [
      {
        imageSrc: IMAGES.dsc09839,
        alt: "Proyecto Oderbiz",
        size: "medium",
        colClass: "col-span-2",
        alignClass: "flex items-end",
        orderClass: "-ml-col-1",
        ratio: "149.925%",
        revealOrder: 15,
      },
      {
        imageSrc: IMAGES.padreJulian,
        alt: "Padre Julián Lorente",
        size: "small",
        colClass: "col-start-3 col-end-4",
        alignClass: "flex items-end",
        orderClass: "translate-y-1/2 opacity-20",
        ratio: "149.971%",
        revealOrder: 16,
      },
      {
        imageSrc: IMAGES.odertek,
        alt: "Odertek",
        size: "medium",
        colClass: "col-start-5 col-end-7",
        alignClass: "flex items-center",
        ratio: "56.25%",
        revealOrder: 17,
      },
      {
        imageSrc: IMAGES.nedetel,
        alt: "Nedetel",
        size: "small",
        colClass: "col-start-8 col-end-9",
        ratio: "149.925%",
        revealOrder: 18,
      },
      {
        imageSrc: IMAGES.coopsem,
        alt: "Coopsem",
        size: "large",
        colClass: "col-start-10 col-end-13",
        alignClass: "flex items-center pb-64",
        cellClassName: "masonryCellLarge",
        ratio: "149.882%",
        revealOrder: 19,
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

function MasonryCard({ item }: { item: MasonryItem }) {
  return (
    <div
      className={[styles.worksGridItem, item.orderClass || ""].filter(Boolean).join(" ")}
      data-size={item.size}
    >
      <div className={styles.worksGridImage} data-parallax-layer>
        <div
          className={[styles.imageInner, "image"].join(" ")}
          style={{ "--ratio": item.ratio } as React.CSSProperties}
          data-parallax-inner
        >
          <figure className={styles.figure}>
            <Image
              className="w-full h-full object-cover"
              src={item.imageSrc}
              alt={item.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 30vw"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

function MasonryCell({ item }: { item: MasonryItem }) {
  return (
    <div
      data-masonry-reveal
      data-reveal-order={item.revealOrder}
      className={[
        styles.masonryCell,
        item.cellClassName || "",
        item.colClass,
        item.alignClass || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MasonryCard item={item} />
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

function setupPinnedScroll(section: HTMLElement) {
  const pinTrigger = section.querySelector<HTMLElement>("[data-pin-trigger]");
  const pinViewport = section.querySelector<HTMLElement>("[data-pin-viewport]");
  if (!pinTrigger || !pinViewport) return;

  const cells = gsap.utils.toArray<HTMLElement>("[data-masonry-reveal]");
  cells.sort(
    (a, b) =>
      Number(a.getAttribute("data-reveal-order")) - Number(b.getAttribute("data-reveal-order")),
  );

  const slides = gsap.utils.toArray<HTMLElement>("[data-text-slide]");
  const introSlide = slides[0];
  const lineSlides = slides.slice(1);

  const scrollDistance = () => window.innerHeight * 3.2;

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

  const cellStart = 0.02;
  const cellSpan = 0.72;

  cells.forEach((cell, index) => {
    const fromX = index % 2 === 0 ? -40 : 40;
    const at = cellStart + (index / Math.max(cells.length - 1, 1)) * cellSpan;

    master.fromTo(
      cell,
      { autoAlpha: 0, x: fromX, y: 24, scale: 0.94 },
      { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.08, ease: "none" },
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

      if (reducedMotion) {
        gsap.set(
          section.querySelectorAll(
            "[data-parallax], [data-parallax-layer], [data-parallax-inner], [data-masonry-reveal], [data-text-slide]",
          ),
          { autoAlpha: 1, y: 0, x: 0, scale: 1 },
        );
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

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
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
      className={`${styles.root} ${styles.masonrySection} flex flex-col overflow-hidden`}
    >
      {isMasonry ? (
        <div className={styles.pinOuter} data-pin-trigger>
          <div className={styles.pinnedViewport} data-pin-viewport>
            <div className={styles.textStage} aria-live="polite">
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
              {MASONRY_ROWS.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={[
                    styles.masonryRowLayer,
                    "grid grid-cols-6 xl:grid-cols-12 gap-x-gutter",
                    row.rowClassName || "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {row.items.map((item) => (
                    <MasonryCell key={item.revealOrder} item={item} />
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
