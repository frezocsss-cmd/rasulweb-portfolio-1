import { technologies } from "../config/site";
import { TechIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const codeLines = [
  [
    { t: "const", c: "text-champagne" },
    { t: " developer", c: "text-espresso/90" },
    { t: " = ", c: "text-mocha" },
    { t: "{", c: "text-mocha" },
  ],
  [
    { t: "  nomi", c: "text-espresso/80" },
    { t: ": ", c: "text-mocha" },
    { t: "'Rasul Ravshanbekov'", c: "text-champagne" },
    { t: ",", c: "text-mocha" },
  ],
  [
    { t: "  kasbi", c: "text-espresso/80" },
    { t: ": ", c: "text-mocha" },
    { t: "'Frontend Developer'", c: "text-champagne" },
    { t: ",", c: "text-mocha" },
  ],
  [
    { t: "  yondashuv", c: "text-espresso/80" },
    { t: ": ", c: "text-mocha" },
    { t: "'dizayn + tezlik'", c: "text-champagne" },
    { t: ",", c: "text-mocha" },
  ],
  [
    { t: "  holat", c: "text-espresso/80" },
    { t: ": ", c: "text-mocha" },
    { t: "'loyihalarga ochiq'", c: "text-champagne" },
    { t: ",", c: "text-mocha" },
  ],
  [{ t: "};", c: "text-mocha" }],
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                index="04"
                kicker="MEN HAQIMDA"
                title={
                  <>
                    Men g'oyalarni{" "}
                    <span className="text-serif-italic font-medium text-champagne">web-saytlarga</span> aylantiraman.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-mocha sm:text-base">
                Men Rasul Ravshanbekov — zamonaviy, responsive va interaktiv web saytlar yaratishga ixtisoslashgan
                frontend dasturchiman. React va zamonaviy web texnologiyalari yordamida bizneslar uchun chiroyli
                ko'rinadigan, qulay ishlaydigan va SEO-ga mos saytlar yarataman.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="group flex flex-col items-center gap-2.5 rounded-2xl border border-hairline bg-card/70 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 hover:bg-card"
                  >
                    <span className="flex h-9 w-9 items-center justify-center">
                      <TechIcon name={tech} className="h-8 w-8" />
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-espresso/80">{tech}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(184,165,138,0.22),transparent_66%)]" />

              <div className="overflow-hidden rounded-2xl border border-hairline bg-card shadow-[0_40px_100px_-55px_rgba(52,45,39,0.6)]">
                <div className="flex items-center gap-2 border-b border-hairline bg-cream-2/50 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-sand" />
                  <span className="h-2.5 w-2.5 rounded-full bg-champagne/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-espresso/20" />
                  <span className="ml-3 font-mono text-[10px] text-mocha">developer.js</span>
                </div>

                <div className="flex gap-3 p-4 sm:gap-4 sm:p-6">
                  <div className="select-none font-mono text-[10px] leading-7 text-espresso/20 sm:text-[11px]">
                    {codeLines.map((_, i) => (
                      <div key={i}>{String(i + 1).padStart(2, "0")}</div>
                    ))}
                  </div>
                  <pre className="overflow-x-auto font-mono text-[11px] leading-7 sm:text-[13px]">
                    <code>
                      {codeLines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          {line.map((tok, j) => (
                            <span key={j} className={tok.c}>
                              {tok.t}
                            </span>
                          ))}
                        </div>
                      ))}
                      <div className="mt-1 inline-flex items-center gap-2 text-mocha">
                        <span className="text-champagne">;</span>
                        <span className="inline-block h-4 w-2 bg-champagne animate-blink" />
                      </div>
                    </code>
                  </pre>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-hairline bg-card/95 px-4 py-3 backdrop-blur-xl sm:block animate-float-y">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mocha">Stack</div>
                <div className="mt-1 text-sm font-semibold text-espresso">React · JS · Tailwind</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
