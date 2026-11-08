import { site } from "../config/site";
import { usePreferences } from "../context/usePreferences";
import { localizePackages } from "../utils/localize";
import { buildMonthlyPlanMessage, telegramOrderLink } from "../utils/telegram";
import { ArrowRight, Check, Sparkle, Telegram } from "./icons";
import Reveal from "./Reveal";

function PlanCard({ plan, index, t, format }) {
  const href = telegramOrderLink(
    buildMonthlyPlanMessage(plan, t.packages.message),
    site.orderUsername
  );

  return (
    <article
      className={`monthly-plan-card group h-full ${
        plan.recommended ? "monthly-plan-card--featured" : ""
      }`}
    >
      {plan.recommended && (
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-champagne/25 blur-[70px]" />
      )}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-monthly-accent">
            {plan.name}
          </h3>
          {plan.recommended ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/35 bg-champagne/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-monthly-accent">
              <Sparkle className="h-3 w-3 shrink-0" />
              <span className="hidden min-[400px]:inline">{t.packages.recommended}</span>
              <span className="min-[400px]:hidden">{t.packages.recommendedShort}</span>
            </span>
          ) : (
            <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-white/25">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        <p className="mt-3 text-[13px] font-medium leading-relaxed text-monthly-accent">
          {plan.tagline}
        </p>
        <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-white/65">{plan.summary}</p>

        <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="text-[clamp(1.9rem,5.8vw,2.7rem)] font-extrabold leading-none tracking-tight text-white">
            {plan.priceLabel}
          </span>
          <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-monthly-accent">
            {plan.currency}
          </span>
          <span className="mb-1 text-xs font-medium text-white/45">{t.packages.perMonth}</span>
        </div>

        <div className="my-6 h-px w-full bg-white/10" />

        <ul className="flex-1 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[13px] leading-snug text-white/75">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne/30 bg-champagne/10 text-monthly-accent">
                <Check className="h-3 w-3" />
              </span>
              <span className="min-w-0 break-words">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={format(t.packages.chooseAria, { name: plan.name })}
            className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne ${
              plan.recommended ? "monthly-plan-cta-featured" : "monthly-plan-cta"
            }`}
          >
            <Telegram className="h-4 w-4" />
            <span>{t.packages.choose}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </a>
          <p className="mt-2.5 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
            {t.packages.telegramNote}
          </p>
          <a
            href="#contact"
            className="group/link mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white/45 transition-colors duration-300 hover:text-white/80"
          >
            {t.common.discuss}
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Packages() {
  const { t, format } = usePreferences();
  const plans = localizePackages(t);

  return (
    <section
      id="packages"
      aria-labelledby="packages-title"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="monthly-plans-shell relative overflow-hidden rounded-[1.75rem] px-4 py-12 sm:rounded-[2.25rem] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="monthly-plans-grid absolute inset-0 opacity-70" />
            <div className="absolute -top-24 left-1/2 h-64 w-[30rem] -translate-x-1/2 rounded-full bg-champagne/20 blur-[110px]" />
            <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-champagne/10 blur-[100px]" />
            <div className="absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-champagne/10 blur-[110px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />
          </div>

          <Reveal>
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-champagne/70" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-monthly-accent">
                  03 — {t.packages.kicker}
                </span>
                <span className="h-px w-8 bg-champagne/70" />
              </div>
              <h2
                id="packages-title"
                className="text-[clamp(1.65rem,5.6vw,3rem)] font-extrabold leading-[1.12] tracking-tight text-white"
              >
                {t.packages.titleLead}{" "}
                <span className="text-serif-italic font-medium text-monthly-accent">
                  {t.packages.titleAccent}
                </span>
                {t.packages.titleTail}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                {t.packages.description}
              </p>
              <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2.5 rounded-2xl border border-champagne/20 bg-champagne/[0.07] px-4 py-3 text-xs leading-relaxed text-monthly-accent sm:text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                <span>{t.packages.subscription}</span>
              </p>
            </div>
          </Reveal>

          <div className="relative mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:items-stretch lg:gap-6">
            {plans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 110} className="h-full">
                <PlanCard plan={plan} index={i} t={t} format={format} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={360}>
            <div className="relative mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-center backdrop-blur-md sm:flex-row sm:text-left">
              <p className="text-xs leading-relaxed text-white/55 sm:text-sm">{t.packages.note}</p>
              <a
                href={site.orderTelegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-4 py-2 text-xs font-semibold text-monthly-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:bg-champagne/15"
              >
                <Telegram className="h-4 w-4" />
                {t.packages.askTelegram}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-hairline bg-card/70 p-5 text-center sm:flex-row sm:p-7 sm:text-left">
            <div>
              <p className="text-sm font-semibold text-espresso">{t.packages.notSureTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-mocha">{t.packages.notSureText}</p>
            </div>
            <a
              href="#contact"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-[0_18px_45px_-20px_rgba(52,45,39,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso-hover sm:w-auto"
            >
              {t.common.discuss}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-6 grid gap-5 rounded-2xl border border-hairline bg-card/70 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne">
                {t.packages.internationalKicker}
              </span>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-espresso sm:text-xl">
                {t.packages.internationalTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mocha">{t.packages.internationalText}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {t.packages.markets.map((market) => (
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
      </div>
    </section>
  );
}
