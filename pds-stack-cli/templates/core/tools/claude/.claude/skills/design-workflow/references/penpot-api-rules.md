# Penpot Plugin API — Mandatory Rules

> **This file MUST be read before writing ANY Penpot `execute_code` script.** It is the Penpot
> counterpart of `figma-api-rules.md` — a **second, parallel path**, not a degraded fallback.
> Penpot exposes a general-purpose API (`execute_code` running against `penpot.*`), not a typed
> tool per capability like Figma's MCP surface. This file is shorter than `figma-api-rules.md` by
> construction — the API surface it documents is smaller, not because the rigor is lower.
>
> **Real tools only — four, never more:** `high_level_overview`, `penpot_api_info`, `execute_code`,
> `export_shape`. Anything else in this file (`dsKitOverview`, `tokensOverview`, `penpotUtils.*`…)
> is a **named script/helper**, run through `execute_code` — not a fifth tool.
>
> **Testing status (read before trusting any snippet below):** these recipes are written against
> the Penpot API surface and the `penpotUtils` helper vocabulary described for this feature
> (`getPages`, `shapeStructure`, `findShapes`, `findShapeById`, `tokenOverview`,
> `analyzeDescendants`). They could **not** be executed against the live "Prototype examples" file
> during this build — the Penpot MCP tools were not exposed to the build session that wrote this
> file. Validate each snippet on your own file before depending on it in a real design/review pass,
> and update this note once it has been run. Presenting an unrun recipe as proven would be exactly
> the false parity this file exists to prevent.

---

## Parity table — read this before anything else

For each of the 6 Figma tools wired into `design-workflow`, the honest Penpot equivalent — or the
honest absence of one. `recette` = build it via `execute_code` (snippet below). `gap` = no
equivalent, do not pretend otherwise. `capacité ajoutée` = Penpot offers something Figma's wired
tools don't — not a mapping, don't frame it as filling a Figma gap.

| Figma tool | Penpot equivalent | Status |
|---|---|---|
| `figma_get_status` | trivial `execute_code` probe / `high_level_overview` | recette |
| `figma_get_design_system_kit` | `execute_code` + `penpot.library.local.components` / `.colors` / `.typographies` + `Variants`/`VariantContainer` | recette to build — no dedicated tool |
| `figma_get_variables` | `execute_code` + `penpot.library.local.tokens` (`TokenCatalog`, model close to the W3C Design Tokens spec) | recette — different data model, do not claim it's isomorphic |
| `figma_get_styles` | covered by the same `execute_code` call as above (colors/typographies live in the same library API) | recette — not a separate endpoint on the Penpot side |
| `figma_take_screenshot` | `export_shape` (PNG/SVG, a shape or a whole page) | recette — direct, real tool |
| `figma_execute` | `execute_code` | direct equivalent — the shared foundation of both MCPs |
| *(no named Figma tool)* | `penpot.generateStyle()` / `penpot.generateMarkup()` — Inspect-panel equivalent | **capacité ajoutée** — not a mapping, frame it as extra, not as compensating a Figma gap |

Import between Figma and Penpot (either direction) is **not documented anywhere in this file** —
no symmetric path exists (Penpot's only import format is `.penpot`, a zip+JSON archive). This is a
non-goal for the Penpot path, not an omission.

---

## `storage` — what state actually exists on the Penpot side

Penpot's `execute_code` context exposes a single piece of state across calls: the `storage` object,
alive for the duration of the **open plugin session** in the connected Penpot file.

**What lives in `storage`:** whatever a script decides to cache there — for this skill, the
candidate is the result of expensive reads that would otherwise re-walk the shape tree or the
library on every call (`tokenOverview()`, `shapeStructure()` results). Read `storage.X` first,
compute and assign only on a cache miss.

**What its scope actually is — read this before writing anything that assumes more:**
- Scoped to the plugin session of the file currently open and connected. Close the file, reload the
  plugin, or switch files, and `storage` is gone.
- **Not** a backend. Not persisted. Not keyed by feature, by user, or by session ID the way a real
  store would be — it is a plain JS object living in the plugin runtime, nothing writes it to disk.
- **Not** an equivalent of Figma's typed tools (`figma_get_variables`, `figma_get_styles`), which
  are stateless reads with no analogous caching layer on the MCP side. Do not describe `storage` as
  "Penpot's version of" those tools — it solves a different problem (avoiding redundant traversal
  within one session), not the same one.

If a script needs data to survive across plugin sessions, `storage` is the wrong tool — there isn't
a right one on the Penpot side documented here (see parity table: no persistent registry-equivalent
exists for Penpot today).

---

## Rule 1: Precondition first — always, before any other call

Mirrors Figma's `figma_get_status()` step. Before anything else in a Penpot branch, confirm the
plugin is actually connected to an open file.

```js
// WRONG — jumps straight to real work, assumes the plugin is connected
return (async function () {
  var kit = await dsKitOverview();   // may throw "No Penpot instance connected..." mid-script
  return kit;
})();

// CORRECT — precondition call first, real work only after it succeeds
// Preferred: call the real tool `high_level_overview` with no script at all.
// If you need the probe inline in a script chain, a trivial execute_code call works too:
return (async function () {
  return { fileId: penpot.currentFile ? penpot.currentFile.id : null };
})();
```

If this call fails with `"No Penpot instance connected for user token."`, stop — see the
`onboarding.md` Block Messages Reference for the exact user-facing message and recovery action
(open the Penpot file → **MCP Server → Connect** from the file menu).

---

## Rule 2: Build on `penpotUtils`, never a raw traversal reinvented per session

`penpotUtils` is the named vocabulary for this skill's Penpot path: `getPages`, `shapeStructure`,
`findShapes`, `findShapeById`, `tokenOverview`, `analyzeDescendants`. A script that walks
`penpot.currentPage.root.children` by hand duplicates work these helpers already do, and produces
a script that isn't reusable across sessions the way a named recipe is.

```js
// WRONG — ad hoc traversal, invented fresh every session, not reusable
return (async function () {
  function walk(node) {
    var out = [{ id: node.id, name: node.name }];
    (node.children || []).forEach(function (c) { out = out.concat(walk(c)); });
    return out;
  }
  return walk(penpot.currentPage.root);
})();

// CORRECT — named helper, same result, stable vocabulary
return (async function () {
  return penpotUtils.shapeStructure(penpot.currentPage.root.id);
})();
```

---

## Rule 3: Cache expensive reads in `storage`, don't re-derive them every call

```js
// WRONG — recomputes tokenOverview() on every single execute_code call in the session
return (async function () {
  return await penpotUtils.tokenOverview();
})();

// CORRECT — cache-first, computed once per plugin session
return (async function () {
  if (storage.tokens) return storage.tokens;
  storage.tokens = await penpotUtils.tokenOverview();
  return storage.tokens;
})();
```

---

## Rule 4: Never present the token model as isomorphic to Figma Variables

Penpot's token catalog (`penpot.library.local.tokens`) is close to the W3C Design Tokens format.
Figma's variables (`figma_get_variables`) are a different, typed model (modes, aliasing, bound
paint/layout properties). Both are read in a "variables/tokens" recipe, but they are not the same
shape — do not translate one into the other's vocabulary when documenting a screen or component.

