"use client";

import { layoutMinimap, posteOf } from "@/lib/about-timeline";
import { interp } from "@/lib/scroll-engine";
import { setFlag, type Scene } from "./about-scene";

export interface MiniEls {
  root: HTMLElement | null;
  svgs: SVGSVGElement[];
  head: HTMLElement | null;
  done: HTMLElement | null;
  doneIn: HTMLElement | null;
  links: HTMLElement[];
}

export function miniEls(runway: HTMLElement): MiniEls {
  const root = runway.querySelector<HTMLElement>("[data-minimap]");
  return {
    root,
    svgs: Array.from(root?.querySelectorAll<SVGSVGElement>("[data-mm-svg]") ?? []),
    head: root?.querySelector<HTMLElement>("[data-mm-head]") ?? null,
    done: root?.querySelector<HTMLElement>("[data-mm-done]") ?? null,
    doneIn: root?.querySelector<HTMLElement>("[data-mm-done-in]") ?? null,
    links: Array.from(root?.querySelectorAll<HTMLElement>("[data-mm]") ?? []),
  };
}

/** Draws the schematic line, places the 7 links, returns the head's minimap x at every stop. */
export function layoutMini(scene: Scene, x: readonly number[], xNow: number, X: readonly number[]): { mmX: number[]; mmW: number } {
  const mm = scene.els.mini;
  const w = mm.root?.clientWidth ?? 0;
  const m = layoutMinimap(scene.steps, x, xNow, w);
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(m.start)} 14V30M${f(m.start)} 22H${f(m.end - 9)}`;
  m.missionX.forEach((mx) => (d += `M${f(mx)} 17V27`));
  const svg = `<path d="${d}"/><polygon points="${f(m.end - 10)},17 ${f(m.end)},22 ${f(m.end - 10)},27"/>`;
  mm.svgs.forEach((el) => {
    el.setAttribute("width", String(w));
    el.setAttribute("height", "48");
    el.innerHTML = svg;
  });
  mm.links.forEach((a, j) => (a.style.left = `${Math.round(m.posteX[j] - 22)}px`));
  return { mmX: X.map((v) => interp(m.mapX, m.mapM, v)), mmW: w };
}

export function miniFrames(mx: number, w: number): [string, string, string] {
  return [`translate3d(${mx.toFixed(2)}px,0,0)`, `translate3d(${(mx - w).toFixed(2)}px,0,0)`, `translate3d(${(w - mx).toFixed(2)}px,0,0)`];
}

/** aria-current="step" on the poste under the head; reached postes filled. */
export function updateMini(scene: Scene, cur: number, reachedUpTo: number): void {
  const mm = scene.els.mini;
  const po = posteOf(cur, scene.steps);
  mm.links.forEach((a) => {
    const si = Number(a.dataset.mm);
    if (si === po) a.setAttribute("aria-current", "step");
    else a.removeAttribute("aria-current");
    setFlag(a, "reached", si <= reachedUpTo);
  });
}
