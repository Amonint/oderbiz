"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AGENCY_WHATSAPP_URL, AGENCY_EMAIL } from "@/app/lib/contact";
import styles from "./contact-strip.module.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function ContactStrip() {
  const t = useTranslations("contactStrip");
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
    <section ref={ref} id="contacto-strip" className={styles.root} aria-labelledby="contact-strip-heading">
      <div className={styles.inner}>
        <motion.div className={styles.content} {...fadeIn}>
          <h2 id="contact-strip-heading" className={styles.title}>
            {t("title")}
          </h2>
          <p className={styles.description}>{t("description")}</p>

          <div className={styles.ctaRow}>
            <a
              href={`mailto:${AGENCY_EMAIL}`}
              className={styles.ctaPrimary}
            >
              {tCommon("ctaDiagnosis")}
            </a>
            <a
              href={AGENCY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              {tCommon("ctaMeeting")}
            </a>
          </div>

          <p className={styles.responseTime}>{t("responseTime")}</p>
        </motion.div>
      </div>
    </section>
  );
}
