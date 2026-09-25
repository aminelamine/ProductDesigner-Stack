import { HEADER_CTA, HERO, NAV_ITEMS } from "./data";

// §3b — P-003 navigation contract: the renvoi and the header links point at the About's targets.
function check(id: string, ok: boolean, detail: string): void {
  if (!ok) throw new Error(`${id} failed: ${detail}`);
  console.log(`${id} ${detail} — passed`);
}

check("CA-18", HERO.renvoi.href === "#parcours", "the renvoi « 02 / Parcours » points to #parcours");

const expected = [
  ["Parcours", "#parcours", false],
  ["Manifeste", "#manifeste", false],
  ["Obsolet", "https://obsolet.substack.com/", true],
] as const;
check("CA-19",
  NAV_ITEMS.length === 3 &&
    NAV_ITEMS.every((n, i) => n.label === expected[i][0] && n.href === expected[i][1] && !!n.external === expected[i][2]) &&
    HEADER_CTA.label === "Me contacter" && HEADER_CTA.href === "#contact",
  "NAV_ITEMS in order Parcours→#parcours, Manifeste→#manifeste, Obsolet→external; HEADER_CTA → #contact");
