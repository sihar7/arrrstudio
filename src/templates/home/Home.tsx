import type { Dictionary, Locale } from "@/utils/i18n";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Philosophy from "./_components/Philosophy";
import Founder from "./_components/Founder";
import Ecosystem from "./_components/Ecosystem";
import Catalog from "./_components/Catalog";
import Timeline from "./_components/Timeline";
import Closing from "./_components/Closing";
import Marquee from "./_components/Marquee";
import SpotlightTracker from "@/components/motion/SpotlightTracker";
import BackToTop from "@/components/shared/BackToTop";

export default function Home({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <>
      <Header lang={lang} t={t.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <Marquee caption={t.hero.strip} />
        <About t={t.about} />
        <Philosophy t={t.philosophy} />
        <Founder t={t.founder} />
        <Ecosystem t={t.ecosystem} />
        <Catalog t={t.catalog} />
        <Timeline t={t.timeline} />
      </main>
      <Closing t={t} />
      <SpotlightTracker />
      <BackToTop label={t.nav.backToTop} />
    </>
  );
}
