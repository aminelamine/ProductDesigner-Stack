#!/usr/bin/env node
// Gardien des gates (ADR-019) — hook PreToolUse (Write|Edit) de .claude/settings.json.
// Rend mécanique ce que les prompts disaient en prose : exit 2 + raison = écriture refusée.
//   gate ① — un prototype pointe vers un brief `statut: ✅ APPROUVÉ` ; un sous-agent n'écrit jamais ce statut
//   gate ③ — une direction jugée porte `tranché_par: designer`
// Hors de ces chemins, ou sur une entrée illisible : laisse passer (exit 0).

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const APPROVED = /^statut:\s*✅\s*APPROUV/m;
const BRIEF_REF = /^\s*<!--\s*brief:\s*(brief_feature_[\w.-]+\.md)\s*-->/;

/** Le fichier tel qu'il sera après l'écriture. */
function resultingContent(tool, input, abs) {
  if (tool === 'Write') return input.content ?? '';
  let s = existsSync(abs) ? readFileSync(abs, 'utf8') : '';
  for (const e of input.edits ?? [input]) {
    if (e.old_string == null) continue;
    s = e.replace_all ? s.split(e.old_string).join(e.new_string) : s.replace(e.old_string, e.new_string);
  }
  return s;
}

function check({ tool_name: tool, tool_input: input = {}, agent_type: agent, cwd }) {
  if (!input.file_path) return null;
  const root = process.env.CLAUDE_PROJECT_DIR || cwd || process.cwd();
  const abs = path.resolve(root, input.file_path);
  const rel = path.relative(root, abs).split(path.sep).join('/');
  if (rel.startsWith('..')) return null;

  if (/^prototypes\/.+\.html$/.test(rel)) {
    const ref = resultingContent(tool, input, abs).match(BRIEF_REF);
    if (!ref) return `gate ① — ${rel} doit commencer par <!-- brief: brief_feature_<id>.md -->. Pas de prototype sans brief approuvé.`;
    const brief = path.join(root, 'agent-system/sessions', ref[1]);
    if (!existsSync(brief)) return `gate ① — brief introuvable : agent-system/sessions/${ref[1]}.`;
    if (!APPROVED.test(readFileSync(brief, 'utf8')))
      return `gate ① — agent-system/sessions/${ref[1]} n'est pas approuvé (statut: ✅ APPROUVÉ). Présente le brief au designer et attends son oui.`;
  }

  const wasApproved = () => existsSync(abs) && APPROVED.test(readFileSync(abs, 'utf8'));
  if (agent && /^agent-system\/sessions\/brief_.+\.md$/.test(rel)
      && APPROVED.test(resultingContent(tool, input, abs)) && !wasApproved())
    return `gate ① — un sous-agent (${agent}) ne marque jamais un brief approuvé. Seul le conducteur l'écrit, sur le oui explicite du designer.`;

  if (/^memory\/directions\/\d+-.+\.md$/.test(rel)) {
    const s = resultingContent(tool, input, abs);
    if (/^verdict:\s*(retenue|refusée)\s*$/m.test(s) && !/^tranché_par:\s*designer\b/m.test(s))
      return `gate ③ — ${rel} : un verdict sans « tranché_par: designer ». L'agent consigne, le designer tranche.`;
  }
  return null;
}

let raw = '';
process.stdin.on('data', (c) => (raw += c)).on('end', () => {
  let reason = null;
  try { reason = check(JSON.parse(raw || '{}')); } catch { /* entrée illisible : on laisse passer */ }
  if (reason) { console.error(`ADR-019 ${reason}`); process.exit(2); }
});
