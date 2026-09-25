"use client";

import { useEffect, type RefObject } from "react";
import { createScene, teardown } from "./about-scene";
import { layoutScene, mapScroll } from "./about-scene-layout";
import { updateScene } from "./about-scene-update";
import { requestFrame, subscribeScroll } from "./scroll-loop";

/**
 * The About scene, as a client enhancement over the server-rendered socle. Recomputed (never
 * accumulated) on fonts, load, resize and motion-preference changes; the scroll mapping alone is
 * re-bound whenever the page height changes.
 */
export function useAboutScene(runwayRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const runway = runwayRef.current;
    const scene = runway ? createScene(runway) : null;
    if (!scene) return;

    const frame = () => updateScene(scene);
    const relayout = () => {
      layoutScene(scene);
      requestFrame();
    };
    let raf = 0;
    const soon = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), relayout()));
    };

    relayout();
    const unsubscribe = subscribeScroll(frame);

    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w !== lastW || Math.abs(h - lastH) > 120 || (h < 500) !== (lastH < 500)) {
          lastW = w;
          lastH = h;
          relayout();
        }
      }, 120);
    };
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", relayout);
    window.addEventListener("load", soon);
    document.fonts?.ready.then(soon);
    document.fonts?.addEventListener("loadingdone", soon);

    let lastHeight = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        lastHeight = h;
        mapScroll(scene);
        requestFrame();
      }
    });
    ro.observe(document.body);

    return () => {
      unsubscribe();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", soon);
      mq.removeEventListener("change", relayout);
      document.fonts?.removeEventListener("loadingdone", soon);
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      teardown(scene);
    };
  }, [runwayRef]);
}
