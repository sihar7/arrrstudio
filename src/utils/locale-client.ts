import { localeCookie, type Locale } from "./i18n";

// Disimpan di cookie supaya proxy bisa mengarahkan "/" ke bahasa pilihan terakhir.
export function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
