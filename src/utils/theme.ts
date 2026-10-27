export type Theme = "light" | "dark";
export const themeStorageKey = "arrr-theme";

// Dijalankan sebelum render pertama: tema tanpa kedip (tersimpan → sistem) + kelas "js" agar animasi
// reveal hanya menyembunyikan konten bila JavaScript aktif.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}document.documentElement.classList.add("js")})()`;
