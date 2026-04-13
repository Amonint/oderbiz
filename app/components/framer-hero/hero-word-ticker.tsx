import styles from "./framer-hero-exact.module.css";

function LetterBlock({
  ch,
  yPercent,
}: {
  ch: string;
  yPercent: 0 | 150;
}) {
  return (
    <div
      style={{
        display: "inline-block",
        transform: `translate(0px, ${yPercent}%)`,
        willChange: "transform",
      }}
    >
      <h2 className={styles.tickerChar}>{ch}</h2>
    </div>
  );
}

function WordRow({
  word,
  yPercent,
  testId,
}: {
  word: string;
  yPercent: 0 | 150;
  testId: string;
}) {
  const chars = [...word];
  return (
    <div
      data-testid={testId}
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "flex-start",
        gap: 0,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexWrap: "nowrap",
          whiteSpace: "pre",
          overflow: "hidden",
        }}
      >
        {chars.map((ch, idx) => (
          <LetterBlock key={`${word}-${idx}`} ch={ch} yPercent={yPercent} />
        ))}
      </div>
    </div>
  );
}

export function HeroWordTicker() {
  return (
    <div
      className={styles.aiDesignShell}
      style={{
        userSelect: "none",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        overflow: "visible",
        justifyContent: "flex-start",
      }}
    >
      <span className={styles.visuallyHidden}>MOTION.</span>
      <h2 aria-hidden className={styles.hiddenAiDesign}>
        AI DESIGN.
      </h2>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
          width: "100%",
          textAlign: "left",
        }}
      >
        <WordRow word="MOTION." yPercent={0} testId="hero-ticker-primary" />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
          width: "100%",
          textAlign: "left",
        }}
      >
        <WordRow word="BRANDING." yPercent={150} testId="hero-ticker-secondary" />
      </div>
    </div>
  );
}
