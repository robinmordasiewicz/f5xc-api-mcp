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

=== "Claude Desktop"

    ### Config File Location

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

    ### Configuration

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

    !!! warning "Full Restart Required"
        Completely quit and restart Claude Desktop for changes to take effect.
        Just closing the window is not sufficient.

    ### Multiple Servers

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "npx",
          "args": ["@robinmordasiewicz/f5xc-api-mcp"]
        },
        "filesystem": {
          "command": "npx",
          "args": ["@modelcontextprotocol/server-filesystem", "/path/to/dir"]
        }
      }
    }
    ```

=== "Claude Code CLI"

    ### Quick Install

    ```bash
    claude mcp add f5xc-api \
      --env F5XC_API_URL=https://your-tenant.console.ves.volterra.io \
      --env F5XC_API_TOKEN=your-api-token \
      -- npx @robinmordasiewicz/f5xc-api-mcp
    ```

    ### Scope Options

    | Scope | Flag | Storage | Use Case |
    |-------|------|---------|----------|
    | Local | `--scope local` | `~/.claude.json` (project-scoped) | Default, private to you |
    | Project | `--scope project` | `.mcp.json` (in project root) | Share with team |
    | User | `--scope user` | `~/.claude.json` (global) | All projects |

    ### Management Commands

    ```bash
    claude mcp list              # List all servers
    claude mcp get f5xc-api      # Get server details
    claude mcp remove f5xc-api   # Remove server
    ```

    ### Manual Configuration

    Create `.mcp.json` in your project root:

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

    ### Global Configuration

    For system-wide availability, add to `~/.claude/settings.local.json`.

    ### Usage

    ```bash
    claude                           # Interactive mode
    claude -p "List F5XC tools"      # Direct command
    claude --mcp-debug               # Debug mode
    ```

=== "VS Code"

    VS Code supports MCP through **Cline** or **Continue** extensions.

    ### Option 1: Cline

    1. Install [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
    2. Open Cline panel → Click gear icon → MCP Servers → Add
    3. Or edit config file directly:

    === "macOS"

        ```text
        ~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
        ```

    === "Windows"

        ```text
        %APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
        ```

    === "Linux"

        ```text
        ~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
        ```

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

    ### Option 2: Continue

    1. Install [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
    2. Edit `~/.continue/config.json`:

    ```json
    {
      "models": [],
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

    ### Workspace Configuration

    Create `.vscode/mcp.json` for project-specific settings:

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "npx",
          "args": ["@robinmordasiewicz/f5xc-api-mcp"],
          "envFile": "${workspaceFolder}/.env"
        }
      }
    }
    ```

    !!! tip "Secure Credentials"
        Store credentials in `.env` and add to `.gitignore`:
        ```bash
        F5XC_API_URL=https://your-tenant.console.ves.volterra.io
        F5XC_API_TOKEN=your-api-token
        ```

=== "Cursor"

    ### Configuration

    1. Open Cursor Settings (`Cmd/Ctrl + ,`)
    2. Navigate to MCP section
    3. Add configuration:

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

    !!! warning "Full Restart Required"
        Restart Cursor completely (quit and reopen) for changes to take effect.

    ### Project Configuration

    Create `.cursor/mcp.json` with environment variable references:

    ```json
    {
      "mcpServers": {
        "f5xc-api": {
          "command": "npx",
          "args": ["@robinmordasiewicz/f5xc-api-mcp"],
          "env": {
            "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
            "F5XC_API_TOKEN": "${env:F5XC_API_TOKEN}"
          }
        }
      }
    }
    ```

    ### Composer Integration

    Use Cursor's Composer (`Cmd/Ctrl + I`) for multi-resource generation:

    > "Create a complete F5XC setup with HTTP load balancer, origin pool, and WAF"

=== "OpenCode"

    !!! note "Different Configuration Schema"
        OpenCode uses `"mcp"` (not `"mcpServers"`), `"command"` as array, and `"environment"` (not `"env"`).

    ### Config File Location

    === "Project"

        ```text
        opencode.json (in project root)
        ```

    === "Global"

        ```text
        ~/.config/opencode/opencode.json
        ```

    ### Configuration

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

    !!! warning "Full Restart Required"
        Completely quit and restart OpenCode for changes to take effect.

    ### Configuration Reference

    | Field | Required | Description |
    |-------|----------|-------------|
    | `type` | Yes | Must be `"local"` for stdio-based servers |
    | `command` | Yes | Array format: `["npx", "package"]` |
    | `environment` | No | Environment variables object |
    | `enabled` | No | Load on startup (default: `true`) |
    | `timeout` | No | Response timeout in ms (default: `5000`) |

    ### Environment Variable References

    ```json
    {
      "environment": {
        "F5XC_API_URL": "{env:F5XC_API_URL}",
        "F5XC_API_TOKEN": "{env:F5XC_API_TOKEN}"
      }
    }
    ```

## Authentication

### Operating Modes

**Documentation Mode** (Default): Works without credentials. Explore APIs, view schemas, get CURL examples.

**Execution Mode**: Add credentials to execute API calls directly.

### Methods

=== "API Token"

    1. Get token from F5XC Console → Administration → Personal Management → Credentials
    2. Set environment variables:

    ```bash
    export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
    export F5XC_API_TOKEN="your-api-token"
    ```

=== "P12 Certificate"

    1. Download P12 from F5XC Console → Administration → Personal Management → Credentials
    2. Set environment variables:

    ```bash
    export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
    export F5XC_P12_BUNDLE="/absolute/path/to/certificate.p12"
    export F5XC_P12_PASSWORD="your-password"
    ```

    !!! warning "Use Absolute Paths"
        P12 certificate paths must be absolute, not relative.

=== "Docker with Auth"

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

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `F5XC_API_URL` | For auth | Tenant URL (e.g., `https://tenant.console.ves.volterra.io`) |
| `F5XC_API_TOKEN` | Token auth | API token from F5XC Console |
| `F5XC_P12_BUNDLE` | Cert auth | Absolute path to P12 certificate |
| `F5XC_P12_PASSWORD` | Cert auth | P12 certificate password |
| `LOG_LEVEL` | No | Logging level: `debug`, `info`, `warn`, `error` |

