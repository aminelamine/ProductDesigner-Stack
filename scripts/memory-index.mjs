#!/usr/bin/env node
// Génère memory/*/INDEX.md à partir du frontmatter des entrées.
// Les index sont GÉNÉRÉS, jamais maintenus à la main — V3 a indexé 1 feature sur 7.

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'memory';

/** Parse le frontmatter YAML plat en tête de fichier. */
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

/** Une entrée = un .md qui n'est ni README ni TEMPLATE ni INDEX. */
function entries(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !/^(README|TEMPLATE|INDEX|LEARNING_TEMPLATE|LEARNINGS_INDEX)\.md$/.test(f))
    .sort()
    .map((file) => ({ file, fm: frontmatter(readFileSync(join(dir, file), 'utf8')) }))
    .filter((e) => e.fm);
}

// Magasins hors memory/ dont l'index est aussi généré.
const EXTERNAL = {
  'agent-system/learnings': {
    title: 'Learnings',
    columns: ['feature_id', 'feature_name', 'voie', 'conformance', 'direction', 'date'],
    note:
      'Écrit après chaque cycle, lu par la phase DIRECTION avant chaque brief.\n' +
      'Les entrées d\'avant la V4 portent `score` / `verdict` au lieu de `conformance` / `direction`.',
    // Compatibilité V3 : mapper les anciens champs sur les nouveaux.
    alias: { conformance: 'score', direction: 'verdict', voie: 'tier' },
  },
};

const STORES = {
  directions: {
    title: 'Directions',
    columns: ['id', 'nom', 'surface', 'verdict', 'date'],
    note:
      'Une direction **refusée** vaut plus qu\'une direction acceptée — elle évite de reproposer\n' +
      'ce qui a déjà été jugé faux sur ce produit. Ne jamais supprimer une entrée `refusée`.',
  },
  decisions: {
    title: 'Décisions',
    columns: ['id', 'nom', 'portee', 'statut', 'date'],
    note: 'Décisions structurantes. Lues en phase DIRECTION et CADRE.',
  },
  references: {
    title: 'Références',
    columns: ['id', 'nom', 'pattern', 'source', 'date'],
    note: 'Screenshots annotés — le *pourquoi*, pas seulement le *quoi*.',
  },
};

/** Valeur d'une colonne, en retombant sur l'alias V3 si le champ V4 est absent. */
function cell(fm, col, alias) {
  if (fm[col] != null) return fm[col];
  const legacy = alias && alias[col];
  return legacy && fm[legacy] != null ? fm[legacy] : '—';
}

function writeIndex(dir, label, cfg) {
  const rows = entries(dir);
  const header = `| ${cfg.columns.join(' | ')} | fichier |`;
  const sep = `|${cfg.columns.map(() => '---').join('|')}|---|`;
  const body = rows.length
    ? rows
        .map((e) => {
          const cells = cfg.columns.map((c) => cell(e.fm, c, cfg.alias));
          return `| ${cells.join(' | ')} | [\`${e.file}\`](${e.file}) |`;
        })
        .join('\n')
    : `| ${cfg.columns.map(() => '—').join(' | ')} | *(vide)* |`;

  const out = `<!-- GÉNÉRÉ par scripts/memory-index.mjs — ne pas éditer à la main. -->
# ${cfg.title} — index

${cfg.note}

${header}
${sep}
${body}

_${rows.length} entrée(s) · généré le ${new Date().toISOString().slice(0, 10)}_
`;

  writeFileSync(join(dir, 'INDEX.md'), out);
  console.log(`${label}/INDEX.md — ${rows.length} entrée(s)`);
}

let wrote = 0;

for (const [store, cfg] of Object.entries(STORES)) {
  const dir = join(ROOT, store);
  if (!existsSync(dir)) continue;
  writeIndex(dir, `memory/${store}`, cfg);
  wrote++;
}

for (const [dir, cfg] of Object.entries(EXTERNAL)) {
  if (!existsSync(dir)) continue;
  writeIndex(dir, dir, cfg);
  wrote++;
}

if (!wrote) {
  console.error('Aucun magasin trouvé sous memory/.');
  process.exit(1);
}