```js
// WRONG — implies a 1:1 field mapping that doesn't exist
"Loaded Figma-equivalent variables from Penpot tokens."

// CORRECT — names the model explicitly, no translation claimed
"Loaded Penpot's token catalog (W3C Design Tokens-shaped) — not a translation of Figma variables,
a different model read for the same purpose."
```

---

## Rule 5: `export_shape` replaces screenshot verification — same discipline, different call

`figma_take_screenshot` and `export_shape` serve the same purpose (visual verification between
atomic generation steps), but `export_shape` is a real, distinct tool — not a script. Call it
directly with the shape/page id, don't wrap it in `execute_code`.

```
export_shape({ shapeId: "<id-from-a-previous-execute_code-call>", format: "png" })
```

---

## Named recipes — `execute_code` scripts for the 3 "recette à construire" rows

These three cover the parity table rows that need a script, not a direct tool call. Each is a
stable, named script — copy it verbatim rather than rewriting it per session. **Not yet run against
a live file in this build — see the testing-status note at the top of this file.**

### Recipe: `dsKitOverview` — equivalent of `figma_get_design_system_kit`

```js
// Not a single typed call — three library facets read together, then summarized.
// Cached in storage for the rest of the plugin session.
return (async function () {
  if (storage.dsKit) return storage.dsKit;

  var lib = penpot.library.local;
  var overview = {
    components: (lib.components || []).map(function (c) {
      return { id: c.id, name: c.name, path: c.path };
    }),
    colors: (lib.colors || []).map(function (c) {
      return { id: c.id, name: c.name, color: c.color };
    }),
    typographies: (lib.typographies || []).map(function (t) {
      return { id: t.id, name: t.name, fontFamily: t.fontFamily, fontSize: t.fontSize };
    }),
  };

  storage.dsKit = overview;
  return overview;
})();
```

### Recipe: `tokensOverview` — equivalent of `figma_get_variables`

```js
// Uses the tokenOverview() helper directly — see Rule 4: this is Penpot's own token
// model (W3C Design Tokens-shaped), not a translation of Figma's variable model.
return (async function () {
  if (storage.tokens) return storage.tokens;
  storage.tokens = await penpotUtils.tokenOverview();
  return storage.tokens;
})();
```

### Recipe: `stylesOverview` — equivalent of `figma_get_styles`

```js
// GAP, not a separate recipe: Penpot has no distinct "styles" endpoint. Colors and
// typographies already returned by dsKitOverview() ARE the style layer — this recipe
// only re-shapes that same read. Documented so a caller doesn't go looking for a
// fourth call that doesn't exist on the Penpot side.
return (async function () {
  var kit = storage.dsKit || (await dsKitOverview());
  return { colors: kit.colors, typographies: kit.typographies };
})();
```

---

## Standard Script Boilerplate

```js
return (async function () {

  // ─── PRECONDITION (Rule 1) ───
  // Skip if a real high_level_overview call already confirmed connection this session.

  // ─── CACHE-FIRST READS (Rule 3) ───
  // if (storage.X) return storage.X;

  // ─── NAMED HELPERS (Rule 2) ───
  // penpotUtils.getPages() / .shapeStructure(id) / .findShapes(predicate) /
  // .findShapeById(id) / .tokenOverview() / .analyzeDescendants(id)

  // ─── BUILD ───
  // ... script-specific work here ...

  return { success: true };
})();
```
