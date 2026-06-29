import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { SmoothScrollProvider } from "@/app/components/smooth-scroll/smooth-scroll-provider";
import { messinaSans } from "../fonts";
import "../globals.css";
import { routing, type Locale } from "@/i18n/routing";

export const viewport: Viewport = {
  themeColor: "#f6f5f3",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: `%s | Oderbiz`,
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "Oderbiz" }],
    creator: "Oderbiz",
    metadataBase: new URL("https://oderbiz.com"),
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_EC" : "en_US",
      siteName: "Oderbiz",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: "/assets/cropped-android-chrome-512x512-1.png",
    },
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${messinaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScrollProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
