"use client";

import { useEffect, type RefObject } from "react";
import type { HeroGeometry } from "@/lib/hero-network";
import { drawHero } from "./hero-draw";
import { setEntryTimings, startEntry } from "./hero-entry";
import { bindLoop, makeLoop, stopLoop, syncLoop } from "./hero-loop";
import { subscribeScroll } from "./scroll-loop";
import { heroEls, layoutHero, type HeroEls } from "./hero-scene";

export interface HeroRuntime {
  e: HeroEls;
  g: HeroGeometry | null;
  end: number;
  entered: boolean;
}

/**
 * The hero network: drawn after measuring, recomputed on resize, on font arrival and whenever
 * the page height changes (the About below settles its own layout independently).
 */
export function useHeroNetwork(svgRef: RefObject<SVGSVGElement | null>): void {
  useEffect(() => {
    const svg = svgRef.current;
    const e = svg ? heroEls(svg) : null;
    if (!e) return;
    const rt: HeroRuntime = { e, g: null, end: 0, entered: false };

    const loop = makeLoop();
    const sync = () => syncLoop(loop, e, rt.g);
    const relayout = () => {
      rt.g = layoutHero(e);
      drawHero(e, rt.g);
      rt.end = setEntryTimings(e, rt.g);
      stopLoop(loop); // geometry changed: the next pass starts on the new lines
      sync();
    };
    let raf = 0;
    const soon = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), relayout()));
    };
    relayout();
    const stopEntry = startEntry(e, rt.end, () => {
      rt.entered = true;
      loop.entered = true;
      sync();
    });
    const unbindLoop = bindLoop(loop, e, sync);
    const unsubscribe = subscribeScroll(sync);

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(relayout, 140);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", soon);
    document.fonts?.ready.then(soon);
    document.fonts?.addEventListener("loadingdone", soon);
    let lastHeight = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        lastHeight = h;
        soon();
      }
    });
    ro.observe(document.body);

    return () => {
      stopEntry();
      unbindLoop();
      unsubscribe();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", soon);
      document.fonts?.removeEventListener("loadingdone", soon);
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      e.hero.style.marginBottom = "";
    };
  }, [svgRef]);
}
