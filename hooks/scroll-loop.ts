"use client";

// One passive scroll listener and one requestAnimationFrame for the whole page (ADR-012).
// The hero and the About subscribe independently; neither reads the other's state.
type Frame = () => void;

const subscribers = new Set<Frame>();
let raf = 0;
let trail = 0;

function tick(): void {
  raf = 0;
  subscribers.forEach((f) => f());
  // Two re-reads after the last scroll event: layout may settle a frame late.
  if (trail-- > 0) raf = requestAnimationFrame(tick);
}

export function requestFrame(): void {
  if (!raf) raf = requestAnimationFrame(tick);
}

function onScroll(): void {
  trail = 2;
  requestFrame();
}

export function subscribeScroll(frame: Frame): () => void {
  if (subscribers.size === 0) window.addEventListener("scroll", onScroll, { passive: true });
  subscribers.add(frame);
  requestFrame();
  return () => {
    subscribers.delete(frame);
    if (subscribers.size === 0) window.removeEventListener("scroll", onScroll);
  };
}
