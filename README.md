# DBIQP Cleanup Explorer

The extension is only for DBIQP's Internal use.

## Features

This extension allows the developers to quickly search the repo for the cleanup items.

## Extension Settings

In the `.vscode/settings.json` file, add the cleanup keys to `cleanup.btiqpcleanupkeys` property

##### For example:

```javascript
"cleanup.premierCleanupItems": [
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
