import id from "./languages/id.json";
import en from "./languages/en.json";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";
export const localeCookie = "arrr-lang";

export type Dictionary = typeof id;

const dictionaries: Record<Locale, Dictionary> = { id, en };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale) => dictionaries[locale];
