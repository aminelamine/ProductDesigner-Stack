import { getRailClassName } from "./hero-rail";

// CA-16 — reduced-motion collapses the rail to its fully-drawn state with no
// transition/duration, using the same shouldReduce boolean as the 2
// motion.div items (no independent media query in the resolver itself).
const reducedClass = getRailClassName(0, true, false);
const isReducedStatic =
  reducedClass.includes("scale-y-100") &&
  reducedClass.includes("duration-0") &&
  !reducedClass.includes("transition-transform");

if (!isReducedStatic) {
  throw new Error(
    `CA-16 failed: reduced-motion rail must be static (scale-y-100, duration-0, no transition) — got "${reducedClass}"`
  );
}

// CA-17 — full-motion rail starts collapsed (scale-y-0) before mount and
// draws (scale-y-100) after — the spatial device tied to the waypoints,
// not a uniform fade+translate.
const beforeMount = getRailClassName(0, false, false);
const afterMount = getRailClassName(0, false, true);

if (!beforeMount.includes("scale-y-0") || !beforeMount.includes("transition-transform")) {
  throw new Error(
    `CA-17 failed: pre-mount rail must be collapsed with a transition — got "${beforeMount}"`
  );
}
if (!afterMount.includes("scale-y-100")) {
  throw new Error(`CA-17 failed: mounted rail must be drawn (scale-y-100) — got "${afterMount}"`);
}

console.log("CA-16/CA-17 getRailClassName reduced/full-motion states verified — passed");
