import Image from "next/image";
import Scramble from "@/components/motion/Scramble";
import { Catalog, Studio } from "@/config/studio";
import type { Dictionary } from "@/utils/i18n";

type CardText = Dictionary["philosophy"]["card"];
type NameText = Dictionary["philosophy"]["name"];

const releases = Catalog.reduce((sum, g) => sum + g.items.length, 0);

// Kartu profil pemain ala HUD game: nama di game "Arrr", lalu "Arrr" + "Studio" menyatu jadi ArrrStudio.
export default function PlayerCard({ card, name }: { card: CardText; name: NameText }) {
  const { founder } = Studio;
  const stats = [
    { k: card.role, v: card.roleValue },
    { k: card.since, v: String(Studio.foundedYear) },
    { k: card.releases, v: card.releasesValue.replace("{n}", String(releases)) },
  ];

  return (
    <div className="frame-dark spotlight overflow-hidden">
      <div className="flex h-11 items-center justify-between border-b-[0.5px] border-white/10 px-5 font-mono text-xs text-[var(--fog)]">
        <span>ARR-PLAYER · {name.player}</span>
        <span className="flex items-center gap-2 text-[var(--mist)]">
          <span aria-hidden className="live-dot size-1.5 rounded-full bg-[var(--maroon-300)]" />
          {card.status}
        </span>
      </div>

      <div className="flex items-center gap-5 p-6 md:p-8">
        <div className="relative size-16 shrink-0 rounded-full bg-[linear-gradient(150deg,#e5e5e6,#383b3f_45%,#a3243b)] p-[1.5px] md:size-20">
          <Image src={founder.photo.src} alt="" width={160} height={160} className="size-full rounded-full object-cover object-top" />
        </div>
        <div className="min-w-0">
          <Scramble text="Arrr" className="text-[clamp(2.5rem,5vw,3.5rem)] font-[510] leading-none tracking-[-0.022em] text-white" />
          <p className="mt-2 truncate font-mono text-xs text-[var(--fog)]">
            @sihar7 · {founder.name}
          </p>
        </div>
      </div>
      <p className="-mt-2 px-6 pb-6 text-[15px] text-[var(--fog)] md:px-8">{name.playerText}</p>

      <dl className="grid grid-cols-3 border-y-[0.5px] border-white/10">
        {stats.map((s, i) => (
          <div key={s.k} className={`px-5 py-4 md:px-8 ${i > 0 ? "border-l-[0.5px] border-white/10" : ""}`}>
            <dt className="font-mono text-xs text-[var(--fog)]">{s.k}</dt>
            <dd className="mt-1 text-[15px] text-white">{s.v}</dd>
          </div>
        ))}
      </dl>

      <div className="p-6 md:p-8">
        <p className="font-mono text-xs text-[var(--fog)]">{card.merge}</p>
        <p data-reveal aria-label="Arrr + Studio = ArrrStudio" className="merge mt-4 flex items-baseline text-[clamp(2.25rem,5vw,3.5rem)] font-[510] leading-none tracking-[-0.022em] text-white">
          <span aria-hidden>Arrr</span>
          <span aria-hidden className="merge-plus inline-block overflow-hidden whitespace-pre text-[var(--maroon-300)]">
            {" + "}
          </span>
          <span aria-hidden className="merge-word">
            Studio
          </span>
        </p>
        <p className="mt-4 max-w-[40ch] text-[15px] text-[var(--fog)]">{name.studioText}</p>
      </div>
    </div>
  );
}
