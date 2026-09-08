export interface HeroTrajectoryStop {
  id: string;
  segment: string;
}

export interface GuardedSegment {
  lead: string;
  guarded: string;
  /** True only when `guarded` must render as a single `white-space: nowrap`
   * unit (the last word + trailing " |"). False means `guarded` is plain
   * text and must be allowed to reflow normally — imposing nowrap on it
   * would make the whole line unbreakable for no reason (cycle 2 CA-7
   * regression: "Agentic Design", the segment with no "|" to guard,
   * overflowed the 300px viewport invisibly under `overflow-x-clip`). */
  nowrap: boolean;
}

const SEPARATOR = " | ";

/**
 * Splits the locked headline verbatim string into 3 block-level display
 * lines (spec P-001 cycle 2, CA-6/CA-7): each segment becomes its own
 * block unit, with the "|" glued to the end of the two non-final lines
 * (trailing " |") so it is never a candidate to open a line on its own —
 * separation no longer depends on the browser's natural reflow.
 */
export function buildHeroTrajectory(headline: string): HeroTrajectoryStop[] {
  const parts = headline.split(SEPARATOR);
  if (parts.length !== 3) {
    throw new Error(
      `buildHeroTrajectory expected exactly 3 segments separated by "${SEPARATOR}", got ${parts.length} from "${headline}"`
    );
  }
  return parts.map((part, index) => ({
    id: `waypoint-${index}`,
    segment: index < parts.length - 1 ? `${part} |` : part,
  }));
}

/**
 * Splits a display line into a normally-wrappable `lead` and a `guarded`
 * tail. Only when `segment` ends in " |" does `guarded` need to render
 * inside a single `white-space: nowrap` element (CA-7): the last word and
 * the trailing " |" are kept atomic so the separator can never become the
 * first character of a wrapped line, even at the narrowest tested width
 * (375px) — regular spaces only, no non-breaking-space character, so
 * `lead + guarded` still equals the original segment exactly (CA-6).
 *
 * The segment with no "|" to guard (the last of the 3, e.g. "Agentic
 * Design") has nothing to protect from an orphaned separator — `nowrap:
 * false` lets it reflow like ordinary text. Cycle 2 regression (CA-7,
 * MAJOR): this branch previously returned `guarded: segment` and the
 * caller wrapped it in `whitespace-nowrap` unconditionally, forcing the
 * *entire* line unbreakable and overflowing invisibly past 300px under the
 * hero's `overflow-x-clip` (ADR-011) — confirmed in real render (Le
 * Talent, screenshot + DOM at 300px).
 */
export function guardTrailingPipe(segment: string): GuardedSegment {
  if (!segment.endsWith(" |")) {
    return { lead: "", guarded: segment, nowrap: false };
  }
  const withoutPipe = segment.slice(0, -2);
  const lastSpaceIndex = withoutPipe.lastIndexOf(" ");
  const lead = lastSpaceIndex === -1 ? "" : withoutPipe.slice(0, lastSpaceIndex + 1);
  const lastWord = lastSpaceIndex === -1 ? withoutPipe : withoutPipe.slice(lastSpaceIndex + 1);
  return { lead, guarded: `${lastWord} |`, nowrap: true };
}
