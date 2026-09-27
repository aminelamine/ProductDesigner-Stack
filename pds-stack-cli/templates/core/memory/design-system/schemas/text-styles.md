# Schema: text-styles.json

> **Read this BEFORE writing text-styles.json during setup.**

---

## Required Structure

```json
{
  "meta": {
    "source": "Library file name",
    "fileKey": "FigmaFileKey",
    "extractedAt": "YYYY-MM-DD",
    "totalStyles": 56
  },
  "textStyles": {
    "display": [
      { "name": "display/lg", "key": "a9b866d18e77632daa1f4056b905af688933c4c7", "nodeId": "60:169" }
    ],
    "heading": [
      { "name": "heading/xl/regular", "key": "930df26f44235299875c572ef52bd60cbf5ae956", "nodeId": "60:172" },
      { "name": "heading/xl/accent", "key": "225299706052d97c6259e70545f448cb44e84f9f", "nodeId": "60:173" }
    ],
    "body": [
      { "name": "body/lg/regular", "key": "fe5e50c7cbdc2b607aecb70747cfae7ac4da49ee", "nodeId": "60:206" }
    ]
  },
  "effectStyles": {
    "shadow": [
      { "name": "shadow/xsmall", "key": "1b34455796052a6ec745a03064597491bb8db256", "nodeId": "2620:254" }
    ]
  },
  "sizeMap": {
    "display/lg": { "fontSize": 40, "lineHeight": 88, "fontFamily": "Inter" },
    "heading/xl": { "fontSize": 40, "lineHeight": 48, "fontFamily": "Inter" }
  }
}
```

---

## Field Requirements

### Per text style entry

| Field | Required | Description |
|-------|----------|-------------|
| `name` | **YES** | Style name like `"heading/xl/regular"` |
| `key` | **YES** | Style key (40-char hex hash) for `importStyleByKeyAsync` |
| `nodeId` | optional | Figma node ID for reference |

### sizeMap (optional but recommended)

Maps style names to font specs for quick human reference. Not used in scripts (scripts use the `key` to import the full style).

---

## How to Extract Keys

### Via figma_execute

```js
return (async function() {
  var textStyles = await figma.getLocalTextStylesAsync();
  var effectStyles = await figma.getLocalEffectStylesAsync();

  var result = { textStyles: [], effectStyles: [] };

  for (var i = 0; i < textStyles.length; i++) {
    var s = textStyles[i];
    result.textStyles.push({
      name: s.name,
      key: s.key,  // ← 40-char hex hash for importStyleByKeyAsync
      nodeId: s.id,
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      fontFamily: s.fontName.family,
      fontStyle: s.fontName.style
    });
  }

  for (var i = 0; i < effectStyles.length; i++) {
    var s = effectStyles[i];
    result.effectStyles.push({
      name: s.name,
      key: s.key,
      nodeId: s.id
    });
  }

  return result;
})();
```

---

## Usage in Scripts

```js
// Import text style by key (from registries/text-styles.json)
var headingStyle = await figma.importStyleByKeyAsync("930df26f44235299875c572ef52bd60cbf5ae956");
await textNode.setTextStyleIdAsync(headingStyle.id);  // MUST use async version (Rule 20)
```

---

## Grouping

Group text styles by their first path segment:
- `display` — Large hero/display text
- `heading` — Section and page headings
- `body` — Body copy, descriptions
- `caption` — Small labels, metadata
- `code` — Monospace / code text

Weight/emphasis variants are the second segment: `regular`, `accent`, `emphasis`, `bold`.
