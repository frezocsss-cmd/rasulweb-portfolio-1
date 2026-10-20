import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrice, packages } from "../config/packages";
import { useOrder } from "../context/order";
import { Check, Sparkle } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

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
            <Sparkle className="h-3 w-3 text-champagne" />
            <span className="hidden min-[400px]:inline">Tavsiya etiladi</span>
            <span className="min-[400px]:hidden">Tavsiya</span>
          </span>
        </>
      )}

      <div className="relative min-w-0">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-champagne">{pkg.name}</h3>
        <div className="mt-5 flex flex-wrap items-end gap-x-1.5">
          <span className="text-[clamp(1.6rem,5vw,2.4rem)] font-extrabold leading-none tracking-tight text-espresso">
            {formatPrice(pkg.price)}
          </span>
          <span className="mb-1 text-xs font-medium text-mocha">so'mdan</span>
        </div>
        <p className="mt-3 text-sm text-mocha">{pkg.tagline}</p>
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

      <button
        type="button"
        onClick={() => openOrder(pkg.id)}
        className={`relative mt-7 w-full rounded-full px-6 py-3.5 text-sm font-semibold leading-tight transition-all duration-300 ${
          pkg.recommended
            ? "bg-espresso text-cream shadow-[0_18px_45px_-20px_rgba(52,45,39,0.9)] hover:-translate-y-0.5 hover:bg-[#473e35]"
            : "border border-hairline bg-cream-2/60 text-espresso hover:-translate-y-0.5 hover:border-champagne/60 hover:bg-card"
        }`}
      >
        Buyurtma berish
      </button>
    </div>
  );
}

function PackageCarousel({ openOrder }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = packages.length;
  const looped = [...packages, ...packages, ...packages];
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  // Distance between two adjacent slide starts (width + gap), measured from the DOM.
  const slideStride = () => {
    const el = trackRef.current;
    if (!el || el.children.length < 2) return 0;
    const a = el.children[0].getBoundingClientRect();
    const b = el.children[1].getBoundingClientRect();
    return b.left - a.left;
  };

  const scrollToIndex = useCallback(
    (index, smooth = true) => {
      const el = trackRef.current;
      if (!el) return;
      const stride = slideStride();
      if (!stride) return;
      el.scrollTo({ left: index * stride, behavior: smooth ? "smooth" : "auto" });
    },
    []
  );

  useEffect(() => {
    // Center on the middle copy of the first package once widths are settled.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      scrollToIndex(count, false);
      raf2 = requestAnimationFrame(() => scrollToIndex(count, false));
    });
    const onResize = () => scrollToIndex(count, false);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", onResize);
    };
  }, [count, scrollToIndex]);

  const currentIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const stride = slideStride();
    if (!stride) return 0;
    return Math.round(el.scrollLeft / stride);
  }, []);

  const normalize = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const stride = slideStride();
    if (!stride) return;
    const index = Math.round(el.scrollLeft / stride);
    if (index >= count * 2) {
      el.scrollTo({ left: (index - count) * stride, behavior: "auto" });
    } else if (index < count) {
      el.scrollTo({ left: (index + count) * stride, behavior: "auto" });
    }
  }, [count]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const stride = slideStride();
    if (!stride) return;
    const index = Math.round(el.scrollLeft / stride);
    setActive(((index % count) + count) % count);
    if (!dragging.current) normalize();
  }, [count, normalize]);

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
    setTimeout(normalize, 350);
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
        aria-label="Paketlar karuseli"
        className="carousel-scroll flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        style={{ touchAction: "pan-x pan-y", cursor: "grab" }}
      >
        {looped.map((pkg, i) => (
          <div
            key={`${pkg.id}-${i}`}
            className="w-[82vw] max-w-[360px] shrink-0 snap-center sm:w-[68vw] md:w-[52vw]"
            aria-hidden={i < count || i >= count * 2}
          >
            <PackageCard pkg={pkg} openOrder={openOrder} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Oldingi paket"
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
              aria-label={`${p.name} paketi`}
              aria-current={active === i}
              onClick={() => scrollToIndex(count + i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-7 bg-champagne" : "w-1.5 bg-espresso/20"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Keyingi paket"
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

  return (
    <section id="packages" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="PAKETLAR"
            title={
              <>
                Xizmatingizga mos <span className="text-serif-italic font-medium text-champagne">paketni tanlang</span>
              </>
            }
            description="Boshlang'ich narxlar — yakuniy narx loyiha qamrovi, dizayn murakkabligi va integratsiyalarga qarab belgilanadi."
          />
        </Reveal>

        {/* Desktop: three balanced columns */}
        <div className="mt-12 hidden items-stretch gap-6 lg:grid lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 110} className="h-full">
              <PackageCard pkg={pkg} openOrder={openOrder} />
            </Reveal>
          ))}
        </div>

        {/* Mobile / tablet: infinite carousel */}
        <div className="lg:hidden">
          <Reveal>
            <PackageCarousel openOrder={openOrder} />
          </Reveal>
          <p className="mt-4 text-center text-[11px] text-mocha/60">
            Paketlarni ko'rish uchun yon tomonga suring
          </p>
        </div>

        <Reveal delay={140}>
          <div className="mt-10 rounded-2xl border border-hairline bg-card/70 p-5 sm:p-7">
            <p className="text-sm leading-relaxed text-mocha">
              <strong className="text-espresso">Eslatma:</strong> yuqoridagi narxlar boshlang'ich bo'lib, yakuniy
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
