"use client";

import { useTranslations } from "next-intl";

import styles from "./LineUp.module.css";

export default function LineUp() {
  const t = useTranslations("team");

  return (
    <section className={styles.section} id="lineup">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("headerTitle")}</h2>
          <p className={styles.year}>{t("headerSubtitle")}</p>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
