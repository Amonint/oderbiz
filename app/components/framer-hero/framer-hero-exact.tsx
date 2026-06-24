import { getTranslations } from "next-intl/server";

import { AGENCY_WHATSAPP_URL } from "@/app/lib/contact";
import {
  HERO_VIDEOS,
  HERO_VIDEO_COL_A,
  HERO_VIDEO_COL_B,
  HERO_VIDEO_COL_C,
} from "@/app/lib/agency-media";
import { HeroMobileVideoSequence } from "./hero-mobile-video-sequence";
import { HeroVerticalVideoGrid } from "./hero-vertical-video-grid";
import styles from "./framer-hero-exact.module.css";

export async function FramerHeroExact() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <HeroMobileVideoSequence videos={HERO_VIDEOS} />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.textCol}>
              <h1 id="hero-heading" className={styles.headline}>
                {t("headline1")}{" "}
                <span className={styles.headlineAccent}>{t("headline2")}</span>
              </h1>
              <p className={styles.description}>{t("description")}</p>
              <a
                href="https://instagram.com/oderbiz"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialHandle}
                aria-label={t("socialHandleAria")}
              >
                {t("socialHandle")}
              </a>
              <div className={styles.ctaRow}>
                <a
                  href={AGENCY_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cta}
                >
                  {tCommon("contact")}
                </a>
              </div>
            </div>
            <div className={styles.gridCol}>
              <HeroVerticalVideoGrid
                columnA={HERO_VIDEO_COL_A}
                columnB={HERO_VIDEO_COL_B}
                columnC={HERO_VIDEO_COL_C}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
