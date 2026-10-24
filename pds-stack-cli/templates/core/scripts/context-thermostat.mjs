#!/usr/bin/env node
// Thermostat de contexte (ADR-018) — hook UserPromptSubmit et PostToolUse de .claude/settings.json.
// Mesure le contexte du dernier tour et, au-delà d'un seuil, injecte la consigne de relais.
// PostToolUse couvre les runs autonomes sans prompt du Talent (projet CTA : 60 tours au-delà de
// 150k sans alerte) — une seule alerte par tranche de 25k, pour ne pas bavarder à chaque outil.
// Ne bloque jamais : toute erreur sort en silence (exit 0).

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const WARN = 120_000;
const RELAY = 150_000; // même seuil que token-report.mjs (ADR-014)
const BAND = 25_000;

/** Contexte du dernier tour assistant : cache lu + cache écrit + entrée. */
function lastContext(file) {
  const lines = readFileSync(file, 'utf8').trimEnd().split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    let d;
    try { d = JSON.parse(lines[i]); } catch { continue; }
    const u = d.type === 'assistant' && d.message?.usage;
    if (u) return (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0) + (u.input_tokens ?? 0);
  }
  return 0;
}

/** PostToolUse : vrai une seule fois par tranche de 25k au-delà du seuil de relais. */
function newBand(session, ctx) {
  const band = Math.floor((ctx - RELAY) / BAND);
  const mark = join(tmpdir(), `pds-thermo-${String(session).replace(/\W/g, '')}`);
  let seen = -1;
  try { seen = Number(readFileSync(mark, 'utf8')); } catch { /* première alerte */ }
  if (band <= seen) return false;
  writeFileSync(mark, String(band));
  return true;
}

let raw = '';
process.stdin.on('data', (c) => (raw += c)).on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const event = input.hook_event_name === 'PostToolUse' ? 'PostToolUse' : 'UserPromptSubmit';
    const ctx = input.transcript_path ? lastContext(input.transcript_path) : 0;
    if (ctx < WARN) return;
    const relay = ctx >= RELAY;
    if (event === 'PostToolUse' && (!relay || !newBand(input.session_id ?? input.transcript_path, ctx))) return;
    const k = `${Math.round(ctx / 1000)}k`;
    const context = relay
      ? `ADR-018 — contexte à ${k} (seuil ${RELAY / 1000}k). Avant toute autre chose : mets à jour ` +
        `agent-system/sessions/state_<feature>.md (≤ 5 lignes « À savoir ») — ou, hors /pds, un court ` +
        `handoff — puis donne au Talent le titre et le prompt de la session neuve. Pas de fork (ADR-017).` +
        (event === 'PostToolUse' ? ' Termine l\'appel en cours, n\'en ouvre pas de nouveau.' : '')
      : `ADR-018 — contexte à ${k}. Termine l'étape en cours, puis propose le relais (state + prompt de ` +
        `session neuve) avant d'en ouvrir une autre.`;
    process.stdout.write(JSON.stringify({
      systemMessage: relay ? `⬡ Contexte ${k} — relais demandé` : `⬡ Contexte ${k} — relais bientôt`,
      hookSpecificOutput: { hookEventName: event, additionalContext: context },
    }));
  } catch { /* un thermostat en panne ne doit jamais bloquer le Talent */ }
});
