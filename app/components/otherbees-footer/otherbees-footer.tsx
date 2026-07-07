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

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Oderbiz/",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>`,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/oderbiz/",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/oderbiz-marketing-y-estrategia",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.17-8.424-6.907-11.018-3.377v-2.194z"/></svg>`,
  },
  {
    name: "Behance",
    href: "https://www.behance.net/oderbiz",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>`,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@oderbiz",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
  },
];

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
            Av. José María Vivar Castro y Américo Vespucio, Loja, Ecuador. Edificio de 5 pisos
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
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                className={styles.socialLink}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                dangerouslySetInnerHTML={{ __html: link.svg }}
              />
            ))}
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
