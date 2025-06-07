import * as vscode from 'vscode';
import { analyzeIssue } from './commands/analyze';
import { ConfigManager } from './config/configManager';

export function activate(context: vscode.ExtensionContext) {
    console.log('AI Crash Finder is now active!');

    // Initialize configuration manager
    ConfigManager.initialize(context);

    let disposable = vscode.commands.registerCommand('ai-crash-finder.analyzeIssue', async () => {
        await analyzeIssue(context);
    });

    // Add configuration command
    const configureCommand = vscode.commands.registerCommand('aiCrashFinder.configure', async () => {
        const configManager = ConfigManager.getInstance();
        const config = await configManager.promptForConfiguration();
        
        if (config) {
            await configManager.saveAzureOpenAIConfig(config);
            vscode.window.showInformationMessage('Azure OpenAI configuration saved successfully!');
        }
    });

    // Add clear configuration command
    const clearConfigCommand = vscode.commands.registerCommand('aiCrashFinder.clearConfig', async () => {
        const confirm = await vscode.window.showWarningMessage(
            'Are you sure you want to clear your Azure OpenAI configuration?',
            'Yes', 'No'
        );
        
        if (confirm === 'Yes') {
            const configManager = ConfigManager.getInstance();
            await configManager.clearConfig();
            vscode.window.showInformationMessage('Configuration cleared successfully!');
        }
    });

    context.subscriptions.push(disposable, configureCommand, clearConfigCommand);
}

export function deactivate() {}