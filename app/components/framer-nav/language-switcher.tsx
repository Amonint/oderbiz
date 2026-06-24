"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import styles from "./framer-exact-nav.module.css";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  return (
    <div
      className={styles.langSwitcher}
      role="group"
      aria-label={t("languageSwitcher")}
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`${styles.langBtn} ${locale === code ? styles.langBtnActive : ""}`}
          aria-current={locale === code ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: code })}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
