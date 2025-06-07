import * as vscode from 'vscode';
import OpenAI from 'openai';

export async function analyzeWithAI(diff: string, issueDescription: string): Promise<string> {
    const config = vscode.workspace.getConfiguration('aiCrashFinder');
    const apiKey = config.get<string>('openaiApiKey');

    if (!apiKey) {
        throw new Error('OpenAI API key not configured. Please add it in settings.');
    }

    const openai = new OpenAI({
        apiKey: apiKey
    });

    try {
        const prompt = `Given the following git diff and a description of a production issue, identify the most likely cause or suspicious code sections:

Issue:
${issueDescription}

Git diff:
${diff}

Please analyze the changes and provide:
1. The most likely files and line numbers related to the issue
2. Your reasoning for why these changes might have caused the issue
3. Potential solutions or areas to investigate further`;

        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a skilled software developer analyzing Git changes to find root causes of production issues."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "gpt-4",
            temperature: 0.3,
            max_tokens: 2000
        });

        return response.choices[0]?.message?.content || 'No analysis generated';

    } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('Failed to analyze with AI. Please check your API key and try again.');
    }
}