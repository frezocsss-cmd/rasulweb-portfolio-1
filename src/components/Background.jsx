import { useMemo } from "react";

export default function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 8,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-ink" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(101,0,20,0.55),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(255,0,60,0.14),transparent_45%)]" />

      <div className="absolute -top-[18%] left-[6%] h-[340px] w-[340px] rounded-full bg-crimson/30 blur-[120px] animate-drift sm:h-[620px] sm:w-[620px] sm:blur-[170px]" />
      <div className="absolute top-[38%] -right-[12%] h-[300px] w-[300px] rounded-full bg-neon/[0.09] blur-[110px] animate-drift-rev sm:h-[540px] sm:w-[540px] sm:blur-[160px]" />
      <div className="absolute -bottom-[14%] left-[28%] h-[340px] w-[340px] rounded-full bg-burgundy/60 blur-[130px] animate-drift sm:h-[640px] sm:w-[640px] sm:blur-[180px]" />

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 78%)",
        }}
      />

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white animate-float-y"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
