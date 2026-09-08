export interface HeroTrajectoryStop {
  id: string;
  segment: string;
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
