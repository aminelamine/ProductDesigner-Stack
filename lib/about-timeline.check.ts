import { ABOUT, PARCOURS } from "./data";
import {
  chuteFigures,
  countKinds,
  currentIndex,
  experienceAt,
  flattenSteps,
  formatPeriod,
  layoutStations,
  yearsOfExploration,
} from "./about-timeline";

// §3b — one assertion per code-decidable criterion of P-002 (feature_about_trajet).
function check(id: string, ok: boolean, detail: string): void {
  if (!ok) throw new Error(`${id} failed: ${detail}`);
  console.log(`${id} ${detail} — passed`);
}

const steps = flattenSteps();
const byId = (id: string) => steps.find((s) => s.step.id === id);
const kinds = countKinds();

check("CA-2", kinds.poste === 7 && kinds.formation === 2 && kinds.mission === 8,
  `PARCOURS counts ${kinds.poste} postes, ${kinds.formation} formations, ${kinds.mission} missions (7/2/8)`);

check("CA-3", PARCOURS.seuilTitle === "2008 → aujourd'hui. Sept postes, une ligne.",
  "seuil title is the validated string");

check("CA-4", byId("st-bab")?.step.end === "2023-02" && byId("st-sncf")?.step.end === "2025-06",
  "Brand and Bear ends 2023-02, SNCF Gares & Connexions ends 2025-06");

const ha = steps.findIndex((s) => s.step.id === "st-ha");
const inteliam = steps.findIndex((s) => s.step.id === "st-inteliam");
check("CA-5",
  byId("st-afkar")?.step.parent === "st-bab" && byId("st-ha")?.step.parent === "st-bab" &&
  !byId("st-ha")?.step.start && !byId("st-ha")?.step.end && ha === inteliam + 1,
  "Afkar and HA are Brand and Bear missions, HA undated and ranked right after Inteliam");

check("CA-6 (data)", ABOUT.chute === "Je ne suis pas un designer qui utilise l'IA. Je suis un designer qui pense avec.",
  "ABOUT.chute is the exact sentence");

const dated = steps.filter((s) => s.step.start).every((s) => formatPeriod(s.step).some((p) => p.dateTime));
check("CA-10 (data)", steps.length === 17 && PARCOURS.temps.length === 3 && dated,
  "3 temps, 17 steps, every dated step yields a <time datetime>");

const on = new Date(2026, 8, 24);
const f = chuteFigures(on);
check("CA-31", f.years === 16 && f.clients === 17 && f.startups === "+100",
  `chute figures derived from PARCOURS on 2026-09-24: ${f.years} / ${f.clients} / ${f.startups}`);

const f08 = byId("st-f08");
check("CA-15", f08 !== undefined && f08.m !== null && experienceAt(f08.m) === 0 &&
  experienceAt(12 * 16 + 8) === yearsOfExploration(on),
  "experience counter reads 00 at the 2008 station and yearsOfExploration(now) today");

const scale = layoutStations({ steps, phraseWidths: [900, 500, 700], pad: 60, nowM: 200, compact: false, labelW: 300 });
const mid = (scale.x[5] + scale.xe[5]) / 2;
check("CA-14 (logic)", currentIndex(scale.x, mid) === 5 && scale.x.every((x, i) => i === 0 || x > scale.x[i - 1]),
  "stations strictly ordered on the line; the head inside Havas' period makes Havas current");
