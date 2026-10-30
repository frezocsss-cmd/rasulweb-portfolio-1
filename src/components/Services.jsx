import { services } from "../config/services";
import { ArrowRight, ArrowUpRight, ServiceIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="XIZMATLAR"
            title={
              <>
                Biznesingiz uchun <span className="text-serif-italic font-medium text-champagne">qanday sayt</span> kerak?
              </>
            }
            description="Web sayt yaratish bo'yicha har bir loyiha ehtiyojga qarab turlicha bo'ladi. Quyidagi yo'nalishlardan birini tanlang — qolganini birgalikda aniqlaymiz."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 90}>
              <div className="group card-surface relative h-full overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne/50 sm:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-champagne/0 blur-3xl transition-all duration-500 group-hover:bg-champagne/20" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-cream-2/60 text-espresso transition-colors duration-500 group-hover:border-champagne/60 group-hover:text-champagne">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </div>

                <h3 className="relative mt-6 text-lg font-bold tracking-tight text-espresso">{service.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-mocha">{service.desc}</p>

                <div className="relative mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha transition-colors duration-300 group-hover:text-champagne">
                  Batafsil
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 grid gap-7 rounded-3xl border border-hairline bg-card/70 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne">
                Nima uchun kerak?
              </span>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-espresso sm:text-2xl">
                Biznes uchun zamonaviy sayt — mijozlar va ishonch manbai
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mocha">
                Web sayt biznesingizni kecha-yu kunduz taqdim etadi, mijozlarga xizmatlar va mahsulotlar haqida aniq
                ma'lumot beradi hamda so'rovlarni qabul qiladi. Landing page, internet do'kon yoki admin panelli
                tizim — har biri biznesingizning aniq maqsadiga xizmat qilishi kerak.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mocha">
                Telegram bot, Supabase integratsiyasi va buyurtmalarni boshqarish kabi yechimlar kundalik ishni
                yengillashtiradi. Sayt yaratish jarayonida tezlik, mobil moslashuv va SEO asoslari ham hisobga
                olinadi.
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href="#packages"
                className="group flex items-center justify-between gap-4 rounded-xl border border-hairline bg-cream/70 px-4 py-3.5 text-sm font-semibold text-espresso transition-all duration-300 hover:border-champagne/60 hover:bg-card"
              >
                Xizmatlar va tariflar
                <ArrowRight className="h-4 w-4 text-mocha transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-champagne" />
              </a>
              <a
                href="#additional-services"
                className="group flex items-center justify-between gap-4 rounded-xl border border-hairline bg-cream/70 px-4 py-3.5 text-sm font-semibold text-espresso transition-all duration-300 hover:border-champagne/60 hover:bg-card"
              >
                Qo'shimcha xizmatlar
                <ArrowRight className="h-4 w-4 text-mocha transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-champagne" />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-between gap-4 rounded-xl bg-espresso px-4 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#473e35]"
              >
                Loyihani muhokala qilish
                <ArrowRight className="h-4 w-4 text-cream/80 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
