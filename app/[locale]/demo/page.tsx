import { setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DemoOne({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <HeroSection
      distortion={1.2}
      speed={0.8}
      colors={[
        "#D90754",
        "#BF0F70",
        "#64278C",
        "#FDC831",
        "#F27457",
        "#FFFFFF",
      ]}
    />
  );
}
