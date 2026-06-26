"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FORTALEZAS_IMAGES } from "@/app/lib/agency-media";
import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";

import { STRENGTH_ITEMS } from "./fortalezas-data";
import { FortalezasClosing } from "./fortalezas-closing";
import styles from "./fortalezas-section.module.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const REVEAL_TRANSITION = { duration: 0.8, ease: EASE_OUT };

export function FortalezasSection() {
  const t = useTranslations("fortalezas");
  const headerRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5% 0px" });
  const reduceMotion = useReducedMotion();

  const strengths = useMemo(
    () =>
      STRENGTH_ITEMS.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description:
          "descriptionKey" in item ? t(item.descriptionKey) : null,
        imageSrc: FORTALEZAS_IMAGES[item.imageKey],
      })),
    [t],
  );

  const imageAlt = t("imageAlt");

  return (
    <section id="fortalezas" aria-labelledby="fortalezas-heading">
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
          <h2 id="fortalezas-heading" className={aboutStyles.sectionTitle}>
            {t("headerTitle")}
          </h2>
          <p className={aboutStyles.sectionSubtitle}>{t("headerSubtitle")}</p>
        </motion.div>
        <motion.p
          className={aboutStyles.sectionDescription}
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

      <div className={styles.sectionHomeList}>
        <div className={styles.paddingGlobal}>
          <div className={styles.introComponent}>
            <div className={styles.dividerHorizontal} />
          </div>

          <div className={styles.spacerXlarge} aria-hidden />

          <div className={styles.homeListComponent}>
            {strengths.map((strength, index) => (
              <div
                key={strength.titleKey}
                className={`${styles.homeListWrapper} ${index === 1 ? styles.imageLeft : ""}`}
              >
                <div className={styles.homeListFirstWrapper}>
                  <div className={styles.homeListNumber}>
                    <div className={styles.homeListNumberText}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className={styles.homeListText}>
                    <h2 className={styles.headingStyleH4}>{strength.title}</h2>
                    {strength.description ? (
                      <p
                        className={`${styles.textSizeRegular} ${styles.textStyleMuted}`}
                      >
                        {strength.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`${styles.homeListSecondWrapper} ${index % 2 === 0 ? styles.isRight : ""}`}
                >
                  <Image
                    src={strength.imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 901px) 100vw, 901px"
                    className={styles.homeListImage}
                  />
                </div>
              </div>
            ))}
          </div>

          <FortalezasClosing lead={t("closingLead")} text={t("closingText")} />

          <div
            className={`${styles.spacerMedium} ${styles.hideMobilePortrait}`}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
