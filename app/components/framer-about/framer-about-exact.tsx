"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { TextEffect } from "@/components/ui/text-effect";

import { ABOUT_VIDEOS } from "@/app/lib/agency-media";
import { AboutVideoMarquee } from "./about-video-marquee";

import styles from "./framer-about-exact.module.css";

export function FramerAboutExact() {
  const t = useTranslations("about");
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [32, 0]);

  return (
    <section ref={ref} id="sobre-nosotros" className={styles.root} aria-labelledby="about-heading">
      <header className={styles.sectionHeader}>
        <motion.div
          className={styles.aboutHeaderRow}
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className={styles.headerTitles}>
            <h2 id="about-heading" className={styles.sectionTitle}>
              {t("headerTitle")}
            </h2>
            <p className={styles.sectionSubtitle}>{t("headerSubtitle")}</p>
          </div>

          <TextEffect
            preset="blur"
            per="word"
            delay={0.15}
            as="p"
            justify
            className={styles.bodyText}
          >
            {t("paragraph1")}
          </TextEffect>
        </motion.div>
      </header>

      <AboutVideoMarquee videos={ABOUT_VIDEOS} />
    </section>
  );
}
