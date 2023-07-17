const vscode = require("vscode");
const CleanUpTreeProvider = require("./TreeDataProvider");

const registerWatcher = ({ fileToWatch, treeInstance }) => {
  const watcher = vscode.workspace.createFileSystemWatcher(fileToWatch);

  watcher.onDidChange(() => {
    setTimeout(() => {
      treeInstance.refresh();
    }, 500);
  });
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Get the current workspace path
  const workspacePath =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;

  // Create a new cleanup tree instance
  const btiqpCleanUpProvider = new CleanUpTreeProvider(workspacePath);

  // Create the custom tree view
  vscode.window.createTreeView("commentsExplorerTree", {
    treeDataProvider: btiqpCleanUpProvider,
  });

  // Watch for the changes in the settings.json file and reload the tree
  registerWatcher({
    fileToWatch: `${workspacePath}/.vscode/settings.json`,
    treeInstance: btiqpCleanUpProvider,
  });
}

function deactivate() {
  console.log("deactivate");
}

module.exports = {
  activate,
  deactivate,
};
