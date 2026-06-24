import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { ServiceLetterSpans, TitleLetterSpans } from "./letter-spans";
import styles from "./framer-work-grid-exact.module.css";
import { getWorkGridItems } from "./work-grid-items";

export async function FramerWorkGridExact() {
  const t = await getTranslations("portfolio");
  const items = getWorkGridItems(t);

  return (
    <div id="portafolio" className={`framer-18reak ${styles.root}`}>
      <div className={`framer-62qbuw ${styles.inner}`}>
        <div className="ssr-variant hidden-12a2gtg hidden-1tqphhv">
          <header className={styles.sectionHeader}>
            <div className={styles.headerTitles}>
              <h2 className={styles.sectionTitle}>{t("headerTitle")}</h2>
              <p className={styles.sectionSubtitle}>{t("headerSubtitle")}</p>
            </div>
            <p className={styles.sectionDescription}>{t("headerDescription")}</p>
          </header>
          <div className={styles.grid}>
            {items.map((item) => {
              const label = item.titleGroups.join(" ");

              return (
                <Link
                  key={item.href}
                  className={`framer-1lfswo framer-lux5qc ${styles.cardLink}`}
                  href={item.href}
                >
                  <div className="framer-1xcv0fb">
                    <div
                      className={`framer-t1w6l5 ${styles.textBlock}`}
                      data-framer-name="text"
                    >
                      <div
                        className="framer-1d1we3i"
                        data-framer-name="Title"
                        style={{ transform: "none" }}
                        data-framer-component-type="RichTextContainer"
                      >
                        <h4
                          className={`framer-text framer-styles-preset-p2sl1o ${styles.titlePreset}`}
                          data-styles-preset="CZm_OeNEw"
                        >
                          <TitleLetterSpans groups={[...item.titleGroups]} />
                        </h4>
                      </div>
                      <div
                        className="framer-1v17aec"
                        data-framer-name="Services"
                        style={{ transform: "none" }}
                        data-framer-component-type="RichTextContainer"
                      >
                        <h6
                          className={`framer-text framer-styles-preset-5i8emc ${styles.servicesPreset}`}
                          data-styles-preset="tb6OyQMXK"
                        >
                          <ServiceLetterSpans groups={[...item.serviceGroups]} />
                        </h6>
                      </div>
                      <p
                        className={`${styles.cardExcerpt} framer-text`}
                        data-framer-name="Excerpt"
                      >
                        {item.excerpt}
                      </p>
                    </div>
                    <div className={`framer-227wem ${styles.spacer227}`} />
                  </div>
                  <div className={`framer-1klr08c ${styles.previewShell}`}>
                    <div
                      className="framer-22dy18-container hidden-1tqphhv hidden-12a2gtg"
                      data-code-component-plugin-id="84d4c1"
                      data-framer-cursor="1azdmuu"
                    >
                      <div className={styles.canvasHost}>
                        <Image
                          src={item.imageUrl}
                          alt={t("previewAlt", { label })}
                          className={styles.previewImage}
                          fill
                          sizes="(max-width: 1024px) 90vw, 45vw"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
