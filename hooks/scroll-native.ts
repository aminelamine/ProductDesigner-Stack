"use client";

import { detectNativeScroll, type TimelineStop } from "@/lib/scroll-engine";

// Native engine: Web Animations on the document ScrollTimeline. Keyframes are objects, never an
// injected <style>. Only `transform` and `opacity` are ever animated (ADR-012).
type ScrollTimelineCtor = new (options: { source?: Element | null; axis?: "block" }) => AnimationTimeline;

function scrollTimelineCtor(): ScrollTimelineCtor | undefined {
  return (globalThis as unknown as { ScrollTimeline?: ScrollTimelineCtor }).ScrollTimeline;
}

export function nativeScrollAvailable(): boolean {
  return typeof window !== "undefined" && detectNativeScroll(window.CSS, typeof scrollTimelineCtor() === "function");
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function maxScroll(): number {
  const el = document.scrollingElement ?? document.documentElement;
  return Math.max(1, el.scrollHeight - window.innerHeight);
}

let timeline: AnimationTimeline | null = null;

export function rootTimeline(): AnimationTimeline | null {
  const Ctor = scrollTimelineCtor();
  if (!Ctor) return null;
  if (!timeline) timeline = new Ctor({ source: document.scrollingElement ?? document.documentElement, axis: "block" });
  return timeline;
}

/** Scroll-linked animation of `el` along `stops`; `frame` maps a value to transform / opacity. */
export function animateOnScroll(
  el: Element,
  stops: readonly TimelineStop[],
  frame: (v: number) => { transform?: string; opacity?: number },
): Animation | null {
  const tl = rootTimeline();
  if (!tl) return null;
  return el.animate(
    stops.map((s) => ({ offset: s.offset, ...frame(s.value) })),
    { timeline: tl, fill: "both", easing: "linear" },
  );
}

export function translateX(v: number): { transform: string } {
  return { transform: `translate3d(${v.toFixed(2)}px,0,0)` };
}
