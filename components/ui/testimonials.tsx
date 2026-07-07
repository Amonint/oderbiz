"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import aboutStyles from "@/app/components/framer-about/framer-about-exact.module.css";
import {
  TESTIMONIAL_AVATARS,
  TESTIMONIAL_LOGO_RATIOS,
  type TestimonialAvatarKey,
} from "@/app/lib/agency-media";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import styles from "./testimonials-section.module.css";

import "swiper/css";

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

function Testimonials() {
  const t = useTranslations("testimonials");
  const swiperRef = useRef<SwiperInstance | null>(null);
  const sliderWrapRef = useRef<HTMLDivElement | null>(null);
  const isInViewRef = useRef(true);

  const items = useMemo(
    () =>
      TESTIMONIAL_KEYS.map((key) => ({
        key,
        quote: t(`items.${key}.quote`),
        name: t(`items.${key}.name`),
        org: t(`items.${key}.org`),
        avatar: TESTIMONIAL_AVATARS[key],
        logoRatio: TESTIMONIAL_LOGO_RATIOS[key],
        isLogo: LOGO_AVATAR_KEYS.has(key),
      })),
    [t],
  );

  const syncAutoplay = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) {
      return;
    }

    if (!isInViewRef.current) {
      swiper.autoplay.stop();
      return;
    }

    swiper.autoplay.start();
  }, []);

  useEffect(() => {
    const node = sliderWrapRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        syncAutoplay();
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [syncAutoplay]);

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <header
        className={`${aboutStyles.sectionHeader} ${aboutStyles.sectionHeaderInFlow} ${styles.sectionHeader}`}
      >
        <div className={aboutStyles.headerTitles}>
          <h2 id="testimonials-heading" className={aboutStyles.sectionTitle}>
            {t("headerTitle")}
          </h2>
          <p className={aboutStyles.sectionSubtitle}>{t("headerSubtitle")}</p>
        </div>
        <p className={aboutStyles.sectionDescription}>{t("headerDescription")}</p>
      </header>

      <div ref={sliderWrapRef} className={styles.sliderWrap}>
        <Swiper
          className={styles.slider}
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncAutoplay();
          }}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={12}
          loop
          speed={500}
          watchSlidesProgress
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.key} className={styles.testimonialWrap}>
              <TestimonialCard
                quote={item.quote}
                name={item.name}
                org={item.org}
                avatar={item.avatar}
                isLogo={item.isLogo}
                logoRatio={item.logoRatio}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export { Testimonials };
