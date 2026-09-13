#!/usr/bin/env node

/**
 * PDS Stack — Interactive Installer
 * npx pds-stack install
 */

const prompts = require('prompts');
const kleur = require('kleur');
const fs = require('fs');
const path = require('path');

// ─── UI ───────────────────────────────────────────────────────────────────────

const print = {
  header: () => {
    console.log('\n' + kleur.bold().white('⬡ PDS Stack'));
    console.log(kleur.dim('The design-first AI workflow for Product Designers who ship.'));
    console.log(kleur.dim('─'.repeat(54)) + '\n');
  },
  step:    (msg) => console.log(kleur.cyan('  ›') + ' ' + msg),
  done:    (msg) => console.log(kleur.green('  ✓') + ' ' + kleur.dim(msg)),
  warn:    (msg) => console.log(kleur.yellow('  ⚠') + ' ' + msg),
  error:   (msg) => console.log(kleur.red('  ✗') + ' ' + msg),
  divider: ()    => console.log(kleur.dim('  ' + '─'.repeat(52))),
  nl:      ()    => console.log(),
};

// ─── Questions ────────────────────────────────────────────────────────────────

const questions = [
  {
    type: 'text',
    name: 'project_name',
    message: 'Project name?',
    initial: path.basename(process.cwd()),
  },
  {
    type: 'select',
    name: 'framework',
    message: 'Framework?',
    choices: [
      { title: 'Next.js',    value: 'nextjs' },
      { title: 'Nuxt',       value: 'nuxt' },
      { title: 'SvelteKit',  value: 'sveltekit' },
      { title: 'Astro',      value: 'astro' },
      { title: 'Remix',      value: 'remix' },
      { title: 'Other',      value: 'other' },
    ],
    initial: 0,
  },
  {
    type: 'select',
    name: 'language',
    message: 'Primary language?',
    choices: [
      { title: 'TypeScript',  value: 'typescript' },
      { title: 'JavaScript',  value: 'javascript' },
      { title: 'Python',      value: 'python' },
      { title: 'Other',       value: 'other' },
    ],
    initial: 0,
  },
  {
    type: 'select',
    name: 'ui_lib',
    message: 'UI library?',
    choices: [
      { title: 'Shadcn/ui',      value: 'shadcn' },
      { title: 'Radix',          value: 'radix' },
      { title: 'Mantine',        value: 'mantine' },
      { title: 'Tailwind only',  value: 'tailwind-only' },
      { title: 'None',           value: 'none' },
    ],
    initial: 0,
  },
  {
    type: 'select',
    name: 'quality_brief_type',
    message: 'Quality Brief type?',
    hint: 'The creative gate BOB generates before every implementation',
    choices: [
      { title: 'Aesthetic  — visual direction, palette, composition',  value: 'aesthetic' },
      { title: 'Performance — load budget, rendering strategy',        value: 'performance' },
      { title: 'Content    — tone, density, copy hierarchy',           value: 'content' },
      { title: 'Architecture — patterns, data flow, boundaries',       value: 'architecture' },
    ],
    initial: 0,
  },
  {
    type: 'select',
    name: 'brief_depth',
    message: 'Project Brief depth?',
    choices: [
      { title: 'T1 — Quick Start, 5 fields, ~15 min',       value: 'T1' },
      { title: 'T2 — Standard, personas + KPIs, ~45 min',   value: 'T2' },
      { title: 'T3 — Full, 10 sections, ~90 min',           value: 'T3' },
    ],
    initial: 1,
  },
  {
    type: 'multiselect',
    name: 'modules',
    message: 'Modules to install?',
    hint: 'Space to select · Enter to confirm',
    choices: [
      { title: 'core       — memory + 4-phase cycle + Figma bridge (required)', value: 'core', selected: true, disabled: true },
      { title: 'code       — RAY + BOB + ANALYZER, git guards', value: 'code',      selected: false },
      { title: 'discovery  — EVE, problem validation',          value: 'discovery', selected: false },
      { title: 'delivery   — SHIP, release notes + KPI',        value: 'delivery',  selected: false },
      { title: 'epic       — T3 epic parent structure',         value: 'epic',      selected: false },
    ],
  },
  {
    type: 'select',
    name: 'user_level',
    message: 'How should the conductor talk to you?',
    hint: 'Drives /pds — changeable anytime in STACK.md',
    choices: [
      { title: 'Expert    — terse, you know the PDS flow',                value: 'expert' },
      { title: 'Guided    — explains each gate, proposes 2-3 options',    value: 'junior' },
    ],
    initial: 0,
  },
  {
    type: 'multiselect',
    name: 'tools',
    message: 'Which AI coding tools will you use?',
    hint: 'Installs the /pds /ray /bob /analyzer entry points for each · Space to select',
    choices: [
      { title: 'Claude Code',            value: 'claude',  selected: true },
      { title: 'Cursor',                 value: 'cursor',  selected: false },
      { title: 'Gemini CLI',             value: 'gemini',  selected: false },
      { title: 'VS Code / Copilot',      value: 'copilot', selected: false },
      { title: 'Codex CLI',              value: 'codex',   selected: false },
    ],
  },
  {
    type: () => (fs.existsSync(path.join(process.cwd(), '.git')) ? 'select' : null),
    name: 'hooks',
    message: 'Install git guardrails?',
    hint: 'pre-commit + commit-msg — makes the spec gate and ADR-004 mechanical',
    choices: [
      { title: 'Yes  — block commits that break the hard constraints', value: true },
      { title: 'No   — keep the gates prompt-enforced only',           value: false },
    ],
    initial: 0,
  },
  {
    type: 'select',
    name: 'language_agents',
    message: 'Agent output language?',
    hint: 'Applies to specs, learnings, release docs',
    choices: [
      { title: 'English (EN)',  value: 'en' },
      { title: 'French (FR)',   value: 'fr' },
    ],
    initial: 0,
  },
];

