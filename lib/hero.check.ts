import { HERO } from "./data";

// CA-5 — hero headline renders the exact LinkedIn positioning string, no paraphrase.
const EXPECTED_HEADLINE = "Creative Explorer | Product Designer | Agentic Design";

if (HERO.headline !== EXPECTED_HEADLINE) {
  throw new Error(
    `CA-5 failed: HERO.headline is "${HERO.headline}", expected "${EXPECTED_HEADLINE}"`
  );
}

console.log("CA-5 HERO.headline matches the locked positioning string — passed");
