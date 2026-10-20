import { useEffect, useState } from "react";
import { navLinks, site } from "../config/site";
import { useOrder } from "../context/order";
import { Close, Menu } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { openOrder } = useOrder();

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hairline bg-cream/80 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Rasulweb.uz">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-card font-serif text-lg font-semibold text-champagne shadow-[0_6px_18px_-10px_rgba(52,45,39,0.5)]">
            R
          </span>
          <span className="text-base font-bold tracking-[0.14em] text-espresso sm:text-lg">
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
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openOrder()}
            className="hidden rounded-full bg-espresso px-5 py-2.5 text-xs font-semibold text-cream shadow-[0_14px_34px_-18px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#473e35] sm:block"
          >
            Loyiha buyurtma qilish
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menyu"
            aria-expanded={menuOpen}
            className="rounded-full border border-hairline bg-card/70 p-2.5 text-espresso backdrop-blur-md transition-colors hover:bg-cream-2 lg:hidden"
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-cream/97 pt-24 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
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
              {link.label}
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
            Loyiha buyurtma qilish
          </button>
        </div>
      </div>
    </header>
  );
}
