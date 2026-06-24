"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { PILLAR_IMAGES } from "@/app/lib/agency-media";
import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";

import headerStyles from "./value-pillars.module.css";
import stackStyles from "./value-pillars-stack.module.css";

const COLUMNS = 2;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const REVEAL_TRANSITION = { duration: 1, ease: EASE_OUT };

const COLUMN_CLASS = {
  1: stackStyles.cardCol1,
  2: stackStyles.cardCol2,
} as const;

const STACK_CLASS = {
  1: stackStyles.cardStack1,
  2: stackStyles.cardStack2,
  3: stackStyles.cardStack3,
} as const;

const PILLAR_KEYS = [
  {
    titleKey: "pillar1Title",
    textKey: "pillar1Text",
    imageAltKey: "pillar1ImageAlt",
    image: PILLAR_IMAGES.pillar1,
    accentClass: stackStyles.accentRose,
    desktopColumn: 1,
    mobileAlternate: false,
  },
  {
    titleKey: "pillar2Title",
    textKey: "pillar2Text",
    imageAltKey: "pillar2ImageAlt",
    image: PILLAR_IMAGES.pillar2,
    accentClass: stackStyles.accentPurple,
    desktopColumn: 2,
    mobileAlternate: true,
  },
  {
    titleKey: "pillar3Title",
    textKey: "pillar3Text",
    imageAltKey: "pillar3ImageAlt",
    image: PILLAR_IMAGES.pillar3,
    accentClass: stackStyles.accentOrange,
    desktopColumn: 1,
    mobileAlternate: false,
  },
] as const;

function RevealBlock({
  children,
  delay = 0,
  animate = true,
}: {
  children: React.ReactNode;
  delay?: number;
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();

  if (!animate || reduceMotion) {
    return <div className={stackStyles.revealBlock}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={stackStyles.revealBlock}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}

function PillarCard({
  title,
  text,
  imageSrc,
  imageAlt,
  accentClass,
  isFirst,
  columnClass,
  revealOnEnter,
}: {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  accentClass: string;
  isFirst?: boolean;
  columnClass: string;
  revealOnEnter: boolean;
}) {
  return (
    <article
      className={`${stackStyles.card} ${accentClass} ${columnClass} ${isFirst ? stackStyles.cardFirst : ""}`}
    >
      <div className={stackStyles.imageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className={stackStyles.image}
        />
      </div>
      <RevealBlock animate={revealOnEnter}>
        <div className={stackStyles.cardBody}>
          <h3 className={stackStyles.cardTitle}>{title}</h3>
          <p className={stackStyles.cardText}>{text}</p>
        </div>
      </RevealBlock>
    </article>
  );
}

function DesktopRowCells({
  activeColumn,
  title,
  text,
  imageSrc,
  imageAlt,
  accentClass,
  isFirstRow,
}: {
  activeColumn: number;
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  accentClass: string;
  isFirstRow: boolean;
}) {
  const columnClass = COLUMN_CLASS[activeColumn as keyof typeof COLUMN_CLASS];

  return (
    <>
      {Array.from({ length: COLUMNS }, (_, columnIndex) => {
        const column = columnIndex + 1;
        if (column === activeColumn) {
          return (
            <PillarCard
              key={`card-${column}`}
              title={title}
              text={text}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              accentClass={accentClass}
              isFirst={isFirstRow && column === 1}
              columnClass={columnClass}
              revealOnEnter={false}
            />
          );
        }
        return (
          <div
            key={`spacer-${column}`}
            className={`${stackStyles.spacer} ${isFirstRow ? stackStyles.spacerFirst : ""}`}
          />
        );
      })}
    </>
  );
}

export function ValuePillars() {
  const t = useTranslations("valuePillars");
  const headerRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5% 0px" });
  const reduceMotion = useReducedMotion();

  const items = useMemo(
    () =>
      PILLAR_KEYS.map((pillar) => ({
        ...pillar,
        title: t(pillar.titleKey),
        text: t(pillar.textKey),
        imageAlt: t(pillar.imageAltKey),
      })),
    [t],
  );

  return (
    <section
      id="servicios-incluyen"
      className={stackStyles.root}
      aria-labelledby="pillars-heading"
    >
      <header
        ref={headerRef}
        className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow}`}
      >
        <motion.div
          className={aboutStyles.headerTitles}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={
            reduceMotion || headerInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={REVEAL_TRANSITION}
        >
          <h2 id="pillars-heading" className={headerStyles.sectionTitleOnDark}>
            {t("headerTitle")}
          </h2>
          <p className={headerStyles.sectionSubtitleOnDark}>{t("headerSubtitle")}</p>
        </motion.div>
        <motion.p
          className={headerStyles.sectionDescriptionOnDark}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={
            reduceMotion || headerInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ ...REVEAL_TRANSITION, delay: reduceMotion ? 0 : 0.15 }}
        >
          {t("headerDescription")}
        </motion.p>
      </header>

      <div className={stackStyles.gridShell}>
        <div className={stackStyles.gridFrame}>
          <div className={stackStyles.gridGuides} aria-hidden>
            <div className={stackStyles.guidesMobile}>
              <div className={stackStyles.guideColumn} />
              <div />
            </div>
            <div className={stackStyles.guidesDesktop}>
              <div className={stackStyles.guideColumn} />
              <div />
            </div>
          </div>

          <div className={stackStyles.gridBody}>
            <div className={stackStyles.desktopRows}>
              {items.map((item, rowIndex) => (
                <div key={item.titleKey} className={stackStyles.desktopRow}>
                  <DesktopRowCells
                    activeColumn={item.desktopColumn}
                    title={item.title}
                    text={item.text}
                    imageSrc={item.image}
                    imageAlt={item.imageAlt}
                    accentClass={item.accentClass}
                    isFirstRow={rowIndex === 0}
                  />
                </div>
              ))}
            </div>

            {items.map((item, index) => {
              const stackIndex = (index + 1) as keyof typeof STACK_CLASS;
              return (
                <div key={`mobile-${item.titleKey}`} className={stackStyles.mobileRow}>
                  <div
                    className={
                      item.mobileAlternate
                        ? stackStyles.mobileSlotRight
                        : stackStyles.mobileSlot
                    }
                  >
                    <PillarCard
                      title={item.title}
                      text={item.text}
                      imageSrc={item.image}
                      imageAlt={item.imageAlt}
                      accentClass={item.accentClass}
                      isFirst={index === 0}
                      columnClass={STACK_CLASS[stackIndex]}
                      revealOnEnter
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
