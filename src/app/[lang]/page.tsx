import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/utils/i18n";
import Home from "@/templates/home/Home";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Home lang={lang} t={getDictionary(lang)} />;
}