// ─── Generators ───────────────────────────────────────────────────────────────

function generateSTACK(a) {
  const mods = a.modules || ['core'];
  return `# STACK.md — PDS Stack configuration
# Generated by: npx pds-stack install
# Edit to match your project. All agents read this before every session.

framework: ${a.framework}
language: ${a.language}
ui_lib: ${a.ui_lib}
strict_mode: ${a.language === 'typescript' ? 'true' : 'false'}
line_cap: 150
motion_default: L0            # L0 (CSS) | L1 | L2 | L3 (GSAP — RAY validation required)
quality_brief_type: ${a.quality_brief_type}

# Adaptive conductor (/pds)
# expert: terse flow · junior: guided narration + proposed judgment
user_level: ${a.user_level}

modules:
  core: true
  code: ${mods.includes('code') ? 'true' : 'false'}
  discovery: ${mods.includes('discovery') ? 'true' : 'false'}
  delivery: ${mods.includes('delivery') ? 'true' : 'false'}
  epic: ${mods.includes('epic') ? 'true' : 'false'}

language_agents: ${a.language_agents}    # en | fr
`;
}

// One registry, several renderings. CLAUDE.md, GEMINI.md and the Cursor rule must
// never drift — they are all built from `registry()` below.

function registry(a) {
  const mods = a.modules || ['core'];
  const hasCode      = mods.includes('code');
  const hasDiscovery = mods.includes('discovery');
  const hasDelivery  = mods.includes('delivery');

  const stackLines = {
    nextjs:    'Next.js · TypeScript strict · Tailwind · Shadcn/ui · Lucide React',
    nuxt:      'Nuxt · TypeScript strict · Tailwind · Shadcn Vue',
    sveltekit: 'SvelteKit · TypeScript strict · Tailwind',
    astro:     'Astro · TypeScript strict · Tailwind',
    remix:     'Remix · TypeScript strict · Tailwind · Shadcn/ui',
    other:     `${a.framework} · ${a.language} · ${a.ui_lib}`,
  };
  const stackLine = hasCode
    ? (stackLines[a.framework] || `${a.framework} · ${a.language}`)
    : 'Figma — no code module installed';

  const tsConstraints = (hasCode && a.language === 'typescript')
    ? '→  TypeScript strict — zero `any`, zero `@ts-ignore`\n'
    : '';
  const shadcnConstraints = (hasCode && a.ui_lib === 'shadcn')
    ? '→  `/components/ui/` is read-only. Shadcn owns it.\n→  No UI lib outside `agent-system/context/design_guide.md` without Talent sign-off\n'
    : '';

  // The code constraints only exist when the code module is on. A design-only project
  // traverses the whole cycle without ever meeting one of them.
  const codeConstraints = hasCode ? `
### Code module

${shadcnConstraints}${tsConstraints}→  Components cap at 150 lines — split if exceeded
→  Consult \`agent-system/adr/ADR_INDEX.md\` before any architecture or dependency decision
→  No code without \`statut: VALIDATED\` in the spec — scope frozen at gate ②${a.hooks ? `
→  Git guardrails: a commit touching product code needs \`Ref: feature_<id>\` and a VALIDATED spec` : ''}
` : '';

  const constraints = `→  Nothing is produced before a direction is approved — gate ①, never crossed by an agent
