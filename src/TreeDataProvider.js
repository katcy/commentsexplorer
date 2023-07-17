const vscode = require("vscode");

class CleanUpTreeProvider {
  constructor(params) {
    this.workspacePath = params;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!this.workspacePath) {
      vscode.window.showInformationMessage("No Items found");
      return Promise.resolve([]);
    }
    if (element) {
      const { childKeys, searchKey, exact } = element;
      const config = vscode.workspace.getConfiguration("commentsexplorer");

      // Load Child Trees
      if (childKeys) {
        let childItems = childKeys.map(({ key, label, exact = false }) => {
          let childTree = new vscode.TreeItem(
            label,
            vscode.TreeItemCollapsibleState.Collapsed
          );
          childTree.searchKey = key;
          childTree.exact = exact;
          return childTree;
        });
        return Promise.resolve(childItems);
      }
      // Handle click event on the child keys
      if (searchKey) {
        vscode.commands.executeCommand("workbench.action.findInFiles", {
          query: searchKey,
          triggerSearch: true,
          isCaseSensitive: true,
          matchWholeWord: exact,
          filesToExclude: config.exclude || "node_modules,.vscode",
        });
        return Promise.reject();
      }
      return Promise.reject();
    } else {
      // Load the Parent Trees
      const config = vscode.workspace.getConfiguration("commentsexplorer");
      if (config.premierCleanupItems) {
        const items = config.premierCleanupItems.map(
          ({ label, cleanupKeys }) => {
            let tree = new vscode.TreeItem(
              label,
              vscode.TreeItemCollapsibleState.Collapsed
            );
            tree.childKeys = cleanupKeys;
            return tree;
          }
        );

        return Promise.resolve(items);
      } else {
        vscode.window.showErrorMessage(
          "Could not find the configuration, please add the configuration objects to .vscode/settings.json file"
        );
        return Promise.resolve([]);
      }
    }
  }
}

module.exports = CleanUpTreeProvider;
