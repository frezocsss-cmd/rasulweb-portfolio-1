import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    num: "01",
    title: "Tanishuv va rejalashtirish",
    desc: "Biznesingiz, talablaringiz, vizual yo'nalish va loyiha qamrovini muhokama qilamiz.",
  },
  {
    num: "02",
    title: "Dizayn va ishlab chiqish",
    desc: "Saytni yarataman, responsive layoutlarni joriy qilaman va kerakli interaktivlikni ishlab chiqaman.",
  },
  {
    num: "03",
    title: "Test va topshirish",
    desc: "Natijani sinovdan o'tkazaman, xatolarni tuzataman va saytni joylashtirishga tayyorlab topshiraman.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="05"
            kicker="JARAYON"
            title={
              <>
                Qanday <span className="text-gradient-neon">ishlayman</span>
              </>
            }
            description="Tanishuvdan to topshirishgacha — aniq va tushunarli uch bosqichli jarayon."
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-[1.65rem] top-4 bottom-4 w-px bg-gradient-to-b from-neon/60 via-white/10 to-transparent lg:left-0 lg:right-0 lg:top-[3.25rem] lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-transparent lg:via-neon/40 lg:to-transparent" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 130}>
                <div className="relative flex gap-5 lg:block">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neon/30 bg-ink font-mono text-sm font-bold text-neon shadow-[0_0_30px_-6px_rgba(255,0,60,0.6)]">
                    {step.num}
                  </div>
                  <div className="lg:mt-7">
                    <h3 className="text-lg font-bold tracking-tight">{step.title}</h3>
                    <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-soft">{step.desc}</p>
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
