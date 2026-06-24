import Link from "next/link";
import styles from "./framer-services-list-exact.module.css";
import { RollingTextLink } from "./rolling-text-link";
import { SERVICES_LIST_ITEMS } from "./services-list-data";

const CTA_TEXT = "Ver servicios";

/** Contenedores `data-framer-name="Text 1"` por fila de bullet (paridad con export Framer). */
const BULLET_ROW_CLASSES = [
  "framer-1huzqax",
  "framer-93i3sd",
  "framer-153ur0w",
  "framer-cza1us",
] as const;

const text1RichStyle = {
  ["--framer-paragraph-spacing" as string]: "0px",
  transform: "none",
  transformOrigin: "50% 50% 0",
} as const;

const text2RichStyle = {
  ["--extracted-1of0zx5" as string]:
    "var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgb(255, 255, 255))",
  ["--framer-paragraph-spacing" as string]: "0px",
  transform: "none",
  transformOrigin: "50% 50% 0",
} as const;

const descRichStyle = {
  ["--extracted-r6o4lv" as string]:
    "var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(13, 13, 13))",
  ["--framer-paragraph-spacing" as string]: "0px",
  transform: "none",
  opacity: 1,
} as const;

const bulletRichStyle = {
  ["--framer-paragraph-spacing" as string]: "0px",
  transform: "none",
  opacity: 1,
} as const;

export function FramerServicesListExact() {
  const ctaChars = [...CTA_TEXT];

  return (
    <div className={`framer-wadrs7 ${styles.root}`}>
      <div className={`framer-1jprvnt hidden-1tqphhv hidden-12a2gtg ${styles.inner}`} data-framer-name="Lists">
        <div className={styles.lists}>
          {SERVICES_LIST_ITEMS.map((item) => (
            <div
              key={item.key}
              className={`${item.containerClassName} ${styles.itemContainer}`}
              data-framer-appear-id={item.appearId}
            >
              <div
                className={`framer-tGNHC framer-Ly2Sl framer-nwFV6 framer-DPAlw framer-p7Dfn framer-twnfev framer-v-twnfev ${styles.primary}`}
                data-framer-name="Primary"
                data-highlight="true"
                style={{ width: "100%", opacity: 1 }}
              >
                <div className={`framer-1mfmpje ${styles.itemWrap}`} style={{ opacity: 1 }}>
                  <div className={`framer-h9sfvf ${styles.h9Row}`} style={{ opacity: 1 }}>
                    <div className="framer-wlv4iq" style={{ opacity: 1 }}>
                      <Link
                        className={`framer-1w4x9pn framer-i5coh3 ${styles.contentLink}`}
                        href={item.href}
                        data-framer-name="Content"
                        style={{ opacity: 1 }}
                      >
                        <div
                          className={`framer-162jvg5 ${styles.textsStack}`}
                          data-framer-name="Texts"
                          style={{ opacity: 1 }}
                        >
                          <div
                            className="framer-1ymashg"
                            data-framer-name="Text 1"
                            data-framer-component-type="RichTextContainer"
                            style={text1RichStyle}
                          >
                            <h2
                              className={`framer-text framer-styles-preset-9coj1e ${styles.titlePrimary}`}
                              data-styles-preset="KBHJuVDfj"
                            >
                              {item.title}
                            </h2>
                          </div>
                          <div
                            className="framer-1w9e9h4"
                            data-framer-name="Text 2"
                            data-framer-component-type="RichTextContainer"
                            style={text2RichStyle}
                          >
                            <h2
                              className={`framer-text framer-styles-preset-9coj1e ${styles.titleGhost}`}
                              data-styles-preset="KBHJuVDfj"
                              style={{
                                ["--framer-text-color" as string]:
                                  "var(--extracted-1of0zx5, var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgb(255, 255, 255)))",
                              }}
                            >
                              {item.title}
                            </h2>
                          </div>
                        </div>
                      </Link>

                      <div
                        className="framer-10us73f"
                        data-framer-name="Text 1"
                        data-framer-component-type="RichTextContainer"
                        style={descRichStyle}
                      >
                        <p
                          className={`framer-text framer-styles-preset-17y0dgk ${styles.description}`}
                          data-styles-preset="BdjQ0UGnY"
                          dir="auto"
                          style={{
                            ["--framer-text-color" as string]:
                              "var(--extracted-r6o4lv, var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(13, 13, 13)))",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className={`framer-1ka3q9d ${styles.bullets}`} style={{ opacity: 1 }}>
                      {item.bullets.map((bullet, idx) => {
                        const rowClass =
                          BULLET_ROW_CLASSES[idx % BULLET_ROW_CLASSES.length];
                        return (
                          <div
                            key={`${item.key}-${idx}`}
                            className={rowClass}
                            data-framer-name="Text 1"
                            data-framer-component-type="RichTextContainer"
                            style={bulletRichStyle}
                          >
                            <p
                              className={`framer-text framer-styles-preset-je1ysd ${styles.bullet}`}
                              data-styles-preset="qkO0cRLWx"
                              style={{ ["--framer-text-alignment" as string]: "left" }}
                            >
                              <RollingTextLink text={bullet.label} href={bullet.href} />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className={`framer-sdv0w9 ${styles.line}`}
                  data-framer-name="Line"
                  style={{
                    backgroundColor:
                      "var(--token-b27e3547-de99-4c7d-92e6-eee9fef695b5, rgba(186, 186, 186, 0.07))",
                    opacity: 1,
                  }}
                >
                  <div
                    className={`framer-1s3am3v ${styles.lineFiller}`}
                    data-framer-name="Filler"
                    style={{
                      backgroundColor:
                        "var(--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b, var(--brand-magenta))",
                      transform: "none",
                      transformOrigin: "50% 50% 0",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className={`framer-ux0ov5 ${styles.ctaWrap}`}>
            <div className="ssr-variant hidden-1tqphhv">
              <div className="framer-x5680d-container" data-framer-appear-id="x5680d">
                <div className="ssr-variant hidden-12a2gtg">
                  <Link
                    className={`framer-kFE0a framer-1irdo7w framer-v-1irdo7w framer-dyycq1 ${styles.ctaLink}`}
                    data-border="true"
                    data-framer-name="Primary"
                    href="/services"
                  >
                    <div className={`framer-1sl4ib4 ${styles.ctaFiller}`} data-framer-name="Filler" />
                    <div className={styles.ctaInner}>
                      <p className={styles.ctaText}>
                        {ctaChars.map((ch, i) => (
                          <span key={`${ch}-${i}`}>{ch === " " ? "\u00A0" : ch}</span>
                        ))}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
