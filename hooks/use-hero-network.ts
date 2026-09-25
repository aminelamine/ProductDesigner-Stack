"use client";

import { useEffect, type RefObject } from "react";
import type { HeroGeometry } from "@/lib/hero-network";
import { drawHero } from "./hero-draw";
import { setEntryTimings, startEntry } from "./hero-entry";
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

    const relayout = () => {
      rt.g = layoutHero(e);
      drawHero(e, rt.g);
      rt.end = setEntryTimings(e, rt.g);
    };
    let raf = 0;
    const soon = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), relayout()));
    };
    relayout();
    const stopEntry = startEntry(e, rt.end, () => {
      rt.entered = true;
    });

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