→  \`memory/identity.md\` is read first — anything touching the foundation is refused in advance
→  A direction marked \`refusée\` in \`memory/directions/\` is a constraint, not a suggestion
→  The scope is written **after** the direction and against it — \`## HORS SCOPE\` block required
→  Conformance (/20) and direction (binary) are never averaged — the designer alone renders the second
→  Every delivery writes its direction to \`memory/\`, retained **or** refused, then \`npm run memory:index\`
→  Hard budget: 3 human gates, ~12 steps in Standard — a rule that does not fit is cut, not documented
${codeConstraints}`;

  const agents = `/pds       →  CONDUCTOR  the entry point — asks the lane first (Sketch by default), then drives
                       DIRECTION → CADRE → PRODUIRE → JUGER + MÉMORISER
                       reads: STACK.md (lane · modules · user_level) · \`memory/identity.md\`
                       never crosses a gate for you · never guesses the lane
                       flow: \`agent-system/orchestration/flow.md\` + \`pds_conductor.md\`

/bob --brief → BOB     the direction brief — 5 dimensions, **gate ①**
                       reads: identity · directions/INDEX · design-system/registries · references
                       registries filled → conforms · registries empty → proposes, and says so
                       nothing is produced before this brief is explicitly approved

/ray       →  RAY      the scope, written against the direction — **gate ②** *(Standard · System)*
                       spec: numbered tasks · \`## HORS SCOPE\` block · \`statut: VALIDATED\`
                       does not exist in Sketch — no spec file, no score, no written decision

/design-workflow → BRIDGE DS  default output — generates the Figma frame from the approved direction
${hasCode ? `
/bob --build → BOB     optional output — implements the frozen spec, runs the assertions
                       commit after each task — \`feat(N): task-title\`
` : ''}
/analyzer  →  ANALYZER **gate ③** — two verdicts, never averaged
                       conformance: /20, computed by the system, mechanical
                       direction: binary — \`retenue\` / \`refusée\`, the designer alone
                       writes \`memory/directions/NNN\` + the learning (DESIGN half first)
                       short conformance → back to PRODUIRE · refused direction → back to DIRECTION
${hasDiscovery ? `
/eve       →  EVE      discovery · problem validation · pre-fills PROJECT_BRIEF §1–§2
                       use when: problem unclear before briefing · optional · not a gate
` : ''}${hasDelivery ? `
/ship      →  SHIP     delivery · release notes · KPI reminders
                       requires: conformance ≥ 14 **and** direction \`retenue\` · optional module
` : ''}`;

  return { stackLine, constraints, agents, hasCode, hasDiscovery, hasDelivery };
}

function generateCLAUDE(a) {
  const r = registry(a);
  return `# ⬡ PDS STACK V4 — ${a.project_name}

Stack   →  ${r.stackLine}
Cycle   →  DIRECTION → CADRE → PRODUIRE → JUGER + MÉMORISER
Agents  →  BOB (direction) · RAY (cadre) · ANALYZER (verdicts)${r.hasCode ? ' · BOB (build)' : ''}${r.hasDiscovery ? ' · EVE' : ''}${r.hasDelivery ? ' · SHIP' : ''}

> Stack constraints defined in STACK.md — agents read it before every session.
> **Start a feature with \`/pds\`** — it asks the lane, then drives the whole cycle.

---

## HARD CONSTRAINTS

${r.constraints}

---

## AGENTS

${r.agents}`;
}

