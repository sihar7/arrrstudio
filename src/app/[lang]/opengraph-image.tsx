import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Studio } from "@/config/studio";
import { defaultLocale, getDictionary, hasLocale } from "@/utils/i18n";

// Kartu preview saat link dibagikan (WhatsApp, Discord, TikTok, X, Telegram, dsb.) — navy + logo silver.
export const alt = "ArrrStudio — Roblox & web studio from Bandung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(join(process.cwd(), "src/assets/og", file));

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : defaultLocale);
  const [inter, interSemi, logo] = await Promise.all([asset("Inter-400.ttf"), asset("Inter-600.ttf"), asset("logo.png")]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 72px",
          gap: 64,
          background: "radial-gradient(70% 90% at 30% 50%, #16245a 0%, #0a1330 45%, #03061a 100%)",
          color: "#f2f4fa",
          fontFamily: "Inter",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse hanya menerima <img> */}
        <img src={logoSrc} width={420} height={296} alt="" />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 5, color: "#b9c1da", textTransform: "uppercase" }}>
            {t.hero.eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 62, fontWeight: 600, lineHeight: 1.02, letterSpacing: 1, textTransform: "uppercase" }}>
            {t.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 24, color: "#b9c1da", lineHeight: 1.4 }}>{t.hero.lead}</div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 20, color: "#8790b0", letterSpacing: 3, textTransform: "uppercase" }}>
            {Studio.founder.name} · {Studio.city}, ID
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, display: "flex", background: "linear-gradient(90deg, #f2f4fa 0%, #7fa2ff 60%, #16245a 100%)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter, style: "normal", weight: 400 },
        { name: "Inter", data: interSemi, style: "normal", weight: 600 },
      ],
    },
  );
}
