# DBIQP Cleanup Explorer

The extension is only for DBIQP's Internal use.

## Features

This extension allows the developers to quickly search the repo for the cleanup items.

## Extension Settings

In the `.vscode/settings.json` file, add the cleanup keys to `commentsexplorer.premierCleanupItems` property

##### For example:

```javascript
"commentsexplorer.premierCleanupItems": [
    {
      "label": "CB-xxxxx: Convert inline style to styles.js file",
      "cleanupKeys": [
        { "key": "cleanup_convert_inline_style", "label": "Show All" },
        { "key": "cleanup_convert_inline_style_login", "label": "CB-xxxxx: Login", "exact": true }
      ]
    }
]
```

**Enjoy!**
