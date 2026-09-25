#!/usr/bin/env node
// Mesure ce que coûtent les sessions Claude Code de ce projet (ADR-014).
// Lit les transcripts ~/.claude/projects/<projet>/*.jsonl et leurs sous-agents.
// Usage : npm run tokens [-- --last 5]

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const LIMIT_CTX = 150_000;
const LIMIT_BUILD_TURNS = 60;

const args = process.argv.slice(2);
const last = Number(args[args.indexOf('--last') + 1]) || 5;
const dir = join(homedir(), '.claude', 'projects', process.cwd().replace(/[/.]/g, '-'));
if (!existsSync(dir)) {
  console.error(`Aucun transcript pour ce projet : ${dir}`);
  process.exit(1);
}

/** Tours, lecture de cache et contexte max d'un transcript. */
function stats(file) {
  const seen = new Set();
  let turns = 0, cacheRead = 0, maxCtx = 0;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    let d;
    try { d = JSON.parse(line); } catch { continue; }
    const m = d.message;
    if (d.type !== 'assistant' || !m?.usage || seen.has(m.id)) continue;
    seen.add(m.id);
    const u = m.usage;
    const read = u.cache_read_input_tokens ?? 0;
    const ctx = read + (u.cache_creation_input_tokens ?? 0) + (u.input_tokens ?? 0);
    turns += 1;
    cacheRead += read;
    maxCtx = Math.max(maxCtx, ctx);
  }
  return { turns, cacheRead, maxCtx };
}

function agentType(file) {
  try { return JSON.parse(readFileSync(file.replace(/\.jsonl$/, '.meta.json'), 'utf8')).agentType ?? '?'; }
  catch { return '?'; }
}

const M = (n) => `${(n / 1e6).toFixed(1)}M`;
const K = (n) => `${Math.round(n / 1e3)}k`;
const flag = (bad) => (bad ? ' ⚠' : '');

const sessions = readdirSync(dir)
  .filter((f) => f.endsWith('.jsonl'))
  .map((f) => ({ f, t: statSync(join(dir, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t)
  .slice(0, last);

let total = 0, mainTotal = 0;
const byAgent = {};
for (const { f, t } of sessions) {
  const s = stats(join(dir, f));
  total += s.cacheRead;
  mainTotal += s.cacheRead;
  const date = new Date(t).toISOString().slice(0, 16).replace('T', ' ');
  console.log(`${f.slice(0, 8)}  ${date}  ${s.turns} tours · cache ${M(s.cacheRead)} · ctx max ${K(s.maxCtx)}${flag(s.maxCtx > LIMIT_CTX)}`);
  const sub = join(dir, f.replace(/\.jsonl$/, ''), 'subagents');
  if (!existsSync(sub)) continue;
  for (const a of readdirSync(sub).filter((x) => x.endsWith('.jsonl'))) {
    const type = agentType(join(sub, a));
    const st = stats(join(sub, a));
    total += st.cacheRead;
    const g = (byAgent[type] ??= { runs: 0, cacheRead: 0, turns: 0, maxTurns: 0, maxCtx: 0 });
    g.runs += 1; g.cacheRead += st.cacheRead; g.turns += st.turns;
    g.maxTurns = Math.max(g.maxTurns, st.turns); g.maxCtx = Math.max(g.maxCtx, st.maxCtx);
  }
}

const pct = (n) => `${total ? Math.round((n / total) * 100) : 0} %`;
console.log(`\nTotal lecture de cache : ${M(total)}  (${sessions.length} sessions)`);
console.log(`  conversations principales  ${M(mainTotal)}  ${pct(mainTotal)}`);
for (const [type, g] of Object.entries(byAgent).sort((a, b) => b[1].cacheRead - a[1].cacheRead)) {
  const long = type === 'bob-build' && g.maxTurns > LIMIT_BUILD_TURNS;
  console.log(`  ${type.padEnd(26)} ${M(g.cacheRead)}  ${pct(g.cacheRead)} · ${g.runs} runs · max ${g.maxTurns} tours${flag(long)} · ctx max ${K(g.maxCtx)}`);
}
console.log(`\n⚠ = au-delà des cibles ADR-014 (contexte > ${K(LIMIT_CTX)}, bob-build > ${LIMIT_BUILD_TURNS} tours)`);
