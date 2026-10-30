import { useCallback, useEffect, useRef, useState } from "react";
import { packages } from "../config/packages";
import { site } from "../config/site";
import { useOrder } from "../context/order";
import { ArrowRight, Check, Sparkle, Telegram } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function PackageCard({ pkg, openOrder }) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-[clamp(16px,3.6vw,30px)] transition-all duration-500 sm:rounded-3xl ${
        pkg.recommended
          ? "border-champagne/60 bg-card shadow-[0_40px_100px_-55px_rgba(184,165,138,0.9)]"
          : "border-hairline bg-card/70 hover:-translate-y-1.5 hover:border-champagne/40"
      }`}
    >
      {pkg.recommended && (
        <>
          <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-champagne/25 blur-[90px]" />
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-espresso px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-cream">
            <Sparkle className="h-3 w-3 text-cream/80" />
            <span className="hidden min-[400px]:inline">Tavsiya etiladi</span>
            <span className="min-[400px]:hidden">Tavsiya</span>
          </span>
        </>
      )}

      <div className="relative min-w-0">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-champagne">{pkg.name}</h3>
        <p className="mt-2 text-xs font-medium leading-relaxed text-mocha">{pkg.tagline}</p>
        <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="text-[clamp(1.85rem,5.4vw,2.6rem)] font-extrabold leading-none tracking-tight text-espresso">
            {pkg.priceLabel}
          </span>
          <span className="mb-1 text-xs font-medium text-mocha">{pkg.priceNote}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-mocha">{pkg.summary}</p>
      </div>

      <div className="relative my-6 h-px w-full bg-hairline" />

      <ul className="relative flex-1 space-y-3.5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-snug text-espresso/85">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                pkg.recommended ? "bg-champagne/20 text-champagne" : "bg-cream-2 text-mocha"
              }`}
            >
              <Check className="h-3 w-3" />
            </span>
            <span className="min-w-0 break-words">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7 space-y-3">
        <button
          type="button"
          onClick={() => openOrder(pkg.id)}
          className={`w-full rounded-full px-6 py-3.5 text-sm font-semibold leading-tight transition-all duration-300 ${
            pkg.recommended
              ? "bg-espresso text-cream shadow-[0_18px_45px_-20px_rgba(52,45,39,0.9)] hover:-translate-y-0.5 hover:bg-[#473e35]"
              : "border border-hairline bg-cream-2/60 text-espresso hover:-translate-y-0.5 hover:border-champagne/60 hover:bg-card"
          }`}
        >
          Buyurtma berish
        </button>
        <a
          href="#contact"
          className="group/link flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-mocha transition-colors duration-300 hover:text-espresso"
        >
          Loyihani muhokala qilish
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

