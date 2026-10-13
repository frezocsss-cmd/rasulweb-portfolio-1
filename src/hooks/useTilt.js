import { useCallback, useRef } from "react";

export default function useTilt(max = 6) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      if (typeof window === "undefined") return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    },
    [max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return { ref, onMove, onLeave };
}
