#!/usr/bin/env node
/**
 * Copy the canonical repo files over their template twins.
 *
 * check-parity.js *detects* drift. This *removes* it: the repo is the source, `templates/` is
 * generated from it. Run it before publishing, or whenever an agent prompt changes.
 *
 * V3 kept the same agent definitions in three places and paid a 545-line checker to notice when
 * they disagreed. Detecting a problem you can prevent is the expensive way round.
 *
 *   node bin/sync-mirrors.js          apply
 *   node bin/sync-mirrors.js --check  report what would change, exit 1 if anything would
 */
const fs = require('fs');
const path = require('path');
const MIRRORED = require('./mirrors');

const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');

const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  grn: (s) => `\x1b[32m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const changed = [];
const missing = [];

for (const [tplRel, repoRel] of MIRRORED) {
  const tplDir = path.join(ROOT, tplRel);
  const repoDir = path.join(ROOT, repoRel);
  if (!fs.existsSync(repoDir)) continue;

  for (const src of walk(repoDir)) {
    const rel = path.relative(repoDir, src);
    const dest = path.join(tplDir, rel);
    const label = path.join(tplRel, rel).split(path.sep).join('/');

    const before = fs.existsSync(dest) ? fs.readFileSync(dest) : null;
    const after = fs.readFileSync(src);
    if (before !== null && before.equals(after)) continue;

    // A repo file with no template twin may be legitimately unpackaged (check-parity's
    // simulateInstall decides that). Report it, never create it — creating one here would
    // silently add a file to the published package.
    if (before === null) {
      missing.push(label);
      continue;
    }

    changed.push(label);
    if (!CHECK) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, after);
    }
  }
}

for (const f of changed) console.log(`${CHECK ? c.red('  ~ ') : c.grn('  → ')}${f}`);
for (const f of missing) console.log(c.dim(`  ? ${f} — not packaged in core (module file) — left alone`));

if (!changed.length) {
  console.log(c.grn('  ✓ templates already match their source.'));
} else if (CHECK) {
  console.log(`\n  ${changed.length} template(s) would change. Run: node bin/sync-mirrors.js`);
  process.exit(1);
} else {
  console.log(`\n  ${changed.length} template(s) synced from the repo.`);
}
