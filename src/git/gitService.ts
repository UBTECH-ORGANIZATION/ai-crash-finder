import simpleGit, { SimpleGit } from 'simple-git';
import * as vscode from 'vscode';

async function getGitInstance(): Promise<SimpleGit> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        throw new Error('No workspace folder found');
    }

    const git: SimpleGit = simpleGit(workspaceFolders[0].uri.fsPath);
    
    // Check if it's a git repository
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
        throw new Error('The current workspace is not a git repository');
    }
    
    return git;
}

export async function getGitDiff(fromCommit: string, toCommit: string): Promise<string> {
    try {
        const git = await getGitInstance();

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
        throw new Error(`Failed to get git diff: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export interface GitCommit {
    hash: string;
    date: string;
    message: string;
}

export async function getRecentCommits(): Promise<GitCommit[]> {
    try {
        const git = await getGitInstance();
        
        const log = await git.log({
            n: 20,
            format: {
                hash: '%H',
                date: '%ad',
                message: '%s'
            },
            '--date': 'short'
        });
        
        return log.all.map(commit => ({
            hash: commit.hash,
            date: commit.date,
            message: commit.message
        }));
    } catch (error) {
        console.error('Git log error:', error);
        throw new Error(`Failed to fetch git commits: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}