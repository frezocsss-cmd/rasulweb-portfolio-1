import { usePreferences } from "../context/usePreferences";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Process() {
  const { t } = usePreferences();

  return (
    <section id="process" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="06"
            kicker={t.process.kicker}
            title={
              <>
                {t.process.titleLead}{" "}
                <span className="text-serif-italic font-medium text-champagne">{t.process.titleAccent}</span>
                {t.process.titleTail}
              </>
            }
            description={t.process.description}
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-[1.65rem] top-4 bottom-4 w-px bg-gradient-to-b from-champagne via-hairline to-transparent lg:left-0 lg:right-0 lg:top-[3.25rem] lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-transparent lg:via-champagne/60 lg:to-transparent" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {t.process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 130}>
                <div className="relative flex gap-5 lg:block">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-card font-mono text-sm font-bold text-champagne shadow-[0_14px_34px_-22px_rgba(52,45,39,0.7)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="lg:mt-7">
                    <h3 className="text-lg font-bold tracking-tight text-espresso">{step.title}</h3>
                    <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-mocha">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
