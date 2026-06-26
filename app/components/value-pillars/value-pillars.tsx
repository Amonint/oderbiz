"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { PILLAR_IMAGES } from "@/app/lib/agency-media";
import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";

import headerStyles from "./value-pillars.module.css";
import styles from "./value-pillars-advantage.module.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const REVEAL_TRANSITION = { duration: 1, ease: EASE_OUT };
const ITEM_STAGGER = 0.12;

const PILLAR_KEYS = [
  { titleKey: "pillar1Title", textKey: "pillar1Text", imageKey: "pillar1" as const, imageAltKey: "pillar1ImageAlt" },
  { titleKey: "pillar2Title", textKey: "pillar2Text", imageKey: "pillar2" as const, imageAltKey: "pillar2ImageAlt" },
  { titleKey: "pillar3Title", textKey: "pillar3Text", imageKey: "pillar3" as const, imageAltKey: "pillar3ImageAlt" },
] as const;

const ROTATIONS = [-0.8, 1.2, 0.5] as const;

export function ValuePillars() {
  const t = useTranslations("valuePillars");
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5% 0px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const items = useMemo(
    () =>
      PILLAR_KEYS.map((pillar) => ({
        titleKey: pillar.titleKey,
        title: t(pillar.titleKey),
        text: t(pillar.textKey),
        imageSrc: PILLAR_IMAGES[pillar.imageKey],
        imageAlt: t(pillar.imageAltKey),
      })),
    [t],
  );

  return (
    <section
      id="servicios-incluyen"
      className={styles.root}
      aria-labelledby="pillars-heading"
    >
      <header
        ref={headerRef}
        className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow} ${styles.sectionHeader}`}
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
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={
            reduceMotion || headerInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{ ...REVEAL_TRANSITION, delay: reduceMotion ? 0 : 0.12 }}
        >
          {t("headerDescription")}
        </motion.p>
      </header>

      <div ref={contentRef} className={styles.grid}>
        {items.map((item, index) => (
          <motion.div
            key={item.titleKey}
            className={styles.card}
            style={reduceMotion ? undefined : { rotate: ROTATIONS[index] }}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={
              reduceMotion || contentInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{
              ...REVEAL_TRANSITION,
              delay: reduceMotion ? 0 : 0.15 + index * ITEM_STAGGER,
            }}
          >
            <div className={styles.photoFrame}>
              <div className={styles.photoInner}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.photo}
                />
              </div>
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
