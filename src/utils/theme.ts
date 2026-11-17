export type Theme = "light" | "dark";
export const themeStorageKey = "arrr-theme";
export const introStorageKey = "arrr-intro";

// Satu sumber logika: tema tersimpan (default gelap navy), kelas "js" agar animasi reveal hanya menyembunyikan
// konten bila JavaScript aktif, dan "no-intro" bila intro sudah tampil di sesi ini.
function applyRootState() {
  const d = document.documentElement;
  try {
    const t = localStorage.getItem("arrr-theme");
    d.dataset.theme = t === "light" ? "light" : "dark";
    if (sessionStorage.getItem("arrr-intro")) d.classList.add("no-intro");
  } catch {
    d.dataset.theme = "dark";
  }
  d.classList.add("js");
}

// Dijalankan sebelum render pertama (tanpa kedip).
export const themeInitScript = `(${applyRootState.toString()})()`;

// Dipanggil lagi di klien setiap root layout dipasang ulang (mis. ganti bahasa /id ↔ /en membuat React memasang
// ulang <html> sehingga atribut dari skrip awal hilang).
export const syncRootState = applyRootState;
