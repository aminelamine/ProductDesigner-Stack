// About — le trajet parcouru. Pure logic (no DOM, no "use client"): month index, proportional
// scale per temps with a minimal gap, braking stops, active station, experience counters and the
// figures of the chute. Everything the scene shows is derived from PARCOURS here.
import { PARCOURS, type Step, type StepKind, type Temps } from "./data";
import { interp } from "./scroll-engine";

const BASE_YEAR = 2010;

/** "2010-02" → 1 ; "2008" → -24. Months counted from January 2010. */
export function monthIndex(s: string): number {
  const [y, m] = s.split("-");
  return (Number(y) - BASE_YEAR) * 12 + ((m ? Number(m) : 1) - 1);
}

export function monthIndexOfDate(d: Date): number {
  return (d.getFullYear() - BASE_YEAR) * 12 + d.getMonth();
}

export function yearOfMonth(m: number): number {
  return BASE_YEAR + Math.floor(m / 12);
}

export function isStep(item: Temps["items"][number]): item is Step {
  return item.kind === "formation" || item.kind === "poste" || item.kind === "mission";
}

export interface FlatStep {
  step: Step;
  /** Temps index. */
  t: number;
  /** Start month, null when undated. */
  m: number | null;
  /** Exclusive end month, null when running until today. */
  endEx: number | null;
  /** Index of the employer (missions), -1 otherwise. */
  parent: number;
}

export function flattenSteps(temps: readonly Temps[] = PARCOURS.temps): FlatStep[] {
  const out: FlatStep[] = [];
  temps.forEach((tp, t) => {
    tp.items.filter(isStep).forEach((step) => {
      const endMonth = step.end && step.end !== "now" ? monthIndex(step.end) + 1 : null;
      const single = step.start && !step.end ? monthIndex(step.start) + 1 : null;
      out.push({
        step,
        t,
        m: step.start ? monthIndex(step.start) : null,
        endEx: step.end === "now" ? null : (endMonth ?? single),
        parent: -1,
      });
    });
  });
  out.forEach((f) => {
    if (f.step.parent) f.parent = out.findIndex((o) => o.step.id === f.step.parent);
  });
  return out;
}

export function countKinds(temps: readonly Temps[] = PARCOURS.temps): Record<StepKind, number> {
  const c: Record<StepKind, number> = { formation: 0, poste: 0, mission: 0 };
  flattenSteps(temps).forEach((f) => (c[f.step.kind] += 1));
  return c;
}

/** Today as a month index, never before the last dated start (the line always ends after it). */
export function nowMonth(now: Date, steps: readonly FlatStep[] = flattenSteps()): number {
  const lastStart = Math.max(...steps.map((s) => (s.m === null ? -Infinity : s.m)));
  return Math.max(monthIndexOfDate(now), lastStart + 1);
}

function firstPosteMonth(steps: readonly FlatStep[]): number {
  const first = steps.find((s) => s.step.kind === "poste" && s.m !== null);
  return first && first.m !== null ? first.m : 0;
}

/** Years of experience at month `m`, counted from the first poste, clamped to 0–99. */
export function experienceAt(m: number, steps: readonly FlatStep[] = flattenSteps()): number {
  return Math.min(99, Math.max(0, Math.floor((m - firstPosteMonth(steps)) / 12)));
}

export function yearsOfExploration(now: Date, steps: readonly FlatStep[] = flattenSteps()): number {
  return experienceAt(monthIndexOfDate(now), steps);
}

/** Distinct clients: agency boards + missions (the incubator counts as startups, not as a client). */
export function distinctClients(temps: readonly Temps[] = PARCOURS.temps): string[] {
  const set = new Set<string>();
  flattenSteps(temps).forEach(({ step }) => {
    step.board?.forEach((c) => set.add(c));
    if (step.kind === "mission" && !step.incubator) set.add(step.org);
  });
  return [...set];
}

export function startupsFigure(temps: readonly Temps[] = PARCOURS.temps): string {
  const inc = flattenSteps(temps).find((f) => f.step.incubator);
  return inc?.step.results?.[0]?.num ?? "";
}

export interface ChuteFigures {
  years: number;
  clients: number;
  startups: string;
}

export function chuteFigures(now: Date, temps: readonly Temps[] = PARCOURS.temps): ChuteFigures {
  return {
    years: yearsOfExploration(now, flattenSteps(temps)),
    clients: distinctClients(temps).length,
    startups: startupsFigure(temps),
  };
}

export interface PeriodPart {
  text: string;
  dateTime?: string;
}

