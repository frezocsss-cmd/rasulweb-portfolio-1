import { useOrder } from "../context/order";
import { usePreferences } from "../context/usePreferences";
import { localizeFaqs } from "../utils/localize";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  const { openOrder } = useOrder();
  const { t } = usePreferences();
  const faqs = localizeFaqs(t);

  return (
    <section id="faq" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            index="07"
            kicker={t.faq.kicker}
            title={
              <>
                {t.faq.titleLead}{" "}
                <span className="text-serif-italic font-medium text-champagne">{t.faq.titleAccent}</span>
                {t.faq.titleTail}
              </>
            }
            description={t.faq.description}
          />
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.id} delay={i * 50}>
              <details className="group rounded-2xl border border-hairline bg-card/70 px-5 py-4 transition-colors duration-300 open:border-champagne/40 open:bg-card sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-espresso">
                  <span>{faq.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream-2/60 text-mocha transition-all duration-300 group-open:rotate-45 group-open:border-champagne/50 group-open:text-champagne">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mocha">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-hairline bg-card/70 p-5 text-center sm:flex-row sm:p-6 sm:text-left">
            <p className="text-sm leading-relaxed text-mocha">{t.faq.stillQuestions}</p>
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-cream-2/60 px-5 py-3 text-sm font-semibold text-espresso transition-all duration-300 hover:border-champagne/60 hover:bg-card"
              >
                {t.common.discuss}
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => openOrder()}
                className="rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso-hover"
              >
                {t.common.order}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
