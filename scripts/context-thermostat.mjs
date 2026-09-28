#!/usr/bin/env node
// Thermostat de contexte (ADR-018) — hook UserPromptSubmit de .claude/settings.json.
// Mesure le contexte du dernier tour et, au-delà d'un seuil, injecte la consigne de relais.
// Ne bloque jamais le prompt : toute erreur sort en silence (exit 0).

import { readFileSync } from 'node:fs';

const WARN = 120_000;
const RELAY = 150_000; // même seuil que token-report.mjs (ADR-014)

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

let raw = '';
process.stdin.on('data', (c) => (raw += c)).on('end', () => {
  try {
    const { transcript_path: file } = JSON.parse(raw || '{}');
    const ctx = file ? lastContext(file) : 0;
    if (ctx < WARN) return;
    const k = `${Math.round(ctx / 1000)}k`;
    const relay = ctx >= RELAY;
    const context = relay
      ? `ADR-018 — contexte à ${k} (seuil ${RELAY / 1000}k). Avant toute autre chose : mets à jour ` +
        `agent-system/sessions/state_<feature>.md (≤ 5 lignes « À savoir ») — ou, hors /pds, un court ` +
        `handoff — puis donne au Talent le titre et le prompt de la session neuve. Pas de fork (ADR-017).`
      : `ADR-018 — contexte à ${k}. Termine l'étape en cours, puis propose le relais (state + prompt de ` +
        `session neuve) avant d'en ouvrir une autre.`;
    process.stdout.write(JSON.stringify({
      systemMessage: relay ? `⬡ Contexte ${k} — relais demandé` : `⬡ Contexte ${k} — relais bientôt`,
      hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: context },
    }));
  } catch { /* un thermostat en panne ne doit jamais bloquer le Talent */ }
});
