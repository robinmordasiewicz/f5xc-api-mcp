# Installation

Multiple ways to install and run the F5XC API MCP Server.

## System Requirements

- **Node.js**: 18.0 or higher (for npm/npx installation)
- **Docker**: 20.10 or higher (for container installation)
- **Operating System**: macOS, Linux, or Windows

## Installation Methods

### MCPB Bundle (Claude Desktop - Easiest)

The simplest way to install for Claude Desktop users. No terminal required.

1. Download the latest `.mcpb` file from [GitHub Releases](https://github.com/robinmordasiewicz/f5xc-api-mcp/releases)
2. Double-click the file or drag it into Claude Desktop
3. Click **Install**
4. Configure your F5XC credentials when prompted (optional - runs in documentation mode without)

That's it! The extension is now available in Claude Desktop.

!!! tip "Drag and Drop Installation"
    You can also drag the `.mcpb` file directly into the Claude Desktop window to install it.

### npx (Recommended for CLI)

The easiest way to run the server from command line. No installation required.

```bash
npx @robinmordasiewicz/f5xc-api-mcp
```

This downloads and runs the latest version automatically.

### npm Global Install

Install globally for faster startup on repeated use:

```bash
npm install -g @robinmordasiewicz/f5xc-api-mcp
```

Then run:

```bash
f5xc-api-mcp
```

### Docker

Pull from GitHub Container Registry:

```bash
docker pull ghcr.io/robinmordasiewicz/f5xc-api-mcp:latest
```

Or from Docker Hub:

```bash
docker pull robinmordasiewicz/f5xc-api-mcp:latest
```

Run the container:

```bash
docker run -it ghcr.io/robinmordasiewicz/f5xc-api-mcp
```

With environment variables:

```bash
docker run -it \
  -e F5XC_API_URL=https://your-tenant.console.ves.volterra.io \
  -e F5XC_API_TOKEN=your-token \
  ghcr.io/robinmordasiewicz/f5xc-api-mcp
```

### From Source

Clone and build from source:

```bash
git clone https://github.com/robinmordasiewicz/f5xc-api-mcp.git
cd f5xc-api-mcp
npm install
npm run build
npm start
```

## Version Selection

### Latest Stable

```bash
npx @robinmordasiewicz/f5xc-api-mcp@latest
```

### Specific Version

```bash
npx @robinmordasiewicz/f5xc-api-mcp@3.0.0
```

### Docker Tags

| Tag | Description |
|-----|-------------|
| `latest` | Latest stable release |
| `1.0.0` | Specific version |
| `1.0` | Latest patch of minor version |
| `1` | Latest minor of major version |

## Verifying Installation

Run the server and check the output:

```bash
npx @robinmordasiewicz/f5xc-api-mcp --version
```

Or test with a simple MCP connection:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"capabilities":{}}}' | npx @robinmordasiewicz/f5xc-api-mcp
```

## Troubleshooting

### Node.js Version Issues

Check your Node.js version:

```bash
node --version
```

If below 18.0, upgrade using:

=== "macOS (Homebrew)"

    ```bash
    brew install node@20
    ```

=== "Linux (nvm)"

    ```bash
    nvm install 20
    nvm use 20
    ```

=== "Windows"

    Download from [nodejs.org](https://nodejs.org/)

### Permission Issues

If you get permission errors with global install:

```bash
npm install -g @robinmordasiewicz/f5xc-api-mcp --unsafe-perm
```

Or use a Node version manager like nvm.

### Docker Issues

If the container won't start, check Docker is running:

```bash
docker info
```

For permission issues on Linux:

```bash
sudo usermod -aG docker $USER
```

Then log out and back in.

## Next Steps

- [Claude Desktop Setup](claude-desktop.md)
- [Claude Code Setup](claude-code.md)
- [VS Code Setup](vscode.md)
- [Authentication Configuration](../configuration/authentication.md)
