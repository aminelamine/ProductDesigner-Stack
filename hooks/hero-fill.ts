"use client";

import { fillAt, fillStops, type HeroGeometry } from "@/lib/hero-network";
import { clamp, progressBetween } from "@/lib/scroll-engine";
import type { HeroEls } from "./hero-scene";
import { maxScroll, nativeScrollAvailable, prefersReducedMotion } from "./scroll-native";

// Departure on scroll: from the top of the page until the About's threshold reaches the header,
// the exit and the junction fill from 40 % to full and a point travels along them. Same stops for
// the native timeline and the rAF fallback (ADR-012). Only transform and opacity move.
export interface Fill {
  end: number;
  anims: Animation[];
  native: boolean;
}

export function makeFill(): Fill {
  return { end: 1, anims: [], native: false };
}

/** Scroll at which the seuil (#parcours) arrives under the header — read, never written. */
function fillEnd(): number {
  const seuil = document.getElementById("parcours");
  const hdr = document.querySelector<HTMLElement>("body > header")?.offsetHeight ?? 56;
  if (!seuil) return 1;
  return Math.max(1, Math.round(seuil.getBoundingClientRect().top + window.scrollY - hdr - 24));
}

function clearFill(f: Fill, e: HeroEls): void {
  f.anims.forEach((a) => a.cancel());
  f.anims = [];
  [...e.segs, e.train].forEach((el) => {
    if (!el) return;
    el.style.transform = "";
    el.style.opacity = "";
  });
}

export function bindFill(f: Fill, e: HeroEls, g: HeroGeometry, entered: boolean, timeline: AnimationTimeline | null): void {
  clearFill(f, e);
  f.end = fillEnd();
  f.native = nativeScrollAvailable() && !!timeline;
  if (!entered || prefersReducedMotion() || !f.native || !timeline) return;
  const P = fillStops(g);
  const max = maxScroll();
  let last = 0;
  const offsets = P.map((p) => (last = clamp((p * f.end) / max, last, 1)));
  const states = P.map((p) => fillAt(p, g));
  const frames = (value: (i: number) => Keyframe) => [...P.map((_, i) => ({ offset: offsets[i], ...value(i) })), { offset: 1, ...value(P.length - 1) }];
  e.segs.forEach((seg, k) => {
    f.anims.push(seg.animate(
      frames((i) => ({ transform: `scale(${states[i].scales[k].toFixed(4)})`, opacity: states[i].scales[k] > 0 ? 1 : 0 })),
      { timeline, fill: "both", easing: "linear" },
    ));
  });
  if (e.train) {
    f.anims.push(e.train.animate(
      frames((i) => ({ transform: `translate(${states[i].point[0].toFixed(2)}px,${states[i].point[1].toFixed(2)}px)`, opacity: states[i].pointOn ? 1 : 0 })),
      { timeline, fill: "both", easing: "linear" },
    ));
  }
}

/** rAF fallback: the same function of the same progress, applied by hand. */
export function frameFill(f: Fill, e: HeroEls, g: HeroGeometry | null, entered: boolean): void {
  if (!g || !entered || f.native || prefersReducedMotion()) return;
  const st = fillAt(progressBetween(window.scrollY, 0, f.end), g);
  e.segs.forEach((seg, k) => {
    seg.style.transform = `scale(${st.scales[k].toFixed(4)})`;
    seg.style.opacity = st.scales[k] > 0 ? "1" : "0";
  });
  if (e.train) {
    e.train.style.transform = `translate(${st.point[0].toFixed(2)}px,${st.point[1].toFixed(2)}px)`;
    e.train.style.opacity = st.pointOn ? "1" : "0";
  }
}
