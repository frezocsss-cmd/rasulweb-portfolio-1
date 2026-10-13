import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice, packages, siteTypes } from "../config/packages";
import { site } from "../config/site";
import { useOrder } from "../context/order";
import {
  buildOrderMessage,
  formatPhoneInput,
  isValidUzPhone,
  telegramOrderLink,
} from "../utils/telegram";
import { Check, Close, Telegram } from "./icons";

const empty = {
  ism: "",
  familiya: "",
  telefon: "",
  saytTuri: "",
  paket: "",
  talablar: "",
  consent: false,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-soft/50 focus:border-neon/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-neon/15";

const labelClass = "mb-1.5 block text-xs font-semibold text-white/85";
const errorClass = "mt-1.5 text-[11px] font-medium text-rose-400";

export default function OrderModal() {
  const { isOpen, closeOrder, selectedPackage } = useOrder();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const firstFieldRef = useRef(null);

  const packageMap = useMemo(() => Object.fromEntries(packages.map((p) => [p.id, p])), []);
  const activePackage = form.paket ? packageMap[form.paket] : null;
  const orderLink = message ? telegramOrderLink(message, site.orderUsername) : site.orderTelegram;

  useEffect(() => {
    if (!isOpen) return;
    setForm({ ...empty, paket: selectedPackage || "" });
    setErrors({});
    setStatus("idle");
    setCopied(false);
    setMessage("");
  }, [isOpen, selectedPackage]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
    const onKey = (e) => {
      if (e.key === "Escape") closeOrder();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen, closeOrder]);

  if (!isOpen) return null;

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setPhone = (value) => {
    setForm((prev) => ({ ...prev, telefon: value.replace(/\D/g, "").slice(0, 9) }));
    setErrors((prev) => ({ ...prev, telefon: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.ism.trim()) next.ism = "Ismingizni kiriting.";
    if (!form.familiya.trim()) next.familiya = "Familiyangizni kiriting.";
    if (!isValidUzPhone(form.telefon)) next.telefon = "Telefon raqamni to'liq kiriting (9 raqam).";
    if (!form.saytTuri) next.saytTuri = "Sayt turini tanlang.";
    if (!form.paket) next.paket = "Paketni tanlang.";
    if (!form.consent) next.consent = "Ma'lumotlarni yuborishga rozilik bildiring.";
    setErrors(next);
    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`of-${firstKey}`)?.focus();
    }
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!validate()) return;

    const text = buildOrderMessage({
      ism: form.ism,
      familiya: form.familiya,
      telefon: form.telefon,
      saytTuri: form.saytTuri,
      paket: activePackage,
      talablar: form.talablar,
    });

    setMessage(text);
    setStatus("submitting");

    window.open(telegramOrderLink(text, site.orderUsername), "_blank", "noopener,noreferrer");

    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setStatus("success");
  };

  const copyAgain = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const fieldError = (key) => errors[key] && <p className={errorClass}>{errors[key]}</p>;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeOrder();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0b0b0f] shadow-[0_50px_140px_-40px_rgba(255,0,60,0.6)] animate-rise sm:max-h-[90dvh] sm:max-w-2xl sm:rounded-3xl">
        <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-neon/20 blur-[100px]" />

        <div className="relative shrink-0 border-b border-white/[0.07] px-5 pb-4 pt-3 sm:px-7 sm:pb-5 sm:pt-6">
          <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-white/15 sm:hidden" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-neon sm:text-[11px] sm:tracking-[0.28em]">
                Loyiha so'rovi
              </span>
              <h2
                id="order-modal-title"
                className="mt-1.5 text-lg font-extrabold tracking-tight sm:mt-2 sm:text-2xl"
              >
                {status === "success" ? "Buyurtma tayyor!" : "Buyurtma berish"}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeOrder}
              aria-label="Yopish"
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-2 text-soft transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto overscroll-contain px-5 py-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-7 sm:py-6">
          {status === "success" ? (
            <div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-4 sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Telegram ochildi va xabar tayyorlandi</p>
                  <p className="mt-1 text-xs leading-relaxed text-soft">
                    Telegram oynasida tayyor xabarni <strong className="text-white/90">yuboring</strong> — shundan keyin
                    buyurtma menga yetib keladi. Xabar avtomatik yuborilmadi, uni siz tasdiqlaysiz.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-soft">Buyurtma matni</span>
                  <span className="truncate text-[10px] font-medium text-soft/70">@{site.orderUsername}</span>
                </div>
                <pre className="max-h-52 overflow-y-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-white/80">
                  {message}
                </pre>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copyAgain}
                  className="flex-1 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-neon/40 hover:bg-neon/10"
                >
                  {copied ? "Nusxalandi ✓" : "Xabarni nusxalash"}
                </button>
                <a
                  href={orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ff2452]"
                >
                  <Telegram className="h-4 w-4" />
                  Telegramni ochish
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="of-ism" className={labelClass}>
                    Ism <span className="text-neon">*</span>
                  </label>
                  <input
                    id="of-ism"
                    ref={firstFieldRef}
                    type="text"
                    autoComplete="given-name"
                    value={form.ism}
                    onChange={(e) => set("ism", e.target.value)}
                    placeholder="Aziz"
                    className={inputClass}
                  />
                  {fieldError("ism")}
                </div>
                <div className="min-w-0">
                  <label htmlFor="of-familiya" className={labelClass}>
                    Familiya <span className="text-neon">*</span>
                  </label>
                  <input
                    id="of-familiya"
                    type="text"
                    autoComplete="family-name"
                    value={form.familiya}
                    onChange={(e) => set("familiya", e.target.value)}
                    placeholder="Karimov"
                    className={inputClass}
                  />
                  {fieldError("familiya")}
                </div>

                <div className="min-w-0">
                  <label htmlFor="of-telefon" className={labelClass}>
                    Telefon raqam <span className="text-neon">*</span>
                  </label>
                  <div className="flex items-stretch overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 focus-within:border-neon/60 focus-within:bg-white/[0.05] focus-within:ring-2 focus-within:ring-neon/15">
                    <span className="flex select-none items-center border-r border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-soft">
                      +998
                    </span>
                    <input
                      id="of-telefon"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={formatPhoneInput(form.telefon)}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="90 123 45 67"
                      className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-soft/50"
                    />
                  </div>
                  {fieldError("telefon")}
                </div>

                <div className="min-w-0">
                  <label htmlFor="of-saytTuri" className={labelClass}>
                    Qanday turdagi sayt kerak? <span className="text-neon">*</span>
                  </label>
                  <select
                    id="of-saytTuri"
                    value={form.saytTuri}
                    onChange={(e) => set("saytTuri", e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-[#0b0b0f]">
                      Tanlang...
                    </option>
                    {siteTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#0b0b0f]">
                        {t}
                      </option>
                    ))}
                  </select>
                  {fieldError("saytTuri")}
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="of-paket" className={labelClass}>
                  Qaysi paket tanlandi? <span className="text-neon">*</span>
                </label>
                <select
                  id="of-paket"
                  value={form.paket}
                  onChange={(e) => set("paket", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" className="bg-[#0b0b0f]">
                    Tanlang...
                  </option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0b0b0f]">
                      {p.name} — {formatPrice(p.price)} so'mdan
                    </option>
                  ))}
                </select>
                {fieldError("paket")}
              </div>

              <div className="min-w-0">
                <span className={labelClass}>Paket ichidagi talablar</span>
                {activePackage ? (
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <div className="mb-2.5 flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold text-white/90">
                        {activePackage.name} paketiga kiritilgan
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold text-neon">
                        {formatPrice(activePackage.price)} so'mdan
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {activePackage.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-soft">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neon/20 text-neon">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span className="min-w-0 break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-4 py-3.5 text-xs text-soft">
                    Paketni tanlang — unga kiritilgan talablar shu yerda ko'rinadi.
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="of-talablar" className={labelClass}>
                  Qo'shimcha talablar yoki loyiha haqida izoh
                </label>
                <textarea
                  id="of-talablar"
                  rows={4}
                  value={form.talablar}
                  onChange={(e) => set("talablar", e.target.value)}
                  placeholder="Bo'limlar, uslub, brend ranglari, kerakli funksiyalar..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-soft">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff003c]"
                />
                <span className="min-w-0">
                  Kiritgan ma'lumotlarim buyurtmani muhokama qilish uchun ishlatilishiga roziman.
                  {errors.consent && <span className="mt-1 block text-rose-400">{errors.consent}</span>}
                </span>
              </label>

              <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-soft/70">
                  Yuborilgach, buyurtma matni nusxalanadi va Telegram ochiladi.
                </p>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_50px_-18px_rgba(255,0,60,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff2452] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Tayyorlanmoqda...
                    </>
                  ) : (
                    "Buyurtmani yuborish"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
