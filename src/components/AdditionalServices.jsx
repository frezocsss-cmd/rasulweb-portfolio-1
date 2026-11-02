import { usePreferences } from "../context/usePreferences";
import { localizeAdditionalServices } from "../utils/localize";
import { ArrowRight, ServiceIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function AdditionalServices() {
  const { t } = usePreferences();
  const additionalServices = localizeAdditionalServices(t);

  return (
    <section
      id="additional-services"
      aria-labelledby="additional-services-title"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="04"
            kicker={t.additional.kicker}
            title={
              <>
                <span id="additional-services-title">{t.additional.titleLead}</span>
              </>
            }
            description={t.additional.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additionalServices.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 80}>
              <article className="group card-surface flex h-full flex-col rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-champagne/50 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-cream-2/60 text-espresso transition-colors duration-500 group-hover:border-champagne/60 group-hover:text-champagne">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-extrabold tracking-tight text-espresso">{service.price}</span>
                    <span className="block text-[10px] font-medium text-mocha">{service.priceNote}</span>
                  </div>
                </div>

                <h3 className="mt-5 text-base font-bold leading-snug tracking-tight text-espresso">
                  {service.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mocha">{service.description}</p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-[11px] font-semibold uppercase tracking-[0.16em] text-mocha transition-colors duration-300 hover:text-champagne"
                >
                  {t.common.discuss}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 text-center text-xs leading-relaxed text-mocha">{t.additional.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
