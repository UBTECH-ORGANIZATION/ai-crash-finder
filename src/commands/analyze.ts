import * as vscode from 'vscode';
import { getGitDiff, getRecentCommits, GitCommit } from '../git/gitService';
import { analyzeWithAI } from '../llm/openaiClient';
import { ResultPanel } from '../ui/panel';

export async function analyzeIssue(context: vscode.ExtensionContext) {
    try {
        // 1. Get commits
        const commits = await getRecentCommits();
        
        // 2. Let user select from commit
        const fromCommit = await selectCommit('Select starting commit', commits);
        if (!fromCommit) {
            throw new Error('Starting commit is required');
        }

        const toCommit = await selectCommit('Select ending commit', commits);
        if (!toCommit) {
            throw new Error('Ending commit is required');
        }

        // 3. Get issue description
        const issueDescription = await vscode.window.showInputBox({
            prompt: 'Describe the production issue',
            placeHolder: 'e.g., The application crashes when users try to login'
        });

        if (!issueDescription) {
            throw new Error('Issue description is required');
        }

        // Show progress
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Analyzing issue...",
            cancellable: false
        }, async (progress) => {
            progress.report({ message: 'Fetching git diff...' });
            const diff = await getGitDiff(fromCommit.hash, toCommit.hash);

            progress.report({ message: 'Analyzing with AI...' });
            const analysis = await analyzeWithAI(diff, issueDescription);

            ResultPanel.createOrShow(
                context,
                analysis,
                issueDescription,
                fromCommit.hash,
                toCommit.hash
            );
        });

    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
}

async function selectCommit(prompt: string, commits: GitCommit[]): Promise<GitCommit | undefined> {
    const items = commits.map(commit => ({
        label: commit.message,
        description: `${commit.date} (${commit.hash.substring(0, 7)})`,
        commit
    }));

    const selection = await vscode.window.showQuickPick(items, {
        placeHolder: prompt,
        matchOnDescription: true
    });

    return selection?.commit;
}