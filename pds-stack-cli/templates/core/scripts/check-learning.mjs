#!/usr/bin/env node
// Vérifie que la moitié ① DESIGN d'un learning reste lisible par un designer qui ne code pas.
// Critère V4 : zéro jargon d'implémentation avant le séparateur ② TECHNIQUE.
//
// Motivation : en V3, les learnings de P-001 parlaient de `nowrap: boolean`, `overflow-x-clip`
// et de types de retour — zéro ligne sur la composition. La mémoire du système était une
// mémoire de QA frontend.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'agent-system/learnings';

// Jargon d'implémentation. Volontairement court : on vise le franchement technique,
// pas le vocabulaire de design system (token, variant, radius restent légitimes).
const JARGON = [
  'typescript', 'tsx', 'jsx', 'boolean', 'interface', 'useState', 'useEffect',
  'props', 'refactor', 'commit', 'tsc', 'eslint', 'npm', 'async', 'await',
  'overflow-x-clip', 'whitespace-nowrap', 'getBoundingClientRect', 'scrollWidth',
  'puppeteer', 'jsdom', 'return type', 'type de retour', 'assertion',
];

const SPLIT = /②\s*TECHNIQUE|##\s*Technique/i;

function designHalf(text) {
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const i = body.search(SPLIT);
  return i === -1 ? body : body.slice(0, i);
}

if (!existsSync(DIR)) {
  console.error(`${DIR} introuvable.`);
  process.exit(1);
}

const files = readdirSync(DIR).filter(
  (f) => /^feature_.*_learnings\.md$/.test(f)
);

/** Un learning est au format V4 si son frontmatter porte `direction:`. */
function isV4(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return !!m && /^direction:\s*\S/m.test(m[1]);
}

let failed = 0;
let legacy = 0;

for (const file of files) {
  const text = readFileSync(join(DIR, file), 'utf8');
  const half = designHalf(text);
  const v4 = isV4(text);
  const hits = [];

  for (const term of JARGON) {
    // \b ne marche pas sur les termes contenant '-' : on borde à la main.
    const re = new RegExp(`(^|[^\\w-])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^\\w-]|$)`, 'i');
    if (re.test(half)) hits.push(term);
  }

  if (!hits.length) {
    console.log(`✓ ${file}`);
  } else if (v4) {
    failed++;
    console.log(`✗ ${file}`);
    console.log(`  jargon dans la moitié DESIGN : ${hits.join(', ')}`);
  } else {
    legacy++;
    console.log(`· ${file} — format pré-V4, non gaté`);
    console.log(`  (${hits.length} terme(s) : ${hits.join(', ')})`);
  }
}

const v4count = files.length - legacy;
console.log(
  `\n${v4count - failed}/${v4count} learning(s) V4 lisibles par un designer qui ne code pas.`
);
if (legacy) {
  console.log(
    `${legacy} learning(s) au format pré-V4 — à migrer vers LEARNING_TEMPLATE.md, non bloquants.`
  );
}

if (failed) {
  console.log(
    "Le jargon d'implémentation appartient à la moitié ② TECHNIQUE — voir LEARNING_TEMPLATE.md."
  );
  process.exit(1);
}
