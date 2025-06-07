import * as vscode from 'vscode';

export class ResultPanel {
    public static currentPanel: ResultPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel) {
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static createOrShow(extensionUri: vscode.Uri, content: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (ResultPanel.currentPanel) {
            ResultPanel.currentPanel._panel.reveal(column);
            ResultPanel.currentPanel.update(content);
        } else {
            const panel = vscode.window.createWebviewPanel(
                'aiCrashFinder',
                'AI Analysis Result',
                column || vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );
            ResultPanel.currentPanel = new ResultPanel(panel);
            ResultPanel.currentPanel.update(content);
        }
    }

    private update(content: string) {
        this._panel.webview.html = this._getHtmlForWebview(content);
    }

    private _getHtmlForWebview(content: string): string {
        const htmlContent = content.replace(/\n/g, '<br>');
        
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Analysis Result</title>
            <style>
                body {
                    padding: 20px;
                    line-height: 1.6;
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                pre {
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
            </style>
        </head>
        <body>
            <div class="container">
                ${htmlContent}
            </div>
        </body>
        </html>`;
    }

    private dispose() {
        ResultPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}