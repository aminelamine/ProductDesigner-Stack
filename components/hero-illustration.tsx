export interface HeroWaypointProps {
  className?: string;
}

/**
 * Single two-tone waypoint marker — the hero's trajectory unit (spec P-001
 * cycle 2, Task 3). Reused once per headline segment via `HeroTrajectory`
 * instead of one signpost silhouette isolated in a side column (CA-8/CA-9).
 * Exactly two fills — black node, Voltage Blue bar at reduced opacity — and
 * a strict `rx="0"` on the bar, correcting the `rx="11"` anti-pattern
 * flagged by `feature_P-001_learnings.md` (CA-11). Purely decorative.
 */
export function HeroWaypoint({ className }: HeroWaypointProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="4" cy="12" r="3" fill="#000000" />
      <rect x="9" y="9.5" width="15" height="5" rx="0" fill="#006eff" fillOpacity="0.4" />
    </svg>
  );
}
