# Schema: components.json

> **Read this BEFORE writing components.json during setup.**

---

## Required Structure

```json
{
  "meta": {
    "source": "Library file name",
    "fileKey": "FigmaFileKey",
    "extractedAt": "YYYY-MM-DD",
    "totalComponents": 100,
    "totalComponentSets": 76
  },
  "components": {
    "categoryName": [
      {
        "name": "Button",
        "key": "abc123def456789...",
        "id": "1008:174",
        "type": "COMPONENT_SET",
        "variants": 150,
        "properties": {
          "label": "TEXT",
          "hasTrailingIcon": "BOOLEAN",
          "leadingIcon": "INSTANCE_SWAP",
          "variant": "VARIANT(primary,secondary,ghost)",
          "state": "VARIANT(default,hover,disabled)",
          "size": "VARIANT(large,medium,small)"
        }
      }
    ]
  }
}
```

---

## Field Requirements

| Field | Required | Description |
|-------|----------|-------------|
| `name` | **YES** | Human-readable component name |
| `key` | **YES** | Component key for `importComponentByKeyAsync` / `importComponentSetByKeyAsync`. A hex hash like `"abc123def456..."` (NOT a node ID). |
| `id` | optional | Figma node ID like `"1008:174"`. Useful for lookups but NOT for imports. |
| `type` | **YES** | `"COMPONENT"` or `"COMPONENT_SET"`. Determines which import API to use. |
| `variants` | optional | Number of variants (only for COMPONENT_SET) |
| `properties` | **YES** | Object mapping property names to types: `TEXT`, `BOOLEAN`, `INSTANCE_SWAP`, `VARIANT(...)` |

---

## CRITICAL: `key` vs `id`

These are TWO DIFFERENT identifiers in Figma:

| | `id` (node ID) | `key` (component key) |
|---|---|---|
| **Looks like** | `"1008:174"` | `"abc123def456789abcdef..."` |
| **Used for** | `figma.getNodeById()` | `importComponentByKeyAsync()` |
| **Available from** | Any node | Only published components |

**`importComponentByKeyAsync` REQUIRES the `key`, NOT the `id`.** Using a node ID as a key will crash the script silently.

---

## How to Extract Keys

### Option A: Via figma_execute (RECOMMENDED)

```js
return (async function() {
  var results = [];
  var nodes = figma.currentPage.findAll(function(n) {
    return n.type === "COMPONENT_SET" || (n.type === "COMPONENT" && !n.parent.type !== "COMPONENT_SET");
  });
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    results.push({
      name: n.name,
      key: n.key,        // ← THIS is what importComponentByKeyAsync needs
      id: n.id,          // ← This is just the node ID (different!)
      type: n.type,
      variants: n.type === "COMPONENT_SET" ? n.children.length : undefined,
      properties: n.type === "COMPONENT_SET" ? n.componentPropertyDefinitions : undefined
    });
  }
  return { components: results };
})();
```

Run this script on each page of the DS library file.

### Option B: Via figma_get_design_system_kit

If the MCP tool returns component data, look for the `key` field in the response. If only `id` is returned, use Option A to get the actual keys.

---

## Import API Decision

| `type` value | Import API |
|---|---|
| `COMPONENT_SET` | `figma.importComponentSetByKeyAsync(key)` |
| `COMPONENT` | `figma.importComponentByKeyAsync(key)` |

Check the `type` field to decide which API to use. Using the wrong one will fail.

---

## Category Grouping

Group components by semantic category:
- `actions` — Buttons, IconButtons, Links
- `formControls` — Inputs, Selects, Checkboxes, Radios, Toggles
- `dataDisplay` — Tables, Lists, Cards, Badges, Tags
- `feedback` — Alerts, Toasts, Modals, Dialogs
- `navigation` — Tabs, Sidebar, Breadcrumbs, Pagination
- `layout` — Dividers, Spacers, Containers
- `indicators` — Avatars, Status, Progress

Use whatever categories match the DS's own organization.
