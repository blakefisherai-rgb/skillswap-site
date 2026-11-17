"use client";

import { useEffect, useRef, useState } from "react";

export type CountFormat = "number" | "percent" | "money-k" | "approx" | "millions";

export function formatCount(v: number, format: CountFormat) {
  switch (format) {
    case "percent":
      return `${Math.round(v)}%`;
    case "money-k":
      return `$${Math.round(v / 1000)}K`;
    case "approx":
      return `~${Math.round(v).toLocaleString("en-US")}`;
    case "millions":
      return `${v.toFixed(1)}M`;
    default:
      return Math.round(v).toLocaleString("en-US");
  }
}

/**
 * Animated stat counter. Renders the final value on the server (and for
 * reduced-motion users); animates from 0 the first time it scrolls into view.
 */
export function CountUp({ value, format = "number", duration = 1400 }: { value: number; format?: CountFormat; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already on screen: don't flash to 0

    let raf = 0;
    setDisplay(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{formatCount(display, format)}</span>
      <span className="sr-only">{formatCount(value, format)}</span>
    </span>
  );
}
