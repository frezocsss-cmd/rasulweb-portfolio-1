export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-cream" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-12%,rgba(184,165,138,0.22),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_88%_8%,rgba(216,204,185,0.35),transparent_52%)]" />

      <div className="absolute -top-[16%] left-[4%] h-[320px] w-[320px] rounded-full bg-sand/40 blur-[130px] animate-drift sm:h-[560px] sm:w-[560px] sm:blur-[170px]" />
      <div className="absolute top-[42%] -right-[14%] h-[300px] w-[300px] rounded-full bg-champagne/[0.18] blur-[120px] animate-drift-rev sm:h-[520px] sm:w-[520px] sm:blur-[165px]" />
      <div className="absolute -bottom-[16%] left-[26%] h-[320px] w-[320px] rounded-full bg-cream-2/80 blur-[135px] animate-drift sm:h-[600px] sm:w-[600px] sm:blur-[185px]" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(91,76,59,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(91,76,59,0.035) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(ellipse at 50% 38%, #000 18%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 38%, #000 18%, transparent 76%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent" />
    </div>
  );
}
