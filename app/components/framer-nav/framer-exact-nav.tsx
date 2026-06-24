"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import { AGENCY_LOGO_WHITE } from "@/app/lib/agency-media";
import { AGENCY_WHATSAPP_URL } from "@/app/lib/contact";
import { Link } from "@/i18n/navigation";
import { RollingMenuItem } from "./rolling-menu-item";
import { LanguageSwitcher } from "./language-switcher";
import { NavSectionLink } from "./nav-section-link";
import styles from "./framer-exact-nav.module.css";

export function FramerExactNav() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const menu = useMemo(
    () =>
      [
        {
          dataFramerName: "about",
          href: "#sobre-nosotros" as const,
          labelKey: "about" as const,
          linkClassName: "framer-tjmgqh framer-12fazzh",
          containerClassName: "framer-11hl7mm-container",
        },
        {
          dataFramerName: "services",
          href: "#servicios" as const,
          labelKey: "services" as const,
          linkClassName: "framer-to8pbn framer-12fazzh",
          containerClassName: "framer-qqyrvh-container",
        },
        {
          dataFramerName: "work",
          href: "#portafolio" as const,
          labelKey: "work" as const,
          linkClassName: "framer-1l4tx1y framer-12fazzh",
          containerClassName: "framer-14ebavv-container",
        },
        {
          dataFramerName: "partners",
          href: "#ellos-creen-en-nosotros" as const,
          labelKey: "partners" as const,
          linkClassName: "framer-12iwozi framer-12fazzh",
          containerClassName: "framer-1b8y99o-container",
        },
      ] as const,
    [],
  );

  return (
    <>
      <nav
        className={`framer-17v787v ${styles.nav}`}
        data-framer-name="Nav Menu"
        style={{ willChange: "transform", opacity: 1, transform: "none" }}
      >
        <Link
          className={`framer-u3en3y framer-1v2nl5 ${styles.logo}`}
          data-framer-name="Logo"
          href="/"
          aria-label={t("logoAria")}
        >
          <Image
            src={AGENCY_LOGO_WHITE}
            alt={tCommon("brandName")}
            width={1200}
            height={384}
            className={styles.logoImage}
            priority
          />
        </Link>

        <div
          className={`framer-79zklx ${styles.items}`}
          data-framer-name="Items"
          style={{ opacity: 1 }}
        >
          <div className="framer-ok1jlb" data-framer-name="Menu" style={{ opacity: 1 }}>
            <div className="framer-xdnjn9-container" style={{ opacity: 1 }}>
              <div
                className="framer-IMuWK framer-9tme3y framer-v-9tme3y"
                data-framer-name="All Active"
                style={{ width: "100%", opacity: 1 }}
              >
                <div className={`${styles.menuInner} ${styles.menuRow}`}>
                  {menu.map((item) => (
                    <RollingMenuItem
                      key={item.dataFramerName}
                      dataFramerName={item.dataFramerName}
                      href={item.href}
                      text={t(item.labelKey)}
                      linkClassName={item.linkClassName}
                      containerClassName={item.containerClassName}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navActions}>
          <LanguageSwitcher />
          <a
            href={AGENCY_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            {tCommon("contact")}
          </a>
          <NavSectionLink sectionId="portafolio" className={styles.btnOutline}>
            {tCommon("portfolio")}
          </NavSectionLink>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-label={drawerOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={drawerOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {drawerOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className={styles.drawerLang}>
              <LanguageSwitcher />
            </div>
            {menu.map((item, i) => (
              <motion.div
                key={item.dataFramerName}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.2 }}
              >
                <NavSectionLink
                  sectionId={item.href.slice(1)}
                  className={styles.drawerLink}
                  onClick={closeDrawer}
                >
                  {t(item.labelKey)}
                </NavSectionLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
