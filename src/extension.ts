import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const myProvider = new MyTreeDataProvider();
  vscode.window.registerTreeDataProvider('myView', myProvider);
}

class MyTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve([
        new vscode.TreeItem('Item 1'),
        new vscode.TreeItem('Item 2'),
        new vscode.TreeItem('Item 3')
      ]);
    }
  }
}