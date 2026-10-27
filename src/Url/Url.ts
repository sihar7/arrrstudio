// Semua tautan keluar ArrrStudio dikumpulkan di sini supaya cukup diganti di satu tempat.
export const Url = {
  store: "https://www.arrveilstore.my.id/",
  license: "https://arrstudioweb.vercel.app/en",
  converter: "https://bypass.arrrstudio.com",
  discord: "https://discord.gg/mtn3YmwjV",
  founderPortfolio: "https://portfoliosigit.vercel.app/",
  founderGithub: "https://github.com/sihar7",
} as const;

export const host = (url: string) => new URL(url).host.replace(/^www\./, "");
