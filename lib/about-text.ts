// Text shaping for the About — pure. The components render these parts verbatim, so no content
// string, number or punctuation is typed in a `.tsx`.
import { PARCOURS, type MilestoneAside, type ToolsAside } from "./data";

const NBSP = " ";

/** French typography: a non-breaking space before ; : ! ? and inside « ». */
export function frenchSpacing(s: string): string {
  return s.replace(/ ([;:!?»])/g, `${NBSP}$1`).replace(/« /g, `«${NBSP}`);
}

/** Glue the last word to the previous one (no widow). */
export function noWidow(s: string): string {
  const i = s.lastIndexOf(" ");
  return i < 0 ? s : `${s.slice(0, i)}${NBSP}${s.slice(i + 1)}`;
}

/** Normalises non-breaking spaces, as the acceptance criteria compare text. */
export function plain(s: string): string {
  return s.replace(/ /g, " ");
}

/** "Je ne suis pas … l'IA." / "Je suis … avec." */
export function sentences(s: string): string[] {
  return s.match(/[^.!?]+[.!?]+/g)?.map((x) => x.trim()) ?? [s];
}

/** [before, key, after] — the key sentence is highlighted inside its paragraph, never repeated. */
export function splitKey(paragraph: string, key: string): [string, string, string] {
  const i = paragraph.indexOf(key);
  if (i < 0) return [paragraph, "", ""];
  return [paragraph.slice(0, i), key, paragraph.slice(i + key.length)];
}

/** "01" … "04". */
export function folio(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export interface AsidePart {
  text: string;
  dateTime?: string;
}

/** "2010–2016 — Outils : Suite Adobe, …" / "2023 — Conférences : Adobe MAX 2023, …" */
export function asideParts(a: ToolsAside | MilestoneAside, labels = PARCOURS.labels): AsidePart[] {
  if (a.kind === "jalon") {
    return [{ text: String(a.year), dateTime: String(a.year) }, { text: frenchSpacing(` — ${labels.conferences} : ${a.text}`) }];
  }
  const from = { text: String(a.fromYear), dateTime: String(a.fromYear) };
  const range = a.toYear ? [from, { text: "–" }, { text: String(a.toYear), dateTime: String(a.toYear) }] : [from, { text: " →" }];
  return [...range, { text: frenchSpacing(` — ${labels.tools} : ${a.tools.join(", ")}`) }];
}

/** "2010–2016", "2025 →" — the era label on the tools band. */
export function toolsRange(a: ToolsAside): string {
  return a.toYear ? `${a.fromYear}–${a.toYear}` : `${a.fromYear} →`;
}
