# Quick Start

Get the F5XC API MCP Server running in 5 minutes.

## Prerequisites

- Node.js 18+ (for npx) OR Docker
- An MCP-compatible AI assistant (Claude Desktop, Claude Code, VS Code, etc.)

## Step 1: Choose Your Installation

=== "npx (Easiest)"

    No installation required. The server runs directly via npx.

    ```bash
    npx f5xc-api-mcp
    ```

=== "Docker"

    Pull and run the container:

    ```bash
    docker run -it ghcr.io/robinmordasiewicz/f5xc-api-mcp
    ```

=== "npm Global"

    Install globally for repeated use:

    ```bash
    npm install -g f5xc-api-mcp
    f5xc-api-mcp
    ```

## Step 2: Configure Your AI Assistant

### Claude Desktop

Add to your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"]
    }
  }
}
```

### Claude Code

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"]
    }
  }
}
```

## Step 3: Verify Installation

Restart your AI assistant and ask:

> "What F5XC tools are available?"

You should see a response listing the available tools, resources, and prompts.

## Step 4: (Optional) Enable API Execution

To execute API calls directly (not just documentation), set credentials:

=== "API Token"

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "npx",
          "args": ["f5xc-api-mcp"],
          "env": {
            "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
            "F5XC_API_TOKEN": "your-api-token"
          }
        }
      }
    }
    ```

=== "P12 Certificate"

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "npx",
          "args": ["f5xc-api-mcp"],
          "env": {
            "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
            "F5XC_P12_FILE": "/path/to/certificate.p12",
            "F5XC_P12_PASSWORD": "your-password"
          }
        }
      }
    }
    ```

## Try It Out

Once configured, try these example prompts:

### Documentation Mode (No Auth)

> "Show me how to create an HTTP load balancer in F5XC"

> "What's the Terraform resource for an origin pool?"

> "Give me the f5xcctl command to list namespaces"

### Execution Mode (With Auth)

> "List all HTTP load balancers in the 'production' namespace"

> "Create an origin pool pointing to 10.0.0.1:8080"

> "Get the status of the 'example-app' load balancer"

## Next Steps

- [Detailed Installation](getting-started/installation.md) - All installation options
- [Authentication Guide](configuration/authentication.md) - Configure credentials
- [Tools Reference](tools/index.md) - Browse all available tools
- [Workflow Prompts](tools/index.md#prompts) - Guided multi-step operations
