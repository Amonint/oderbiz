import styles from "./framer-powered-strip.module.css";

export function FramerPoweredStrip() {
  return (
    <div className={`framer-c1ymmg ${styles.root}`}>
      <div
        className={`framer-l8tp04 ${styles.line}`}
        data-framer-name="Line"
        style={{
          backgroundColor:
            "var(--token-b27e3547-de99-4c7d-92e6-eee9fef695b5, rgba(186, 186, 186, 0.2))",
          opacity: 1,
        }}
      />
    </div>
  );
}