See [Authentication Configuration](configuration/authentication.md) for advanced options.

## Verification

### Command Line

```bash
npx @robinmordasiewicz/f5xc-api-mcp --version
```

### MCP Protocol Test

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"capabilities":{}}}' | npx @robinmordasiewicz/f5xc-api-mcp
```

### In Your IDE

Ask Claude:

> "What F5XC API tools are available?"

> "Get the F5XC API server info"

## Troubleshooting

### Node.js Issues

```bash
node --version  # Must be 24+
# macOS: brew install node@24
# Linux: nvm install 24 && nvm use 24
```

### npx Cache Issues

```bash
npx clear-npx-cache
npx -y @robinmordasiewicz/f5xc-api-mcp
```

### Configuration Issues

1. Validate JSON syntax (use a JSON validator)
2. Ensure file path is correct for your OS
3. Completely restart application (not just close window)

### Authentication Issues

Test credentials first:

```bash
curl -H "Authorization: APIToken $F5XC_API_TOKEN" \
  https://your-tenant.console.ves.volterra.io/api/web/namespaces
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` | Network issue | Check URL and connectivity |
| `401 Unauthorized` | Invalid credentials | Refresh token |
| `403 Forbidden` | Insufficient permissions | Check RBAC settings |

## Next Steps

- [Tools Reference](tools/index.md) - Explore available API tools
- [Authentication Configuration](configuration/authentication.md) - Advanced auth options
- [Security Best Practices](security.md) - Credential management
- [GitHub Issues](https://github.com/robinmordasiewicz/f5xc-api-mcp/issues) - Report bugs or request features
