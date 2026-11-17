import type { Metadata, Viewport } from "next";
import { Lexend, Syncopate } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "@/utils/i18n";
import { themeInitScript } from "@/utils/theme";
import { siteUrl } from "@/Url/Url";
import RootStateSync from "@/components/shared/RootStateSync";
import "@/css/globals.css";

// Syncopate = huruf lebar kapital seperti wordmark "ARRR STUDIO"; Lexend = teks baca yang sedikit lebar.
const syncopate = Syncopate({ variable: "--font-syncopate", subsets: ["latin"], weight: ["400", "700"] });
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"], weight: ["300", "400", "500"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: { default: t.meta.title, template: "%s ✦ ArrrStudio" },
    description: t.meta.description,
    metadataBase: new URL(siteUrl),
    applicationName: "ArrrStudio",
    alternates: { canonical: `/${lang}`, languages: { id: "/id", en: "/en", "x-default": "/id" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      url: `/${lang}`,
      siteName: "ArrrStudio",
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? "en_US" : "id_ID",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#060b1c" },
    { media: "(prefers-color-scheme: dark)", color: "#060b1c" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} suppressHydrationWarning className={`${syncopate.variable} ${lexend.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">
        <RootStateSync />
        {children}
      </body>
    </html>
  );
}
