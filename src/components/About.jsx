import { technologies } from "../config/site";
import { TechIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const codeLines = [
  [
    { t: "const", c: "text-[#ff8fa3]" },
    { t: " developer", c: "text-white/90" },
    { t: " = ", c: "text-soft" },
    { t: "{", c: "text-soft" },
  ],
  [
    { t: "  nomi", c: "text-[#ffd166]" },
    { t: ": ", c: "text-soft" },
    { t: "'Rasul Ravshanbekov'", c: "text-[#ff6b6b]" },
    { t: ",", c: "text-soft" },
  ],
  [
    { t: "  kasbi", c: "text-[#ffd166]" },
    { t: ": ", c: "text-soft" },
    { t: "'Frontend Developer'", c: "text-[#ff6b6b]" },
    { t: ",", c: "text-soft" },
  ],
  [
    { t: "  yondashuv", c: "text-[#ffd166]" },
    { t: ": ", c: "text-soft" },
    { t: "'dizayn + tezlik'", c: "text-[#ff6b6b]" },
    { t: ",", c: "text-soft" },
  ],
  [
    { t: "  holat", c: "text-[#ffd166]" },
    { t: ": ", c: "text-soft" },
    { t: "'loyihalarga ochiq'", c: "text-[#ff6b6b]" },
    { t: ",", c: "text-soft" },
  ],
  [{ t: "};", c: "text-soft" }],
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
                    Men g'oyalarni <span className="text-gradient-neon">web-saytlarga</span> aylantiraman.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-soft sm:text-base">
                Men Rasul Ravshanbekov — zamonaviy, responsive va interaktiv web-saytlar yaratishga ixtisoslashgan
                frontend dasturchiman. Maqsadim — bizneslar uchun chiroyli ko'rinadigan, qulay ishlaydigan va ularning
                vazifalarini bajarishga yordam beradigan saytlar yaratish.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center">
                      <TechIcon name={tech} className="h-8 w-8" />
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-white/80">{tech}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,0,60,0.18),transparent_65%)] animate-glow" />

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] shadow-[0_40px_120px_-50px_rgba(255,0,60,0.5)]">
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-[10px] text-soft">developer.js</span>
                </div>

                <div className="flex gap-3 p-4 sm:gap-4 sm:p-6">
                  <div className="select-none font-mono text-[10px] leading-7 text-white/20 sm:text-[11px]">
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
                      <div className="mt-1 inline-flex items-center gap-2 text-soft">
                        <span className="text-[#ff8fa3]">;</span>
                        <span className="inline-block h-4 w-2 bg-neon animate-blink" />
                      </div>
                    </code>
                  </pre>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-ink/85 px-4 py-3 backdrop-blur-xl sm:block animate-float-y">
                <div className="font-mono text-[10px] uppercase tracking-widest text-soft">Stack</div>
                <div className="mt-1 text-sm font-semibold text-white">React · JS · Tailwind</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
