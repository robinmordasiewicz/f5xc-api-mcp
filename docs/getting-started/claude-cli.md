# Claude Code CLI Setup

Configure the F5XC API MCP Server with Claude Code CLI.

## Prerequisites

- [Claude Code](https://code.claude.com/docs) installed
- Node.js 24+ installed (for npx)

## Quick Install with `claude mcp add`

The fastest way to add the F5XC API MCP server:

=== "Documentation Mode"

    ```bash
    claude mcp add --transport stdio f5xc-api -- npx @robinmordasiewicz/f5xc-api-mcp
    ```

=== "With API Token"

    ```bash
    claude mcp add --transport stdio f5xc-api \
      --env F5XC_API_URL=https://your-tenant.console.ves.volterra.io \
      --env F5XC_API_TOKEN=your-api-token \
      -- npx @robinmordasiewicz/f5xc-api-mcp
    ```

=== "With P12 Certificate"

    ```bash
    claude mcp add --transport stdio f5xc-api \
      --env F5XC_API_URL=https://your-tenant.console.ves.volterra.io \
      --env F5XC_P12_BUNDLE=/path/to/certificate.p12 \
      --env F5XC_P12_PASSWORD=your-password \
      -- npx @robinmordasiewicz/f5xc-api-mcp
    ```

=== "User Scope (All Projects)"

    ```bash
    claude mcp add --transport stdio f5xc-api --scope user \
      -- npx @robinmordasiewicz/f5xc-api-mcp
    ```

### Scope Options

| Scope | Flag | Storage Location | Use Case |
|-------|------|------------------|----------|
| Local | `--scope local` | `.mcp.json` (gitignored) | Default, private to you |
| Project | `--scope project` | `.mcp.json` (committed) | Share with team |
| User | `--scope user` | `~/.claude.json` | Available in all projects |

### Managing MCP Servers

```bash
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get f5xc-api

# Remove a server
claude mcp remove f5xc-api
```

---

## Manual Configuration (Alternative)

If you prefer manual configuration, create `.mcp.json` in your project root:

=== "Documentation Mode"

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

=== "With API Token"

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

=== "With P12 Certificate"

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "npx",
          "args": ["@robinmordasiewicz/f5xc-api-mcp"],
          "env": {
            "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
            "F5XC_P12_BUNDLE": "/path/to/certificate.p12",
            "F5XC_P12_PASSWORD": "your-password"
          }
        }
      }
    }
    ```

### Global Configuration

For system-wide availability, add to `~/.claude/settings.local.json`:

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

## Usage

### List Available MCP Servers

```bash
claude mcp list
```

### Interactive Mode

Start Claude Code and ask about F5XC:

```bash
claude
```

Then:

> "Show me the available F5XC API operations"

### Direct Commands

Use prompts directly from the command line:

```bash
claude -p "What F5XC tools are available?"
```

## Environment Variables

Instead of hardcoding credentials in config, use environment variables:

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
export F5XC_API_TOKEN="your-api-token"
```

Then use a simpler config:

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

## Integration with Workflows

### Example Workflow

```bash
# Start Claude Code in your project
cd my-project
claude

# Ask Claude to help with F5XC resources
```

> "Show me how to create an HTTP load balancer at api.example.com"

> "What CURL commands do I need to list all origin pools?"

## Troubleshooting

### MCP Server Not Found

1. Check `.mcp.json` is in your current directory or parent
2. Verify JSON syntax is valid
3. Run `claude mcp list` to see configured servers

### Connection Issues

Enable MCP debug logging:

```bash
claude --mcp-debug
```

### Tool Execution Errors

Check the server is responding:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | npx @robinmordasiewicz/f5xc-api-mcp
```

## Next Steps

- [Authentication Configuration](../configuration/authentication.md)
- [Tools Reference](../tools/index.md)
