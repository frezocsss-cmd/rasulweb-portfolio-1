import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", variant = "rise" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Safety fallback: never leave content hidden if the observer misbehaves.
    const fallback = setTimeout(() => setVisible(true), 2500);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
          clearTimeout(fallback);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const base = variant === "mask" ? "reveal-mask" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
