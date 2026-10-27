export type Theme = "light" | "dark";
export const themeStorageKey = "arrr-theme";

// Dijalankan sebelum render pertama supaya tidak ada kedip tema: pilihan tersimpan → preferensi sistem.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;
