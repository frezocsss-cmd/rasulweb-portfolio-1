import { navLinks, site } from "../config/site";
import { useOrder } from "../context/order";
import { Instagram, Telegram } from "./icons";

export default function Footer() {
  const { openOrder } = useOrder();
  const year = new Date().getFullYear();

  const socials = [
    { name: "Telegram", href: site.telegram, icon: Telegram },
    { name: "Instagram", href: site.instagram, icon: Instagram },
  ];

  return (
    <footer className="relative z-10 border-t border-hairline px-4 sm:px-6">
      <div className="mx-auto max-w-7xl py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-card font-serif text-lg font-semibold text-champagne">
                R
              </span>
              <span className="text-lg font-bold tracking-[0.14em] text-espresso">
                {site.brand}
                <span className="text-champagne">{site.brandTld}</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mocha">
              {site.owner} — zamonaviy, responsive va interaktiv web-saytlar yaratuvchi frontend dasturchi. Biznesingiz
              uchun ishonchli raqamli yechim.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-3.5 py-1.5 text-[11px] font-medium text-espresso/80">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Yangi loyihalar uchun ochiqman
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-espresso/90">Navigatsiya</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-mocha transition-colors hover:text-champagne">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-espresso/90">Bog'lanish</h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mocha transition-colors hover:text-champagne"
                >
                  Telegram — @rasulweb_uz
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mocha transition-colors hover:text-champagne"
                >
                  Instagram — rasulweb.uz
                </a>
              </li>
              <li className="text-sm text-mocha">{site.location}</li>
            </ul>
            <button
              type="button"
              onClick={() => openOrder()}
              className="mt-5 rounded-full bg-espresso px-5 py-2.5 text-xs font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#473e35]"
            >
              Loyiha buyurtma qilish
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-hairline pt-7 sm:flex-row">
          <p className="text-xs text-mocha">
            © {year} {site.brand}
            {site.brandTld}. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-card/70 text-mocha transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:text-champagne"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
