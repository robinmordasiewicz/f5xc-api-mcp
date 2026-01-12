# F5XC API MCP Server

An MCP server exposing F5 Distributed Cloud APIs to AI assistants like Claude.

## Features

- **1,500+ API Tools** - Full F5XC API coverage across 23 domains
- **Dynamic Discovery** - 6 meta-tools with 95%+ token savings
- **Dual-Mode** - Works with or without authentication
- **CURL Examples** - API documentation with ready-to-use commands

## Requirements

| Component | Version |
|-----------|---------|
| Node.js | 24.0+ (for npm/npx) |
| Docker | 20.10+ (alternative) |

## Installation

=== "MCPB Bundle (Claude Desktop)"

    1. Download `.mcpb` from [GitHub Releases](https://github.com/robinmordasiewicz/f5xc-api-mcp/releases)
    2. Double-click or drag into Claude Desktop
    3. Click **Install**

=== "npx"

    ```bash
    npx @robinmordasiewicz/f5xc-api-mcp
    ```

=== "npm Global"

    ```bash
    npm install -g @robinmordasiewicz/f5xc-api-mcp
    f5xc-api-mcp
    ```

=== "Docker"

    ```bash
    docker pull ghcr.io/robinmordasiewicz/f5xc-api-mcp:latest
    docker run -it ghcr.io/robinmordasiewicz/f5xc-api-mcp
    ```

=== "From Source"

    ```bash
    git clone https://github.com/robinmordasiewicz/f5xc-api-mcp.git
    cd f5xc-api-mcp
    npm install && npm run build && npm start
    ```

## IDE Configuration

Configure your AI assistant to use the MCP server:

| IDE | Config File | Guide |
|-----|-------------|-------|
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` | [Setup](getting-started/claude-desktop.md) |
| Claude Code | `.mcp.json` (project root) | [Setup](getting-started/claude-cli.md) |
| VS Code | Via Cline/Continue extensions | [Setup](getting-started/vscode.md) |
| Cursor | MCP settings | [Setup](getting-started/cursor.md) |
| OpenCode | `opencode.json` | [Setup](getting-started/opencode.md) |

**Basic MCP configuration:**

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"]
    }
  }
}
```

## Operating Modes

### Documentation Mode (Default)

Works without credentials. Explore the API, view schemas, and get CURL examples.

### Execution Mode

Add credentials to execute API calls directly:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
        "F5XC_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

See [Authentication](configuration/authentication.md) for P12 certificate and other options.

## Verification

Test the installation:

```bash
npx @robinmordasiewicz/f5xc-api-mcp --version
```

Or verify MCP protocol:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"capabilities":{}}}' | npx @robinmordasiewicz/f5xc-api-mcp
```

## Troubleshooting

**Node.js version too old:**

```bash
node --version  # Must be 24+
# macOS: brew install node@24
# Linux: nvm install 24 && nvm use 24
```

**npm permission errors:**

```bash
npm install -g @robinmordasiewicz/f5xc-api-mcp --unsafe-perm
```

**Docker not running:**

```bash
docker info  # Verify Docker is running
```
