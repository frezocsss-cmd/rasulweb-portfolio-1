export default function SectionHeading({ index, kicker, title, description, align = "center" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-champagne/70" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne">
          {index} — {kicker}
        </span>
        {centered && <span className="h-px w-8 bg-champagne/70" />}
      </div>
      <h2 className="text-[clamp(1.65rem,5.6vw,3rem)] font-extrabold leading-[1.12] tracking-tight text-espresso">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-sm leading-relaxed text-mocha sm:text-base ${centered ? "mx-auto max-w-2xl" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
