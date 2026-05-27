import { HERO_PHOTOS, HeroPhotoThumb } from "./hero-photo-grid";
import HeroImageCloud from "./hero-image-cloud";
import HeroSocialTrails from "./hero-social-trails";
import styles from "./framer-hero-exact.module.css";

const BRAND_LETTER_COLORS = [
  "#D90754",
  "#BF0F70",
  "#64278C",
  "#FDC831",
  "#F27457",
  "#EA5456",
];


export function FramerHeroExact() {
  const [m0, m1, m2, m3, m4] = HERO_PHOTOS;

  return (
    <section className={styles.heroSection}>
      <HeroSocialTrails />
      <div
        className={`framer-ty36tk ${styles.top}`}
        data-framer-name="Top"
        style={{ opacity: 1, transform: "none", willChange: "transform" }}
      >
        <div className="framer-1n3iqg8">
          <div className={`framer-18oifnp ${styles.topInner}`}>
            <div className={`framer-1d93kbt ${styles.topGridWords}`} data-framer-name="Text wrap">
              <div className="framer-192ztss" data-framer-name="Text">
                <div className="framer-fh3t4j">
                  <div
                    className={`framer-gr659c ${styles.words}`}
                    data-framer-name="Words"
                    style={{ opacity: 1, transform: "none", willChange: "transform" }}
                  >
                    <div className="framer-1hf8hpn" data-framer-name="Word">
                      <div className="ssr-variant hidden-1tqphhv">
                        <div
                          className="framer-1i1h9xa"
                          style={{ transform: "none" }}
                          data-framer-component-type="RichTextContainer"
                        >
                          <h2
                            className={`framer-text framer-styles-preset-1vzxrm8 ${styles.headline}`}
                            data-styles-preset="FMyzaPwKH"
                          >
                            Marketing de Resultados
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="framer-150beml" data-framer-name="Word">
                      <div
                        className="framer-1kwhc0z"
                        style={{ transform: "none" }}
                        data-framer-component-type="RichTextContainer"
                      >
                        <h2
                          className={`framer-text framer-styles-preset-1vzxrm8 ${styles.headline}`}
                          data-styles-preset="FMyzaPwKH"
                        >
                          Lleva tu marca más lejos.
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HeroPhotoThumb
              photo={m0}
              sizes="(max-width: 720px) 100vw, 33vw"
              priority
              className={styles.slotTop1}
            />
            <HeroPhotoThumb photo={m1} sizes="(max-width: 720px) 100vw, 33vw" className={styles.slotTop2} />
            <HeroPhotoThumb photo={m2} sizes="(max-width: 720px) 100vw, 33vw" className={styles.slotBot1} />
            <HeroPhotoThumb photo={m3} sizes="(max-width: 720px) 100vw, 33vw" className={styles.slotBot2} />
            <HeroPhotoThumb photo={m4} sizes="(max-width: 720px) 100vw, 33vw" className={styles.slotBot3} />

            {/* Image Cloud — visible solo en mobile */}
            <HeroImageCloud photos={HERO_PHOTOS} />
          </div>
        </div>
      </div>

      <div
        className={`framer-2xxdw2 ${styles.titleBlock}`}
        data-framer-name="Title"
        style={{ opacity: 1, transform: "none", willChange: "transform" }}
      >
        <div className={styles.titleRow}>
          <div className={styles.titleBrand}>
            <svg
              role="img"
              aria-label="Oderbiz"
              className={`framer-1nbr0fn ${styles.titleSvg}`}
              data-framer-name="Text"
              data-framer-component-type="RichTextContainer"
              viewBox="0 0 1400 209"
              style={{ opacity: 1, transform: "none", willChange: "transform" }}
            >
              <text x={0} y={180} className={styles.heroTitleSvg}>
                {"ODERBIZ".split("").map((char, i) => (
                  <tspan key={i} fill={BRAND_LETTER_COLORS[i % BRAND_LETTER_COLORS.length]}>
                    {char}
                  </tspan>
                ))}
              </text>
            </svg>
            <p className={styles.titleLocation} data-framer-name="Location">
              Loja Ecuador
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
