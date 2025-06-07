import * as vscode from 'vscode';
import { analyzeIssue } from './commands/analyze';
import { ConfigManager } from './config/configManager';
import { ResultPanel } from './ui/panel';
import { getGitDiff, getRecentCommits } from './git/gitService';
import { analyzeWithAI } from './llm/openaiClient';

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

    const analyzeCommand = vscode.commands.registerCommand('aiCrashFinder.analyze', async () => {
        try {
            // Get recent commits
            const commits = await getRecentCommits();
            if (!commits || commits.length < 2) {
                vscode.window.showErrorMessage('Not enough commits to analyze');
                return;
            }

            // Select from commit
            const fromCommitOptions = commits.map(c => ({
                label: c.hash.substring(0, 7),
                description: `${c.date} - ${c.message}`,
                commit: c
            }));

            const fromCommitSelection = await vscode.window.showQuickPick(fromCommitOptions, {
                placeHolder: 'Select the FROM commit (older commit)'
            });

            if (!fromCommitSelection) {
                return;
            }

            // Select to commit
            const toCommitOptions = commits
                .filter(c => commits.indexOf(c) < commits.indexOf(fromCommitSelection.commit))
                .map(c => ({
                    label: c.hash.substring(0, 7),
                    description: `${c.date} - ${c.message}`,
                    commit: c
                }));

            if (toCommitOptions.length === 0) {
                vscode.window.showErrorMessage('No commits available after the selected FROM commit');
                return;
            }

            const toCommitSelection = await vscode.window.showQuickPick(toCommitOptions, {
                placeHolder: 'Select the TO commit (newer commit)'
            });

            if (!toCommitSelection) {
                return;
            }

            // Get issue description
            const issueDescription = await vscode.window.showInputBox({
                prompt: 'Describe the production issue',
                placeHolder: 'e.g., Users cannot login after 5pm',
                ignoreFocusOut: true
            });

            if (!issueDescription) {
                return;
            }

            // Show progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "AI Crash Finder",
                cancellable: false
            }, async (progress) => {
                progress.report({ increment: 0, message: "Getting git diff..." });
                const diff = await getGitDiff(fromCommitSelection.commit.hash, toCommitSelection.commit.hash);
                
                progress.report({ increment: 50, message: "Analyzing with AI..." });
                const analysis = await analyzeWithAI(diff, issueDescription);
                
                progress.report({ increment: 100, message: "Complete!" });
                
                // Display results in webview panel
                ResultPanel.createOrShow(
                    context,
                    analysis,
                    issueDescription,
                    fromCommitSelection.commit.hash,
                    toCommitSelection.commit.hash
                );
            });

        } catch (error) {
            console.error('Error analyzing issue:', error);
            vscode.window.showErrorMessage('Failed to analyze issue. Please try again later.');
        }
    });

    // Add command to open results folder
    const openResultsCommand = vscode.commands.registerCommand('aiCrashFinder.openResults', async () => {
        await ResultPanel.openResultsFolder(context);
    });

    context.subscriptions.push(disposable, configureCommand, clearConfigCommand, analyzeCommand, openResultsCommand);
}

export function deactivate() {}