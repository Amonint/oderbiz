import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { AGENCY_LOGO_WHITE } from "@/app/lib/agency-media";
import {
  AGENCY_EMAIL,
  AGENCY_PHONE_DISPLAY,
  AGENCY_WHATSAPP_URL,
} from "@/app/lib/contact";

import styles from "./otherbees-footer.module.css";

export async function OtherbeesFooter() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");

  return (
    <footer id="contacto" className={`${styles.root} ${styles.paddingGlobal}`}>
      <div className={styles.containerLarge}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLogoLink} aria-label={t("logoAria")}>
              <Image
                src={AGENCY_LOGO_WHITE}
                alt={tCommon("brandName")}
                width={1200}
                height={384}
                className={styles.brandLogo}
              />
            </Link>
            <p className={styles.tagline}>{t("tagline")}</p>
          </div>
          <nav className={styles.nav} aria-label={t("navAria")}>
            <Link className={styles.navLink} href="/about">
              {t("navAbout")}
            </Link>
            <Link className={styles.navLink} href="/services">
              {t("navServices")}
            </Link>
            <Link className={styles.navLink} href="/work">
              {t("navWork")}
            </Link>
            <Link className={styles.navLink} href="/contact">
              {t("navContact")}
            </Link>
            <Link className={styles.navLink} href="/blog">
              {t("navBlog")}
            </Link>
          </nav>
        </div>

        <div className={styles.contactBlock}>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>{t("addressLabel")}</span>
            Av. José María Vivar Castro y Américo Vespucio, Loja, Ecuador
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>{t("scheduleLabel")}</span>
            {t("schedule")}
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>{t("emailLabel")}</span>
            <a className={styles.contactLink} href={`mailto:${AGENCY_EMAIL}`}>
              {AGENCY_EMAIL}
            </a>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>{t("phoneLabel")}</span>
            <a className={styles.contactLink} href={AGENCY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {AGENCY_PHONE_DISPLAY}
            </a>
          </p>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{t("copyright")}</p>
          <div className={styles.socials}>
            <a
              className={styles.socialLink}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("facebook")}
            </a>
            <a
              className={styles.socialLink}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("twitter")}
            </a>
            <a
              className={styles.socialLink}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("instagram")}
            </a>
          </div>
          <div className={styles.legal}>
            <Link className={styles.legalLink} href="/privacy-policy">
              {t("privacy")}
            </Link>
            <Link className={styles.legalLink} href="/terms-and-conditions">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
