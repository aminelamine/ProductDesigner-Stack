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
      { title: 'core       — RAY + BOB + ANALYZER (required)', value: 'core',      selected: true,  disabled: true },
      { title: 'discovery  — EVE, problem validation',          value: 'discovery', selected: false },
      { title: 'delivery   — SHIP, release notes + KPI',        value: 'delivery',  selected: false },
      { title: 'design     — motion system, Figma bridge',      value: 'design',    selected: true },
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
  discovery: ${mods.includes('discovery') ? 'true' : 'false'}
  delivery: ${mods.includes('delivery') ? 'true' : 'false'}
  design: ${mods.includes('design') ? 'true' : 'false'}
  epic: ${mods.includes('epic') ? 'true' : 'false'}

language_agents: ${a.language_agents}    # en | fr
`;
}

// One registry, several renderings. CLAUDE.md, GEMINI.md and the Cursor rule must
// never drift — they are all built from `registry()` below.

function registry(a) {
  const mods = a.modules || ['core'];
  const hasDiscovery = mods.includes('discovery');
  const hasDelivery  = mods.includes('delivery');
  const hasDesign    = mods.includes('design');

  const stackLines = {
    nextjs:    'Next.js · TypeScript strict · Tailwind · Shadcn/ui · Lucide React',
    nuxt:      'Nuxt · TypeScript strict · Tailwind · Shadcn Vue',
    sveltekit: 'SvelteKit · TypeScript strict · Tailwind',
    astro:     'Astro · TypeScript strict · Tailwind',
    remix:     'Remix · TypeScript strict · Tailwind · Shadcn/ui',
    other:     `${a.framework} · ${a.language} · ${a.ui_lib}`,
  };
  const stackLine = stackLines[a.framework] || `${a.framework} · ${a.language}`;

  const tsConstraints = a.language === 'typescript'
    ? '→  TypeScript strict — zero `any`, zero `@ts-ignore`\n'
    : '';
  const shadcnConstraints = a.ui_lib === 'shadcn'
    ? '→  `/components/ui/` is read-only. Shadcn owns it.\n→  No UI lib outside `agent-system/context/design_guide.md` without Talent sign-off\n'
    : '';

  const constraints = `→  No code without \`statut: VALIDATED\` in spec
→  No code without Quality Brief approval — BOB gate is non-negotiable
→  Scope frozen at VALIDATED — additions require new RAY cycle
${shadcnConstraints}${tsConstraints}→  Components cap at 150 lines — split if exceeded
→  Consult \`agent-system/adr/ADR_INDEX.md\` before any architecture or dependency decision${a.hooks ? `
→  Every code-decidable acceptance criterion carries one assertion that BOB has run
→  Git guardrails are active: a commit needs \`Ref: feature_<id>\` and a VALIDATED spec` : ''}`;

  const agents = `/pds       →  CONDUCTOR  adaptive entry point — start here · orchestrates /ray → /bob → /analyzer
                       reads: STACK.md \`user_level\` (expert=terse · junior=guided+proposed judgment)
                       bootstraps the 3 context files if incomplete · never crosses a gate for you
                       flow: \`agent-system/orchestration/pds_conductor.md\` + \`flow.md\`

/ray       →  RAY      challenges idea · writes spec (T1/T2/T3) · creates ADRs
                       reads: STACK.md · client_vision · roadmap · ADR_INDEX · last 3 learnings
                       spec: numbered tasks · \`## OUT OF SCOPE\` block · \`statut: VALIDATED\`
                       scope frozen at VALIDATED — additions require new RAY cycle

/bob       →  BOB      Quality Brief (gate) · implements · commits
                       reads: spec · STACK.md · design_guide · ADR_INDEX
                       \`quality_brief_type: aesthetic\` → \`agent-system/agents/BOB_aesthetic_gate.md\`
                       one feature per session — reset context before starting next
                       commit after each task — \`feat(N): task-title\`
                       no code before Quality Brief explicit approval

/analyzer  →  ANALYZER scores /20 · verdict · writes learnings
                       18–20: SHIPPED (committed) · 14–17: SHIPPED WITH NOTES → BOB · 10–13: REWORK → BOB · <10: RE-SPEC → RAY
                       only ≥ 18 is committed — 14–17 is accepted in substance but goes back to BOB
${hasDiscovery ? `
/eve       →  EVE      discovery · problem validation · pre-fills PROJECT_BRIEF §1–§2
                       use when: problem unclear before briefing · optional · not a gate
` : ''}${hasDelivery ? `
/ship      →  SHIP     delivery · release notes · KPI reminders
                       requires: ANALYZER verdict ≥ 14 · optional module
` : ''}${hasDesign ? `
/design-workflow → Bridge DS · generates Figma frame from RAY spec *(optional)*
` : ''}`;

  return { stackLine, constraints, agents, hasDiscovery, hasDelivery, hasDesign };
}

function generateCLAUDE(a) {
  const r = registry(a);
  return `# ⬡ PDS STACK V3 — ${a.project_name}

Stack   →  ${r.stackLine}
Agents  →  RAY · BOB · ANALYZER${r.hasDiscovery ? ' · EVE' : ''}${r.hasDelivery ? ' · SHIP' : ''}

> Stack constraints defined in STACK.md — agents read it before every session.
> **Start a feature with \`/pds\`** — it drives the whole RAY → BOB → ANALYZER cycle.

---

## HARD CONSTRAINTS

${r.constraints}

---

## AGENTS

${r.agents}`;
}

function generateGEMINI(a) {
  const r = registry(a);
  return `# ⬡ PDS STACK V3 — ${a.project_name}

> Gemini CLI loads this file by default (not \`CLAUDE.md\`). Same agent registry and hard
> constraints — source of truth: [CLAUDE.md](CLAUDE.md).

Stack   →  ${r.stackLine}
Agents  →  RAY · BOB · ANALYZER${r.hasDiscovery ? ' · EVE' : ''}${r.hasDelivery ? ' · SHIP' : ''}

> **Start a feature with \`/pds\`** — it drives the whole RAY → BOB → ANALYZER cycle.

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

# ⬡ PDS STACK V3 — ${a.project_name}

> Cursor does not auto-load \`CLAUDE.md\` (only \`AGENTS.md\`) — this rule mirrors it so the same
> guardrails apply here. Source of truth: [CLAUDE.md](../../CLAUDE.md).

Stack   →  ${r.stackLine}

> **Start a feature with \`/pds\`** — it drives the whole RAY → BOB → ANALYZER cycle.

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
  for (const mod of ['discovery', 'delivery', 'design', 'epic']) {
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
    // module-specific commands for that tool (design → /design-workflow, etc.)
    for (const mod of ['discovery', 'delivery', 'design', 'epic']) {
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
  console.log(kleur.dim('  The conductor interviews you to fill client_vision · roadmap · design_guide,'));
  console.log(kleur.dim('  then runs RAY → BOB → ANALYZER. You approve every gate, it crosses none.'));
  print.nl();
  console.log(kleur.dim('  Advanced: call an agent directly with /ray, /bob or /analyzer.'));
  if (answers.hooks) {
    console.log(kleur.dim('  Guardrails are on: commits need a validated spec. Bypass with --no-verify.'));
  }
  print.nl();
  console.log(kleur.dim('  Docs: https://pds-stack.netlify.app'));
  print.nl();
}

main().catch((err) => {
  console.error(kleur.red('\n  Fatal:'), err.message);
  process.exit(1);
});
