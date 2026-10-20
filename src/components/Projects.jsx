import { useState } from "react";
import { hostOf, previewUrl, projects } from "../config/projects";
import useTilt from "../hooks/useTilt";
import { ArrowUpRight } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Mockup({ project }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-cream-2/70 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-md" style={{ background: project.accent }} />
          <span className="h-2 w-20 rounded-full bg-espresso/20" />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-8 rounded-full bg-espresso/10" />
          ))}
        </div>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
        <div
          className="col-span-2 flex flex-col justify-center rounded-lg border border-hairline p-4"
          style={{ background: `linear-gradient(135deg, ${project.accent}30, transparent)` }}
        >
          <span className="h-3 w-10/12 rounded-full bg-espresso/60" />
          <span className="mt-2 h-3 w-8/12 rounded-full bg-espresso/35" />
          <span className="mt-4 h-6 w-24 rounded-full" style={{ background: project.accent }} />
        </div>
        <div className="rounded-lg border border-hairline" style={{ background: `${project.accent}22` }} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-hairline bg-card/70 p-2.5">
            <div className="h-4 w-4 rounded" style={{ background: `${project.accent}66` }} />
            <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-espresso/20" />
            <span className="mt-1 block h-1.5 w-3/5 rounded-full bg-espresso/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const tilt = useTilt(4);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="relative rounded-2xl border border-hairline bg-card p-2 shadow-[0_30px_70px_-45px_rgba(52,45,39,0.6)] transition-[transform,border-color,box-shadow] duration-300 will-change-transform group-hover:border-champagne/50 group-hover:shadow-[0_40px_90px_-45px_rgba(52,45,39,0.55)]"
    >
      <div className="flex items-center gap-2 px-2 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-sand" />
        <span className="h-2.5 w-2.5 rounded-full bg-champagne/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-espresso/20" />
        <div className="ml-3 flex-1 truncate rounded-md border border-hairline bg-cream-2/60 px-3 py-1 text-center font-mono text-[10px] text-mocha">
          {hostOf(project.url)}
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-2/60">
        {!failed && (
          <img
            src={previewUrl(project.url)}
            alt={`${project.name} — ${project.category} web sayti namunasi (Rasulweb.uz ishi)`}
            loading="lazy"
            decoding="async"
            width="1400"
            height="875"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-[1.05] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {(!loaded || failed) && (
          <div className="absolute inset-0">
            <Mockup project={project} />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            index="01"
            kicker="PORTFOLIO"
            title={
              <>
                Tanlangan <span className="text-serif-italic font-medium text-champagne">loyihalar</span>
              </>
            }
            description="Real bizneslar uchun yaratilgan va amalda ishlayotgan web saytlar. Har biri zamonaviy dizayn, responsive tuzilma va qulay foydalanishga asoslangan."
          />
        </Reveal>

        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28 lg:space-y-32">
          {projects.map((project, i) => {
            const alternate = i % 2 === 1;
            return (
              <Reveal key={project.id} delay={40}>
                <article className="group relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={`relative ${alternate ? "lg:order-2" : ""}`}>
                    <Reveal variant="mask" delay={80}>
                      <ProjectPreview project={project} />
                    </Reveal>
                  </div>

                  <div className={`relative ${alternate ? "lg:order-1" : ""}`}>
                    <span
                      className="pointer-events-none absolute -top-10 right-0 select-none font-serif text-[clamp(3.5rem,14vw,8rem)] font-semibold leading-none text-espresso/[0.06]"
                      aria-hidden="true"
                    >
                      {project.id}
                    </span>
                    <div className="relative">
                      <span
                        className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold"
                        style={{
                          borderColor: `${project.accent}55`,
                          color: project.accent,
                          background: `${project.accent}12`,
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
                        {project.category}
                      </span>
                      <h3 className="mt-5 text-[clamp(1.6rem,5.4vw,2.75rem)] font-extrabold tracking-tight text-espresso">
                        {project.name}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-mocha sm:text-base">
                        {project.description}
                      </p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link mt-7 inline-flex items-center gap-3 text-sm font-semibold text-espresso"
                      >
                        <span className="border-b border-espresso/20 pb-0.5 transition-colors duration-300 group-hover/link:border-champagne group-hover/link:text-champagne">
                          Saytni ko'rish
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition-all duration-300 group-hover/link:border-espresso group-hover/link:bg-espresso group-hover/link:text-cream">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
