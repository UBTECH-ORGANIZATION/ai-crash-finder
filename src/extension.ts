import * as vscode from 'vscode';
import { analyzeIssue } from './commands/analyze';

export function activate(context: vscode.ExtensionContext) {
    console.log('AI Crash Finder is now active');

    let disposable = vscode.commands.registerCommand('ai-crash-finder.analyzeIssue', async () => {
        await analyzeIssue(context);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}