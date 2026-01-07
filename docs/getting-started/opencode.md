# Configure F5XC API MCP Server with OpenCode AI Assistant

Configure the F5XC API MCP Server with OpenCode AI Assistant for natural language interaction with F5XC APIs.

!!! note "Prerequisites"
    - [OpenCode AI Assistant](https://opencode.ai) installed
    - Node.js 24+ installed (for npx)

## Configuration

### Step 1: Locate Config File

OpenCode uses `opencode.json` or `opencode.jsonc` configuration files:

=== "Project Configuration"

    ```text
    opencode.json
    ```

    (in your project root directory)

=== "Global Configuration"

    ```text
    ~/.config/opencode/opencode.json
    ```

### Step 2: Add MCP Server

Edit the config file and add the F5XC API server under the `mcp` key:

=== "Documentation Mode (No Auth)"

    ```json
    {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "f5xc-api": {
          "type": "local",
          "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"]
        }
      }
    }
    ```

=== "With API Token"

    ```json
    {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "f5xc-api": {
          "type": "local",
          "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"],
          "environment": {
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
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "f5xc-api": {
          "type": "local",
          "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"],
          "environment": {
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
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "f5xc-api": {
          "type": "local",
          "command": [
            "docker", "run", "-i", "--rm",
            "-e", "F5XC_API_URL=https://your-tenant.console.ves.volterra.io",
            "-e", "F5XC_API_TOKEN=your-api-token",
            "ghcr.io/robinmordasiewicz/f5xc-api-mcp"
          ]
        }
      }
    }
    ```

!!! tip "Adding to Existing Config"
    If you already have an `opencode.json` with other settings, add the `mcp` section alongside your existing configuration:

    ```json
    {
      "$schema": "https://opencode.ai/config.json",
      "provider": { ... },
      "plugin": [ ... ],
      "mcp": {
        "f5xc-api": {
          "type": "local",
          "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"]
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
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "f5xc-api": {
      "type": "local",
      "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"]
    },
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

## Configuration Reference

### Required Fields

| Field | Description |
|-------|-------------|
| `type` | Must be `"local"` for stdio-based MCP servers |
| `command` | Array of command and arguments (e.g., `["npx", "package-name"]`) |

### Optional Fields

| Field | Description | Default |
|-------|-------------|---------|
| `environment` | Object with environment variables | `{}` |
| `enabled` | Whether to load the server on startup | `true` |
| `timeout` | Response timeout in milliseconds | `5000` |

## Troubleshooting

### Server Not Loading

1. Validate JSON syntax (use a JSON validator or `.jsonc` for comments)
2. Ensure `type: "local"` is specified
3. Verify `command` is an array, not a string
4. Completely quit OpenCode (not just close window)
5. Check OpenCode logs for errors

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

# Or use -y flag to auto-confirm
npx -y @robinmordasiewicz/f5xc-api-mcp
```

## Advanced Configuration

### Custom Node Path

If Node.js isn't in your PATH:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "f5xc-api": {
      "type": "local",
      "command": ["/usr/local/bin/node", "/path/to/f5xc-api-mcp/dist/index.js"]
    }
  }
}
```

### Logging

Enable debug logging:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "f5xc-api": {
      "type": "local",
      "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"],
      "environment": {
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

### Environment Variable References

OpenCode supports environment variable references using `{env:VAR_NAME}` syntax:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "f5xc-api": {
      "type": "local",
      "command": ["npx", "@robinmordasiewicz/f5xc-api-mcp"],
      "environment": {
        "F5XC_API_URL": "{env:F5XC_API_URL}",
        "F5XC_API_TOKEN": "{env:F5XC_API_TOKEN}"
      }
    }
  }
}
```
