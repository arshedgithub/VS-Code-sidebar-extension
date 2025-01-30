import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const panel = vscode.window.createWebviewPanel(
        'myWebview',
        'My Webview',
        vscode.ViewColumn.One,
        {
            enableScripts: true, // Enable JavaScript in the webview
            retainContextWhenHidden: true,
        }
    );

    panel.webview.html = getWebviewContent();

    panel.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
            case 'submit':
                vscode.window.showInformationMessage(`You entered: ${message.text}`);
                panel.webview.postMessage({ command: 'response', text: `You entered: ${message.text}` });
                break;
        }
    });
}

function getWebviewContent(): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Webview</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                textArea {
                    margin: 10px 0;
                    padding: 10px;
                    width: 90%;
                }
                button {
                  background-color: blue;
                  color: white;
                  cursor: pointer;
                  border: none;
                  border-radius: 10px;    
                }
            </style>
        </head>
        <body>
            <h1>Welcome to My Webview!</h1>
            <textArea type="text" id="textField" placeholder="How can I assist you?"></textArea>
            <button id="submitButton">Submit</button>
            <p id="output"></p>

            <script>
                const vscode = acquireVsCodeApi();
                const textField = document.getElementById('textField');
                const submitButton = document.getElementById('submitButton');
                const output = document.getElementById('output');

                submitButton.addEventListener('click', () => {
                    const inputText = textField.value;
                    vscode.postMessage({
                        command: 'submit',
                        text: inputText
                    });
                });

                // Handle messages from the extension
                window.addEventListener('message', (event) => {
                    const message = event.data;
                    if (message.command === 'response') {
                        output.innerText = message.text;
                    }
                });
            </script>
        </body>
        </html>
    `;
}