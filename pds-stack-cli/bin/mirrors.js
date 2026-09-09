/**
 * The mirror contract — the single list both check-parity.js and sync-mirrors.js read.
 *
 * Direction is always repo → template: the repo is the source, `templates/` is the copy that
 * ships. Two consumers reading two lists is how the lists drift; there is one list.
 *
 * Paths are relative to pds-stack-cli/.
 */
module.exports = [
  ['templates/core/agent-system/agents',           '../agent-system/agents'],
  ['templates/core/agent-system/orchestration',    '../agent-system/orchestration'],
  ['templates/core/agent-system/resources',        '../agent-system/resources'],
  ['templates/core/tools/claude/.claude/commands', '../.claude/commands'],
  ['templates/core/tools/claude/.claude/agents',   '../.claude/agents'],
  ['templates/core/tools/cursor/.cursor',          '../.cursor'],
  ['templates/core/tools/gemini/.gemini',          '../.gemini'],
  ['templates/core/tools/copilot/.github/prompts', '../.github/prompts'],
  ['templates/core/tools/codex/.agents',           '../.agents'],
];
