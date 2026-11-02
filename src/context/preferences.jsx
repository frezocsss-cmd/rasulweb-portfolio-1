import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultLanguage, format, getDictionary, isLanguage, languages } from "../i18n";
import { PreferencesContext } from "./preferences-context";

const THEME_KEY = "rasulweb-theme";
const LANGUAGE_KEY = "rasulweb-language";

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore unavailable storage */
  }
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = readStorage(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialLanguage() {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = readStorage(LANGUAGE_KEY);
  if (isLanguage(stored)) return stored;
  const browser = (navigator.language || "").slice(0, 2).toLowerCase();
  if (browser === "ru") return "ru";
  if (browser === "en") return "en";
  return defaultLanguage;
}

function setMeta(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) el.setAttribute("content", value);
}

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguageState] = useState(getInitialLanguage);
  const firstThemeRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    writeStorage(THEME_KEY, theme);

    setMeta('meta[name="theme-color"]', theme === "dark" ? "#12100e" : "#F7F4ED");

    if (firstThemeRun.current) {
      firstThemeRun.current = false;
      return;
    }

    root.classList.add("theme-transition");
    const timer = window.setTimeout(() => root.classList.remove("theme-transition"), 520);
    return () => window.clearTimeout(timer);
  }, [theme]);

  useEffect(() => {
    const dictionary = getDictionary(language);
    const root = document.documentElement;

    root.lang = language;
    root.dir = "ltr";
    writeStorage(LANGUAGE_KEY, language);

    document.title = dictionary.seo.title;
    setMeta('meta[name="description"]', dictionary.seo.description);
    setMeta('meta[property="og:title"]', dictionary.seo.title);
    setMeta('meta[property="og:description"]', dictionary.seo.description);
    setMeta('meta[property="og:locale"]', dictionary.seo.locale);
    setMeta('meta[name="twitter:title"]', dictionary.seo.title);
    setMeta('meta[name="twitter:description"]', dictionary.seo.description);
  }, [language]);

  const setLanguage = useCallback((next) => {
    if (isLanguage(next)) setLanguageState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
      language,
      setLanguage,
      languages,
      t: getDictionary(language),
      format,
    }),
    [theme, language, setLanguage, toggleTheme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
