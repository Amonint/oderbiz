"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AGENCY_WHATSAPP_URL } from "@/app/lib/contact";
import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";
import styles from "./diagnosis-section.module.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const REVEAL_TRANSITION = { duration: 0.8, ease: EASE_OUT };

const BENEFIT_KEYS = ["benefit1", "benefit2", "benefit3"] as const;

export function DiagnosisSection() {
  const t = useTranslations("diagnosis");
  const tCommon = useTranslations("common");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="diagnostico"
      className={styles.root}
      aria-labelledby="diagnosis-heading"
    >
      <div className={styles.inner}>
        <header className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow} ${styles.header}`}>
          <motion.div
            className={aboutStyles.headerTitles}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={REVEAL_TRANSITION}
          >
            <h2 id="diagnosis-heading" className={aboutStyles.sectionTitle}>
              {t("headerTitle")}
            </h2>
            <p className={aboutStyles.sectionSubtitle}>{t("headerSubtitle")}</p>
          </motion.div>
          <motion.p
            className={aboutStyles.sectionDescription}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ ...REVEAL_TRANSITION, delay: reduceMotion ? 0 : 0.12 }}
          >
            {t("description")}
          </motion.p>
        </header>

        <motion.div
          className={styles.benefits}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...REVEAL_TRANSITION, delay: reduceMotion ? 0 : 0.2 }}
        >
          {BENEFIT_KEYS.map((key, i) => (
            <div key={key} className={styles.benefitCard}>
              <span className={styles.benefitNumber}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.benefitText}>{t(key)}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.ctaWrapper}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...REVEAL_TRANSITION, delay: reduceMotion ? 0 : 0.35 }}
        >
          <a
            href={AGENCY_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            {tCommon("diagnosisCta")}
          </a>
          <p className={styles.guarantee}>{t("guarantee")}</p>
        </motion.div>
      </div>
    </section>
  );
}
