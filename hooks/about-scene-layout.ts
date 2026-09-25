"use client";

import {
  brakingCurve,
  layoutStations,
  nowMonth,
  progressCurve,
  xOfMonth,
} from "@/lib/about-timeline";
import { toTimelineStops } from "@/lib/scroll-engine";
import { cancelAnims, setFlag, teardown, type Scene, type SceneGeo } from "./about-scene";
import { layoutMini, miniFrames } from "./about-scene-minimap";
import { layoutTools } from "./about-scene-tools";
import { animateOnScroll, maxScroll, nativeScrollAvailable, prefersReducedMotion, translateX } from "./scroll-native";

const px = (v: number) => `${Math.round(v * 100) / 100}px`;

function cssNumber(el: HTMLElement, name: string, fallback: number): number {
  const v = parseFloat(getComputedStyle(el).getPropertyValue(name));
  return Number.isFinite(v) ? v : fallback;
}

/** Pinned everywhere except reduced motion and windows lower than 500 px (the socle). */
export function wantsPinned(): boolean {
  return !prefersReducedMotion() && window.innerHeight >= 500;
}

/** Full layout: measures, positions the stations, draws the line, sizes the runway. */
export function layoutScene(scene: Scene): SceneGeo | null {
  const { els, steps } = scene;
  if (!wantsPinned()) {
    teardown(scene);
    return null;
  }
  const { root, lane, stage, runway } = els;
  root.dataset.mode = "pinned";
  const vh = window.innerHeight;
  const compact = window.innerWidth < 768 || vh < 640;
  setFlag(root, "compact", compact);
  setFlag(root, "short", vh < 520);

  const W = lane.clientWidth;
  const H = lane.clientHeight;
  const headX = Math.round(W * (compact ? 0.2 : 1 / 3));
  const phrases = Array.from(els.arts[0].querySelectorAll<HTMLElement>("[data-phrase]"));
  const fs = parseFloat(getComputedStyle(phrases[0]).fontSize);
  const cBottom = els.counter ? els.counter.offsetTop + els.counter.offsetHeight : 64;
  const yMain = Math.round(cBottom + (compact ? 10 : 18) + 0.9155 * fs + 2);
  const yearOff = compact ? Math.max(22, Math.round(0.26 * fs)) : Math.max(24, Math.round(0.3 * fs));
  const labelOff = yearOff + 44;
  const toolsY = vh < 520 ? H : H - (compact ? 30 : 34);
  const panelTop = compact ? yMain + yearOff + 36 : yMain + labelOff + 96;
  setFlag(root, "tight", toolsY - 16 - panelTop < (compact ? (vh < 520 ? 150 : 250) : 180));
  const vars: Record<string, number> = {
    "--head-x": headX, "--y-main": yMain, "--year-off": yearOff, "--label-off": labelOff,
    "--panel-top": panelTop, "--tools-y": toolsY, "--head-bottom": compact ? yMain : yMain + labelOff + 72,
  };
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, px(v)));

  const nowM = nowMonth(new Date(), steps);
  const scale = layoutStations({
    steps,
    phraseWidths: phrases.map((p) => p.getBoundingClientRect().width),
    pad: 0.5 * fs,
    nowM,
    compact,
    labelW: cssNumber(root, "--label-w", 300),
  });
  const { x, xNow, anchors } = scale;
  els.stations.forEach((st, i) => {
    st.style.left = px(x[i]);
    st.style.top = px(yMain);
  });
  const trackW = xNow + W + 40;
  els.arts.forEach((art) => {
    art.querySelectorAll<HTMLElement>("[data-phrase]").forEach((p, t) => {
      const first = steps.findIndex((f) => f.t === t);
      p.style.left = px(x[first]);
    });
    const svg = art.querySelector("svg");
    svg?.setAttribute("width", String(trackW));
    svg?.setAttribute("height", String(H));
    // No buffer stop at the start: the line arrives from the hero (écart 9 de 003).
    svg?.querySelector("path")?.setAttribute("d", `M0 ${yMain}H${xNow - 11}`);
    svg?.querySelector("polygon")?.setAttribute("points", `${xNow - 12},${yMain - 6} ${xNow},${yMain} ${xNow - 12},${yMain + 6}`);
  });
  els.years.forEach((el) => {
    const xt = Math.round(xOfMonth(anchors, (Number(el.dataset.year) - 2010) * 12));
    el.hidden = xt > xNow;
    el.style.setProperty("--x", px(xt));
  });
  [els.track, els.done].forEach((t) => (t.style.width = px(trackW)));
  layoutTools(els.track.querySelector("[data-marks]"), x, xNow + W - headX, trackW, compact);

  const braking = brakingCurve(x, xNow, compact);
  const total = braking.ss[braking.ss.length - 1] + Math.round(0.8 * vh);
  runway.style.height = px(Math.round(stage.offsetHeight + total));
  const hdr = cssNumber(root, "--hdr", 56);
  const len = Math.max(1, runway.offsetHeight - (vh - hdr));
  const { P, X } = progressCurve(braking, len, xNow);
  const mini = layoutMini(scene, x, xNow, X);
  const geo: SceneGeo = { ...scale, compact, headX, yMain, hdr, nowM, P, X, len, native: nativeScrollAvailable(), ...mini };
  scene.geo = geo;
  mapScroll(scene);
  return geo;
}

/**
 * Binds the curve to the document scroll. Cheap — re-run whenever the page height or the
 * section's position changes (the hero's junction can push the About down after layout).
 */
export function mapScroll(scene: Scene): void {
  const geo = scene.geo;
  cancelAnims(scene);
  if (!geo) return;
  const { els } = scene;
  els.root.dataset.engine = geo.native ? "native" : "raf";
  if (!geo.native) return;
  const start = els.runway.getBoundingClientRect().top + window.scrollY - geo.hdr;
  const stops = toTimelineStops(geo.P, geo.X.map((v) => geo.headX - v), start, geo.len, maxScroll());
  [els.track, els.done].forEach((t) => {
    t.style.transform = "";
    const a = animateOnScroll(t, stops, translateX);
    if (a) scene.state.anims.push(a);
  });
  const mmStops = toTimelineStops(geo.P, geo.mmX, start, geo.len, maxScroll());
  const { head, done, doneIn } = els.mini;
  [head, done, doneIn].forEach((el, k) => {
    if (!el) return;
    el.style.transform = "";
    const a = animateOnScroll(el, mmStops, (v) => ({ transform: miniFrames(v, geo.mmW)[k] }));
    if (a) scene.state.anims.push(a);
  });
}
