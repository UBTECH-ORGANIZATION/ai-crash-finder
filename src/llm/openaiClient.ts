import * as vscode from 'vscode';
import { AzureOpenAI } from 'openai';
import { ConfigManager } from '../config/configManager';

export async function analyzeWithAI(diff: string, issueDescription: string): Promise<string> {
    const configManager = ConfigManager.getInstance();
    const config = await configManager.getAzureOpenAIConfig();
    
    if (!config) {
        // Prompt user for configuration if not set
        const newConfig = await configManager.promptForConfiguration();
        if (!newConfig) {
            throw new Error('Azure OpenAI configuration is required. Please configure your settings.');
        }
        await configManager.saveAzureOpenAIConfig(newConfig);
        return analyzeWithAI(diff, issueDescription); // Retry with new config
    }

    const apiVersion = "2025-01-01-preview";

    const client = new AzureOpenAI({ 
        endpoint: config.endpoint, 
        apiKey: config.apiKey, 
        apiVersion, 
        deployment: config.deployment 
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
3. Potential solutions or areas to investigate further
4. If applicable, provide specific code fixes in the following format:
   - Show the problematic code that needs to be removed with comments like "// remove: reason"
   - Show the fixed code that needs to be added with comments like "// add: reason"
   - Use code blocks with the appropriate language syntax

Example format for code suggestions:
\`\`\`javascript
// remove: vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// add: use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
const result = await db.query(query, [userId]);
\`\`\``;

        const response = await client.chat.completions.create({
            model: config.deployment,
            messages: [
                {
                    role: "system",
                    content: "You are a skilled software developer analyzing Git changes to find root causes of production issues. When suggesting code fixes, clearly mark lines to be removed and added with appropriate comments."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0.3,
            top_p: 0.95,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: null
        });

        return response.choices[0]?.message?.content || 'No analysis generated';

    } catch (error) {
        console.error('Azure OpenAI API error:', error);
        throw new Error('Failed to analyze with AI. Please check your Azure OpenAI configuration and try again.');
    }
}