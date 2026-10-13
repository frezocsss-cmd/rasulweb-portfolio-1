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
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-b from-crimson/25 via-white/[0.02] to-transparent px-5 py-12 sm:rounded-[2rem] sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-neon/20 blur-[120px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-neon/60" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neon">
                  06 — ALOQA
                </span>
                <span className="h-px w-8 bg-neon/60" />
              </div>

              <h2 className="text-[clamp(1.6rem,5.6vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
                Keling, g'oyangizni <span className="text-gradient-neon">haqiqiy loyihaga</span> aylantiramiz.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
                Biznesingiz uchun web-sayt kerakmi? Loyiha haqida yozing — talablaringizni ko'rib chiqib, mos yechimni
                taklif qilaman.
              </p>

              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_55px_-18px_rgba(255,0,60,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff2452]"
                >
                  <Telegram className="h-5 w-5" />
                  Telegram orqali bog'lanish
                </a>
                <button
                  type="button"
                  onClick={() => openOrder()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
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
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-300 group-hover:border-neon/40 group-hover:text-neon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">{ch.name}</span>
                      <span className="block truncate text-xs text-soft">{ch.handle}</span>
                      <span className="block text-[11px] text-soft/60">{ch.desc}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
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
