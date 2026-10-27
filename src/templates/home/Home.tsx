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
import RevealObserver from "@/components/motion/RevealObserver";
import BackToTop from "@/components/shared/BackToTop";
import TabTitle from "@/components/shared/TabTitle";
import { sections } from "./_constants/sections";

export default function Home({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <>
      <Header lang={lang} t={t.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <div className="tone-raised">
          <Marquee caption={t.hero.strip} />
        </div>
        <About t={t.about} />
        <div className="tone-inverse">
          <Philosophy t={t.philosophy} />
        </div>
        <Founder t={t.founder} />
        <div className="tone-raised">
          <Ecosystem t={t.ecosystem} />
        </div>
        <Catalog t={t.catalog} />
        <div className="tone-raised">
          <Timeline t={t.timeline} />
        </div>
      </main>
      <div className="tone-brand">
        <Closing t={t} />
      </div>
      <SpotlightTracker />
      <RevealObserver />
      <BackToTop label={t.nav.backToTop} />
      <TabTitle base={t.meta.title} away={t.meta.away} sections={Object.fromEntries(sections.map((id) => [id, t.nav[id]]))} />
    </>
  );
}
