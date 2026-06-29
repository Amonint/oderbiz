"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

import { AGENCY_LOGO_MAIN } from "@/app/lib/agency-media";
import { TextEffect } from "@/components/ui/text-effect";

import { FortalezasClosingDoodle } from "./fortalezas-closing-doodle";
import "./fortalezas-closing.css";

type FortalezasClosingProps = {
  lead: string;
  text: string;
};

export function FortalezasClosing({ lead, text }: FortalezasClosingProps) {
  const tCommon = useTranslations("common");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const quote = `\u201C${lead} ${text}\u201D`;

  return (
    <div ref={ref} className="am-testimonial-closing-wrap">
      <div
        className="am-testimonial-inner-wrapper"
        data-wave-anchor="closing-card"
      >
        <div
          className="am-testimonial-text-wrapper"
          data-wave-zone="closing-text"
        >
          <Image
            src={AGENCY_LOGO_MAIN}
            alt={tCommon("brandName")}
            width={160}
            height={24}
            className="am-testimonial-logo am-show-mobile"
            data-testimonial-logo-height="18"
          />
          <TextEffect
            preset="blur"
            per="word"
            delay={0.12}
            trigger={inView}
            as="p"
            className="am-heading-36 am-is-line-height-120 am-text-wrap-pretty"
          >
            {quote}
          </TextEffect>
        </div>
        <div className="am-testimonial-doodle w-embed">
          <FortalezasClosingDoodle />
        </div>
        <div className="am-testiminial-info-wrapper">
          <Image
            src={AGENCY_LOGO_MAIN}
            alt={tCommon("brandName")}
            width={160}
            height={24}
            className="am-testimonial-logo am-hide-mobile"
            data-testimonial-logo-height="18"
          />
        </div>
      </div>
    </div>
  );
}
