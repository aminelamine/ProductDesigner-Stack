"use client";

import { entryTimings, type HeroGeometry } from "@/lib/hero-network";
import type { HeroEls } from "./hero-scene";

/**
 * The entry is CSS keyframes; JS only hands over the timings measured on the real lengths:
 * departures 0 / 80 / 160 ms, common arrival at 900 ms, markers and names lit when reached.
 */
export function setEntryTimings(e: HeroEls, g: HeroGeometry): number {
  const t = entryTimings(g);
  e.lines.forEach((p, i) => {
    p.style.setProperty("--s", `${t.starts[i]}ms`);
    p.style.setProperty("--d", `${t.durations[i]}ms`);
    e.bars[i]?.style.setProperty("--t", `${t.lit[i]}ms`);
    e.nms[i]?.style.setProperty("--t", `${t.lit[i]}ms`);
  });
  e.hero.style.setProperty("--T", `${t.arrival}ms`);
  e.hero.style.setProperty("--se", `${t.exitStart}ms`);
  e.hero.style.setProperty("--de", `${t.exitDuration}ms`);
  return t.end;
}

/** Once per load, when Playfair is there (at most 1.5 s): add data-go, then data-entered. */
export function startEntry(e: HeroEls, end: number, onEntered: () => void): () => void {
  let timer = 0;
  let cancelled = false;
  const go = () => {
    if (cancelled || e.hero.hasAttribute("data-go")) return;
    e.hero.setAttribute("data-go", "");
    timer = window.setTimeout(() => {
      e.hero.setAttribute("data-entered", "");
      onEntered();
    }, end);
  };
  const fonts = document.fonts
    ? Promise.race([document.fonts.ready, new Promise((r) => window.setTimeout(r, 1500))])
    : Promise.resolve();
  fonts.then(go, go);
  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}