/** "fév. – juil. 2010", "janv. 2011 – avr. 2016", "mars 2023 – aujourd'hui", "2008". */
export function formatPeriod(step: Step, labels = PARCOURS.labels): PeriodPart[] {
  if (!step.start) return [];
  const [sy, sm] = step.start.split("-");
  if (!sm) return [{ text: sy, dateTime: sy }];
  const month = (m: string) => labels.months[Number(m) - 1];
  if (step.end === "now") return [{ text: `${month(sm)} ${sy}`, dateTime: step.start }, { text: ` – ${labels.today}` }];
  if (!step.end) return [{ text: `${month(sm)} ${sy}`, dateTime: step.start }];
  const [ey, em] = step.end.split("-");
  const from = ey === sy ? month(sm) : `${month(sm)} ${sy}`;
  return [{ text: from, dateTime: step.start }, { text: " – " }, { text: `${month(em)} ${ey}`, dateTime: step.end }];
}

/** "Poste", "Formation", or "Mission chez Brand and Bear". */
export function kindLabel(f: FlatStep, steps: readonly FlatStep[], labels = PARCOURS.labels): string {
  if (f.step.kind !== "mission") return labels[f.step.kind];
  const parent = f.parent >= 0 ? steps[f.parent].step.org : "";
  return `${labels.missionAt} ${parent}`;
}

/** Index of the last station the head has reached, -1 before the first. */
export function currentIndex(xs: readonly number[], xh: number): number {
  let cur = -1;
  xs.forEach((x, i) => {
    if (xh >= x - 0.5) cur = i;
  });
  return cur;
}

/** The poste a station belongs to (itself, or its employer). */
export function posteOf(i: number, steps: readonly FlatStep[]): number {
  if (i < 0) return -1;
  const kind = steps[i].step.kind;
  return kind === "poste" ? i : kind === "mission" ? steps[i].parent : -1;
}

// ── Geometry of the line (measured inputs in, pixels out) ──────────────────────────────────

export interface ScaleInput {
  steps: readonly FlatStep[];
  /** Measured width of each temps phrase, in px. */
  phraseWidths: readonly number[];
  /** Extra room after each phrase (0.5 × its font size). */
  pad: number;
  nowM: number;
  compact: boolean;
  /** Label width of a poste (desktop). */
  labelW: number;
}

export interface Scale {
  x: number[];
  xe: number[];
  xNow: number;
  /** [month, x] anchors of dated stations, ending with [nowM + 1, xNow]. */
  anchors: [number, number][];
}

function minGap(kind: StepKind, compact: boolean, labelW: number): number {
  if (compact) return kind === "mission" ? 40 : 56;
  return (kind === "poste" ? labelW : 240) + 32;
}

/** Proportional scale inside each temps (width dictated by its phrase), with a minimal gap. */
export function layoutStations(inp: ScaleInput): Scale {
  const { steps, compact } = inp;
  const firsts = inp.phraseWidths.map((_, t) => steps.find((s) => s.t === t && s.m !== null));
  const T = firsts.map((f, t) => ({ start: f && f.m !== null ? f.m : 0, w: inp.phraseWidths[t], end: 0, s: 0 }));
  T.forEach((tp, i) => {
    tp.end = i < T.length - 1 ? T[i + 1].start : inp.nowM + 1;
    tp.s = (tp.w + inp.pad) / Math.max(1, tp.end - tp.start);
  });
  const nat = (m: number) => {
    let x = 0;
    for (const tp of T) {
      if (m <= tp.start) break;
      x += tp.s * (Math.min(m, tp.end) - tp.start);
    }
    return x;
  };
  const x: number[] = [];
  const anchors: [number, number][] = [];
  let prevD = -1;
  steps.forEach((s, i) => {
    let xi = 0;
    if (i > 0) {
      xi = s.m === null || prevD < 0 ? x[i - 1] : x[prevD] + (nat(s.m) - nat(steps[prevD].m ?? 0));
      xi = Math.max(xi, x[i - 1] + (compact ? 8 : 24), x[i - 1] + minGap(steps[i - 1].step.kind, compact, inp.labelW));
    }
    x.push(Math.round(xi));
    if (s.m !== null) {
      anchors.push([s.m, x[i]]);
      prevD = i;
    }
  });
  const last = steps.length - 1;
  const lastM = steps[prevD].m ?? 0;
  const xNow = Math.round(
    Math.max(x[prevD] + (nat(inp.nowM + 1) - nat(lastM)), x[last] + minGap(steps[last].step.kind, compact, inp.labelW)),
  );
  anchors.push([inp.nowM + 1, xNow]);
  const xe: number[] = [];
  steps.forEach((s, i) => {
    if (s.m === null) xe.push(Math.max(x[i] + 1, s.parent >= 0 ? xe[s.parent] : x[i] + 1));
    else if (s.endEx === null) xe.push(xNow + 1);
    else xe.push(Math.max(x[i] + 1, Math.round(xOfMonth(anchors, s.endEx))));
  });
  return { x, xe, xNow, anchors };
}

