import type { Dictionary, Locale } from "@/utils/i18n";
import Intro from "./_components/Intro";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import StudioStatement from "./_components/StudioStatement";
import Work from "./_components/Work";
import Origin from "./_components/Origin";
import Standard from "./_components/Standard";
import Catalog from "./_components/Catalog";
import Timeline from "./_components/Timeline";
import Closing from "./_components/Closing";
import Footer from "./_components/Footer";
import RevealObserver from "@/components/motion/RevealObserver";
import ScrollVars from "@/components/motion/ScrollVars";
import TabTitle from "@/components/shared/TabTitle";
import BackToTop from "@/components/shared/BackToTop";
import { sections } from "./_constants/sections";

// Urutan ala McLaren: intro konstruksi logo → hero film → pernyataan editorial → carousel → cerita → standar →
// katalog → linimasa ter-pin → band sinema → footer kolom.
export default function Home({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <>
      <Intro />
      <Header lang={lang} t={t.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t.hero} lang={lang} />
        <StudioStatement t={t.studio} />
        <Work t={t.work} />
        <Origin t={t.origin} />
        <Standard t={t.standard} />
        <Catalog t={t.catalog} />
        <Timeline t={t.timeline} />
        <Closing t={t.closing} />
      </main>
      <Footer t={t.footer} nav={t.nav} />
      <BackToTop label={t.nav.backToTop} />
      <RevealObserver />
      <ScrollVars />
      <TabTitle base={t.meta.title} away={t.meta.away} sections={Object.fromEntries(sections.map((id) => [id, t.nav[id]]))} />
    </>
  );
}
