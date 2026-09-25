// Hero — le plan du réseau. Pure geometry (no DOM, no "use client"): from measured text boxes to
// three octolinear lines converging on a node, the 002 markers, the junction that goes down to
// the About's line, entry timings, the scroll fill and the idle train.
import { clamp } from "./scroll-engine";

export type Pt = [number, number];

export interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface HeroMeasure {
  vertical: boolean;
  W: number;
  H: number;
  /** Font size of the names. */
  F: number;
  /** Left of the <h1>, and left of the names (after the 002 marker cell). */
  h1x: number;
  tx: number;
  /** Width of each name and its baseline. */
  widths: readonly number[];
  y: readonly number[];
  /** Every text box of the hero: names (or words), subtitle lines, Pause. */
  obstacles: readonly Box[];
  renvoi: { w: number; h: number };
  /** [data-junction-target], in hero coordinates. */
  target: { x: number; y: number } | null;
}

export interface Marker {
  ink: { cx: number; cy: number; r: number };
  bar: { x: number; y: number; width: number; height: number };
}

export interface HeroGeometry {
  vertical: boolean;
  lines: Pt[][];
  lens: number[];
  node: Pt;
  markers: Marker[];
  inkX: number[];
  pitch: number;
  renvoi: { x: number; y: number };
  junction: Pt[];
  cum: number[];
  exitLen: number;
  /** How far the junction's bend goes below the hero (the hero grows by this, never the About). */
  overflow: number;
  /** False when no fold clears every text by MARGIN. */
  clear: boolean;
}

/** Clearance between the junction and any text of the hero. */
export const MARGIN = 20;
/** Gap between the renvoi and the exit line — above MARGIN, so the exit clears it too. */
const RENVOI_GAP = 24;

export function cumLens(pts: readonly Pt[]): number[] {
  const c = [0];
  for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return c;
}

export function pointAt(pts: readonly Pt[], cum: readonly number[], s: number): Pt {
  if (s <= 0) return pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (s <= cum[i]) {
      const t = (s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
      return [pts[i - 1][0] + t * (pts[i][0] - pts[i - 1][0]), pts[i - 1][1] + t * (pts[i][1] - pts[i - 1][1])];
    }
  }
  return pts[pts.length - 1];
}

/** Does the segment a→b come within `m` px of the box? (0°, 45° or 90° segments.) */
export function segmentHits(a: Pt, b: Pt, r: Box, m: number): boolean {
  const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2));
  for (let i = 0; i <= steps; i++) {
    const x = a[0] + ((b[0] - a[0]) * i) / steps;
    const y = a[1] + ((b[1] - a[1]) * i) / steps;
    if (x >= r.left - m && x <= r.right + m && y >= r.top - m && y <= r.bottom + m) return true;
  }
  return false;
}

/**
 * First fold y (2 px steps) such that node ↓ fold ↘45° ↓ target crosses no text.
 * `clear` is false when no such fold exists (the caller reports it, the line is still drawn).
 */
export function findFold(
  nx: number, ny: number, hx: number, yEnd: number, y0: number, obs: readonly Box[], m: number,
): { y: number; clear: boolean } {
  const dx = Math.abs(nx - hx);
  for (let y = y0; y < y0 + 4000; y += 2) {
    const clear = obs.every(
      (r) =>
        !segmentHits([nx, ny], [nx, y], r, m) &&
        !segmentHits([nx, y], [hx, y + dx], r, m) &&
        !segmentHits([hx, y + dx], [hx, Math.max(y + dx, yEnd)], r, m),
    );
    if (clear) return { y, clear: true };
  }
  return { y: y0, clear: false };
}

