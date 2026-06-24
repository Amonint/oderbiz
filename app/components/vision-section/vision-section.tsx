"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { TextEffect } from "@/components/ui/text-effect";

import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";
import styles from "./vision-section.module.css";

const VISION_PORTRAIT = "/assets/personal/KATERINE.png";

export function VisionSection() {
  const t = useTranslations("vision");
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1.08, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} id="direccion-vision" className={styles.root} aria-labelledby="vision-heading">
      <header
        className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow}`}
      >
        <div className={aboutStyles.headerTitles}>
          <h2 id="vision-heading" className={aboutStyles.sectionTitle}>
            {t("headerTitle")}
          </h2>
          <p className={aboutStyles.sectionSubtitle}>{t("headerSubtitle")}</p>
        </div>
        <p className={aboutStyles.sectionDescription}>{t("headerDescription")}</p>
      </header>

      <motion.div className={`${aboutStyles.content} ${styles.content}`} style={{ opacity, y }}>
        <div className={styles.textColumn}>
          <TextEffect
            preset="blur"
            per="word"
            delay={0.15}
            as="blockquote"
            className={styles.quote}
          >
            {`\u201C${t("quote")}\u201D`}
          </TextEffect>
          <p className={styles.attribution}>{t("attribution")}</p>
        </div>

        <motion.div
          className={styles.portraitColumn}
          style={{ opacity: imageOpacity }}
        >
          <motion.div
            style={{
              scale: imageScale,
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src={VISION_PORTRAIT}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={aboutStyles.image}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <hr className={styles.sectionDivider} aria-hidden />
    </section>
  );
}
