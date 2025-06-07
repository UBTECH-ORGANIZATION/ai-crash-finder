# AI Crash Finder

AI Crash Finder is a powerful Visual Studio Code extension that leverages artificial intelligence to help developers quickly identify the root cause of production issues by analyzing Git commit differences. Using Azure OpenAI's advanced language models, this extension provides intelligent insights into code changes that may have introduced bugs or performance issues.

## Introduction

When production issues occur, identifying the root cause can be time-consuming and challenging, especially when dealing with large codebases and multiple recent changes. AI Crash Finder streamlines this process by:

- Analyzing Git diffs between specified commits
- Using AI to correlate code changes with reported issues
- Providing intelligent suggestions for potential causes and solutions
- Offering a seamless integration within your VS Code development environment

## Features

### 🔍 **AI-Powered Root Cause Analysis**
- Leverages Azure OpenAI's GPT models to analyze code changes
- Provides intelligent insights into potential causes of production issues
- Suggests specific files and line numbers that may be related to the problem

### 📊 **Git History Integration**
- Seamlessly integrates with your project's Git repository
- Allows selection of commit ranges for analysis
- Supports multiple programming languages including TypeScript, JavaScript, Python, Java, C++, C#, Go, Ruby, PHP, and more

### ⚙️ **Flexible Configuration**
- Easy setup and configuration of Azure OpenAI credentials
- Secure storage of API keys and settings
- Support for custom deployment names and endpoints

### 🎯 **Interactive Workflow**
- Intuitive commit selection interface
- Issue description input for contextual analysis
- Results displayed in a dedicated, formatted panel

### 🔒 **Secure Credential Management**
- API keys stored securely using VS Code's built-in secret storage
- Configuration options for workspace and global settings
- Easy credential management and cleanup

## Installation

### Prerequisites

Before installing AI Crash Finder, ensure you have:

1. **Visual Studio Code** version 1.100.0 or later
2. **Azure OpenAI Service** access with a deployed GPT model
3. A **Git repository** in your workspace

### Install the Extension

1. Open Visual Studio Code
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "AI Crash Finder"
4. Click "Install" on the extension

Alternatively, you can install from the command line:
```bash
code --install-extension ai-crash-finder
```

## Configuration

### Azure OpenAI Setup

Before using the extension, you need to configure your Azure OpenAI credentials:

1. **Open Command Palette**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
2. **Run Configuration Command**: Type "AI Crash Finder: Configure Azure OpenAI" and select it
3. **Enter Required Information**:
   - **Azure OpenAI Endpoint**: Your Azure OpenAI service endpoint URL
   - **API Key**: Your Azure OpenAI API key
   - **Deployment Name**: The name of your deployed GPT model (default: gpt-4o-mini)

### Configuration Management

- **Clear Configuration**: Use "AI Crash Finder: Clear Configuration" to remove stored credentials
- **Update Settings**: Re-run the configuration command to update existing settings
- **Secure Storage**: API keys are stored securely using VS Code's secret storage system

## Usage

### Step-by-Step Analysis

1. **Open Your Project**: Ensure you're working in a VS Code workspace with a Git repository

2. **Start Analysis**: 
   - Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "AI: Analyze Issue from Git Diff" and select it

3. **Select Commit Range**:
   - Choose the **starting commit** (the baseline for comparison)
   - Choose the **ending commit** (the commit to analyze changes up to)

4. **Describe the Issue**:
   - Enter a clear description of the production issue
   - Example: "The application crashes when users try to login"

5. **Review Analysis**:
   - The AI analysis will appear in a dedicated panel
   - Review the suggested files, line numbers, and potential causes
   - Use the insights to guide your debugging efforts

### Best Practices

- **Be Specific**: Provide detailed issue descriptions for better AI analysis
- **Relevant Timeframe**: Choose commit ranges that align with when the issue was introduced
- **Multiple Analyses**: Run analysis on different commit ranges to narrow down the cause
- **Combine with Testing**: Use AI insights alongside your testing and debugging workflow

## Requirements

### System Requirements
- **Visual Studio Code**: Version 1.100.0 or later
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Not required for end users (included in VS Code)

### Service Requirements
- **Azure OpenAI Service**: Active subscription with deployed GPT model
- **Git Repository**: Project must be version-controlled with Git
- **Internet Connection**: Required for AI analysis requests

### Supported File Types
The extension analyzes changes in the following file types:
- TypeScript (`.ts`)
- JavaScript (`.js`)
- Python (`.py`)
- Java (`.java`)
- C++ (`.cpp`)
- C# (`.cs`)
- Go (`.go`)
- Ruby (`.rb`)
- PHP (`.php`)
- YAML/YML (`.yaml`, `.yml`)
- JSON (`.json`)

## Contributing

We welcome contributions to AI Crash Finder! Here's how you can help:

### Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/UBTECH-ORGANIZATION/ai-crash-finder.git
   cd ai-crash-finder
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Extension**:
   ```bash
   npm run compile
   ```

4. **Run Tests**:
   ```bash
   npm test
   ```

### Development Workflow

- **Linting**: Run `npm run lint` to check code style
- **Type Checking**: Run `npm run check-types` to verify TypeScript types
- **Watch Mode**: Use `npm run watch` for continuous compilation during development
- **Testing**: Use `F5` in VS Code to launch the extension in a new Extension Development Host window

### Contribution Guidelines

1. **Fork the Repository** and create a feature branch
2. **Follow Code Style**: Ensure your code passes linting and type checks
3. **Add Tests**: Include tests for new functionality
4. **Update Documentation**: Update README and other docs as needed
5. **Submit Pull Request**: Provide a clear description of changes

### Reporting Issues

- **Bug Reports**: Use the GitHub issue tracker to report bugs
- **Feature Requests**: Suggest new features through GitHub issues
- **Security Issues**: Report security concerns privately to the maintainers

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This extension uses the following open-source packages:
- **OpenAI SDK**: For Azure OpenAI integration
- **Simple Git**: For Git repository operations
- **VS Code API**: For extension functionality

## Support and Resources

### Documentation
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Azure OpenAI Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/openai/)

### Community
- **GitHub Issues**: [Report bugs and request features](https://github.com/UBTECH-ORGANIZATION/ai-crash-finder/issues)
- **Discussions**: [Community discussions and Q&A](https://github.com/UBTECH-ORGANIZATION/ai-crash-finder/discussions)

### Getting Help
If you encounter issues or have questions:
1. Check the [FAQ](https://github.com/UBTECH-ORGANIZATION/ai-crash-finder/wiki/FAQ) in our wiki
2. Search existing [GitHub issues](https://github.com/UBTECH-ORGANIZATION/ai-crash-finder/issues)
3. Create a new issue with detailed information about your problem

---

**Happy debugging!** 🐛🔍
