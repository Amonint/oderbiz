import { getTranslations } from "next-intl/server";

import { HeadingWordSpans } from "@/app/components/framer-lineup/lineup-letter-spans";
import styles from "./framer-partners-exact.module.css";

export async function PartnersFramerHeading() {
  const t = await getTranslations("partners");
  const line1 = t.raw("headingLine1") as string[];
  const line2 = t.raw("headingLine2") as string[];

  return (
    <div className={`framer-9mpswc ${styles.headingWrap}`} data-framer-name="Heading">
      <div className="ssr-variant hidden-loch95">
        <div
          className="framer-1kxm29l"
          data-framer-name="Ellos ya creen"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <h2 className={`framer-text ${styles.heading}`}>
            <span className={styles.headingLine}>
              <HeadingWordSpans words={line1} />
            </span>
            <span className={styles.headingLine}>
              <HeadingWordSpans words={line2} />
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
