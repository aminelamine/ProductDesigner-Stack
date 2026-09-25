"use client";

import { computeNetwork, type Box, type HeroGeometry, type HeroMeasure } from "@/lib/hero-network";

// DOM handles of the hero. Everything is looked up inside the hero section; of the About, only
// its public contract is read: [data-junction-target] and #parcours. Nothing is written there.
export interface HeroEls {
  hero: HTMLElement;
  h1: HTMLElement;
  svg: SVGSVGElement;
  nms: HTMLElement[];
  probes: HTMLElement[];
  words: HTMLElement[];
  sub: HTMLElement | null;
  pause: HTMLElement | null;
  renvoi: HTMLElement | null;
  lines: SVGPathElement[];
  bars: SVGRectElement[];
  inks: SVGCircleElement[];
  exit: SVGPathElement | null;
  segs: SVGPathElement[];
  train: SVGCircleElement | null;
  loop: SVGCircleElement | null;
  ring: SVGCircleElement | null;
  halo: SVGCircleElement | null;
  core: SVGCircleElement | null;
}

function all<T extends Element>(root: ParentNode, sel: string): T[] {
  return Array.from(root.querySelectorAll<T>(sel));
}

export function heroEls(svg: SVGSVGElement): HeroEls | null {
  const hero = svg.closest<HTMLElement>("section");
  const h1 = hero?.querySelector<HTMLElement>("h1");
  if (!hero || !h1) return null;
  return {
    hero, h1, svg,
    nms: all(h1, "[data-nm]"),
    probes: all(h1, "[data-bl]"),
    words: all(h1, "[data-word]"),
    sub: hero.querySelector("[data-hero-sub] p"),
    pause: hero.querySelector("[data-pause]"),
    renvoi: hero.querySelector("[data-renvoi]"),
    lines: all(svg, "[data-line]"),
    bars: all(svg, "[data-bar]"),
    inks: all(svg, "[data-ink]"),
    exit: svg.querySelector("[data-exit]"),
    segs: all(svg, "[data-fseg]"),
    train: svg.querySelector("[data-train]"),
    loop: svg.querySelector("[data-loop]"),
    ring: svg.querySelector("[data-ring]"),
    halo: svg.querySelector("[data-halo]"),
    core: svg.querySelector("[data-core]"),
  };
}

function rel(r: DOMRect, o: DOMRect): Box {
  return { left: r.left - o.left, right: r.right - o.left, top: r.top - o.top, bottom: r.bottom - o.top };
}

export function measureHero(e: HeroEls): HeroMeasure {
  const hr = e.hero.getBoundingClientRect();
  const vertical = !window.matchMedia("(min-width: 580px)").matches;
  const nb = e.nms.map((n) => n.getBoundingClientRect());
  const obstacles: Box[] = (vertical ? e.words.map((w) => w.getBoundingClientRect()) : nb).map((r) => rel(r, hr));
  if (e.sub) {
    const range = document.createRange();
    range.selectNodeContents(e.sub);
    Array.from(range.getClientRects()).forEach((r) => obstacles.push(rel(r, hr)));
  }
  if (e.pause && getComputedStyle(e.pause).display !== "none") obstacles.push(rel(e.pause.getBoundingClientRect(), hr));
  const t = document.querySelector("[data-junction-target]")?.getBoundingClientRect();
  return {
    vertical,
    W: e.hero.clientWidth,
    H: e.hero.clientHeight,
    F: parseFloat(getComputedStyle(e.h1).fontSize),
    h1x: e.h1.getBoundingClientRect().left - hr.left,
    tx: nb[0].left - hr.left,
    widths: nb.map((b) => b.width),
    y: e.probes.map((p) => p.getBoundingClientRect().top - hr.top),
    obstacles,
    renvoi: { w: e.renvoi?.offsetWidth ?? 0, h: e.renvoi?.offsetHeight ?? 0 },
    target: t ? { x: t.left - hr.left, y: t.top - hr.top } : null,
  };
}

/**
 * Measure, compute, let the hero grow by the junction's overflow (its own margin — never the
 * About's), then measure the target again and compute the final junction.
 */
export function layoutHero(e: HeroEls): HeroGeometry {
  const first = computeNetwork(measureHero(e));
  e.hero.style.marginBottom = `${first.overflow}px`;
  return computeNetwork(measureHero(e));
}
