import { useContext } from "react";
import { defaultLanguage, format, getDictionary, languages } from "../i18n";
import { PreferencesContext } from "./preferences-context";

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    return {
      theme: "light",
      isDark: false,
      setTheme: () => {},
      toggleTheme: () => {},
      language: defaultLanguage,
      setLanguage: () => {},
      languages,
      t: getDictionary(defaultLanguage),
      format,
    };
  }
  return ctx;
}
