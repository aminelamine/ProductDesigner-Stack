import { HERO } from "./data";

// CA-6 — hero headline renders the exact LinkedIn positioning string, no paraphrase
// (carried CA-5 v1 — renumbered CA-6 in spec cycle 2, string unchanged).
const EXPECTED_HEADLINE = "Creative Explorer | Product Designer | Agentic Design";

if (HERO.headline !== EXPECTED_HEADLINE) {
  throw new Error(
    `CA-6 failed: HERO.headline is "${HERO.headline}", expected "${EXPECTED_HEADLINE}"`
  );
}

console.log("CA-6 HERO.headline matches the locked positioning string — passed");
