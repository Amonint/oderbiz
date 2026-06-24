"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";
import {
  TESTIMONIAL_AVATARS,
  type TestimonialAvatarKey,
} from "@/app/lib/agency-media";
import styles from "./testimonials-section.module.css";

const TESTIMONIAL_KEYS = [
  "marisol",
  "ipAccess",
  "ortam",
  "elizabeth",
  "oscar",
  "luciano",
  "maxxnet",
] as const satisfies readonly TestimonialAvatarKey[];

const LOGO_AVATAR_KEYS = new Set<TestimonialAvatarKey>([
  "ipAccess",
  "ortam",
  "elizabeth",
  "maxxnet",
]);

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Testimonials() {
  const t = useTranslations("testimonials");
  const [api, setApi] = useState<CarouselApi>();

  const items = useMemo(
    () =>
      TESTIMONIAL_KEYS.map((key) => ({
        key,
        quote: t(`items.${key}.quote`),
        name: t(`items.${key}.name`),
        org: t(`items.${key}.org`),
        avatar: TESTIMONIAL_AVATARS[key],
        initials: getInitials(t(`items.${key}.name`)),
      })),
    [t],
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <header
        className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow}`}
      >
        <div className={aboutStyles.headerTitles}>
          <h2 id="testimonials-heading" className={aboutStyles.sectionTitle}>
            {t("headerTitle")}
          </h2>
          <p className={aboutStyles.sectionSubtitle}>{t("headerSubtitle")}</p>
        </div>
        <p className={aboutStyles.sectionDescription}>{t("headerDescription")}</p>
      </header>

      <div className={styles.carouselWrap}>
        <Carousel
          setApi={setApi}
          className={styles.carousel}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            loop: false,
          }}
        >
          <CarouselContent className={styles.carouselContent}>
            {items.map((item) => (
              <CarouselItem className={styles.slide} key={item.key}>
                <article className={styles.card}>
                  <Quote className={styles.quoteIcon} aria-hidden />
                  <div className={styles.cardBody}>
                    <blockquote className={styles.quote}>
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer className={styles.footer}>
                      <span className={styles.byLabel}>{t("byLabel")}</span>
                      <Avatar className={styles.avatar}>
                        <AvatarImage
                          src={item.avatar}
                          alt={item.name}
                          className={
                            LOGO_AVATAR_KEYS.has(item.key)
                              ? styles.avatarImageLogo
                              : styles.avatarImage
                          }
                        />
                        <AvatarFallback>{item.initials}</AvatarFallback>
                      </Avatar>
                      <span className={styles.name}>{item.name}</span>
                      <span className={styles.org}>· {item.org}</span>
                    </footer>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export { Testimonials };
