import { buildHeroTrajectory } from "./hero-trajectory";
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

console.log("CA-6/CA-7 buildHeroTrajectory produces 3 verbatim, non-orphaned segments — passed");