function generateGEMINI(a) {
  const r = registry(a);
  return `# ⬡ PDS STACK V4 — ${a.project_name}

> Gemini CLI loads this file by default (not \`CLAUDE.md\`). Same agent registry and hard
> constraints — source of truth: [CLAUDE.md](CLAUDE.md).

Stack   →  ${r.stackLine}
Cycle   →  DIRECTION → CADRE → PRODUIRE → JUGER + MÉMORISER
Agents  →  BOB (direction) · RAY (cadre) · ANALYZER (verdicts)${r.hasCode ? ' · BOB (build)' : ''}${r.hasDiscovery ? ' · EVE' : ''}${r.hasDelivery ? ' · SHIP' : ''}

> **Start a feature with \`/pds\`** — it asks the lane, then drives the whole cycle.

---

## HARD CONSTRAINTS

${r.constraints}

---

## AGENTS

${r.agents}
Full agent definitions: \`agent-system/agents/*_system_prompt.md\`.
`;
}

function generateCURSORRULE(a) {
  const r = registry(a);
  return `---
description: PDS Stack — hard constraints and agent registry (CLAUDE.md equivalent for Cursor)
alwaysApply: true
---

# ⬡ PDS STACK V4 — ${a.project_name}

> Cursor does not auto-load \`CLAUDE.md\` (only \`AGENTS.md\`) — this rule mirrors it so the same
> guardrails apply here. Source of truth: [CLAUDE.md](../../CLAUDE.md).

Stack   →  ${r.stackLine}

> **Start a feature with \`/pds\`** — it asks the lane, then drives the whole cycle.

## HARD CONSTRAINTS

${r.constraints}

## AGENTS

${r.agents}`;
}

// ─── File copy util ───────────────────────────────────────────────────────────