export function computeNetwork(m: HeroMeasure): HeroGeometry {
  const { vertical: V, W, F, y } = m;
  const P = y[1] - y[0];
  let nx: number;
  let ny: number;
  let lines: Pt[][];
  let xm = 0;
  if (!V) {
    nx = m.tx + Math.max(...m.widths) + P; // the node: one pitch after the longest name
    ny = y[1];
    lines = [
      [[0, y[0]], [nx - (ny - y[0]), y[0]], [nx, ny]],
      [[0, ny], [nx, ny]],
      [[0, y[2]], [nx - (y[2] - ny), y[2]], [nx, ny]],
    ];
  } else {
    const step = 6;
    xm = W - 12; // the bundle runs in the right gutter
    nx = xm;
    ny = y[2] + Math.max(0.35 * F, 18);
    lines = [
      [[0, y[0]], [xm + step, y[0]], [xm + step, ny - step], [xm, ny]],
      [[0, y[1]], [xm, y[1]], [xm, ny]],
      [[0, y[2]], [xm - step, y[2]], [xm - step, ny - step], [xm, ny]],
    ];
  }
  // 002 marker, one size (0.3 em), centred 0.15 em above the baseline
  const s = 0.3 * F;
  const mx = m.h1x + 0.125 * F;
  const markers: Marker[] = y.map((yb) => {
    const cy = yb - 0.15 * F;
    return {
      ink: { cx: mx + (s * 4) / 24, cy, r: (s * 3) / 24 },
      bar: { x: mx + (s * 9) / 24, y: cy - (s * 2.5) / 24, width: (s * 15) / 24, height: (s * 5) / 24 },
    };
  });
  const renvoi = V ? { x: xm - RENVOI_GAP - m.renvoi.w, y: ny + 8 } : { x: nx + RENVOI_GAP, y: ny + 10 };
  const obs = [...m.obstacles, { left: renvoi.x, right: renvoi.x + m.renvoi.w, top: renvoi.y, bottom: renvoi.y + m.renvoi.h }];

  // JUNCTION: node ↓ 90° · fold 45° towards the About's head · ↓ 90° onto its line
  const hx = m.target ? m.target.x : nx;
  const fold = findFold(nx, ny, hx, m.target ? m.target.y : 0, V ? ny + 24 : ny + 0.75 * P, obs, MARGIN);
  const yB = fold.y;
  const Cy = yB + Math.abs(nx - hx);
  const Dy = m.target ? m.target.y : Cy + 1;
  const junction: Pt[] = [[nx, ny], [nx, yB], [hx, Cy], [hx, Math.max(Cy + 1, Dy - 0.75)]];
  const cum = cumLens(junction);
  return {
    vertical: V,
    lines,
    lens: lines.map((l) => cumLens(l)[l.length - 1]),
    node: [nx, ny],
    markers,
    inkX: markers.map((k) => k.ink.cx),
    pitch: P,
    renvoi,
    junction,
    cum,
    exitLen: cum[cum.length - 1],
    overflow: Math.max(0, Math.round(Cy - m.H)),
    clear: fold.clear,
  };
}

// ── Entry: the three traces leave at 0 / 80 / 160 ms and arrive together at 900 ms ──────────

function bezierInverse(x1: number, y1: number, x2: number, y2: number): (f: number) => number {
  const c = (a1: number, a2: number, u: number) => {
    const v = 1 - u;
    return 3 * a1 * u * v * v + 3 * a2 * u * u * v + u * u * u;
  };
  return (f) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 48; i++) {
      const mid = (lo + hi) / 2;
      if (c(y1, y2, mid) < f) lo = mid;
      else hi = mid;
    }
    return c(x1, x2, (lo + hi) / 2);
  };
}
const traceTimeAt = bezierInverse(0.65, 0, 0.35, 1);

export const ARRIVAL = 900;
export const STARTS = [0, 80, 160];

export interface EntryTimings {
  starts: number[];
  durations: number[];
  /** When each trace reaches its marker (the marker and the name light up). */
  lit: number[];
  arrival: number;
  exitStart: number;
  exitDuration: number;
  end: number;
}

