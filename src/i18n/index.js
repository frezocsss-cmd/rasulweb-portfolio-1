import uz from "./uz";
import ru from "./ru";
import en from "./en";

export const languages = [
  { code: "uz", label: "O'zbekcha", short: "UZ", flag: "🇺🇿" },
  { code: "ru", label: "Русский", short: "RU", flag: "🇷🇺" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
];

export const translations = { uz, ru, en };

export const defaultLanguage = "uz";

export function isLanguage(value) {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(translations, value);
}

export function format(template = "", vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  );
}

export function getDictionary(language) {
  return translations[isLanguage(language) ? language : defaultLanguage];
}
