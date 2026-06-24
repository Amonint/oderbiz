"use client";

import { Fragment, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { FORTALEZAS_IMAGE } from "@/app/lib/agency-media";
import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";

import { STRENGTH_KEYS } from "./fortalezas-data";
import styles from "./fortalezas-section.module.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const REVEAL_TRANSITION = { duration: 0.8, ease: EASE_OUT };

function SectionDivider() {
  return <hr className={styles.divider} />;
}

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={styles.revealBlock}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={styles.revealBlock}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}

function ClosingBlock({
  lead,
  text,
}: {
  lead: string;
  text: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.25"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -10]);

  return (
    <div ref={ref} className={styles.closingParallax}>
      <motion.div
        className={styles.closingInner}
        style={reduceMotion ? undefined : { y: parallaxY }}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={
          reduceMotion || inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={REVEAL_TRANSITION}
      >
        <p className={styles.closingLead}>{lead}</p>
        <p className={styles.closingText}>{text}</p>
      </motion.div>
    </div>
  );
}

export function FortalezasSection() {
  const t = useTranslations("fortalezas");
  const headerRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5% 0px" });
  const reduceMotion = useReducedMotion();

  const strengths = useMemo(
    () =>
      STRENGTH_KEYS.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description: "descriptionKey" in item ? t(item.descriptionKey) : null,
      })),
    [t],
  );

  return (
    <section id="fortalezas" className={styles.root} aria-labelledby="fortalezas-heading">
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

      <div className={styles.content}>
        <aside className={styles.imageColumn}>
          <div className={styles.imageFrame}>
            <Image
              src={FORTALEZAS_IMAGE}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.image}
              priority={false}
            />
          </div>
        </aside>

        <div className={styles.strengthsColumn}>
          {strengths.map((strength, index) => (
            <Fragment key={strength.titleKey}>
              {index > 0 ? <SectionDivider /> : null}
              <RevealBlock delay={index * 0.08}>
                <article className={styles.strengthCard}>
                  <h3 className={styles.strengthTitle}>{strength.title}</h3>
                  {strength.description ? (
                    <p className={styles.strengthBody}>{strength.description}</p>
                  ) : null}
                </article>
              </RevealBlock>
            </Fragment>
          ))}
        </div>

        <footer className={styles.closing}>
          <SectionDivider />
          <ClosingBlock lead={t("closingLead")} text={t("closingText")} />
        </footer>
      </div>
    </section>
  );
}
