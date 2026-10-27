// Fakta tetap studio. Teks yang bergantung bahasa ada di src/utils/languages/*.json.
export const Studio = {
  name: "ArrrStudio",
  // Logo transparan (chrome + maroon) di public/brand; ukuran asli dipakai untuk rasio next/image.
  logo: { src: "/brand/arrr-studio.webp", width: 1650, height: 562 },
  // Huruf A dari logo — dipakai di ukuran kecil (header) karena wordmark penuh tidak terbaca.
  mark: { src: "/brand/arrr-mark.webp", width: 729, height: 418 },
  // Siluet mark kecil (±2 KB) untuk mask efek kilau logo.
  markMask: "/brand/arrr-mark-mask.webp",
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