function PackageCarousel({ openOrder }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = packages.length;
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const slideStride = () => {
    const el = trackRef.current;
    if (!el || el.children.length < 2) return 0;
    const a = el.children[0].getBoundingClientRect();
    const b = el.children[1].getBoundingClientRect();
    return b.left - a.left;
  };

  const scrollToIndex = useCallback((index, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    const stride = slideStride();
    if (!stride) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    el.scrollTo({ left: clamped * stride, behavior: smooth ? "smooth" : "auto" });
  }, [count]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => scrollToIndex(0, false));
    return () => cancelAnimationFrame(raf);
  }, [scrollToIndex]);

  const currentIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const stride = slideStride();
    if (!stride) return 0;
    return Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / stride)));
  }, [count]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const stride = slideStride();
    if (!stride) return;
    setActive(Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / stride))));
  }, [count]);

  const step = (dir) => {
    scrollToIndex(currentIndex() + dir);
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    dragging.current = true;
    startX.current = e.clientX;
    startScroll.current = trackRef.current.scrollLeft;
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = startScroll.current - dx;
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    scrollToIndex(currentIndex());
  };

  return (
    <div className="relative mt-12 sm:mt-16">
      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Xizmat tariflari karuseli"
        className="carousel-scroll flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        style={{ touchAction: "pan-x pan-y", cursor: "grab" }}
      >
        {packages.map((pkg) => (
          <div key={pkg.id} className="w-[82vw] max-w-[360px] shrink-0 snap-center sm:w-[68vw] md:w-[52vw]">
            <PackageCard pkg={pkg} openOrder={openOrder} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Oldingi tarif"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-card text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {packages.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`${p.name} tarifi`}
              aria-current={active === i}
              onClick={() => scrollToIndex(i)}
              className="flex h-6 w-6 items-center justify-center rounded-full"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-7 bg-champagne" : "w-1.5 bg-espresso/20"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Keyingi tarif"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-card text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Packages() {
  const { openOrder } = useOrder();
  const isDesktop = useIsDesktop();

  return (
    <section id="packages" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="XIZMATLAR VA TARIFLAR"
            title={
              <>
                Xizmatlar va <span className="text-serif-italic font-medium text-champagne">tariflar</span>
              </>
            }
            description="Biznesingiz hajmi va maqsadiga mos paketni tanlang. Har bir tarif aniq qamrov, shaffof narx va texnik yordam bilan boshlanadi."
          />
        </Reveal>

        {isDesktop ? (
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 110} className="h-full">
                <PackageCard pkg={pkg} openOrder={openOrder} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div>
            <Reveal>
              <PackageCarousel openOrder={openOrder} />
            </Reveal>
            <p className="mt-4 text-center text-[11px] text-mocha">
              Tariflarni ko'rish uchun yon tomonga suring
            </p>
          </div>
        )}

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-hairline bg-card/70 p-5 text-center sm:flex-row sm:p-7 sm:text-left">
            <div>
              <p className="text-sm font-semibold text-espresso">Qaysi tarif mos kelishini bilmayapsizmi?</p>
              <p className="mt-1 text-sm leading-relaxed text-mocha">
                Loyiha haqida yozing — qamrovni birgalikda aniqlaymiz va eng mos yechimni taklif qilaman.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-[0_18px_45px_-20px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#473e35] sm:w-auto"
            >
              Loyihani muhokala qilish
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-6 grid gap-5 rounded-2xl border border-hairline bg-card/70 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne">
                Xalqaro mijozlar
              </span>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-espresso sm:text-xl">
                O'zbekiston, Qozog'iston, Rossiya va boshqa bozorlar
              </h3>
              <p lang="ru" className="mt-3 text-sm leading-relaxed text-mocha">
                Работаю с клиентами из Узбекистана, Казахстана и других стран. Создаю современные цифровые решения
                для развития бизнеса.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mocha">
                Loyihalar masofadan turib olib boriladi: talablarni muhokama qilish, dizayn, ishlab chiqish va
                topshirish bosqichlari onlayn kelishiladi.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {["O'zbekiston", "Qozog'iston", "Rossiya", "Xalqaro"].map((market) => (
                <span
                  key={market}
                  className="rounded-full border border-hairline bg-cream-2/60 px-3.5 py-1.5 text-xs font-medium text-espresso/85"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-6 rounded-2xl border border-hairline bg-card/70 p-5 sm:p-7">
            <p className="text-sm leading-relaxed text-mocha">
              <strong className="text-espresso">Eslatma:</strong> barcha narxlar boshlang'ich bo'lib, yakuniy
              hisob-kitob loyiha qamrovi, dizayn murakkabligi, funksionallik va integratsiyalarga qarab farq qiladi.
              Domen, hosting, pullik uchinchi tomon xizmatlari va doimiy texnik xizmat alohida kelishiladi.
              Cheksiz qayta ishlash yoki kelishilmagan funksiyalar taklif etilmaydi.
            </p>
            <a
              href={site.orderTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-espresso transition-colors hover:text-champagne"
            >
              <Telegram className="h-4 w-4" />
              Telegram orqali savol berish
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
