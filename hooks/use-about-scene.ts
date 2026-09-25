"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { interp } from "@/lib/scroll-engine";
import { createScene, teardown } from "./about-scene";
import { layoutScene, mapScroll } from "./about-scene-layout";
import { makePanel, resetPanel, updatePanel } from "./about-scene-panel";
import { updateScene } from "./about-scene-update";
import { prefersReducedMotion } from "./scroll-native";
import { requestFrame, subscribeScroll } from "./scroll-loop";

/**
 * The About scene, as a client enhancement over the server-rendered socle. Recomputed (never
 * accumulated) on fonts, load, resize and motion-preference changes; the scroll mapping alone is
 * re-bound whenever the page height changes.
 */
export function useAboutScene(runwayRef: RefObject<HTMLElement | null>): (stationIndex: number) => void {
  const go = useRef<(stationIndex: number) => void>(() => undefined);
  useEffect(() => {
    const runway = runwayRef.current;
    const scene = runway ? createScene(runway) : null;
    if (!runway || !scene) return;

    // Scroll until the head stands on the station (a little past its stop).
    go.current = (si) => {
      const geo = scene.geo;
      if (!geo) return;
      const p = interp(geo.X, geo.P, geo.x[si] + (geo.compact ? 6 : 20));
      const runTop = runway.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.round(runTop - geo.hdr + p * geo.len), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };

    const panel = makePanel(scene);
    const frame = () => {
      const f = updateScene(scene);
      if (f) updatePanel(scene, panel, f);
    };
    const relayout = () => {
      if (!layoutScene(scene)) resetPanel(panel);
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
      resetPanel(panel);
    };
  }, [runwayRef]);
  return useCallback((stationIndex: number) => go.current(stationIndex), []);
}
