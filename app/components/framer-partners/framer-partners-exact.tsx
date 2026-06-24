import { getTranslations } from "next-intl/server";

import { PartnersFramerHeading } from "./partners-heading";
import { PartnersFramerTicker } from "./partners-ticker";
import styles from "./framer-partners-exact.module.css";
import { PARTNERS_TICK_1, PARTNERS_TICK_2 } from "./partners-data";

export async function FramerPartnersExact() {
  const t = await getTranslations("partners");

  return (
    <section
      className={`framer-8plrtn ${styles.section}`}
      data-framer-name="Ellos ya creen en nosotros"
      id="ellos-creen-en-nosotros"
    >
      <div className={`framer-2wk94ms ${styles.inner}`}>
        <PartnersFramerHeading />
        <p className={styles.description}>{t("description")}</p>
      </div>
      <PartnersFramerTicker
        variant={1}
        items={PARTNERS_TICK_1}
        ariaLabel={t("carouselRow1")}
      />
      <PartnersFramerTicker
        variant={2}
        items={PARTNERS_TICK_2}
        ariaLabel={t("carouselRow2")}
      />
    </section>
  );
}
