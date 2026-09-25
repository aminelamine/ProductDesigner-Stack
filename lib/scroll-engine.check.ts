import { brakingCurve, currentIndex, flattenSteps, layoutStations, progressCurve } from "./about-timeline";
import { detectNativeScroll, interp, progressBetween, sampleStops, toTimelineStops } from "./scroll-engine";

// §3b — the shared engine (ADR-012): the rAF fallback and the native timeline read the same stops.
function check(id: string, ok: boolean, detail: string): void {
  if (!ok) throw new Error(`${id} failed: ${detail}`);
  console.log(`${id} ${detail} — passed`);
}

const forcedOff = { supports: (c: string) => c !== "animation-timeline: scroll()" };
const on = { supports: () => true };
check("CA-19 (detect)", !detectNativeScroll(forcedOff, true) && detectNativeScroll(on, true) && !detectNativeScroll(on, false),
  "native engine off when CSS.supports('animation-timeline: scroll()') is forced false");

// A real line: 17 stations, braked, scrolled over a runway that starts 1900 px down the page.
const steps = flattenSteps();
const s = layoutStations({ steps, phraseWidths: [980, 520, 760], pad: 64, nowM: 200, compact: false, labelW: 300 });
const b = brakingCurve(s.x, s.xNow, false);
const total = b.ss[b.ss.length - 1] + 720;
const { P, X } = progressCurve(b, total, s.xNow);
const start = 1900;
const maxScroll = start + total + 2400;
const stops = toTimelineStops(P, X, start, total, maxScroll);

let same = 0;
for (let i = 0; i < 20; i++) {
  const scroll = start + (total * i) / 19;
  const fallback = interp(P, X, progressBetween(scroll, start, total));
  const native = sampleStops(stops, scroll / maxScroll);
  if (currentIndex(s.x, fallback) === currentIndex(s.x, native) && Math.abs(fallback - native) < 1) same += 1;
}
check("CA-19", same === 20, `rAF fallback and native timeline agree on the active station at ${same}/20 positions`);

const brakes = s.x.slice(1, -1).every((x) => {
  const at = (v: number) => interp(X, P, v);
  return at(x + 5) - at(x - 5) > at(x - 45) - at(x - 55);
});
check("CA-12 (logic)", brakes, "the line brakes at every station (more scroll per px around each stop)");
