import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Studio } from "@/config/studio";
import { defaultLocale, getDictionary, hasLocale } from "@/utils/i18n";

// Kartu preview saat link dibagikan (WhatsApp, Discord, TikTok, X, Telegram, dsb.).
export const alt = "ArrrStudio — Roblox & web studio from Bandung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(join(process.cwd(), "src/assets/og", file));

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : defaultLocale);
  const [inter, interSemi, mono, logo] = await Promise.all([asset("Inter-400.ttf"), asset("Inter-600.ttf"), asset("JetBrainsMono-400.ttf"), asset("logo.png")]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const tags = t.spec.focusValue.split(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: "radial-gradient(80% 90% at 85% 110%, #3a0d18 0%, rgba(8,9,10,0) 60%), linear-gradient(180deg, #0f1012 0%, #08090a 100%)",
          color: "#f7f8f8",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 22, color: "#8a8f98" }}>
          <span>arrrstudio · {Studio.city}, ID</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 10, background: "#e0899a" }} />
            Est. {Studio.foundedYear}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse hanya menerima <img> */}
          <img src={logoSrc} width={520} height={177} alt="" style={{ marginLeft: -8 }} />
          <div style={{ display: "flex", marginTop: 28, fontSize: 52, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.022em", maxWidth: 1000 }}>{t.hero.title}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ display: "flex", padding: "8px 18px", borderRadius: 999, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 22, color: "#d0d6e0" }}>
                {tag}
              </span>
            ))}
          </div>
          <span style={{ display: "flex", fontSize: 22, color: "#8a8f98" }}>
            {Studio.founder.name} (Arrr) · {t.spec.teamValue}
          </span>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, display: "flex", background: "linear-gradient(90deg, #e5e5e6 0%, #8a8f98 45%, #a3243b 100%)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter, style: "normal", weight: 400 },
        { name: "Inter", data: interSemi, style: "normal", weight: 600 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
