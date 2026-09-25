// Shared scroll engine — pure layer (ADR-012). No DOM, no "use client".
// The native engine (Web Animations on a document ScrollTimeline) and the rAF fallback read the
// same curve through these functions: a curve is a list of progress stops `P` (0 → 1) and the
// values `V` reached at those stops, interpolated linearly in between.

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Piecewise-linear interpolation over increasing `xs`. */
export function interp(xs: readonly number[], ys: readonly number[], v: number): number {
  const n = xs.length;
  if (n === 0) return 0;
  if (v <= xs[0]) return ys[0];
  if (v >= xs[n - 1]) return ys[n - 1];
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (xs[mid] < v) lo = mid;
    else hi = mid;
  }
  const a = xs[lo];
  const b = xs[hi];
  return b === a ? ys[hi] : ys[lo] + ((v - a) / (b - a)) * (ys[hi] - ys[lo]);
}

export interface CssSupportsLike {
  supports(conditionText: string): boolean;
}

/** Native engine only when the CSS scroll timeline is announced AND the WAAPI constructor exists. */
export function detectNativeScroll(css: CssSupportsLike | undefined, hasScrollTimeline: boolean): boolean {
  return !!css && css.supports("animation-timeline: scroll()") && hasScrollTimeline;
}

/** Progress of `scroll` through the range [start, start + length]. */
export function progressBetween(scroll: number, start: number, length: number): number {
  return clamp((scroll - start) / Math.max(1, length), 0, 1);
}

/**
 * Progress read from a live rectangle: the element's top has travelled `offset` px past the
 * bottom of the viewport when progress is 0, and `offset + length` px when it is 1.
 */
export function progressFromRect(top: number, viewportH: number, offset: number, length: number): number {
  return clamp((viewportH - top - offset) / Math.max(1, length), 0, 1);
}

export interface TimelineStop {
  offset: number;
  value: number;
}

/**
 * Re-expresses a curve defined over the scroll range [start, start + length] as stops over the
 * whole document scroll timeline (0 → maxScroll), which is what a root ScrollTimeline reports.
 * Before `start` the first value holds, after the range the last value holds.
 */
export function toTimelineStops(
  P: readonly number[],
  V: readonly number[],
  start: number,
  length: number,
  maxScroll: number,
): TimelineStop[] {
  const max = Math.max(1, maxScroll);
  const stops: TimelineStop[] = [{ offset: 0, value: V[0] }];
  let last = 0;
  for (let i = 0; i < P.length; i++) {
    const offset = clamp((start + P[i] * length) / max, last, 1);
    stops.push({ offset, value: V[i] });
    last = offset;
  }
  stops.push({ offset: 1, value: V[V.length - 1] });
  return stops;
}

/** Value of a stop list at a timeline offset — what the native engine renders. */
export function sampleStops(stops: readonly TimelineStop[], offset: number): number {
  const n = stops.length;
  if (offset <= stops[0].offset) return stops[0].value;
  for (let i = 1; i < n; i++) {
    if (offset <= stops[i].offset) {
      const a = stops[i - 1];
      const b = stops[i];
      return b.offset === a.offset ? b.value : a.value + ((offset - a.offset) / (b.offset - a.offset)) * (b.value - a.value);
    }
  }
  return stops[n - 1].value;
}
