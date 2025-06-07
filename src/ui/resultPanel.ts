import * as vscode from 'vscode';
import { ResultFormatter } from './resultFormatter';

export class ResultPanel {
    public static currentPanel: ResultPanel | undefined;

    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel) {
        this._panel = panel;

        // Listen for when the panel is disposed
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static createOrShow(
        context: vscode.ExtensionContext,
        analysis: string,
        issueDescription: string,
        fromCommit: string,
        toCommit: string
    ) {
        const column = vscode.ViewColumn.Two;

        // If we already have a panel, show it
        if (ResultPanel.currentPanel) {
            ResultPanel.currentPanel._panel.reveal(column);
            ResultPanel.currentPanel.update(analysis, issueDescription, fromCommit, toCommit);
            return;
        }

        // Otherwise, create a new panel
        const panel = vscode.window.createWebviewPanel(
            'aiCrashFinderResults',
            'AI Crash Finder Results',
            column,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        ResultPanel.currentPanel = new ResultPanel(panel);
        ResultPanel.currentPanel.update(analysis, issueDescription, fromCommit, toCommit);
    }

    public update(
        analysis: string,
        issueDescription: string,
        fromCommit: string,
        toCommit: string
    ) {
        const markdownContent = ResultFormatter.formatAnalysisResult(
            analysis,
            issueDescription,
            fromCommit,
            toCommit
        );
        
        this._panel.webview.html = ResultFormatter.createWebviewContent(markdownContent);
    }

    public dispose() {
        ResultPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}
