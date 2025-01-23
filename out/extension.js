"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = require("vscode");
function activate(context) {
    const myProvider = new MyTreeDataProvider();
    vscode.window.registerTreeDataProvider('myView', myProvider);
}
class MyTreeDataProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        }
        else {
            return Promise.resolve([
                new vscode.TreeItem('Item 1'),
                new vscode.TreeItem('Item 2'),
                new vscode.TreeItem('Item 3')
            ]);
        }
    }
}
//# sourceMappingURL=extension.js.map