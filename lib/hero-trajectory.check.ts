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

// CA-7 (regression guard, cycle 2 MAJOR bug fix) — the one line with no
// trailing " |" (e.g. "Agentic Design") must not be forced into a single
// nowrap unit: `nowrap` must be false, and `guarded` must equal the whole
// segment (nothing extracted to guard), so the caller renders it as plain,
// reflowable text instead of wrapping the entire line in
// `whitespace-nowrap` — the exact defect that overflowed the line past
// 300px, confirmed by Le Talent in real render (screenshot + DOM).
const unguardedStop = stops.find((stop) => !stop.segment.endsWith(" |"));

if (!unguardedStop) {
  throw new Error(
    "CA-7 regression check failed: no unguarded (no trailing \"|\") stop found among the 3 lines to test"
  );
}

const unguardedResult = guardTrailingPipe(unguardedStop.segment);

if (unguardedResult.nowrap) {
  throw new Error(
    `CA-7 failed: segment without "|" ("${unguardedStop.segment}") is still marked nowrap — would force the entire line unbreakable, reproducing the 300px overflow bug`
  );
}

if (unguardedResult.guarded !== unguardedStop.segment) {
  throw new Error(
    `CA-7 failed: unguarded segment "${unguardedStop.segment}" was altered ("${unguardedResult.guarded}") instead of passing through untouched`
  );
}

console.log("CA-6/CA-7 buildHeroTrajectory produces 3 verbatim, non-orphaned segments — passed");
console.log("CA-7 guardTrailingPipe keeps the last word + \"|\" atomic on all 3 lines — passed");
console.log(
  `CA-7 guardTrailingPipe leaves the unguarded segment ("${unguardedStop.segment}") fully reflowable (nowrap=false) — passed`
);
