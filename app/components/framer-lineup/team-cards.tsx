"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import type { LineupTeamCard } from "./lineup-data";
import { LINEUP_TEAM } from "./lineup-data";
import styles from "./team-cards.module.css";

function TeamCard({ member }: { member: LineupTeamCard }) {
  const t = useTranslations("team");
  const wide = member.variant === "long";

  return (
    <div className={styles.card} data-framer-name={wide ? "Long" : "Variant 1"}>
      <div
        className={styles.imgShell}
        style={{
          aspectRatio: `${member.imageWidth} / ${member.imageHeight}`,
        }}
      >
        <Image
          src={member.imageSrc}
          alt={t("portraitAlt", { name: member.name })}
          fill
          sizes={
            wide
              ? "(max-width: 900px) 100vw, 55vw"
              : "(max-width: 900px) 100vw, 28vw"
          }
          className={styles.img}
        />
      </div>
      <p className={styles.name}>{member.name}</p>
    </div>
  );
}

export function TeamCards() {
  return (
    <div
      className={`framer-1fftgml ${styles.cardsRoot}`}
      data-framer-name="Team Cards"
    >
      <div className={styles.grid}>
        {LINEUP_TEAM.map((m) => (
          <TeamCard key={m.id} member={m} />
        ))}
      </div>
    </div>
  );
}
