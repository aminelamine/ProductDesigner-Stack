"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Manifeste entry: rules are drawn and folios roll when a block enters. The text never moves.
// Without JS or in reduced motion, everything is in its final state (CSS default).
export function AboutManifesteReveal({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-m-block]"));
    root.setAttribute("data-m-motion", "");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -18% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => {
      io.disconnect();
      root.removeAttribute("data-m-motion");
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
