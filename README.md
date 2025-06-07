# 🔍 AI Crash Finder

**AI Crash Finder** is a VS Code extension that uses Azure OpenAI to analyze git diffs and help developers quickly identify the root cause of production issues. It examines code changes between commits and provides intelligent insights about what might have caused a crash or bug.

![Version](https://img.shields.io/badge/version-0.0.1-blue)
![VS Code](https://img.shields.io/badge/VS%20Code-^1.100.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎥 Demo

### Watch AI Crash Finder in Action

[![AI Crash Finder Demo](./media/icon.png)](https://youtu.be/D_PBbQ-rMAI)

### Quick Demo Walkthrough

<details>

1. **Configure Azure OpenAI**
   ![Configure](./Demo.mp4)

</details>

## ✨ Features

- **🤖 AI-Powered Analysis**: Leverages Azure OpenAI to analyze git diffs and identify potential causes of production issues
- **📊 Git Integration**: Seamlessly works with your git repository to fetch and analyze commits
- **🎯 Targeted Analysis**: Focuses on relevant file types (.ts, .js, .py, .java, .cpp, .cs, .go, .rb, .php, .yaml, .yml, .json)
- **📝 Detailed Reports**: Generates comprehensive markdown reports with:
  - Issue summary
  - AI analysis results
  - Suggested code fixes with diff formatting
  - Quick action commands
- **🔐 Secure Configuration**: Safely stores Azure OpenAI credentials using VS Code's secure storage
- **💾 Persistent Results**: Saves analysis results as markdown files for future reference

## 📋 Prerequisites

- VS Code version 1.100.0 or higher
- A git repository in your workspace
- Azure OpenAI account with:
  - API key
  - Endpoint URL
  - Deployment name (e.g., `gpt-4o-mini`)

## 🚀 Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "AI Crash Finder"
4. Click Install

Or install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher.ai-crash-finder)

## 🔧 Configuration

### First-time Setup

1. Run the command: `AI Crash Finder: Configure Azure OpenAI`
2. Enter your Azure OpenAI credentials:
   - **Endpoint**: Your Azure OpenAI endpoint (e.g., `https://your-resource.openai.azure.com/`)
   - **API Key**: Your Azure OpenAI API key
   - **Deployment**: Your model deployment name (e.g., `gpt-4o-mini`)

### Environment Variables (Optional)

You can also set credentials via environment variables:
```bash
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
export AZURE_OPENAI_API_KEY="your-api-key"
export AZURE_OPENAI_DEPLOYMENT="gpt-4o-mini"
```

## 📖 Usage

### Analyzing an Issue

1. Open a git repository in VS Code
2. Run command: `AI Crash Finder: Analyze Issue` (or `AI: Analyze Issue from Git Diff`)
3. Select the starting commit (older commit)
4. Select the ending commit (newer commit)
5. Describe the production issue (e.g., "Users cannot login after 5pm")
6. Wait for the AI analysis to complete
7. Review the generated markdown report

### Available Commands

| Command | Description |
|---------|-------------|
| `AI Crash Finder: Analyze Issue` | Start the analysis workflow |
| `AI Crash Finder: Configure Azure OpenAI` | Set up or update Azure OpenAI credentials |
| `AI Crash Finder: Clear Configuration` | Remove stored credentials |
| `AI Crash Finder: Open Results Folder` | Open the folder containing analysis reports |

## 📄 Output Format

The extension generates detailed markdown reports with:

### 1. Summary Section
- Analysis timestamp
- Commit range
- Issue description

### 2. AI Analysis
- Identified problematic files and line numbers
- Root cause analysis
- Reasoning behind the findings

### 3. Code Suggestions
```diff
# Example of suggested fixes
- const query = `SELECT * FROM users WHERE id = ${userId}`;  // remove: SQL injection vulnerability
+ const query = 'SELECT * FROM users WHERE id = ?';          // add: parameterized query
+ const result = await db.query(query, [userId]);            // add: safe execution
```

### 4. Quick Actions
- Git commands to view full diffs
- Commands to checkout specific commits
- Links to relevant documentation

## 🏗️ Architecture

```
ai-crash-finder/
├── src/
│   ├── commands/       # Command handlers
│   ├── config/         # Configuration management
│   ├── git/           # Git integration
│   ├── llm/           # Azure OpenAI client
│   └── ui/            # Result display
├── icon.png           # Extension icon
└── package.json       # Extension manifest
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- The extension requires an active git repository in the workspace
- Large diffs may exceed token limits for AI analysis
- Only analyzes specific file types (configurable in future versions)

## 📅 Roadmap

- [ ] Support for custom file type filters
- [ ] Integration with other AI providers (OpenAI, Anthropic)
- [ ] Batch analysis of multiple commit ranges
- [ ] Export reports in different formats (PDF, HTML)
- [ ] Team collaboration features
- [ ] CI/CD pipeline integration

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- Powered by [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- Git integration via [simple-git](https://github.com/steveukx/git-js)

## 📞 Support

- 🐛 [Report Issues](https://github.com/yourusername/ai-crash-finder/issues)
- 💬 [Discussions](https://github.com/yourusername/ai-crash-finder/discussions)
- 📧 Email: support@aicrashfinder.com

---

Made with ❤️ by [Your Name]
