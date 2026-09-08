import { buildHeroTrajectory, guardTrailingPipe } from "./hero-trajectory";
import { HERO } from "./data";

// CA-6 — the 3 headline lines reconstruct the verbatim string exactly when
// joined with a single space — no paraphrase, structure only.
const stops = buildHeroTrajectory(HERO.headline);
const rebuilt = stops.map((stop) => stop.segment).join(" ");

if (rebuilt !== HERO.headline) {
  throw new Error(
    `CA-6 failed: rebuilt "${rebuilt}" does not match HERO.headline "${HERO.headline}"`
  );
}

// CA-7 — no line is a candidate to open with "|": the separator is always
// glued to the end of the previous segment, never the start of the next.
const hasLeadingPipe = stops.some((stop) => stop.segment.trimStart().startsWith("|"));

if (hasLeadingPipe) {
  throw new Error(`CA-7 failed: a headline line starts with "|" — ${JSON.stringify(stops)}`);
}

// CA-8 dependency — exactly 3 stops, one per segment (marker count floor).
if (stops.length !== 3) {
  throw new Error(`CA-8 dependency failed: expected 3 trajectory stops, got ${stops.length}`);
}

// CA-7 (structural guard) — for every line ending in " |", the last word and
// the pipe reconstruct exactly (lead + guarded === segment, regular spaces
// only, CA-6 unaffected) and stay atomic (no internal space split inside
// `guarded` beyond the single one before "|") — so no CSS reflow can ever
// place "|" alone at the start of a line, at any tested width.
for (const stop of stops) {
  const { lead, guarded } = guardTrailingPipe(stop.segment);
  if (`${lead}${guarded}` !== stop.segment) {
    throw new Error(
      `CA-7 failed: guardTrailingPipe("${stop.segment}") does not reconstruct — lead="${lead}" guarded="${guarded}"`
    );
  }
  if (stop.segment.endsWith(" |") && guarded.split(" ").length !== 2) {
    throw new Error(
      `CA-7 failed: guarded fragment "${guarded}" is not a single word+pipe unit for "${stop.segment}"`
    );
  }
}

console.log("CA-6/CA-7 buildHeroTrajectory produces 3 verbatim, non-orphaned segments — passed");
console.log("CA-7 guardTrailingPipe keeps the last word + \"|\" atomic on all 3 lines — passed");
