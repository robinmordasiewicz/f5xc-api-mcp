# Claude Desktop Setup

Configure the F5XC API MCP Server with Claude Desktop.

!!! note "Prerequisites"
    - [Claude Desktop](https://claude.ai/download) installed
    - Node.js 18+ installed (for npx)

## Configuration

### Step 1: Locate Config File

=== "macOS"

    ```text
    ~/Library/Application Support/Claude/claude_desktop_config.json
    ```

=== "Windows"

    ```text
    %APPDATA%\Claude\claude_desktop_config.json
    ```

=== "Linux"

    ```text
    ~/.config/Claude/claude_desktop_config.json
    ```

### Step 2: Add MCP Server

Edit the config file and add the F5XC API server:

=== "Documentation Mode (No Auth)"

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

=== "Docker"

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "docker",
          "args": [
            "run", "-i", "--rm",
            "-e", "F5XC_API_URL=https://your-tenant.console.ves.volterra.io",
            "-e", "F5XC_API_TOKEN=your-api-token",
            "ghcr.io/robinmordasiewicz/f5xc-api-mcp"
          ]
        }
      }
    }
    ```

### Step 3: Restart Claude Desktop

!!! warning "Full Restart Required"
    Completely quit and restart Claude Desktop for changes to take effect.
    Just closing the window is not sufficient.

## Verification

After restart, Claude should have access to F5XC tools. Try asking:

> "What F5XC API tools are available?"

Or check the server info:

> "Get the F5XC API server info"

## Multiple MCP Servers

You can run multiple MCP servers alongside F5XC:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

## Troubleshooting

### Server Not Loading

1. Check the config file is valid JSON (use a JSON validator)
2. Ensure the file path is correct for your OS
3. Completely quit Claude Desktop (not just close window)
4. Check Console.app (macOS) or Event Viewer (Windows) for errors

### Authentication Issues

!!! tip "Verify Credentials First"
    Test your credentials work before configuring:
    ```bash
    curl -H "Authorization: APIToken $F5XC_API_TOKEN" \
      https://your-tenant.console.ves.volterra.io/api/web/namespaces
    ```

1. Verify your API URL is correct
2. Check your API token hasn't expired
3. For P12 certificates, verify the file path is absolute
4. Ensure the password is correct

### npx Issues

If npx fails to find the package:

```bash
# Clear npx cache
npx clear-npx-cache

# Or use full package path
npx -y f5xc-api-mcp
```

## Advanced Configuration

### Custom Node Path

If Node.js isn't in your PATH:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "/usr/local/bin/node",
      "args": ["/path/to/f5xc-api-mcp/dist/index.js"]
    }
  }
}
```

### Logging

Enable debug logging:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"],
      "env": {
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

## Next Steps

- [Authentication Configuration](../configuration/authentication.md)
- [Tools Reference](../tools/index.md)
- [Workflow Prompts](../tools/index.md#prompts)
