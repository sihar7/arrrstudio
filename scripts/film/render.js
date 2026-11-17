// ArrrStudio — render film hero (by ArrrStudio · https://arrrstudio.com · Discord https://discord.gg/mtn3YmwjV)
// Pemakaian: node scripts/film/render.js <folder-frame> [fps=30] [hero]
//   tanpa "hero" = film lengkap bertulisan (pemutar "Tonton film"); "hero" = versi ambient latar hero.
// Membuka stage.html di Chrome headless, memanggil window.render(t) per frame, menyimpan JPEG berurutan.
// Gabungkan dengan audio.py lewat ffmpeg (lihat scripts/film/README.md).
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_CORE || path.join(process.env.APPDATA || "", "npm/node_modules/playwright-core"));

const out = process.argv[2];
const fps = Number(process.argv[3] || 30);
const DUR = 24;
if (!out) throw new Error("folder output wajib diisi");
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const mode = process.argv[4] === "hero" ? "?hero" : "";
  await page.goto("file:///" + path.resolve(__dirname, "stage.html").replace(/\\/g, "/") + mode);
  await page.evaluate(() => window.ready);
  const canvas = await page.$("#c");
  const total = Math.round(DUR * fps);
  for (let f = 0; f < total; f++) {
    await page.evaluate((t) => window.render(t), f / fps);
    await canvas.screenshot({ path: path.join(out, `f${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 93 });
    if (f % 60 === 0) process.stdout.write(`frame ${f}/${total}\n`);
  }
  await browser.close();
})();
