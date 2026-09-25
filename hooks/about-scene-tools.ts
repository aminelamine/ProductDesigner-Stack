"use client";

import { clamp } from "@/lib/scroll-engine";

const px = (v: number) => `${Math.round(v)}px`;

/**
 * The tools band: each era starts at its station and its tools are spread across it, never
 * past the next era (minus a margin), with a minimal gap. What does not fit is withdrawn.
 */
export function layoutTools(marks: HTMLElement | null, x: readonly number[], xEnd: number, trackW: number, compact: boolean): void {
  if (!marks) return;
  const band = marks.querySelector<HTMLElement>("[data-tband]");
  if (band) band.style.width = px(trackW);
  const eras = Array.from(marks.querySelectorAll<HTMLElement>("[data-era]"));
  eras.forEach((era, i) => {
    const x0 = x[Number(era.dataset.era)];
    const x1 = i < eras.length - 1 ? x[Number(eras[i + 1].dataset.era)] : xEnd;
    era.style.setProperty("--x", px(x0));
    const lbl = era.querySelector<HTMLElement>("[data-tera]");
    const tools = Array.from(era.querySelectorAll<HTMLElement>("[data-tool]"));
    tools.forEach((t) => (t.style.display = ""));
    const lw = lbl?.offsetWidth ?? 0;
    const ws = tools.map((t) => t.offsetWidth);
    const start = x0 + 10 + lw + 24;
    const limit = x1 - 24;
    const minGap = compact ? 18 : 28;
    let fit = 0;
    let run = start;
    for (const w of ws) {
      if (run + w > limit) break;
      run += w + minGap;
      fit++;
    }
    const used = ws.slice(0, fit).reduce((a, b) => a + b, 0);
    const gap = fit > 1 ? clamp((limit - start - used) / (fit - 1), minGap, 180) : 0;
    let cur = start;
    tools.forEach((t, k) => {
      if (k >= fit) {
        t.style.display = "none";
        return;
      }
      t.style.left = px(cur);
      cur += ws[k] + gap;
    });
    if (lbl) lbl.style.visibility = lw + 10 > x1 - x0 - 16 ? "hidden" : "";
  });
}
