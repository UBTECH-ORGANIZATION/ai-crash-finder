# Change Log

All notable changes to the "ai-crash-finder" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 2024-01-01

### Added
- Initial release of AI Crash Finder extension
- AI-powered root cause analysis using Azure OpenAI
- Git history integration for commit range selection
- Secure configuration management for Azure OpenAI credentials
- Interactive workflow with commit selection and issue description
- Support for multiple programming languages (TypeScript, JavaScript, Python, Java, C++, C#, Go, Ruby, PHP, YAML, JSON)
- Dedicated results panel with formatted AI analysis
- Commands for configuration setup and management

### Features
- `ai-crash-finder.analyzeIssue` - Main analysis command
- `aiCrashFinder.configure` - Azure OpenAI configuration setup
- `aiCrashFinder.clearConfig` - Clear stored configuration
- Secure API key storage using VS Code's secret storage
- Real-time progress indicators during analysis