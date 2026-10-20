import { useEffect, useState } from "react";
import { site } from "../config/site";
import { useOrder } from "../context/order";
import { ArrowUpRight, Sparkle } from "./icons";

function usePointerParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return pos;
}

function useScrollParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY, 700));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return offset;
}

function BrowserMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card shadow-[0_50px_120px_-55px_rgba(52,45,39,0.65)]">
      <div className="flex items-center gap-2 border-b border-hairline bg-cream-2/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-sand" />
        <span className="h-2.5 w-2.5 rounded-full bg-champagne/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-espresso/20" />
        <div className="ml-3 flex-1 rounded-md border border-hairline bg-card px-3 py-1 text-center font-mono text-[10px] tracking-[0.14em] text-mocha">
          rasulweb.uz
        </div>
      </div>

      <div className="relative p-4 sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-champagne/10 to-transparent" />

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-md bg-gradient-to-br from-champagne to-sand" />
            <span className="h-2 w-16 rounded-full bg-espresso/20" />
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-1.5 w-8 rounded-full bg-espresso/10" />
            <span className="h-1.5 w-10 rounded-full bg-espresso/10" />
            <span className="h-1.5 w-8 rounded-full bg-espresso/10" />
            <span className="h-6 w-16 rounded-full bg-espresso/85" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-5">
          <div className="sm:col-span-3">
            <span className="inline-block rounded-full border border-champagne/50 bg-champagne/12 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-champagne">
              PREMIUM WEB
            </span>
            <div className="mt-3 space-y-2">
              <span className="block h-3 w-11/12 rounded-full bg-espresso/80" />
              <span className="block h-3 w-9/12 rounded-full bg-espresso/55" />
              <span className="block h-3 w-8/12 rounded-full bg-gradient-to-r from-champagne to-sand" />
            </div>
            <div className="mt-3 space-y-1.5">
              <span className="block h-1.5 w-full rounded-full bg-espresso/10" />
              <span className="block h-1.5 w-10/12 rounded-full bg-espresso/10" />
            </div>
            <div className="mt-4 flex gap-2">
              <span className="h-7 w-24 rounded-full bg-espresso/85" />
              <span className="h-7 w-20 rounded-full border border-hairline" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="h-full min-h-[120px] rounded-xl border border-hairline bg-gradient-to-br from-cream-2 to-sand/50 p-3">
              <div className="flex h-full flex-col justify-between">
                <span className="h-6 w-6 rounded-lg bg-champagne/70" />
                <div className="space-y-1.5">
                  <span className="block h-1.5 w-3/4 rounded-full bg-espresso/25" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-espresso/15" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-hairline bg-cream/70 p-3">
              <span className="mb-2 block h-6 w-6 rounded-lg bg-champagne/30" />
              <span className="mb-1.5 block h-1.5 w-4/5 rounded-full bg-espresso/25" />
              <span className="block h-1.5 w-3/5 rounded-full bg-espresso/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openOrder } = useOrder();
  const pos = usePointerParallax();
  const scroll = useScrollParallax();

  const words = [
    { text: "Biznesingiz", accent: false },
    { text: "uchun", accent: false },
    { text: "web sayt", accent: false },
    { text: "yaratish", accent: true },
  ];

  return (
    <section id="home" className="relative z-10 overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-card/70 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-mocha backdrop-blur-md animate-rise"
            style={{ animationDelay: "80ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
            </span>
            WEB DEVELOPER • UZBEKISTAN
          </div>

          <h1 className="text-[clamp(2rem,8.6vw,4.4rem)] font-extrabold leading-[1.06] tracking-tight text-espresso">
            {words.map((w, i) => (
              <span
                key={w.text}
                className="mr-[0.28em] inline-block animate-rise"
                style={{ animationDelay: `${180 + i * 90}ms` }}
              >
                {w.accent ? (
                  <span className="text-serif-italic font-medium text-champagne">{w.text}</span>
                ) : (
                  <span>{w.text}</span>
                )}
              </span>
            ))}
          </h1>

          <p
            className="mt-7 max-w-xl text-base leading-relaxed text-mocha sm:text-lg animate-rise"
            style={{ animationDelay: "560ms" }}
          >
            O'zbekistonda biznes uchun zamonaviy web sayt yaratish: landing page, biznes sayti va internet do'konlar.
            Tezkor, responsive va SEO-ga mos saytlar. G'oyangizni mijozlar olib keladigan raqamli mahsulotga
            aylantiramiz.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 animate-rise sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "660ms" }}
          >
            <a
              href="#projects"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_18px_45px_-20px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#473e35] sm:w-auto"
            >
              Loyihalarni ko'rish
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => openOrder()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-hairline bg-card/70 px-7 py-3.5 text-sm font-medium text-espresso backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:bg-cream-2 sm:w-auto"
            >
              Sayt buyurtma qilish
            </button>
          </div>

          <div
            className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-mocha animate-rise"
            style={{ animationDelay: "760ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            Yangi loyihalar uchun ochiqman
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(184,165,138,0.28),transparent_64%)]"
            style={{ transform: `translate3d(${pos.x * 22}px, ${pos.y * 22}px, 0)` }}
          />
          <div
            className="relative animate-fade-in"
            style={{
              transform: `translate3d(${pos.x * -16}px, ${pos.y * -16 + scroll * -0.06}px, 0)`,
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              animationDelay: "300ms",
            }}
          >
            <BrowserMock />

            <div
              className="absolute -left-4 top-8 hidden rounded-2xl border border-hairline bg-card/90 p-3.5 backdrop-blur-xl sm:block animate-float-y"
              style={{ transform: `translate3d(${pos.x * -34}px, ${pos.y * -34}px, 0)` }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-champagne/15 text-sm font-bold text-champagne">
                  100
                </span>
                <div>
                  <div className="text-[11px] font-semibold text-espresso">100% Responsive</div>
                  <div className="text-[9px] text-mocha">Mobil • Planshet • Desktop</div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -right-2 hidden w-56 rounded-2xl border border-hairline bg-card/90 p-4 backdrop-blur-xl sm:block animate-float-y"
              style={{
                animationDelay: "1.4s",
                transform: `translate3d(${pos.x * 30}px, ${pos.y * 30}px, 0)`,
              }}
            >
              <div className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-champagne">
                <Sparkle className="h-3 w-3" />
                Kod
              </div>
              <pre className="font-mono text-[10px] leading-relaxed text-mocha">
                <code>
                  <span className="text-champagne">const</span> sayt = {"{"}
                  {"\n"}  tezlik: <span className="text-espresso">"yuqori"</span>,
                  {"\n"}  dizayn: <span className="text-espresso">"premium"</span>,
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>

            <div
              className="absolute -right-3 -top-4 hidden rounded-full border border-hairline bg-card/90 px-3.5 py-2 text-[10px] font-semibold text-espresso backdrop-blur-xl md:block animate-float-y"
              style={{ animationDelay: "0.7s" }}
            >
              • {site.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
