import { site } from "../config/site";
import { useOrder } from "../context/order";
import { ArrowUpRight, Instagram, Telegram } from "./icons";
import Reveal from "./Reveal";

const channels = [
  {
    name: "Telegram",
    handle: "@rasulweb_uz",
    href: site.telegram,
    icon: Telegram,
    desc: "Eng tez aloqa usuli",
  },
  {
    name: "Telegram kanal",
    handle: "@rasulweb_uz",
    href: site.telegramChannel,
    icon: Telegram,
    desc: "Yangiliklar va ishlarim",
  },
  {
    name: "Instagram",
    handle: "rasulweb.uz",
    href: site.instagram,
    icon: Instagram,
    desc: "Vizual ishlar va jarayon",
  },
];

export default function Contact() {
  const { openOrder } = useOrder();

  return (
    <section id="contact" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-hairline bg-gradient-to-b from-cream-2/80 via-card to-card px-5 py-12 sm:rounded-[2rem] sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-champagne/25 blur-[120px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-champagne/70" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne">
                  06 — ALOQA
                </span>
                <span className="h-px w-8 bg-champagne/70" />
              </div>

              <h2 className="text-[clamp(1.6rem,5.6vw,3rem)] font-extrabold leading-[1.12] tracking-tight text-espresso">
                Keling, g'oyangizni{" "}
                <span className="text-serif-italic font-medium text-champagne">haqiqiy loyihaga</span> aylantiramiz.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-mocha sm:text-base">
                Biznesingiz uchun web-sayt kerakmi? Loyiha haqida yozing — talablaringizni ko'rib chiqib, mos yechimni
                taklif qilaman.
              </p>

              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_20px_50px_-22px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#473e35]"
                >
                  <Telegram className="h-5 w-5" />
                  Telegram orqali bog'lanish
                </a>
                <button
                  type="button"
                  onClick={() => openOrder()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-card/70 px-7 py-3.5 text-sm font-medium text-espresso backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:bg-cream-2"
                >
                  Loyiha so'rovini yuborish
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative mt-12 grid gap-4 sm:grid-cols-3">
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.name + i}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-hairline bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 hover:bg-card"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-cream-2/60 text-espresso transition-colors duration-300 group-hover:border-champagne/60 group-hover:text-champagne">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-espresso">{ch.name}</span>
                      <span className="block truncate text-xs text-mocha">{ch.handle}</span>
                      <span className="block text-[11px] text-mocha/70">{ch.desc}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-mocha transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne" />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
