"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";
import headerStyles from "@/app/components/value-pillars/value-pillars.module.css";

interface ServiceItem {
  title: string;
  description: string;
  href?: string;
  subItems: { label: string; href?: string }[];
}

function RollingText({
  text,
  hovered,
  justify = false,
}: {
  text: string;
  hovered: boolean;
  justify?: boolean;
}) {
  return (
    <span className={`rolling-wrapper ${justify ? "rolling-justify" : ""}`}>
      <span className={`rolling-text ${hovered ? "rolling-hovered" : ""}`}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="rolling-char"
            style={{ transitionDelay: `${i * 12}ms` }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>

      <style jsx>{`
        .rolling-wrapper {
          display: inline-block;
          overflow: hidden;
          vertical-align: middle;
        }

        .rolling-justify {
          display: block;
          width: 100%;
          text-align: justify;
          text-align-last: right;
        }

        .rolling-text {
          display: inline-flex;
          font-size: 17px;
          font-weight: 400;
          letter-spacing: -0.1px;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }

        .rolling-justify .rolling-text {
          display: inline;
        }

        .rolling-char {
          display: inline-block;
          will-change: transform;
          transform: translateY(0);
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .rolling-hovered .rolling-char {
          transform: translateY(-100%);
        }
      `}</style>
    </span>
  );
}

function ServiceRow({ service }: { service: ServiceItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="service-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="service-inner">
        <div className="service-top">
          <div className="service-title-wrapper">
            {service.href ? (
              <Link href={service.href} className="service-title-link">
                <span className="service-title">{service.title}</span>
              </Link>
            ) : (
              <div className="service-title-link">
                <span className="service-title">{service.title}</span>
              </div>
            )}

            <p className="service-description">{service.description}</p>
          </div>

          <div className="service-subitems">
            {service.subItems.map((item, i) =>
              item.href ? (
                <Link key={i} href={item.href} className="subitem-link">
                  <RollingText text={item.label} hovered={hovered} justify />
                </Link>
              ) : (
                <span key={i} className="subitem-plain">
                  {item.label}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="line-track">
        <div className={`line-filler ${hovered ? "line-filler-active" : ""}`} />
      </div>

      <style jsx>{`
        .service-row {
          width: 100%;
          cursor: pointer;
        }

        .service-inner {
          padding: 40px 0 32px;
        }

        .service-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: clamp(48px, 10vw, 160px);
          padding-inline: 24px;
          box-sizing: border-box;
        }

        .service-title-wrapper {
          flex: 1 1 auto;
          min-width: 0;
          max-width: min(52%, 640px);
        }

        .service-title-link {
          display: block;
          margin-bottom: clamp(28px, 3.5vw, 36px);
          text-decoration: none;
          color: inherit;
        }

        .service-title {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 500;
          letter-spacing: -0.5px;
          line-height: 1.12;
          color: #ffffff;
        }

        .service-description {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.65;
          margin: 0;
          padding: 0;
          max-width: 460px;
          transition: opacity 0.3s ease;
          opacity: ${hovered ? 0.72 : 1};
        }

        .service-subitems {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 0 0 auto;
          width: min(38%, 420px);
          align-items: stretch;
          justify-content: flex-start;
          padding-top: 4px;
          text-align: justify;
        }

        .subitem-link {
          text-decoration: none;
          display: block;
          width: 100%;
          color: inherit;
          text-align: justify;
          text-align-last: right;
        }

        .subitem-link:hover {
          opacity: 0.7;
        }

        .subitem-plain {
          display: block;
          width: 100%;
          font-size: 17px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
          letter-spacing: -0.1px;
          text-align: justify;
          text-align-last: right;
        }

        .line-track {
          width: 100%;
          height: 2px;
          background-color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .line-filler {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: #ffffff;
          transition: width 0.6s cubic-bezier(0.76, 0, 0.24, 1);
          border-radius: 2px;
        }

        .line-filler-active {
          width: 100%;
        }

        @media (max-width: 768px) {
          .service-top {
            flex-direction: column;
            gap: 28px;
            padding-inline: 24px;
          }

          .service-title-wrapper {
            max-width: 100%;
          }

          .service-subitems {
            width: 100%;
            text-align: left;
          }

          .subitem-link,
          .subitem-plain {
            text-align: left;
            text-align-last: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations("services");

  const services = useMemo<ServiceItem[]>(
    () => [
      {
        title: t("marketing.title"),
        description: t("marketing.description"),
        href: "/services/estrategia",
        subItems: [
          { label: t("marketing.bullet1") },
          { label: t("marketing.bullet2") },
          { label: t("marketing.bullet3") },
        ],
      },
      {
        title: t("content.title"),
        description: t("content.description"),
        href: "/services/contenidos",
        subItems: [
          { label: t("content.bullet1") },
          { label: t("content.bullet2") },
          { label: t("content.bullet3") },
        ],
      },
      {
        title: t("design.title"),
        description: t("design.description"),
        href: "/services/diseno",
        subItems: [
          { label: t("design.bullet1") },
          { label: t("design.bullet2") },
          { label: t("design.bullet3") },
        ],
      },
    ],
    [t],
  );

  return (
    <section id="servicios" className="services-section">
      <header
        className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow}`}
      >
        <div className={aboutStyles.headerTitles}>
          <h2 className={headerStyles.sectionTitleOnDark}>{t("headerTitle")}</h2>
          <p className={headerStyles.sectionSubtitleOnDark}>{t("headerSubtitle")}</p>
        </div>
        <p className={headerStyles.sectionDescriptionOnDark}>{t("headerDescription")}</p>
      </header>
      <div className="services-list">
        {services.map((service) => (
          <ServiceRow key={service.title} service={service} />
        ))}
      </div>

      <style jsx>{`
        .services-section {
          width: 100%;
          max-width: none;
          padding: 0 0 64px;
          background-color: #bf0f70;
          box-sizing: border-box;
        }

        .services-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </section>
  );
}
