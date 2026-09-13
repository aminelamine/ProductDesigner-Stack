# Schema: variables.json

> **Read this BEFORE writing variables.json during setup.**

---

## Required Structure

```json
{
  "meta": {
    "source": "Library file name",
    "fileKey": "FigmaFileKey",
    "extractedAt": "YYYY-MM-DD",
    "totalVariables": 856
  },
  "collections": {
    "color": {
      "id": "VariableCollectionId:19:113",
      "modes": ["dark", "light"],
      "variables": [
        { "name": "color/background/neutral/boldest", "key": "VariableID:19:114", "valuesByMode": { "dark": "#FFFFFF", "light": "#000000" } },
        { "name": "color/background/neutral/bolder", "key": "VariableID:19:115", "valuesByMode": { "dark": "#E5E5E5", "light": "#1A1A1A" } }
      ]
    },
    "layout": {
      "id": "VariableCollectionId:55:113",
      "modes": ["value"],
      "variables": [
        { "name": "layout/spacing/none", "key": "VariableID:55:114", "valuesByMode": { "value": 0 } },
        { "name": "layout/spacing/xsmall", "key": "VariableID:55:115", "valuesByMode": { "value": 8 } },
        { "name": "layout/spacing/medium", "key": "VariableID:55:118", "valuesByMode": { "value": 16 } },
        { "name": "layout/spacing/large", "key": "VariableID:55:119", "valuesByMode": { "value": 24 } },
        { "name": "layout/radius/medium", "key": "VariableID:55:130", "valuesByMode": { "value": 12 } }
      ]
    }
  }
}
```

---

## Field Requirements

### Per variable entry

| Field | Required | Description |
|-------|----------|-------------|
| `name` | **YES** | Variable path like `"color/background/neutral/boldest"` |
| `key` | **YES** | Variable key for `importVariableByKeyAsync`. Format varies (e.g., `"VariableID:55:114"` or a hash). |
| `valuesByMode` | **YES** | Object mapping mode names to resolved values |

### Per collection

| Field | Required | Description |
|-------|----------|-------------|
| `id` | optional | Collection ID |
| `modes` | **YES** | Array of mode names |
| `variables` | **YES** | Array of variable entries |

---

## CRITICAL: Variable `name` vs `key`

These are TWO DIFFERENT things:

| | `name` (path) | `key` (variable key) |
|---|---|---|
| **Looks like** | `"color/background/neutral/boldest"` | `"VariableID:55:114"` or hex hash |
| **Used for** | Human reading, organization | `importVariableByKeyAsync()` |
| **Available from** | `variable.name` | `variable.key` |

**`importVariableByKeyAsync` REQUIRES the `key`, NOT the `name`.** The name is useful for documentation but cannot be used for script imports.

---

## How to Extract Keys

### Via figma_execute (RECOMMENDED)

```js
return (async function() {
  var collections = await figma.variables.getLocalVariableCollectionsAsync();
  var result = {};

  for (var c = 0; c < collections.length; c++) {
    var col = collections[c];
    var collectionData = {
      id: col.id,
      modes: col.modes.map(function(m) { return m.name; }),
      variables: []
    };

    for (var v = 0; v < col.variableIds.length; v++) {
      var variable = await figma.variables.getVariableByIdAsync(col.variableIds[v]);
      if (!variable) continue;

      var valuesByMode = {};
      for (var m = 0; m < col.modes.length; m++) {
        var mode = col.modes[m];
        var val = variable.valuesByMode[mode.modeId];
        // Resolve color values to hex
        if (val && typeof val === "object" && "r" in val) {
          var r = Math.round(val.r * 255).toString(16).padStart(2, "0");
          var g = Math.round(val.g * 255).toString(16).padStart(2, "0");
          var b = Math.round(val.b * 255).toString(16).padStart(2, "0");
          valuesByMode[mode.name] = "#" + r + g + b;
        } else if (val && typeof val === "object" && "type" in val) {
          // Alias — store the referenced variable name
          valuesByMode[mode.name] = "→ alias";
        } else {
          valuesByMode[mode.name] = val;
        }
      }

      collectionData.variables.push({
        name: variable.name,
        key: variable.key,  // ← THIS is what importVariableByKeyAsync needs
        valuesByMode: valuesByMode
      });
    }

    // Use first segment of variable names as collection key (e.g., "color", "layout")
    var collName = col.name.toLowerCase().replace(/\s+/g, "-");
    result[collName] = collectionData;
  }

  return { collections: result };
})();
```

### Important Notes

- For large collections (400+ variables), you may need to extract in batches per collection
- The `key` format varies: it might be `"VariableID:55:114"` or a different format depending on the Figma version
- Always verify keys work by running the validation script (see `schemas/validation.md`)

---

## Usage in Scripts

```js
// Load variable by key (from registries/variables.json)
var spMedium = await figma.variables.importVariableByKeyAsync("VariableID:55:118");

// Bind to frame padding
frame.setBoundVariable('paddingTop', spMedium);
frame.setBoundVariable('itemSpacing', spMedium);

// Bind to color fill
var bgColor = await figma.variables.importVariableByKeyAsync("VariableID:19:114");
frame.fills = mf(bgColor);  // using the mf() helper
```
