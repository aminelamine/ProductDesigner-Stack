import { HERO } from "./data";
import {
  MARGIN,
  computeNetwork,
  entryTimings,
  fillAt,
  fillStops,
  filledFraction,
  rolesOf,
  segmentHits,
  type HeroMeasure,
  type Pt,
} from "./hero-network";
import { interp } from "./scroll-engine";

// §3b — code-decidable criteria of P-003 (feature_hero_reseau), on measures taken from a real
// render (1440 × 900 horizontal, 375 × 812 vertical).
function check(id: string, ok: boolean, detail: string): void {
  if (!ok) throw new Error(`${id} failed: ${detail}`);
  console.log(`${id} ${detail} — passed`);
}

const box = (left: number, top: number, w: number, h: number) => ({ left, top, right: left + w, bottom: top + h });
const desktop: HeroMeasure = {
  vertical: false, W: 1440, H: 844, F: 92,
  h1x: 239, tx: 239 + 0.55 * 92 + 32, widths: [735, 700, 610], y: [300, 410, 520],
  obstacles: [box(322, 220, 735, 100), box(322, 330, 700, 100), box(322, 440, 610, 100), box(322, 590, 330, 26), box(320, 624, 150, 44)],
  renvoi: { w: 120, h: 44 },
  target: { x: 480, y: 1020 },
};
const mobile: HeroMeasure = {
  vertical: true, W: 375, H: 756, F: 64,
  h1x: 24, tx: 24 + 0.55 * 64 + 16, widths: [290, 285, 250], y: [150, 300, 450],
  obstacles: [box(75, 90, 250, 66), box(75, 240, 245, 66), box(75, 390, 200, 66), box(24, 640, 300, 26), box(24, 676, 150, 44)],
  renvoi: { w: 120, h: 44 },
  target: { x: 75, y: 900 },
};

const rows = rolesOf(HERO.headline);
check("CA-3 (logic)", rows.length === 3 && rows.join(" | ") === HERO.headline, "the 3 rows re-joined with the hidden ' | ' equal HERO.headline");

const octo = (pts: readonly Pt[]) => pts.slice(1).every((b, i) => {
  const a = pts[i];
  const dx = Math.abs(b[0] - a[0]);
  const dy = Math.abs(b[1] - a[1]);
  return dx < 0.01 || dy < 0.01 || Math.abs(dx - dy) < 0.01;
});
// Two passes, as the scene does: the hero grows by `overflow`, which pushes the About (and its
// target) down by the same amount; then the junction is recomputed onto the new target.
const settle = (m: HeroMeasure) => {
  const first = computeNetwork(m);
  const target = m.target ? { x: m.target.x, y: m.target.y + first.overflow } : null;
  return { g: computeNetwork({ ...m, target }), target };
};
const sd = settle(desktop);
const sm = settle(mobile);
const gd = sd.g;
const gm = sm.g;
check("CA-10", [gd, gm].every((g) => [...g.lines, g.junction].every(octo)), "every segment (3 lines + junction, both modes) is at 0°, 45° or 90°");

const clear = (g: typeof gd, m: HeroMeasure) => {
  const texts = [...m.obstacles, box(g.renvoi.x, g.renvoi.y, m.renvoi.w, m.renvoi.h)];
  return g.junction.slice(1).every((b, i) => texts.every((r) => !segmentHits(g.junction[i], b, r, MARGIN)));
};
check("CA-12", gd.clear && gm.clear && clear(gd, desktop) && clear(gm, mobile), `the junction crosses no text box of the hero, ${MARGIN} px clearance, at 1440 and 375`);

const last = (g: typeof gd) => g.junction[g.junction.length - 1];
const onTarget = (g: typeof gd, t: { x: number; y: number } | null) =>
  !!t && Math.abs(last(g)[0] - t.x) <= 1 && Math.abs(last(g)[1] - t.y) <= 1;
check("CA-11 (logic)", onTarget(gd, sd.target) && onTarget(gm, sm.target),
  "the junction's last point is the junction target (±1 px)");

const t = entryTimings(gd);
check("CA-9", t.starts.every((st, i) => Math.abs(st + t.durations[i] - 900) <= 20) && t.starts.join() === "0,80,160",
  "the 3 traces leave at 0 / 80 / 160 ms and all end at 900 ms (±20)");

const stops = fillStops(gd);
const native = stops.map((p) => filledFraction(fillAt(p, gd), gd));
let agree = 0;
for (let i = 0; i < 10; i++) {
  const p = (i + 0.37) / 10;
  if (Math.abs(filledFraction(fillAt(p, gd), gd) - interp(stops, native, p)) <= 0.02) agree += 1;
}
check("CA-30", agree === 10, `rAF fallback and native stops give the same filled fraction (±2 %) at ${agree}/10 positions`);
check("CA-13 (logic)", filledFraction(fillAt(1, gd), gd) === 1, "at the end of the departure range the exit is entirely filled");