export function entryTimings(g: Pick<HeroGeometry, "lens" | "inkX" | "exitLen">): EntryTimings {
  const durations = STARTS.map((st) => ARRIVAL - st);
  const lit = STARTS.map((st, i) => Math.round(st + traceTimeAt(clamp(g.inkX[i] / g.lens[i], 0, 1)) * durations[i]));
  const v = g.lens[1] / durations[1];
  const exitDuration = Math.round(clamp(g.exitLen / v, 400, 900));
  const exitStart = ARRIVAL + 100;
  return { starts: STARTS, durations, lit, arrival: ARRIVAL, exitStart, exitDuration, end: exitStart + Math.max(exitDuration, 300) };
}

// ── Departure on scroll: the exit fills from the node to the About's line, a point travels ──

export interface FillState {
  scales: number[];
  point: Pt;
  pointOn: boolean;
}

export function fillAt(p: number, g: Pick<HeroGeometry, "junction" | "cum" | "exitLen">): FillState {
  const s = clamp(p, 0, 1) * g.exitLen;
  const scales = g.junction.slice(1).map((_, k) => clamp((s - g.cum[k]) / (g.cum[k + 1] - g.cum[k] || 1), 0, 1));
  return { scales, point: pointAt(g.junction, g.cum, s), pointOn: p > 0.004 && p < 0.994 };
}

/** Fraction of the exit that is filled — the quantity both engines must agree on. */
export function filledFraction(f: FillState, g: Pick<HeroGeometry, "cum" | "exitLen">): number {
  return f.scales.reduce((a, sc, k) => a + sc * (g.cum[k + 1] - g.cum[k]), 0) / (g.exitLen || 1);
}

/** Progress stops at which the fill is exactly piecewise-linear (vertices + on/off edges). */
export function fillStops(g: Pick<HeroGeometry, "cum" | "exitLen">): number[] {
  const P = new Set<number>([0, 0.004, 0.0041, 0.994, 0.9941, 1]);
  g.cum.forEach((c) => {
    const a = c / (g.exitLen || 1);
    P.add(a);
    P.add(Math.min(1, a + 0.0005));
  });
  return [...P].filter((p) => p >= 0 && p <= 1).sort((a, b) => a - b);
}

// ── Idle train: one line after another, 700 ms stop at the node, 90 px/s ─────────────────────

export interface LoopFrame {
  offset: number;
  x: number;
  y: number;
  opacity: number;
}

export function loopFrames(line: readonly Pt[], g: Pick<HeroGeometry, "junction" | "pitch">): { frames: LoopFrame[]; duration: number } {
  const pts = [...line, ...g.junction.slice(1)];
  const cum = cumLens(pts);
  const lineLen = cumLens(line)[line.length - 1];
  const run = Math.min(cum[cum.length - 1] - lineLen, Math.max(1.5 * g.pitch, 160));
  const end = lineLen + run;
  const v = 0.09;
  const dwell = 700;
  const fin = 28;
  const fout = 56;
  let S = [0, fin, end - fout, end, ...cum.filter((c) => c < end)].sort((a, b) => a - b);
  S = S.filter((s, j) => j === 0 || s - S[j - 1] > 0.01);
  const tAt = (s: number, after: boolean) => s / v + (s > lineLen + 0.01 || (Math.abs(s - lineLen) <= 0.01 && after) ? dwell : 0);
  const opAt = (s: number) => (s < fin ? s / fin : s > end - fout ? Math.max(0, (end - s) / fout) : 1);
  const duration = tAt(end, true);
  const frames: LoopFrame[] = [];
  S.forEach((s) => {
    const [x, y] = pointAt(pts, cum, s);
    const at = (after: boolean) => ({ offset: tAt(s, after) / duration, x, y, opacity: opAt(s) });
    frames.push(at(false));
    if (Math.abs(s - lineLen) <= 0.01) frames.push(at(true));
  });
  return { frames, duration };
}

/** The separator of the LinkedIn headline — kept in the <h1> text, visually hidden. */
export const ROLE_SEPARATOR = " | ";

/** The three roles, derived from the headline — never retyped. */
export function rolesOf(headline: string): string[] {
  return headline.split(ROLE_SEPARATOR);
}
