const RAIL_DELAY_CLASS = ["delay-300", "delay-[500ms]"] as const;

const RAIL_BASE =
  "absolute left-[0.275em] top-full h-8 w-[1.5px] origin-top bg-primary md:h-12 lg:h-16";

/**
 * Pure classname resolver for the rail connecting two trajectory waypoints
 * (spec P-001 cycle 2, Task 4 — CA-16/CA-17). `shouldReduce` is the exact
 * same boolean already computed by `useReducedMotion()` in `Hero()` for the
 * 2 `motion.div` items — this function never reads a
 * `@media (prefers-reduced-motion)` query independently (CA-16: "encadre
 * l'ensemble, y compris le dispositif de Task 4").
 *
 * Reduced: the rail renders fully drawn, no transition (CA-16 fallback).
 * Full motion: the rail starts collapsed (`scale-y-0`) and draws
 * (`scale-y-100`) once mounted, staggered per connector index (CA-17 — a
 * spatial device tied to the waypoints, not a uniform fade+translate).
 */
export function getRailClassName(
  connectorIndex: number,
  shouldReduce: boolean,
  mounted: boolean
): string {
  if (shouldReduce) {
    return `${RAIL_BASE} duration-0 scale-y-100`;
  }

  const delay =
    RAIL_DELAY_CLASS[connectorIndex] ?? RAIL_DELAY_CLASS[RAIL_DELAY_CLASS.length - 1];
  const drawn = mounted ? "scale-y-100" : "scale-y-0";
  return `${RAIL_BASE} transition-transform duration-500 ease-out ${delay} ${drawn}`;
}
