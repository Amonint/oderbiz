import { setRequestLocale } from "next-intl/server";

import { FramerAboutExact } from "@/app/components/framer-about/framer-about-exact";
import { AboutSpecializationsSection } from "@/app/components/framer-about/about-specializations-section";
import { FramerHeroExact } from "@/app/components/framer-hero/framer-hero-exact";
import { HeroMeshGradient } from "@/app/components/framer-hero/hero-mesh-gradient";
import { FramerLineUpExact } from "@/app/components/framer-lineup/framer-lineup-exact";
import { FramerPartnersExact } from "@/app/components/framer-partners/framer-partners-exact";
import { FramerExactNav } from "@/app/components/framer-nav/framer-exact-nav";
import { HashScrollOnLoad } from "@/app/components/framer-nav/hash-scroll-on-load";
import ServicesSection from "@/app/components/services-section/services-section";
import { FramerWorkGridExact } from "@/app/components/framer-work-grid/framer-work-grid-exact";
import { OtherbeesFooter } from "@/app/components/otherbees-footer/otherbees-footer";
import { VisionSection } from "@/app/components/vision-section/vision-section";
import { ValuePillars } from "@/app/components/value-pillars/value-pillars";
import { FortalezasSection } from "@/app/components/fortalezas-section/fortalezas-section";
import { OderbizTestimonials } from "@/app/components/oderbiz-testimonials/oderbiz-testimonials";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="min-h-screen flex flex-col">
      <HashScrollOnLoad />
      <div className="hero-gradient-wrap">
        <HeroMeshGradient />
        <FramerExactNav />
        <FramerHeroExact />
      </div>
      <VisionSection />
      <FramerAboutExact />
      <AboutSpecializationsSection />
      <ValuePillars />
      <FortalezasSection />
      <ServicesSection />
      <FramerWorkGridExact />
      <FramerLineUpExact />
      <FramerPartnersExact />
      <OderbizTestimonials />
      <OtherbeesFooter />
    </div>
  );
}
