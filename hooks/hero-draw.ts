"use client";

import type { HeroGeometry, Pt } from "@/lib/hero-network";
import type { HeroEls } from "./hero-scene";

const f2 = (v: number) => String(Math.round(v * 100) / 100);
const d = (pts: readonly Pt[]) => `M${pts.map((p) => `${f2(p[0])} ${f2(p[1])}`).join("L")}`;

function attrs(el: Element | null, o: Record<string, number>): void {
  if (!el) return;
  Object.entries(o).forEach(([k, v]) => el.setAttribute(k, f2(v)));
}

/** Writes the geometry into the hero's own SVG and its own custom properties. */
export function drawHero(e: HeroEls, g: HeroGeometry): void {
  e.lines.forEach((p, i) => p.setAttribute("d", d(g.lines[i])));
  g.markers.forEach((mk, i) => {
    attrs(e.inks[i], mk.ink);
    attrs(e.bars[i], mk.bar);
  });
  const [nx, ny] = g.node;
  const small = g.vertical;
  attrs(e.halo, { cx: nx, cy: ny, r: small ? 8 : 9 });
  attrs(e.core, { cx: nx, cy: ny, r: small ? 5 : 6 });
  attrs(e.ring, { cx: nx, cy: ny, r: 14 });
  e.hero.style.setProperty("--rx", `${f2(g.renvoi.x)}px`);
  e.hero.style.setProperty("--ry", `${f2(g.renvoi.y)}px`);
  e.exit?.setAttribute("d", d(g.junction));
  e.segs.forEach((seg, k) => {
    seg.setAttribute("d", d([g.junction[k], g.junction[k + 1]]));
    seg.style.transformOrigin = `${f2(g.junction[k][0])}px ${f2(g.junction[k][1])}px`;
  });
}
