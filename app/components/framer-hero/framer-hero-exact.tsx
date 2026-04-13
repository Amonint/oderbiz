import { HeroReelCanvas } from "./hero-reel-canvas";
import { HeroWordTicker } from "./hero-word-ticker";
import styles from "./framer-hero-exact.module.css";

export function FramerHeroExact() {
  return (
    <section>
      <div
        className={`framer-ty36tk ${styles.top}`}
        data-framer-name="Top"
        style={{ opacity: 1, transform: "none", willChange: "transform" }}
      >
        <div className="framer-1n3iqg8">
          <div className={`framer-18oifnp ${styles.topInner}`}>
            <div className="framer-1d93kbt" data-framer-name="Text wrap">
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
                            DESIGN STUDIO
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
                          FOR TIMELESS
                        </h2>
                      </div>
                    </div>
                    <div className="framer-1p1h39j">
                      <div className="framer-1yug8ap-container">
                        <div className="ssr-variant hidden-1tqphhv">
                          <HeroWordTicker />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`framer-ajhxcq ${styles.reel}`}
              data-framer-name="Reel"
              id="ajhxcq"
              tabIndex={0}
            >
              <div
                className="framer-1nlyelk"
                data-framer-appear-id="1nlyelk"
                style={{ opacity: 1, transform: "none", willChange: "transform" }}
              >
                <div
                  className="framer-1qpokpl-container"
                  data-code-component-plugin-id="84d4c1"
                  data-framer-cursor="8zvybv"
                >
                  <HeroReelCanvas />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`framer-2xxdw2 ${styles.titleBlock}`}
        data-framer-name="Title"
        style={{ opacity: 1, transform: "none", willChange: "transform" }}
      >
        <svg
          role="img"
          aria-label="creative apes"
          className={`framer-1nbr0fn ${styles.titleSvg}`}
          data-framer-name="Text"
          data-framer-component-type="RichTextContainer"
          viewBox="0 0 1200 209"
          style={{ opacity: 1, transform: "none", willChange: "transform" }}
        >
          <text x={0} y={180} className={styles.heroTitleSvg}>
            creative apes
          </text>
        </svg>
        <div
          className={`framer-icxlw2 ${styles.loader}`}
          data-framer-name="Loader"
          style={{ opacity: 1, transform: "none", willChange: "transform" }}
        >
          <div className="framer-19mjztk" data-framer-name="Filler">
            <div className={styles.filler} />
          </div>
        </div>
      </div>
    </section>
  );
}
