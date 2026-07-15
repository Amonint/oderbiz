"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AGENCY_WHATSAPP_URL } from "@/app/lib/contact";
import styles from "./cta-strip.module.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function CtaStrip() {
  const t = useTranslations("ctaStrip");
  const tCommon = useTranslations("common");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const fadeIn = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, ease: EASE_OUT },
  };

  return (
    <section ref={ref} className={styles.root} aria-labelledby="cta-strip-heading">
      <div className={styles.inner}>
        <motion.div className={styles.content} {...fadeIn}>
          <p className={styles.brand}>{tCommon("brandName")}</p>
          <p className={styles.text}>{t("text")}</p>
          <div className={styles.ctaRow}>
            <a
              href={AGENCY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              {t("cta")}
            </a>
            <a
              href={AGENCY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaOutline}
            >
              Contáctamos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
