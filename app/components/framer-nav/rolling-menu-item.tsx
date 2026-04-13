import Link from "next/link";
import styles from "./framer-exact-nav.module.css";

export type RollingMenuItemProps = {
  text: string;
  href: string;
  dataFramerName: string;
  linkClassName: string;
  containerClassName: string;
  showComma?: boolean;
};

export function RollingMenuItem({
  text,
  href,
  dataFramerName,
  linkClassName,
  containerClassName,
  showComma = true,
}: RollingMenuItemProps) {
  const suffix = showComma ? ", " : "";
  const chars = [...`${text}${suffix}`];

  return (
    <Link
      className={linkClassName}
      data-framer-name={dataFramerName}
      data-highlight="true"
      href={href}
      aria-label={text}
    >
      <div className={containerClassName} style={{ opacity: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            padding: "0px",
            boxSizing: "border-box",
          }}
        >
          <p className={styles.rollingTextInner}>
            {chars.map((char, idx) => (
              <span key={`${text}-${idx}`}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Link>
  );
}
