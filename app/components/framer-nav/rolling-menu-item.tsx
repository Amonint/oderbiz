import { Link } from "@/i18n/navigation";
import styles from "./framer-exact-nav.module.css";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

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
  showComma = false,
}: RollingMenuItemProps) {
  const suffix = showComma ? ", " : "";
  const chars = [...`${text}${suffix}`];
  const external = isExternalHref(href);

  const inner = (
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
  );

  if (external) {
    return (
      <a
        className={linkClassName}
        data-framer-name={dataFramerName}
        data-highlight="true"
        href={href}
        aria-label={text}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      className={linkClassName}
      data-framer-name={dataFramerName}
      data-highlight="true"
      href={href}
      aria-label={text}
    >
      {inner}
    </Link>
  );
}
