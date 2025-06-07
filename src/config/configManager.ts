import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface AzureOpenAIConfig {
    endpoint: string;
    apiKey: string;
    deployment: string;
}

export class ConfigManager {
    private static instance: ConfigManager;
    private context: vscode.ExtensionContext;

    private constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    static initialize(context: vscode.ExtensionContext): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager(context);
        }
        return ConfigManager.instance;
    }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            throw new Error('ConfigManager not initialized');
        }
        return ConfigManager.instance;
    }

    async getAzureOpenAIConfig(): Promise<AzureOpenAIConfig | null> {
        const config = vscode.workspace.getConfiguration('aiCrashFinder');
        
        // Try to get from workspace configuration first
        let endpoint = config.get<string>('azureOpenAIEndpoint');
        let apiKey = config.get<string>('azureOpenAIApiKey');
        let deployment = config.get<string>('azureOpenAIDeployment');

        // If not in config, try to get from global state (secure storage)
        if (!apiKey) {
            apiKey = await this.context.secrets.get('azureOpenAIApiKey');
        }
        if (!endpoint) {
            endpoint = this.context.globalState.get<string>('azureOpenAIEndpoint');
        }
        if (!deployment) {
            deployment = this.context.globalState.get<string>('azureOpenAIDeployment');
        }

        // Use defaults if still not found
        endpoint = endpoint || "";
        deployment = deployment || "gpt-4o-mini";

        if (!apiKey) {
            return null;
        }

        return { endpoint, apiKey, deployment };
    }

    async saveAzureOpenAIConfig(config: AzureOpenAIConfig): Promise<void> {
        // Save API key securely
        await this.context.secrets.store('azureOpenAIApiKey', config.apiKey);
        
        // Save other settings in global state
        await this.context.globalState.update('azureOpenAIEndpoint', config.endpoint);
        await this.context.globalState.update('azureOpenAIDeployment', config.deployment);

        // Set as environment variables for the current session
        process.env["AZURE_OPENAI_ENDPOINT"] = config.endpoint;
        process.env["AZURE_OPENAI_API_KEY"] = config.apiKey;
        process.env["AZURE_OPENAI_DEPLOYMENT"] = config.deployment;
    }

    async clearConfig(): Promise<void> {
        await this.context.secrets.delete('azureOpenAIApiKey');
        await this.context.globalState.update('azureOpenAIEndpoint', undefined);
        await this.context.globalState.update('azureOpenAIDeployment', undefined);
        
        delete process.env["AZURE_OPENAI_ENDPOINT"];
        delete process.env["AZURE_OPENAI_API_KEY"];
        delete process.env["AZURE_OPENAI_DEPLOYMENT"];
    }

    async promptForConfiguration(): Promise<AzureOpenAIConfig | null> {
        const currentConfig = await this.getAzureOpenAIConfig();
        
        // Prompt for endpoint
        const endpoint = await vscode.window.showInputBox({
            prompt: 'Enter Azure OpenAI Endpoint',
            value: currentConfig?.endpoint || '',
            placeHolder: '',
            ignoreFocusOut: true
        });

        if (!endpoint) {
            return null;
        }

        // Prompt for API key
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter Azure OpenAI API Key',
            value: currentConfig?.apiKey ? '********' : '',
            placeHolder: 'Your Azure OpenAI API Key',
            password: true,
            ignoreFocusOut: true
        });

        if (!apiKey || apiKey === '********') {
            if (!currentConfig?.apiKey) {
                vscode.window.showErrorMessage('API Key is required');
                return null;
            }
            // Use existing API key if user didn't change it
            return { 
                endpoint, 
                apiKey: currentConfig.apiKey, 
                deployment: currentConfig.deployment || 'gpt-4o-mini' 
            };
        }

        // Prompt for deployment name
        const deployment = await vscode.window.showInputBox({
            prompt: 'Enter Azure OpenAI Deployment Name',
            value: currentConfig?.deployment || 'gpt-4o-mini',
            placeHolder: 'Your deployment name (e.g., gpt-4o-mini)',
            ignoreFocusOut: true
        });

        if (!deployment) {
            return null;
        }

        return { endpoint, apiKey, deployment };
    }
}
