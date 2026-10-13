import { formatPrice, packages } from "../config/packages";
import { useOrder } from "../context/order";
import { Check, Sparkle } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Packages() {
  const { openOrder } = useOrder();

  return (
    <section id="packages" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="PAKETLAR"
            title={
              <>
                Xizmatingizga mos <span className="text-gradient-neon">paketni tanlang</span>
              </>
            }
            description="Boshlang'ich narxlar — yakuniy narx loyiha qamrovi, dizayn murakkabligi va integratsiyalarga qarab belgilanadi."
          />
        </Reveal>

        <div
          className="mt-12 flex snap-x snap-mandatory items-stretch gap-[clamp(6px,1.7vw,20px)] overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[360px]:mt-16 min-[360px]:grid min-[360px]:grid-cols-3 min-[360px]:overflow-visible min-[360px]:pb-0"
          aria-label="Paketlar"
        >
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.id}
              delay={i * 110}
              className={`h-full min-w-[78%] shrink-0 snap-center min-[360px]:min-w-0 min-[360px]:shrink ${
                pkg.recommended ? "min-[360px]:z-10" : ""
              }`}
            >
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-[clamp(11px,3.4vw,32px)] transition-all duration-500 hover:-translate-y-1.5 sm:rounded-3xl ${
                  pkg.recommended
                    ? "border-neon/40 bg-gradient-to-b from-neon/[0.10] via-white/[0.03] to-transparent shadow-[0_40px_120px_-50px_rgba(255,0,60,0.8)]"
                    : "border-white/[0.08] bg-white/[0.025] hover:border-white/20"
                }`}
              >
                {pkg.recommended && (
                  <>
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-neon/25 blur-[90px]" />
                    <span className="absolute right-[clamp(6px,2.4vw,20px)] top-[clamp(6px,2.4vw,20px)] inline-flex items-center gap-1 rounded-full bg-neon px-[clamp(6px,1.6vw,12px)] py-[clamp(2px,0.7vw,4px)] text-[clamp(7px,1.6vw,10px)] font-bold uppercase tracking-wide text-white sm:tracking-widest">
                      <Sparkle className="hidden h-3 w-3 shrink-0 min-[480px]:block" />
                      <span className="hidden min-[480px]:inline">Tavsiya etiladi</span>
                      <span className="min-[480px]:hidden">Tavsiya</span>
                    </span>
                  </>
                )}

                <div className="relative min-w-0">
                  <h3 className="font-mono text-[clamp(9px,2.6vw,13px)] font-bold uppercase tracking-[0.18em] text-soft">
                    {pkg.name}
                  </h3>
                  <div className="mt-[clamp(6px,2vw,20px)] flex flex-wrap items-end gap-x-1.5 gap-y-0">
                    <span className="text-[clamp(15px,4.1vw,38px)] font-extrabold leading-none tracking-tight text-white">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="mb-0.5 text-[clamp(8px,2.3vw,13px)] font-medium text-soft">so'mdan</span>
                  </div>
                  <p className="mt-[clamp(4px,1.4vw,12px)] hidden text-[clamp(9px,2.5vw,13px)] text-soft min-[480px]:block">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="relative my-[clamp(8px,2.6vw,28px)] h-px w-full bg-white/[0.08]" />

                <ul className="relative flex-1 space-y-[clamp(5px,1.5vw,14px)]">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-[clamp(4px,1.3vw,12px)] text-[clamp(9px,2.7vw,13px)] leading-snug text-white/85"
                    >
                      <span
                        className={`mt-px flex h-[clamp(12px,3vw,20px)] w-[clamp(12px,3vw,20px)] shrink-0 items-center justify-center rounded-full ${
                          pkg.recommended ? "bg-neon/20 text-neon" : "bg-white/[0.07] text-white/70"
                        }`}
                      >
                        <Check className="h-[55%] w-[55%]" />
                      </span>
                      <span className="min-w-0 break-words">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openOrder(pkg.id)}
                  className={`relative mt-[clamp(8px,2.6vw,28px)] w-full rounded-full px-[clamp(6px,2.4vw,22px)] py-[clamp(7px,2.2vw,13px)] text-[clamp(9px,2.5vw,13px)] font-semibold leading-tight transition-all duration-300 ${
                    pkg.recommended
                      ? "bg-neon text-white shadow-[0_16px_50px_-18px_rgba(255,0,60,0.95)] hover:-translate-y-0.5 hover:bg-[#ff2452]"
                      : "border border-white/15 bg-white/[0.03] text-white hover:border-neon/40 hover:bg-neon/10"
                  }`}
                >
                  Buyurtma berish
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-soft/60 min-[360px]:hidden">
          Paketlarni ko'rish uchun yon tomonga suring →
        </p>

        <Reveal delay={140}>
          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7">
            <p className="text-sm leading-relaxed text-soft">
              <strong className="text-white/90">Eslatma:</strong> yuqoridagi narxlar boshlang'ich bo'lib, yakuniy
              hisob-kitob loyiha qamrovi, dizayn murakkabligi, funksionallik va integratsiyalarga qarab farq qiladi.
              Domen, hosting, pullik uchinchi tomon xizmatlari, keng ko'lamli backend ishlari va doimiy texnik xizmat
              alohida kelishiladi. Cheksiz qayta ishlash yoki kelishilmagan funksiyalar taklif etilmaydi.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
