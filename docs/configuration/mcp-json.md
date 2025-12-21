# MCP Configuration Reference

Complete reference for MCP server configuration files.

## Configuration File Locations

| Application | Location |
|-------------|----------|
| Claude Desktop (macOS) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Windows) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Claude Desktop (Linux) | `~/.config/Claude/claude_desktop_config.json` |
| Claude Code (Project) | `.mcp.json` in project root |
| Claude Code (Global) | `~/.claude/mcp.json` |
| VS Code (Cline) | Cline extension settings |
| VS Code (Continue) | `~/.continue/config.json` |
| Cursor | Cursor settings or `.cursor/mcp.json` |

## Configuration Schema

```json
{
  "mcpServers": {
    "<server-name>": {
      "command": "<executable>",
      "args": ["<arg1>", "<arg2>"],
      "env": {
        "<VAR_NAME>": "<value>"
      },
      "cwd": "<working-directory>",
      "envFile": "<path-to-env-file>"
    }
  }
}
```

## Field Reference

### `command` (required)

The executable to run. Examples:

- `"npx"` - Run via npx
- `"node"` - Run with Node.js directly
- `"docker"` - Run in Docker container
- `"/usr/local/bin/node"` - Absolute path to Node.js

### `args` (required)

Array of command-line arguments:

```json
{
  "args": ["f5xc-api-mcp"]
}
```

For Docker:

```json
{
  "args": ["run", "-i", "--rm", "ghcr.io/robinmordasiewicz/f5xc-api-mcp"]
}
```

### `env` (optional)

Environment variables passed to the server:

```json
{
  "env": {
    "F5XC_API_URL": "https://tenant.console.ves.volterra.io",
    "F5XC_API_TOKEN": "token-value",
    "LOG_LEVEL": "debug"
  }
}
```

### `cwd` (optional)

Working directory for the server process:

```json
{
  "cwd": "/path/to/working/directory"
}
```

### `envFile` (optional)

Path to environment file:

```json
{
  "envFile": "${workspaceFolder}/.env"
}
```

## Complete Examples

### Minimal (Documentation Mode)

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

### With API Token

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

### With API Token (Using Environment Variables)

For better security, reference environment variables instead of hardcoding:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "${env:F5XC_API_URL}",
        "F5XC_API_TOKEN": "${env:F5XC_API_TOKEN}"
      }
    }
  }
}
```

The values will be resolved from your system environment variables:

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
export F5XC_API_TOKEN="your-api-token"
```

### With P12 Certificate

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
        "F5XC_P12_FILE": "/Users/username/certs/f5xc.p12",
        "F5XC_P12_PASSWORD": "certificate-password"
      }
    }
  }
}
```

### With P12 Certificate (Using Environment Variables)

For better security with certificates:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "${env:F5XC_API_URL}",
        "F5XC_P12_FILE": "${env:F5XC_P12_FILE}",
        "F5XC_P12_PASSWORD": "${env:F5XC_P12_PASSWORD}"
      }
    }
  }
}
```

With environment variables set:

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
export F5XC_P12_FILE="/Users/username/certs/f5xc.p12"
export F5XC_P12_PASSWORD="certificate-password"
```

### Docker with Volume Mount

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "F5XC_API_URL",
        "-e", "F5XC_API_TOKEN",
        "-v", "/Users/username/certs:/certs:ro",
        "ghcr.io/robinmordasiewicz/f5xc-api-mcp"
      ],
      "env": {
        "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
        "F5XC_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Using Environment File

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
      "envFile": "${workspaceFolder}/.env.f5xc"
    }
  }
}
```

With `.env.f5xc`:

```bash
F5XC_API_URL=https://your-tenant.console.ves.volterra.io
F5XC_API_TOKEN=your-api-token
LOG_LEVEL=info
```

### Multiple MCP Servers

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["@robinmordasiewicz/f5xc-api-mcp"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/allowed/path"]
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

## Variable Substitution

Some clients support variable substitution:

| Variable | Description |
|----------|-------------|
| `${workspaceFolder}` | Current workspace root |
| `${env:VAR_NAME}` | System environment variable |
| `${userHome}` | User's home directory |

Example:

```json
{
  "envFile": "${workspaceFolder}/.env",
  "env": {
    "F5XC_API_TOKEN": "${env:F5XC_API_TOKEN}"
  }
}
```

## Validation

### JSON Syntax

Use a JSON validator or editor with JSON support. Common issues:

- Trailing commas (not allowed in JSON)
- Missing quotes around strings
- Unescaped special characters in values

### Path Validation

- Use absolute paths for `F5XC_P12_FILE`
- Verify files exist and are readable
- Check permissions on certificate files

## Troubleshooting

### Configuration Not Loading

1. Validate JSON syntax
2. Check file location matches your application
3. Restart the application after changes

### Server Not Starting

1. Test command manually: `npx @robinmordasiewicz/f5xc-api-mcp`
2. Check Node.js version: `node --version`
3. Verify npx is available: `which npx`

### Environment Variables Not Set

1. Check for typos in variable names
2. Ensure values don't contain unescaped characters
3. Try hardcoding values temporarily to test

## Next Steps

- [Environment Variables](environment-variables.md)
- [Authentication](authentication.md)
- [Troubleshooting FAQ](../troubleshooting/faq.md)
