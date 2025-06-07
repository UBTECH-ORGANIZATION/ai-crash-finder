import simpleGit, { SimpleGit } from 'simple-git';
import * as vscode from 'vscode';

export async function getGitDiff(fromCommit: string, toCommit: string): Promise<string> {
    try {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            throw new Error('No workspace folder found');
        }

        const git: SimpleGit = simpleGit(workspaceFolders[0].uri.fsPath);

        // Verify commits exist
        const commits = await git.log([`${fromCommit}..${toCommit}`]);
        if (!commits.total) {
            throw new Error('Invalid commit range');
        }

        // Get diff with relevant file extensions
        const diff = await git.diff([
            fromCommit,
            toCommit,
            '--',
            '*.ts',
            '*.js',
            '*.py',
            '*.java',
            '*.cpp',
            '*.cs',
            '*.go',
            '*.rb',
            '*.php',
            '*.yaml',
            '*.yml',
            '*.json'
        ]);

        return diff;
    } catch (error) {
        console.error('Git diff error:', error);
        throw new Error('Failed to get git diff');
    }
}

export interface GitCommit {
    hash: string;
    date: string;
    message: string;
}

export async function getRecentCommits(): Promise<GitCommit[]> {
    const { execSync } = require('child_process');
    try {
        const output = execSync(
            'git log -n 20 --pretty=format:"%H|%ad|%s" --date=short'
        ).toString();
        
        return output.split('\n').map((line: string) => {
            const [hash, date, ...messageParts] = line.split('|');
            return {
                hash,
                date,
                message: messageParts.join('|')
            };
        });
    } catch (error) {
        throw new Error('Failed to fetch git commits');
    }
}