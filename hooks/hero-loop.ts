"use client";

import { loopFrames, type HeroGeometry } from "@/lib/hero-network";
import type { HeroEls } from "./hero-scene";

// The idle train: one line after another, a 700 ms stop at the node, 90 px/s, 1.6 s between
// passes. It stops on hover or focus of a role, when the tab is hidden, as soon as the page is
// scrolled, and on Pause. Never in reduced motion.
export interface Loop {
  entered: boolean;
  userPaused: boolean;
  hover: boolean;
  focus: boolean;
  anim: Animation | null;
  timer: number;
  idx: number;
  delay: number;
}

export function makeLoop(): Loop {
  return { entered: false, userPaused: false, hover: false, focus: false, anim: null, timer: 0, idx: 0, delay: 1800 };
}

function reduced(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function loopOK(l: Loop): boolean {
  return l.entered && !reduced() && !l.userPaused && !l.hover && !l.focus && !document.hidden && window.scrollY <= 0;
}

export function stopLoop(l: Loop): void {
  l.anim?.cancel();
  l.anim = null;
  window.clearTimeout(l.timer);
  l.timer = 0;
}

export function syncLoop(l: Loop, e: HeroEls, g: HeroGeometry | null): void {
  const hide = !l.entered || reduced() || window.scrollY > 0;
  if (hide) e.hero.setAttribute("data-loop-hide", "");
  else e.hero.removeAttribute("data-loop-hide");
  if (loopOK(l) && g) {
    if (l.anim) {
      if (l.anim.playState === "paused") l.anim.play();
    } else if (!l.timer) {
      l.timer = window.setTimeout(() => next(l, e, g), l.delay);
    }
  } else {
    l.anim?.pause();
    window.clearTimeout(l.timer);
    l.timer = 0;
  }
}

function next(l: Loop, e: HeroEls, g: HeroGeometry): void {
  l.timer = 0;
  if (!loopOK(l) || !e.loop) return;
  const { frames, duration } = loopFrames(g.lines[l.idx % 3], g);
  l.idx += 1;
  const a = e.loop.animate(
    frames.map((f) => ({ offset: f.offset, transform: `translate(${f.x.toFixed(2)}px,${f.y.toFixed(2)}px)`, opacity: f.opacity })),
    { duration, easing: "linear", fill: "both" },
  );
  l.anim = a;
  a.onfinish = () => {
    if (l.anim !== a) return;
    l.anim = null;
    l.delay = 1600;
    syncLoop(l, e, g);
  };
}

/** Wires the stop conditions; returns the cleanup. */
export function bindLoop(l: Loop, e: HeroEls, sync: () => void): () => void {
  const rows = Array.from(e.h1.querySelectorAll<HTMLElement>("[data-row]"));
  const set = (fn: () => void) => () => {
    fn();
    sync();
  };
  const enter = (ev: PointerEvent) => {
    if (ev.pointerType !== "mouse") return;
    l.hover = true;
    sync();
  };
  const leave = set(() => (l.hover = false));
  const fin = set(() => (l.focus = true));
  const fout = set(() => (l.focus = false));
  const pause = set(() => (l.userPaused = !l.userPaused));
  rows.forEach((r) => {
    r.addEventListener("pointerenter", enter);
    r.addEventListener("pointerleave", leave);
  });
  e.h1.addEventListener("focusin", fin);
  e.h1.addEventListener("focusout", fout);
  e.pause?.addEventListener("click", pause);
  document.addEventListener("visibilitychange", sync);
  return () => {
    rows.forEach((r) => {
      r.removeEventListener("pointerenter", enter);
      r.removeEventListener("pointerleave", leave);
    });
    e.h1.removeEventListener("focusin", fin);
    e.h1.removeEventListener("focusout", fout);
    e.pause?.removeEventListener("click", pause);
    document.removeEventListener("visibilitychange", sync);
    stopLoop(l);
  };
}
