"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import aboutStyles from "./framer-about-exact.module.css";
import gridStyles from "./about-specializations-grid.module.css";

const COLUMNS = 4;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const REVEAL_TRANSITION = { duration: 1, ease: EASE_OUT };

const COLUMN_CLASS = {
  1: gridStyles.cardCol1,
  2: gridStyles.cardCol2,
  3: gridStyles.cardCol3,
  4: gridStyles.cardCol4,
} as const;

const STACK_CLASS = {
  1: gridStyles.cardStack1,
  2: gridStyles.cardStack2,
  3: gridStyles.cardStack3,
  4: gridStyles.cardStack4,
} as const;

const SPECIALIZATION_KEYS = [
  {
    titleKey: "specialization1Title",
    descriptionKey: "specialization1Description",
    desktopColumn: 1,
    mobileAlternate: false,
  },
  {
    titleKey: "specialization2Title",
    descriptionKey: "specialization2Description",
    desktopColumn: 2,
    mobileAlternate: true,
  },
  {
    titleKey: "specialization3Title",
    descriptionKey: "specialization3Description",
    desktopColumn: 3,
    mobileAlternate: false,
  },
  {
    titleKey: "specialization4Title",
    descriptionKey: "specialization4Description",
    desktopColumn: 4,
    mobileAlternate: true,
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
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();

  if (!animate || reduceMotion) {
    return <span className={gridStyles.revealBlock}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={gridStyles.revealBlock}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.span>
  );
}

function SpecializationCard({
  title,
  description,
  isFirst,
  columnClass,
  revealOnEnter,
}: {
  title: string;
  description: string;
  isFirst?: boolean;
  columnClass: string;
  revealOnEnter: boolean;
}) {
  return (
    <div
      className={`${gridStyles.card} ${columnClass} ${isFirst ? gridStyles.cardFirst : ""}`}
    >
      <RevealBlock animate={revealOnEnter}>
        <p className={gridStyles.cardDescription}>{description}</p>
      </RevealBlock>
      <RevealBlock animate={revealOnEnter} delay={0.12}>
        <h3 className={gridStyles.cardTitle}>{title}</h3>
      </RevealBlock>
    </div>
  );
}

function DesktopRowCells({
  activeColumn,
  title,
  description,
  isFirstRow,
}: {
  activeColumn: number;
  title: string;
  description: string;
  isFirstRow: boolean;
}) {
  const columnClass = COLUMN_CLASS[activeColumn as keyof typeof COLUMN_CLASS];

  return (
    <>
      {Array.from({ length: COLUMNS }, (_, columnIndex) => {
        const column = columnIndex + 1;
        if (column === activeColumn) {
          return (
            <SpecializationCard
              key={`card-${column}`}
              title={title}
              description={description}
              isFirst={isFirstRow && column === 1}
              columnClass={columnClass}
              revealOnEnter={false}
            />
          );
        }
        return (
          <div
            key={`spacer-${column}`}
            className={`${gridStyles.spacer} ${isFirstRow ? gridStyles.spacerFirst : ""}`}
          />
        );
      })}
    </>
  );
}

export function AboutSpecializationsSection() {
  const t = useTranslations("aboutSpecializations");
  const headerRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5% 0px" });
  const reduceMotion = useReducedMotion();

  const items = useMemo(
    () =>
      SPECIALIZATION_KEYS.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description: t(item.descriptionKey),
      })),
    [t],
  );

  return (
    <section
      id="especializaciones"
      className={gridStyles.root}
      aria-labelledby="specializations-heading"
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
          <h2 id="specializations-heading" className={aboutStyles.sectionTitle}>
            {t("headerTitle")}
          </h2>
          <p className={aboutStyles.sectionSubtitle}>{t("headerSubtitle")}</p>
        </motion.div>
        <motion.p
          className={aboutStyles.sectionDescription}
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

      <div className={gridStyles.gridShell}>
        <div className={gridStyles.gridFrame}>
          <div className={gridStyles.gridGuides} aria-hidden>
            <div className={gridStyles.guidesMobile}>
              <div className={gridStyles.guideColumn} />
              <div />
            </div>
            <div className={gridStyles.guidesDesktop}>
              {Array.from({ length: COLUMNS - 1 }, (_, index) => (
                <div key={index} className={gridStyles.guideColumn} />
              ))}
              <div />
            </div>
          </div>

          <div className={gridStyles.gridBody}>
            <div className={gridStyles.desktopRows}>
              {items.map((item, rowIndex) => (
                <div key={item.titleKey} className={gridStyles.desktopRow}>
                  <DesktopRowCells
                    activeColumn={item.desktopColumn}
                    title={item.title}
                    description={item.description}
                    isFirstRow={rowIndex === 0}
                  />
                </div>
              ))}
            </div>

            {items.map((item, index) => {
              const stackIndex = (index + 1) as keyof typeof STACK_CLASS;
              return (
                <div key={`mobile-${item.titleKey}`} className={gridStyles.mobileRow}>
                  <div
                    className={
                      item.mobileAlternate
                        ? gridStyles.mobileSlotRight
                        : gridStyles.mobileSlot
                    }
                  >
                    <SpecializationCard
                      title={item.title}
                      description={item.description}
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
