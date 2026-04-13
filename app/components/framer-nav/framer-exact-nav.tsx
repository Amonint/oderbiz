import Link from "next/link";
import { NavLocalTime } from "./nav-local-time";
import { RollingMenuItem } from "./rolling-menu-item";
import styles from "./framer-exact-nav.module.css";
import { ThemeToggle } from "./theme-toggle";

const MENU = [
  {
    dataFramerName: "home",
    href: "/",
    label: "Home",
    linkClassName: "framer-uijz4x framer-12fazzh",
    containerClassName: "framer-mgrps-container",
    showComma: true,
  },
  {
    dataFramerName: "about",
    href: "/about",
    label: "About",
    linkClassName: "framer-tjmgqh framer-12fazzh",
    containerClassName: "framer-11hl7mm-container",
    showComma: true,
  },
  {
    dataFramerName: "work",
    href: "/work",
    label: "Work",
    linkClassName: "framer-1l4tx1y framer-12fazzh",
    containerClassName: "framer-14ebavv-container",
    showComma: true,
  },
  {
    dataFramerName: "services",
    href: "/services",
    label: "Services",
    linkClassName: "framer-to8pbn framer-12fazzh",
    containerClassName: "framer-qqyrvh-container",
    showComma: true,
  },
  {
    dataFramerName: "ai labs",
    href: "/ai-labs",
    label: "AI Labs",
    linkClassName: "framer-12iwozi framer-12fazzh",
    containerClassName: "framer-1b8y99o-container",
    showComma: true,
  },
  {
    dataFramerName: "contact",
    href: "/contact",
    label: "Contact",
    linkClassName: "framer-1v4uxuf framer-12fazzh",
    containerClassName: "framer-1bodzwk-container",
    showComma: false,
  },
] as const;

export function FramerExactNav() {
  return (
    <nav
      className={`framer-17v787v ${styles.nav}`}
      data-framer-name="Nav Menu"
      style={{ willChange: "transform", opacity: 1, transform: "none" }}
    >
      <Link
        className="framer-u3en3y framer-1v2nl5"
        data-framer-name="Logo"
        href="/"
        aria-label="Logo"
      >
        <div
          data-framer-component-type="SVG"
          className={`framer-qpdbhg ${styles.logoSvg}`}
          aria-hidden
        >
          <svg
            viewBox="0 0 32 32"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <rect
              width="32"
              height="32"
              rx="6"
              fill="var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(13, 13, 13))"
            />
            <path
              d="M8 10h16v2H8zm0 5h10v2H8zm0 5h14v2H8z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </Link>

      <div
        className={`framer-79zklx ${styles.items}`}
        data-framer-name="Items"
        style={{ opacity: 1 }}
      >
        <div className="framer-16vozx4-container" style={{ opacity: 1 }}>
          <div className={styles.toggleWrap}>
            <ThemeToggle />
          </div>
        </div>

        <div className="framer-ok1jlb" data-framer-name="Menu" style={{ opacity: 1 }}>
          <div className="framer-xdnjn9-container" style={{ opacity: 1 }}>
            <div
              className="framer-IMuWK framer-9tme3y framer-v-9tme3y"
              data-framer-name="All Active"
              style={{ width: "100%", opacity: 1 }}
            >
              <div className={`${styles.menuInner} ${styles.menuRow}`}>
                {MENU.map((item) => (
                  <RollingMenuItem
                    key={item.href}
                    dataFramerName={item.dataFramerName}
                    href={item.href}
                    text={item.label}
                    linkClassName={item.linkClassName}
                    containerClassName={item.containerClassName}
                    showComma={item.showComma}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="framer-1jkd2rj" data-framer-name="Info" style={{ opacity: 1 }}>
        <div className="framer-ugfbwj" style={{ opacity: 1 }}>
          <div className="framer-gq4dwk" style={{ opacity: 1 }}>
            <div
              className={`framer-1k7jery ${styles.location}`}
              data-framer-name="Location"
              data-framer-component-type="RichTextContainer"
            >
              <h3 className={`framer-text framer-styles-preset-17y0dgk ${styles.locationHeading}`}>
                Based in India
              </h3>
            </div>
          </div>
          <div className="framer-lfiytj-container" style={{ opacity: 1 }}>
            <NavLocalTime />
          </div>
        </div>
        <div
          className={`framer-113bfs ${styles.tagline}`}
          data-framer-name="Date"
          data-framer-component-type="RichTextContainer"
          style={{
            ["--extracted-a0htzi" as string]:
              "var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(153, 153, 153))",
          }}
        >
          <h3
            className={`framer-text framer-styles-preset-17y0dgk ${styles.taglineHeading}`}
            data-styles-preset="BdjQ0UGnY"
            style={{
              ["--framer-text-color" as string]:
                "var(--extracted-a0htzi, var(--token-e5a511bf-849c-4ac6-b942-175c537ace13, rgb(153, 153, 153)))",
            }}
          >
            AI-First Creative Solutions
          </h3>
        </div>
      </div>
    </nav>
  );
}
