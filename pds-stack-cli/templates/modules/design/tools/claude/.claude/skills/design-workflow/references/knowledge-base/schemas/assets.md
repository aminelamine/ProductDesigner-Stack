# Schema: icons.json, logos.json, illustrations.json

> **Read this BEFORE writing asset registries during setup.**

---

## Required Structure (same for all 3 files)

```json
{
  "meta": {
    "source": "Library file name",
    "fileKey": "FigmaFileKey",
    "extractedAt": "YYYY-MM-DD",
    "totalComponents": 344
  },
  "items": [
    {
      "name": "icon/utility/check",
      "key": "abc123def456...",
      "type": "COMPONENT"
    },
    {
      "name": "icon/utility/chevron-up",
      "key": "def789ghi012...",
      "type": "COMPONENT"
    }
  ],
  "categories": {
    "utility": {
      "description": "UI action and navigation icons",
      "count": 280,
      "namingPattern": "icon/utility/{name}"
    },
    "flag": {
      "description": "Country flag icons",
      "count": 40,
      "namingPattern": "icon/flag/{country}"
    }
  }
}
```

---

## Field Requirements

### Per asset entry (`items` array)

| Field | Required | Description |
|-------|----------|-------------|
| `name` | **YES** | Component name/path |
| `key` | **YES** | Component key for `importComponentByKeyAsync`. NOT a node ID. |
| `type` | **YES** | `"COMPONENT"` or `"COMPONENT_SET"` |

### Categories (documentation only)

Categories provide human-readable organization and naming patterns. They help Claude find the right asset without scanning all items.

---

## Large Libraries (500+ items)

For very large asset libraries (e.g., 1300+ financial logos), extracting every key upfront is impractical:

1. **Extract keys for commonly-used items** (top 50-100) into the `items` array
2. **Document naming patterns** in `categories` for the rest
3. **On-demand extraction**: When a specific asset is needed during `design`, use `figma_execute` to search by name and get the key:

```js
return (async function() {
  var node = figma.currentPage.findOne(function(n) {
    return n.name === "TARGET_NAME" && (n.type === "COMPONENT" || n.type === "COMPONENT_SET");
  });
  if (node) {
    return { name: node.name, key: node.key, type: node.type };
  }
  return { error: "Not found" };
})();
```

---

## How to Extract Keys

### Via figma_execute

```js
return (async function() {
  var results = [];
  // Get all components on the current page
  var nodes = figma.currentPage.findAll(function(n) {
    return n.type === "COMPONENT" || n.type === "COMPONENT_SET";
  });

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    // Skip individual variants inside component sets
    if (n.type === "COMPONENT" && n.parent && n.parent.type === "COMPONENT_SET") continue;

    results.push({
      name: n.name,
      key: n.key,       // ← REQUIRED for importComponentByKeyAsync
      type: n.type
    });
  }

  return { items: results, total: results.length };
})();
```

Run on each page of the asset library file. For multi-page libraries, run once per page.

---

## Usage in Scripts

```js
// Import icon by key (from registries/icons.json)
var checkIcon = await figma.importComponentByKeyAsync("abc123def456...");
var iconInstance = checkIcon.createInstance();

// Import logo with variants by key
var logo = await figma.importComponentSetByKeyAsync("xyz789...");
var defaultVariant = logo.defaultVariant;
var logoInstance = defaultVariant.createInstance();
```

---

## File-specific Notes

### icons.json
- Icons are typically single components (`type: "COMPONENT"`)
- Naming convention: `icon/{category}/{name}` (e.g., `icon/utility/check`)

### logos.json
- Logos may be component sets with mode variants (dark/light)
- Naming convention: `{brand}` or `logo/{brand}/{variant}`

### illustrations.json
- Illustrations often have theme variants (dark/light/brand)
- May be component sets (`type: "COMPONENT_SET"`)
- Naming convention: `{category}/{name}` (e.g., `asset/crypto`, `utility/empty-state`)