function copyDir(src, dest, skip = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.includes(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d, skip);
    else fs.copyFileSync(s, d);
  }
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function touch(p) {
  if (!fs.existsSync(p)) fs.writeFileSync(p, '', 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  print.header();

  const answers = await prompts(questions, {
    onCancel: () => { print.nl(); print.warn('Cancelled.'); process.exit(0); },
  });

  if (!answers.framework) { print.error('No answers. Exiting.'); process.exit(1); }

  print.nl();
  print.divider();
  print.nl();

  const cwd         = process.cwd();
  const templateDir = path.join(__dirname, '..', 'templates');
  const mods        = answers.modules || ['core'];

  // 1. STACK.md
  print.step('Generating STACK.md...');
  fs.writeFileSync(path.join(cwd, 'STACK.md'), generateSTACK(answers), 'utf8');
  print.done('STACK.md');

  // 2. CLAUDE.md
  print.step('Generating CLAUDE.md...');
  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), generateCLAUDE(answers), 'utf8');
  print.done('CLAUDE.md');

  // 3. Core agent-system
  print.step('Installing agent system (core)...');
  const coreSrc  = path.join(templateDir, 'core', 'agent-system');
  const coreDest = path.join(cwd, 'agent-system');
  if (fs.existsSync(coreSrc)) {
    copyDir(coreSrc, coreDest);
    print.done('agent-system/');
  } else {
    print.warn('core templates not found — reinstall pds-stack package');
    process.exit(1);
  }

  // 4. Optional modules
  for (const mod of ['discovery', 'delivery', 'epic']) {
    if (mods.includes(mod)) {
      print.step(`Installing module: ${mod}...`);
      const modSrc = path.join(templateDir, 'modules', mod);
      if (fs.existsSync(modSrc)) {
        copyDir(modSrc, path.join(cwd, 'agent-system'), ['tools']);
        print.done(`module: ${mod}`);
      } else {
        print.warn(`module ${mod} not found in package — skipped`);
      }
    }
  }

  // 5. Tool surfaces — the /pds /ray /bob /analyzer entry points
  const tools = (answers.tools && answers.tools.length) ? answers.tools : ['claude'];
  const TOOL_LABEL = {
    claude: 'Claude Code (.claude/)', cursor: 'Cursor (.cursor/)',
    gemini: 'Gemini CLI (.gemini/)',  copilot: 'VS Code / Copilot (.github/prompts/)',
    codex:  'Codex CLI (.agents/)',
  };
  for (const tool of tools) {
    print.step(`Installing entry points: ${TOOL_LABEL[tool] || tool}...`);
    let copied = false;
    const coreToolSrc = path.join(templateDir, 'core', 'tools', tool);
    if (fs.existsSync(coreToolSrc)) { copyDir(coreToolSrc, cwd); copied = true; }
    // module-specific commands for that tool (discovery → /eve, delivery → /ship)
    for (const mod of ['discovery', 'delivery', 'epic']) {
      if (!mods.includes(mod)) continue;
      const modToolSrc = path.join(templateDir, 'modules', mod, 'tools', tool);
      if (fs.existsSync(modToolSrc)) { copyDir(modToolSrc, cwd); copied = true; }
    }
    if (copied) print.done(TOOL_LABEL[tool] || tool);
    else print.warn(`no entry points packaged for ${tool} — skipped`);
  }

  // 5b. Per-tool context mirrors, all built from the same registry
  if (tools.includes('gemini')) {
    fs.writeFileSync(path.join(cwd, 'GEMINI.md'), generateGEMINI(answers), 'utf8');
    print.done('GEMINI.md');
  }
  if (tools.includes('cursor')) {
    ensureDir(path.join(cwd, '.cursor', 'rules'));
    fs.writeFileSync(path.join(cwd, '.cursor', 'rules', 'pds-stack.mdc'), generateCURSORRULE(answers), 'utf8');
    print.done('.cursor/rules/pds-stack.mdc');
  }

  // 5c. Git guardrails
  if (answers.hooks) {
    print.step('Installing git guardrails...');
    const hookSrc  = path.join(templateDir, 'core', 'hooks');
    const hookDest = path.join(cwd, '.git', 'hooks');
    if (fs.existsSync(hookSrc) && fs.existsSync(path.join(cwd, '.git'))) {
      ensureDir(hookDest);
      for (const h of fs.readdirSync(hookSrc)) {
        const target = path.join(hookDest, h);
        if (fs.existsSync(target)) {
          print.warn(`.git/hooks/${h} already exists — left untouched`);
          continue;
        }
        fs.copyFileSync(path.join(hookSrc, h), target);
        fs.chmodSync(target, 0o755);
        print.done(`.git/hooks/${h}`);
      }
    } else {
      print.warn('no .git directory — guardrails skipped');
    }
  }

  // 6. PROJECT_BRIEF at selected tier
  print.step(`Installing PROJECT_BRIEF (${answers.brief_depth})...`);
  const briefSrc  = path.join(templateDir, 'core', `PROJECT_BRIEF_${answers.brief_depth}.md`);
  const briefDest = path.join(cwd, 'agent-system', 'PROJECT_BRIEF_TEMPLATE.md');
  if (fs.existsSync(briefSrc)) {
    fs.copyFileSync(briefSrc, briefDest);
    print.done(`PROJECT_BRIEF_TEMPLATE.md (${answers.brief_depth})`);
  }

  // 7. Placeholder .gitkeep for empty dirs
  for (const dir of ['learnings', 'sessions', 'specs/active', 'specs/shipped', 'specs/dropped', 'specs/epics']) {
    const p = path.join(cwd, 'agent-system', dir);
    ensureDir(p);
    touch(path.join(p, '.gitkeep'));
  }

  // Done
  print.nl();
  print.divider();
  print.nl();
  console.log(kleur.bold().green('  ✓ PDS Stack installed.'));
  print.nl();
  console.log(kleur.dim('  One command to start:'));
  print.nl();
  console.log('    ' + kleur.bold().cyan('/pds') + kleur.white(' "the feature you want to build"'));
  print.nl();
  console.log(kleur.dim('  The conductor asks the lane, then walks the direction before the scope,'));
  console.log(kleur.dim('  Default output is Figma. You approve every gate, it crosses none.'));
  print.nl();
  console.log(kleur.dim('  Advanced: call an agent directly with /bob, /ray or /analyzer.'));
  if (answers.hooks) {
    console.log(kleur.dim('  Guardrails are on: commits need a validated spec. Bypass with --no-verify.'));
  }
  print.nl();
  console.log(kleur.dim('  Docs: https://pds-stack.netlify.app'));
  print.nl();
}

// The generators are the single source for CLAUDE.md, GEMINI.md and the Cursor rule —
// this repo regenerates its own root files from them rather than hand-editing three copies.
module.exports = { registry, generateCLAUDE, generateGEMINI, generateCURSORRULE };

if (require.main === module) {
  main().catch((err) => {
    console.error(kleur.red('\n  Fatal:'), err.message);
    process.exit(1);
  });
}
