import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const myTreeDataProvider = new MyTreeDataProvider();
    vscode.window.registerTreeDataProvider('myView', myTreeDataProvider);
  }

  class MyTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
      console.log('getTreeItem called:', element.label);
      return element;
    }
  
    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
      console.log('getChildren called:', element ? element.label : 'root');
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