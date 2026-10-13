import { technologies } from "../config/site";

export default function TechMarquee() {
  const items = [...technologies, ...technologies];
  return (
    <section aria-label="Ishlatiladigan texnologiyalar" className="relative z-10 border-y border-white/[0.06] py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 px-6">
          {items.map((tech, i) => (
            <div key={`${tech}-${i}`} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-soft/70">
                {tech}
              </span>
              <span className="h-1 w-1 rounded-full bg-neon/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
