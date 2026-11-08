import { useEffect, useMemo, useRef, useState } from "react";
import { siteTypes } from "../config/packages";
import { site } from "../config/site";
import { useOrder } from "../context/order";
import { usePreferences } from "../context/usePreferences";
import { localizePackages } from "../utils/localize";
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
  "w-full min-w-0 rounded-xl border border-hairline bg-cream-2/50 px-3.5 py-3 text-sm text-espresso outline-none transition-all duration-300 placeholder:text-mocha focus:border-champagne/70 focus:bg-card focus:ring-2 focus:ring-champagne/20";

const labelClass = "mb-1.5 block text-xs font-semibold text-espresso/85";
const errorClass = "mt-1.5 text-[11px] font-medium text-rose-500";

export default function OrderModal() {
  const { isOpen, closeOrder, selectedPackage } = useOrder();
  const { t, format } = usePreferences();
  const packages = useMemo(() => localizePackages(t), [t]);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const firstFieldRef = useRef(null);

  const packageMap = useMemo(() => Object.fromEntries(packages.map((p) => [p.id, p])), [packages]);
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
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 120);
    const onKey = (event) => {
      if (event.key === "Escape") closeOrder();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
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
    if (!form.ism.trim()) next.ism = t.order.errors.firstName;
    if (!form.familiya.trim()) next.familiya = t.order.errors.lastName;
    if (!isValidUzPhone(form.telefon)) next.telefon = t.order.errors.phone;
    if (!form.saytTuri) next.saytTuri = t.order.errors.siteType;
    if (!form.paket) next.paket = t.order.errors.package;
    if (!form.consent) next.consent = t.order.errors.consent;
    setErrors(next);
    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`of-${firstKey}`)?.focus();
    }
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status !== "idle") return;
    if (!validate()) return;

    const text = buildOrderMessage(
      {
        ism: form.ism,
        familiya: form.familiya,
        telefon: form.telefon,
        saytTuri: t.order.siteTypes[form.saytTuri],
        paket: activePackage,
        talablar: form.talablar,
      },
      t.order.message
    );

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
      className="fixed inset-0 z-[100] flex items-end justify-center bg-overlay backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeOrder();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-hairline bg-card shadow-[0_50px_130px_-45px_rgba(52,45,39,0.7)] animate-rise sm:max-h-[90dvh] sm:max-w-2xl sm:rounded-3xl">
        <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-champagne/25 blur-[100px]" />

        <div className="relative shrink-0 border-b border-hairline px-5 pb-4 pt-3 sm:px-7 sm:pb-5 sm:pt-6">
          <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-espresso/15 sm:hidden" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne sm:text-[11px] sm:tracking-[0.28em]">
                {t.order.kicker}
              </span>
              <h2
                id="order-modal-title"
                className="mt-1.5 text-lg font-extrabold tracking-tight text-espresso sm:mt-2 sm:text-2xl"
              >
                {status === "success" ? t.order.successTitle : t.order.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeOrder}
              aria-label={t.common.close}
              className="shrink-0 rounded-full border border-hairline bg-cream-2/60 p-2 text-mocha transition-colors hover:bg-cream-2 hover:text-espresso"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto overscroll-contain px-5 py-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-7 sm:py-6">
          {status === "success" ? (
            <div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-champagne/40 bg-champagne/10 p-4 sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne/20 text-champagne">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs leading-relaxed text-mocha">{t.order.successDesc}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-hairline bg-cream-2/40 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mocha">
                    {t.order.orderText}
                  </span>
                  <span className="truncate text-[10px] font-medium text-mocha">@{site.orderUsername}</span>
                </div>
                <pre className="max-h-52 overflow-y-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-espresso/80">
                  {message}
                </pre>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copyAgain}
                  className="flex-1 rounded-full border border-hairline bg-cream-2/60 px-6 py-3.5 text-sm font-semibold text-espresso transition-all duration-300 hover:border-champagne/60 hover:bg-card"
                >
                  {copied ? t.order.copied : t.order.copy}
                </button>
                <a
                  href={orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-espresso-hover"
                >
                  <Telegram className="h-4 w-4" />
                  {t.order.openTelegram}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="of-ism" className={labelClass}>
                    {t.order.firstName} <span className="text-champagne">*</span>
                  </label>
                  <input
                    id="of-ism"
                    ref={firstFieldRef}
                    type="text"
                    autoComplete="given-name"
                    value={form.ism}
                    onChange={(event) => set("ism", event.target.value)}
                    placeholder={t.order.firstNamePlaceholder}
                    className={inputClass}
                  />
                  {fieldError("ism")}
                </div>
                <div className="min-w-0">
                  <label htmlFor="of-familiya" className={labelClass}>
                    {t.order.lastName} <span className="text-champagne">*</span>
                  </label>
                  <input
                    id="of-familiya"
                    type="text"
                    autoComplete="family-name"
                    value={form.familiya}
                    onChange={(event) => set("familiya", event.target.value)}
                    placeholder={t.order.lastNamePlaceholder}
                    className={inputClass}
                  />
                  {fieldError("familiya")}
                </div>

                <div className="min-w-0">
                  <label htmlFor="of-telefon" className={labelClass}>
                    {t.order.phone} <span className="text-champagne">*</span>
                  </label>
                  <div className="flex items-stretch overflow-hidden rounded-xl border border-hairline bg-cream-2/50 transition-all duration-300 focus-within:border-champagne/70 focus-within:bg-card focus-within:ring-2 focus-within:ring-champagne/20">
                    <span className="flex select-none items-center border-r border-hairline bg-cream-2/70 px-3 text-sm font-semibold text-mocha">
                      +998
                    </span>
                    <input
                      id="of-telefon"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={formatPhoneInput(form.telefon)}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={t.order.phonePlaceholder}
                      className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-espresso outline-none placeholder:text-mocha"
                    />
                  </div>
                  {fieldError("telefon")}
                </div>

                <div className="min-w-0">
                  <label htmlFor="of-saytTuri" className={labelClass}>
                    {t.order.siteType} <span className="text-champagne">*</span>
                  </label>
                  <select
                    id="of-saytTuri"
                    value={form.saytTuri}
                    onChange={(event) => set("saytTuri", event.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-card text-espresso">
                      {t.order.selectPlaceholder}
                    </option>
                    {siteTypes.map((type) => (
                      <option key={type} value={type} className="bg-card text-espresso">
                        {t.order.siteTypes[type]}
                      </option>
                    ))}
                  </select>
                  {fieldError("saytTuri")}
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="of-paket" className={labelClass}>
                  {t.order.package} <span className="text-champagne">*</span>
                </label>
                <select
                  id="of-paket"
                  value={form.paket}
                  onChange={(event) => set("paket", event.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" className="bg-card text-espresso">
                    {t.order.selectPlaceholder}
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id} className="bg-card text-espresso">
                      {pkg.name} — {pkg.priceFull}
                    </option>
                  ))}
                </select>
                {fieldError("paket")}
              </div>

              <div className="min-w-0">
                <span className={labelClass}>{t.order.featuresLabel}</span>
                {activePackage ? (
                  <div className="rounded-xl border border-hairline bg-cream-2/40 p-4">
                    <div className="mb-2.5 flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold text-espresso/90">
                        {format(t.order.featuresTitle, { name: activePackage.name })}
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold text-champagne">
                        {activePackage.priceFull}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {activePackage.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-mocha">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-champagne/20 text-champagne">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span className="min-w-0 break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-hairline bg-cream-2/30 px-4 py-3.5 text-xs text-mocha">
                    {t.order.packageHint}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label htmlFor="of-talablar" className={labelClass}>
                  {t.order.extraLabel}
                </label>
                <textarea
                  id="of-talablar"
                  rows={4}
                  value={form.talablar}
                  onChange={(event) => set("talablar", event.target.value)}
                  placeholder={t.order.extraPlaceholder}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-mocha">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => set("consent", event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#b8a58a]"
                />
                <span className="min-w-0">
                  {t.order.consent}
                  {errors.consent && <span className="mt-1 block text-rose-500">{errors.consent}</span>}
                </span>
              </label>

              <div className="flex flex-col gap-3 border-t border-hairline pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-mocha">{t.order.submitNote}</p>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_18px_45px_-20px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
                      {t.order.submitting}
                    </>
                  ) : (
                    t.order.submit
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
