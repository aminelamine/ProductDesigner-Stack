import { getHeroEntryVariants } from "./hero-motion";

// CA-16 — prefers-reduced-motion collapses the hero entry sequence to an
// opacity-only transition capped at 150ms (no translate-y, no stagger delay).
// (carried CA-15 v1 — renumbered CA-16 in spec cycle 2, behavior unchanged).
const reduced = getHeroEntryVariants(true);
const reducedHidden = reduced.item.hidden as Record<string, unknown>;
const reducedShow = reduced.item.show as { transition?: { duration?: number } };
const reducedDuration = reducedShow.transition?.duration ?? Infinity;

const isOpacityOnlyUnder150ms =
  Object.keys(reducedHidden).length === 1 &&
  reducedHidden.opacity === 0 &&
  reducedDuration <= 0.15;

if (!isOpacityOnlyUnder150ms) {
  throw new Error(
    `CA-16 failed: reduced-motion entry must be opacity-only, duration <=150ms — got hidden=${JSON.stringify(
      reducedHidden
    )}, duration=${reducedDuration}s`
  );
}

console.log(
  "CA-16 getHeroEntryVariants(true) is opacity-only with duration <=150ms — passed"
);
