"use client";

import { type CSSProperties } from "react";

import styles from "./testimonials-section.module.css";

type TestimonialCardProps = {
  quote: string;
  name: string;
  org: string;
  avatar: string;
  isLogo: boolean;
  logoRatio: number;
  index: number;
};

function TestimonialCard({
  quote,
  name,
  org,
  avatar,
  isLogo,
  logoRatio,
  index,
}: TestimonialCardProps) {
  return (
    <article
      className={styles.testimonial}
      style={
        {
          "--index": index,
          "--ratio": logoRatio,
        } as CSSProperties
      }
    >
      <blockquote className={styles.testimonialText}>
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>

      <footer className={styles.testimonialFooter}>
        <figure className={styles.testimonialLogoWrap}>
          <img
            src={avatar}
            alt={name}
            className={`${styles.testimonialLogo} ${isLogo ? styles.testimonialLogoBrand : styles.testimonialLogoPhoto}`}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <figcaption className={styles.testimonialCredit}>
          <p className={styles.testimonialName}>{name}</p>
          <p className={styles.testimonialRole}>{org}</p>
        </figcaption>
      </footer>
    </article>
  );
}

export { TestimonialCard };
