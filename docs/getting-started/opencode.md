# Configure F5XC API MCP Server with OpenCode AI Assistant

Configure the F5XC API MCP Server with OpenCode AI Assistant for natural language interaction with F5XC APIs.

!!! note "Prerequisites"
    - [OpenCode AI Assistant](https://opencode.ai) installed
    - Node.js 24+ installed (for npx)

## Configuration

### Step 1: Locate Config File

OpenCode uses MCP configuration files. The location depends on your setup:

=== "Project Configuration"

    ```text
    .opencode/mcp.json
    ```

=== "Global Configuration"

    ```text
    ~/.opencode/mcp.json
    ```

Create the configuration directory and file if they don't exist:

```bash
mkdir -p .opencode
```

### Step 2: Add MCP Server

Edit the config file and add the F5XC API server:

=== "Documentation Mode (No Auth)"

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

### Step 3: Restart OpenCode

!!! warning "Full Restart Required"
    Completely quit and restart OpenCode AI Assistant for changes to take effect.
    Just refreshing the interface is not sufficient.

## Verification

After restart, OpenCode should have access to F5XC tools. Try asking:

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
      "args": ["@robinmordasiewicz/f5xc-api-mcp"]
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
2. Ensure the file path is correct for your OpenCode setup
3. Completely quit OpenCode AI Assistant (not just close window)
4. Check OpenCode logs for errors

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
npx -y @robinmordasiewicz/f5xc-api-mcp
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
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
      "env": {
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```
