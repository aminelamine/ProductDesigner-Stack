export interface HeroTrajectoryStop {
  id: string;
  segment: string;
}

export interface GuardedSegment {
  lead: string;
  guarded: string;
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
 * tail that must render inside a single `white-space: nowrap` element
 * (CA-7). The last word and a trailing " |" are kept atomic so the
 * separator can never become the first character of a wrapped line, even
 * at the narrowest tested width (375px) — regular spaces only, no
 * non-breaking-space character, so `lead + guarded` still equals the
 * original segment exactly (CA-6).
 */
export function guardTrailingPipe(segment: string): GuardedSegment {
  if (!segment.endsWith(" |")) {
    return { lead: "", guarded: segment };
  }
  const withoutPipe = segment.slice(0, -2);
  const lastSpaceIndex = withoutPipe.lastIndexOf(" ");
  const lead = lastSpaceIndex === -1 ? "" : withoutPipe.slice(0, lastSpaceIndex + 1);
  const lastWord = lastSpaceIndex === -1 ? withoutPipe : withoutPipe.slice(lastSpaceIndex + 1);
  return { lead, guarded: `${lastWord} |` };
}
