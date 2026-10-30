// Semua tautan keluar ArrrStudio dikumpulkan di sini supaya cukup diganti di satu tempat.
export const Url = {
  store: "https://www.arrveilstore.my.id/",
  license: "https://arrstudioweb.vercel.app/en",
  converter: "https://bypass.arrrstudio.com",
  databridge: "https://databridge.arrrstudio.com",
  discord: "https://discord.gg/mtn3YmwjV",
  founderPortfolio: "https://portfolio-founder.arrrstudio.com/",
  founderGithub: "https://github.com/sihar7",
} as const;

// Alamat situs untuk URL absolut (og:image, canonical). Set NEXT_PUBLIC_SITE_URL setelah domain final ada.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const host = (url: string) => new URL(url).host.replace(/^www\./, "");
