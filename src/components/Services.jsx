import { services } from "../config/services";
import { useOrder } from "../context/order";
import { ArrowUpRight, ServiceIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const { openOrder } = useOrder();

  return (
    <section id="services" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="XIZMATLAR"
            title={
              <>
                Biznesingiz uchun <span className="text-gradient-neon">qanday sayt</span> kerak?
              </>
            }
            description="Har bir loyiha ehtiyojga qarab turlicha bo'ladi. Quyidagi yo'nalishlardan birini tanlang — qolganini birgalikda aniqlaymiz."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-neon/30 hover:bg-white/[0.045] sm:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/0 blur-3xl transition-all duration-500 group-hover:bg-neon/20" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-white transition-colors duration-500 group-hover:border-neon/40 group-hover:text-neon">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </div>

                <h3 className="relative mt-6 text-lg font-bold tracking-tight">{service.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-soft">{service.desc}</p>

                <div className="relative mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-soft/60 transition-colors duration-300 group-hover:text-neon">
                  Batafsil
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-crimson/20 via-white/[0.02] to-transparent p-5 text-center sm:flex-row sm:p-7 sm:text-left">
            <p className="max-w-2xl text-sm leading-relaxed text-soft">
              Aniq qamrov va narx sizning talablaringizga bog'liq. Loyihangiz haqida yozing — men eng mos yechimni
              taklif qilaman.
            </p>
            <button
              type="button"
              onClick={() => openOrder()}
              className="w-full shrink-0 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_-18px_rgba(255,0,60,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff2452] sm:w-auto"
            >
              Loyihani muhokama qilish
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
