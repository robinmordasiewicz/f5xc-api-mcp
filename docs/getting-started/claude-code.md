# Claude Code Setup

Configure the F5XC API MCP Server with Claude Code CLI.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/claude-code) installed
- Node.js 18+ installed (for npx)

## Configuration

### Project-Level Configuration

Create `.mcp.json` in your project root:

=== "Documentation Mode"

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

=== "With API Token"

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

=== "With P12 Certificate"

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

### Global Configuration

For system-wide availability, add to `~/.claude/mcp.json`:

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

## Usage

### List Available Tools

```bash
claude-code mcp list-tools
```

### Interactive Mode

Start Claude Code and ask about F5XC:

```bash
claude-code
```

Then:

> "Show me the available F5XC API operations"

### Direct Tool Calls

```bash
claude-code --tool f5xc-api-server-info
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
      "args": ["f5xc-api-mcp"]
    }
  }
}
```

## Integration with Workflows

### Infrastructure as Code Workflow

```bash
# Start Claude Code in your Terraform project
cd example-terraform-project
claude-code

# Ask Claude to help with F5XC resources
```

> "Generate Terraform for an HTTP load balancer at api.example.com"

### f5xcctl Integration

> "Show me the f5xcctl commands to deploy this load balancer configuration"

## Troubleshooting

### MCP Server Not Found

1. Check `.mcp.json` is in your current directory or parent
2. Verify JSON syntax is valid
3. Run `claude-code mcp list-servers` to see configured servers

### Connection Issues

Enable verbose logging:

```bash
claude-code --verbose mcp list-tools
```

### Tool Execution Errors

Check the server is responding:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | npx f5xc-api-mcp
```

## Next Steps

- [Authentication Configuration](../configuration/authentication.md)
- [Tools Reference](../tools/index.md)
- [f5xcctl Integration](../integrations/f5xcctl.md)
