import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "../config/site";
import { useOrder } from "../context/order";
import { usePreferences } from "../context/usePreferences";
import { Check, ChevronDown, Close, Menu, Moon, Sun } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const langRef = useRef(null);
  const { openOrder } = useOrder();
  const { t, language, setLanguage, languages, theme, toggleTheme } = usePreferences();
  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event) => {
      if (!langRef.current?.contains(event.target)) setLangOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const chooseLanguage = (code) => {
    setLanguage(code);
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hairline bg-cream/80 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <a href="#home" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-card font-serif text-lg font-semibold text-champagne shadow-[0_6px_18px_-10px_rgba(52,45,39,0.5)]">
            R
          </span>
          <span className="hidden text-base font-bold tracking-[0.14em] text-espresso min-[420px]:inline sm:text-lg">
            {site.brand}
            <span className="text-champagne">{site.brandTld}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-hairline bg-card/70 p-1.5 backdrop-blur-md lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
                active === link.href ? "text-espresso" : "text-mocha hover:text-espresso"
              }`}
            >
              {active === link.href && (
                <span className="absolute inset-0 rounded-full bg-cream-2 ring-1 ring-hairline" />
              )}
              <span className="relative">{t.site.nav[link.key]}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((value) => !value)}
              aria-label={t.header.languageAria}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 rounded-full border border-hairline bg-card/70 px-2.5 py-2.5 text-espresso backdrop-blur-md transition-colors hover:bg-cream-2 sm:px-3"
            >
              <span className="text-sm leading-none" aria-hidden="true">
                {currentLanguage.flag}
              </span>
              <span className="hidden text-[11px] font-semibold min-[420px]:inline">{currentLanguage.short}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-mocha transition-transform duration-300 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div
                role="listbox"
                aria-label={t.header.languageAria}
                className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-hairline bg-card p-1.5 shadow-[0_24px_60px_-30px_rgba(52,45,39,0.55)] backdrop-blur-xl"
              >
                {languages.map((item) => {
                  const selected = item.code === language;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => chooseLanguage(item.code)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                        selected
                          ? "bg-cream-2 text-espresso"
                          : "text-mocha hover:bg-cream-2/70 hover:text-espresso"
                      }`}
                    >
                      <span className="text-base leading-none" aria-hidden="true">
                        {item.flag}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {selected && <Check className="h-3.5 w-3.5 text-champagne" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.header.themeToLight : t.header.themeToDark}
            title={theme === "dark" ? t.header.themeToLight : t.header.themeToDark}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-hairline bg-card/70 text-espresso backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:text-champagne"
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <button
            type="button"
            onClick={() => openOrder()}
            className="hidden rounded-full bg-espresso px-5 py-2.5 text-xs font-semibold text-cream shadow-[0_14px_34px_-18px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso-hover sm:block"
          >
            {t.header.order}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.header.menuAria}
            aria-expanded={menuOpen}
            className="rounded-full border border-hairline bg-card/70 p-2.5 text-espresso backdrop-blur-md transition-colors hover:bg-cream-2 lg:hidden"
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-cream/95 pt-24 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col gap-1 overflow-y-auto px-5 py-4">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-hairline py-4 text-xl font-semibold tracking-tight text-espresso/90 transition-colors hover:text-champagne sm:text-2xl"
              style={{
                animation: menuOpen ? `rise 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both` : "none",
              }}
            >
              {t.site.nav[link.key]}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openOrder();
            }}
            className="mt-6 rounded-full bg-espresso px-6 py-4 text-sm font-semibold text-cream"
          >
            {t.header.order}
          </button>
        </div>
      </div>
    </header>
  );
}
