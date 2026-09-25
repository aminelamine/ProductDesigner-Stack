"use client";

import { experienceAt, monthOfX, yearOfMonth } from "@/lib/about-timeline";
import { clamp } from "@/lib/scroll-engine";
import { pulse, setFlag, type Scene } from "./about-scene";
import type { FrameInfo } from "./about-scene-update";

// Counters, and the card of the current event: one at a time, leaving at once, entering orchestrated.

interface Slot {
  ds: HTMLElement[];
  v: number;
  anim: (Animation | null)[];
}

export interface Odo {
  slots: Slot[];
  val: number;
}

export function makeOdo(host: HTMLElement | null): Odo {
  const slots = Array.from(host?.querySelectorAll<HTMLElement>("[data-slot]") ?? []).map((sl) => ({
    ds: Array.from(sl.children) as HTMLElement[],
    v: -1,
    anim: [] as (Animation | null)[],
  }));
  return { slots, val: -1 };
}

function roll(sl: Slot, nv: number, dir: number, order: number): void {
  const ov = sl.v;
  sl.v = nv;
  sl.anim.forEach((a, d) => {
    if (a && d !== nv && d !== ov) {
      a.cancel();
      sl.anim[d] = null;
    }
  });
  const inst = dir === 0;
  const opt: KeyframeAnimationOptions = {
    duration: inst ? 0 : 440, delay: inst ? 0 : order * 45, easing: "cubic-bezier(0.2, 0.7, 0, 1)", fill: "both",
  };
  if (ov >= 0 && ov !== nv) {
    sl.anim[ov]?.cancel();
    const out = sl.ds[ov].animate(
      [{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${-dir * 100}%)`, opacity: 0 }], opt);
    sl.anim[ov] = out;
    out.onfinish = () => {
      if (sl.anim[ov] === out) {
        out.cancel();
        sl.anim[ov] = null;
      }
    };
  }
  sl.anim[nv]?.cancel();
  sl.anim[nv] = sl.ds[nv].animate(
    [{ transform: `translateY(${dir * 100}%)`, opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], opt);
}

/** Beyond 2 of difference (jump from the minimap, Home/End, abrupt scroll) the value lands, no roll. */
export function setOdo(o: Odo, v: number, jump: boolean): void {
  if (v === o.val || o.slots.length === 0) return;
  const dir = o.val < 0 || jump || Math.abs(v - o.val) > 2 ? 0 : v > o.val ? 1 : -1;
  o.val = v;
  const str = String(v).padStart(o.slots.length, "0");
  for (let i = o.slots.length - 1, order = 0; i >= 0; i--) {
    const nv = Number(str[i]);
    if (o.slots[i].v !== nv) roll(o.slots[i], nv, dir, order++);
  }
}

export function resetOdo(o: Odo): void {
  o.val = -1;
  o.slots.forEach((sl) => {
    sl.v = -1;
    sl.anim.forEach((a) => a?.cancel());
    sl.anim = [];
  });
}

export interface PanelState {
  cards: HTMLElement[];
  slides: HTMLElement[][];
  slideIdx: number[];
  year: Odo;
  exp: Odo;
  current: number;
  lastSwitch: number;
}

export function makePanel(scene: Scene): PanelState {
  const root = scene.els.runway;
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
  return {
    cards,
    slides: cards.map((c) => Array.from(c.querySelectorAll<HTMLElement>("[data-slide]"))),
    slideIdx: cards.map(() => -1),
    year: makeOdo(root.querySelector("[data-odo=year]")),
    exp: makeOdo(root.querySelector("[data-odo=exp]")),
    current: -2,
    lastSwitch: 0,
  };
}

function resetSlides(ps: PanelState, i: number): void {
  ps.slides[i]?.forEach((sl) => setFlag(sl, "on", false));
  ps.slideIdx[i] = -1;
}

export function updatePanel(scene: Scene, ps: PanelState, f: FrameInfo): void {
  const geo = scene.geo;
  if (!geo) return;
  const m = Math.min(monthOfX(geo.anchors, f.xh), geo.nowM);
  setOdo(ps.year, Math.min(yearOfMonth(geo.nowM), yearOfMonth(m)), f.jump);
  setOdo(ps.exp, experienceAt(m, scene.steps), f.jump);

  const i = f.cur;
  if (i !== ps.current) {
    const t = performance.now();
    // A jump, or several changes within 280 ms: the card lands without choreography.
    const instant = f.jump || ps.current === -2 || Math.abs(i - ps.current) > 1 || t - ps.lastSwitch < 280;
    ps.lastSwitch = t;
    if (ps.current >= 0) {
      setFlag(ps.cards[ps.current], "on", false);
      setFlag(ps.cards[ps.current], "instant", false);
      resetSlides(ps, ps.current);
    }
    if (ps.current !== -2 && i >= 0 && !instant) pulse(scene.els.headRing);
    ps.current = i;
    if (i >= 0) {
      const c = ps.cards[i];
      setFlag(c, "instant", instant);
      setFlag(c, "on", true);
      if (instant) window.setTimeout(() => setFlag(c, "instant", false), 400);
    }
  }
  if (i >= 0 && ps.slides[i].length) {
    const n = ps.slides[i].length;
    const nextX = i < geo.x.length - 1 ? geo.x[i + 1] : geo.xNow;
    const idx = Math.floor(clamp((f.xh - geo.x[i]) / Math.max(1, nextX - geo.x[i]), 0, 0.9999) * n);
    if (idx !== ps.slideIdx[i]) {
      if (ps.slideIdx[i] >= 0) setFlag(ps.slides[i][ps.slideIdx[i]], "on", false);
      ps.slideIdx[i] = idx;
      setFlag(ps.slides[i][idx], "on", true);
    }
  }
}

export function resetPanel(ps: PanelState): void {
  ps.cards.forEach((c, i) => {
    setFlag(c, "on", false);
    resetSlides(ps, i);
  });
  ps.current = -2;
  resetOdo(ps.year);
  resetOdo(ps.exp);
}
