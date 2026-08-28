# Registry Validation Procedure

> **Run this AFTER writing all registries and BEFORE generating guides.**
> This step is BLOCKING — do not proceed until all validations pass.

---

## Phase 1 — Structural Check

Read each registry file and verify:

### components.json
- [ ] Every entry has a `key` field (hex hash, NOT a node ID with `:` separator)
- [ ] Every entry has a `type` field (`"COMPONENT"` or `"COMPONENT_SET"`)
- [ ] Every entry has a `properties` object
- [ ] `key` values look like hex hashes (long alphanumeric strings), NOT like `"1008:174"`

### variables.json
- [ ] Every variable entry has a `key` field
- [ ] Every variable entry has a `name` field (human-readable path)
- [ ] Every variable entry has `valuesByMode`
- [ ] `key` values are NOT the same as `name` values (names look like `color/background/...`, keys look like `VariableID:...` or hex hashes)

### text-styles.json
- [ ] Every text style entry has a `key` field (40-char hex hash)
- [ ] Every entry has a `name` field

### icons.json / logos.json / illustrations.json (if present)
- [ ] Every entry in `items` array has a `key` field
- [ ] Every entry has a `type` field

**If ANY check fails:** Re-extract the failing registry using the extraction scripts in `schemas/components.md`, `schemas/variables.md`, etc.

---

## Phase 2 — Import Test

Run a validation script via `figma_execute` that test-imports a sample of keys from each registry.

### Validation Script Template

```js
return (async function() {
  var results = [];

  // ── TEST COMPONENT KEYS ──
  // Pick 3-5 component keys from registries/components.json
  var componentTests = [
    { name: "COMPONENT_NAME_1", key: "KEY_1", type: "COMPONENT_SET" },
    { name: "COMPONENT_NAME_2", key: "KEY_2", type: "COMPONENT" },
    { name: "COMPONENT_NAME_3", key: "KEY_3", type: "COMPONENT_SET" }
  ];

  for (var i = 0; i < componentTests.length; i++) {
    var t = componentTests[i];
    try {
      if (t.type === "COMPONENT_SET") {
        await figma.importComponentSetByKeyAsync(t.key);
      } else {
        await figma.importComponentByKeyAsync(t.key);
      }
      results.push({ type: "component", name: t.name, status: "OK" });
    } catch(e) {
      results.push({ type: "component", name: t.name, status: "FAIL", error: e.message });
    }
  }

  // ── TEST VARIABLE KEYS ──
  // Pick 3-5 variable keys from registries/variables.json (mix of color + spacing)
  var variableTests = [
    { name: "VARIABLE_NAME_1", key: "KEY_1" },
    { name: "VARIABLE_NAME_2", key: "KEY_2" },
    { name: "VARIABLE_NAME_3", key: "KEY_3" }
  ];

  for (var i = 0; i < variableTests.length; i++) {
    var t = variableTests[i];
    try {
      await figma.variables.importVariableByKeyAsync(t.key);
      results.push({ type: "variable", name: t.name, status: "OK" });
    } catch(e) {
      results.push({ type: "variable", name: t.name, status: "FAIL", error: e.message });
    }
  }

  // ── TEST TEXT STYLE KEYS ──
  // Pick 2-3 text style keys from registries/text-styles.json
  var styleTests = [
    { name: "STYLE_NAME_1", key: "KEY_1" },
    { name: "STYLE_NAME_2", key: "KEY_2" }
  ];

  for (var i = 0; i < styleTests.length; i++) {
    var t = styleTests[i];
    try {
      await figma.importStyleByKeyAsync(t.key);
      results.push({ type: "textStyle", name: t.name, status: "OK" });
    } catch(e) {
      results.push({ type: "textStyle", name: t.name, status: "FAIL", error: e.message });
    }
  }

  // ── SUMMARY ──
  var passed = results.filter(function(r) { return r.status === "OK"; }).length;
  var failed = results.filter(function(r) { return r.status === "FAIL"; }).length;

  return {
    total: results.length,
    passed: passed,
    failed: failed,
    results: results
  };
})();
```

### How to Use

1. Read the registries you just wrote
2. Pick sample keys from each (prioritize commonly-used components like Button, Input, Tag + core variables like spacing/medium, background colors + main text styles)
3. Replace the placeholder names and keys in the script above
4. Run via `figma_execute`
5. Check results

---

## Phase 3 — Remediation

If any keys fail validation:

### Component key failed
→ The key is likely a node ID instead of a component key. Re-extract using:
```js
return (async function() {
  var node = await figma.getNodeByIdAsync("NODE_ID_FROM_REGISTRY");
  if (node) {
    return { name: node.name, correctKey: node.key, incorrectId: node.id };
  }
  return { error: "Node not found" };
})();
```
Update the registry entry with the `correctKey`.

### Variable key failed
→ The key is likely the variable name instead of the variable key. Re-extract using:
```js
return (async function() {
  var collections = await figma.variables.getLocalVariableCollectionsAsync();
  for (var c = 0; c < collections.length; c++) {
    for (var v = 0; v < collections[c].variableIds.length; v++) {
      var variable = await figma.variables.getVariableByIdAsync(collections[c].variableIds[v]);
      if (variable && variable.name === "VARIABLE_NAME") {
        return { name: variable.name, correctKey: variable.key };
      }
    }
  }
  return { error: "Variable not found" };
})();
```

### Text style key failed
→ Likely a wrong key format. Re-extract using the script in `schemas/text-styles.md`.

---

## Validation Output

After validation passes, log the summary:

```
Registry validation passed:
- Components: {N}/{N} keys verified ✓
- Variables: {N}/{N} keys verified ✓
- Text styles: {N}/{N} keys verified ✓
- Assets: {N}/{N} keys verified ✓ (or "skipped — no asset registries")

All import tests passed. Proceeding to guide generation.
```

If validation fails after remediation attempts, ask the user to verify:
1. The DS library is published (not just local)
2. The library is enabled in the target Figma file
3. The correct Figma file was used for extraction