export function xOfMonth(anchors: readonly [number, number][], m: number): number {
  if (m <= anchors[0][0]) return anchors[0][1];
  for (let i = 0; i < anchors.length - 1; i++) {
    const [ma, xa] = anchors[i];
    const [mb, xb] = anchors[i + 1];
    if (m >= ma && m <= mb) return mb === ma ? xa : xa + ((m - ma) / (mb - ma)) * (xb - xa);
  }
  return anchors[anchors.length - 1][1];
}

export function monthOfX(anchors: readonly [number, number][], x: number): number {
  if (x <= anchors[0][1]) return anchors[0][0];
  for (let i = 0; i < anchors.length - 1; i++) {
    const [ma, xa] = anchors[i];
    const [mb, xb] = anchors[i + 1];
    if (x >= xa && x <= xb) return xb === xa ? ma : ma + ((x - xa) / (xb - xa)) * (mb - ma);
  }
  return anchors[anchors.length - 1][0] - 1;
}

export interface Braking {
  /** Head positions along the line… */
  xs: number[];
  /** …and the scroll distance (px) needed to reach each of them. */
  ss: number[];
}

/** Base speed, a brake around every station, and a soft landing on today. */
export function brakingCurve(x: readonly number[], xNow: number, compact: boolean, speed = 1): Braking {
  const k = (compact ? 1.35 : 2.0) * speed;
  const sigma = compact ? 36 : 90;
  const AMP = 1.5;
  const land = Math.min(xNow * 0.3, compact ? 260 : 520);
  const w = (v: number) => {
    let b = 1;
    for (const xi of x) {
      const q = (v - xi) / sigma;
      if (q > -3 && q < 3) b += AMP * Math.exp(-q * q);
    }
    const u = (v - (xNow - land)) / land;
    return u > 0 ? b / Math.max(0.1, 1 - u) : b;
  };
  let pts = [0, xNow];
  x.forEach((xi) => {
    for (let q = -3; q <= 3; q += 0.5) pts.push(xi + q * sigma);
  });
  for (let j = 0; j <= 24; j++) pts.push(xNow - land + (land * j) / 24);
  pts = pts
    .filter((v) => v >= 0 && v <= xNow)
    .sort((a, b) => a - b)
    .filter((v, i, a) => i === 0 || v - a[i - 1] > 0.5);
  const ss = [0];
  for (let j = 1; j < pts.length; j++) {
    ss.push(ss[j - 1] + ((pts[j] - pts[j - 1]) * (w(pts[j - 1]) + w(pts[j]))) / 2 / k);
  }
  return { xs: pts, ss };
}

/** Progress stops `P` and head positions `X` for a scroll range of `length` px. */
export function progressCurve(b: Braking, length: number, xNow: number): { P: number[]; X: number[] } {
  const P = b.ss.map((s) => Math.min(1, Math.max(0, s / Math.max(1, length))));
  return { P: [...P, 1], X: [...b.xs, xNow] };
}

// ── Minimap: 7 postes on a schematic line, missions as ticks ───────────────────────────────

const MM_BASE = [22, 66, 110, 154, 198, 242, 298];
const MM_REF = 366;

export interface Minimap {
  posteX: number[];
  missionX: number[];
  end: number;
  start: number;
  /** Line x → minimap x. */
  mapX: number[];
  mapM: number[];
}

export function layoutMinimap(steps: readonly FlatStep[], x: readonly number[], xNow: number, width: number): Minimap {
  const kk = width / MM_REF;
  const postes = steps.map((s, i) => (s.step.kind === "poste" ? i : -1)).filter((i) => i >= 0);
  const posteX = postes.map((_, j) => MM_BASE[Math.min(j, MM_BASE.length - 1)] * kk);
  const c = posteX[0];
  const mapX = [0, x[0], x[1], ...postes.map((i) => x[i]), xNow];
  const mapM = [c - 18, c - 14, c - 8, ...posteX, 360 * kk];
  const missionX = steps
    .map((s, i) => (s.step.kind === "mission" ? interp(mapX, mapM, x[i]) : -1))
    .filter((v) => v >= 0);
  return { posteX, missionX, end: 360 * kk, start: c - 14, mapX, mapM };
}
