// Fakta tetap studio. Teks yang bergantung bahasa ada di src/utils/languages/*.json.
export const Studio = {
  name: "ArrrStudio",
  // Logo resmi (navy · silver): mark "A" + orbit + bintang, dan lockup lengkap. Latar transparan, ukuran asli untuk rasio.
  mark: { src: "/brand/arrr-a.webp", width: 599, height: 422 },
  lockup: { src: "/brand/arrr-lockup.webp", width: 821, height: 591 },
  wordmark: { src: "/brand/arrr-wordmark.webp", width: 821, height: 120 },
  // Film hero (dibuat dari skrip di scripts/film). Poster = frame pertama yang terbaca.
  // hero = versi ambient tanpa tipografi (latar judul); full = film lengkap bertulisan di pemutar "Tonton film".
  // Keduanya membawa narasi suara perempuan sesuai bahasa halaman (id: Gadis, en: Ava).
  film: {
    src: (lang: string) => `/film/arrrstudio-hero-${lang}.mp4`,
    mobile: (lang: string) => `/film/arrrstudio-hero-${lang}-720.mp4`,
    full: (lang: string) => `/film/arrrstudio-film-${lang}.mp4`,
    poster: "/film/poster.webp",
    fullPoster: "/film/film-poster.webp",
    closing: "/film/closing.webp",
  },
  foundedYear: 2026,
  city: "Bandung",
  country: "ID",
  founder: {
    name: "Sigit Hardianto",
    initials: "SH",
    photo: { src: "/brand/founder.webp", width: 960, height: 1200 },
    stack: ["Next.js", "Vue.js", "React", "Laravel", ".NET", "Node.js", "MySQL", "SQL Server", "Luau"],
  },
} as const;

export type CatalogGroup = { key: "kits" | "tools"; items: string[] };

// Nama produk mengikuti katalog Arrveil.store; harga sengaja tidak ditulis di sini karena berubah di toko.
export const Catalog: CatalogGroup[] = [
  {
    key: "kits",
    items: [
      "Hangout Kit Cartoony",
      "Hangout Kit V2",
      "Club Kit Pro",
      "Club Kit Exclusive",
      "Summit Kit V1",
      "Summit Kit V2",
      "Pet System",
      "Inventory System",
    ],
  },
  {
    key: "tools",
    items: [
      "iPhone 18 Pro Tools",
      "Samsung Z Fold Tools",
      "Music System",
      "Overhead Custom Title",
      "Streamer Pro",
      "Efek Donasi",
      "Loading Screen",
      "Custom Backpack",
      "Gitar Kit",
      "Drone Show",
    ],
  },
];

export type WorkId = "databridge" | "converter" | "store" | "license" | "discord";
export type Work = { id: WorkId; href: "databridge" | "converter" | "store" | "license" | "discord"; image?: string; isNew?: boolean };

// Isi carousel Ekosistem (terbaru dulu). Gambar = tangkapan layar asli produk di public/work.
export const Works: Work[] = [
  { id: "databridge", href: "databridge", image: "/work/databridge.webp", isNew: true },
  { id: "converter", href: "converter", image: "/work/bypass.webp" },
  { id: "store", href: "store", image: "/work/store.webp" },
  { id: "license", href: "license", image: "/work/license.webp" },
  { id: "discord", href: "discord" },
];
