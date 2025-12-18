# VS Code Setup

Configure the F5XC API MCP Server with VS Code using Cline or Continue extensions.

!!! note "Prerequisites"
    - VS Code installed
    - Node.js 18+ installed (for npx)
    - Cline or Continue extension installed

## Option 1: Cline Extension

[Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) provides Claude
integration with MCP support.

### Installation

1. Install Cline from VS Code Marketplace
2. Open VS Code Settings (`Cmd/Ctrl + ,`)
3. Search for "Cline MCP"

### Configuration

Add to Cline's MCP settings:

```json
{
  "f5xc-api": {
    "command": "npx",
    "args": ["f5xc-api-mcp"],
    "env": {
      "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
      "F5XC_API_TOKEN": "your-api-token"
    }
  }
}
```

### Usage

1. Open Cline panel (`Cmd/Ctrl + Shift + P` → "Cline: Open")
2. Ask about F5XC resources:

> "List HTTP load balancers in the production namespace"

---

## Option 2: Continue Extension

[Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue) is an open-source
AI coding assistant with MCP support.

### Installation

1. Install Continue from VS Code Marketplace
2. Open Continue configuration

### Configuration

Edit `~/.continue/config.json`:

```json
{
  "models": [],
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

### Usage

1. Open Continue panel
2. Use the chat to interact with F5XC:

> "Generate Terraform for an origin pool with servers at 10.0.0.1 and 10.0.0.2"

---

## Workspace Configuration

For project-specific configuration, create `.vscode/mcp.json`:

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

## Environment Variables

!!! tip "Secure Credentials"
    Store credentials in a `.env` file to avoid committing secrets.

1. Create `.env` in your workspace:

    ```bash
    F5XC_API_URL=https://your-tenant.console.ves.volterra.io
    F5XC_API_TOKEN=your-api-token
    ```

2. Add `.env` to `.gitignore`

3. Reference in configuration:

    ```json
    {
      "f5xc-api": {
        "command": "npx",
        "args": ["f5xc-api-mcp"],
        "envFile": "${workspaceFolder}/.env"
      }
    }
    ```

## Troubleshooting

### Extension Not Finding MCP Server

1. Reload VS Code window (`Cmd/Ctrl + Shift + P` → "Reload Window")
2. Check extension logs in Output panel
3. Verify Node.js is in PATH

### Permission Issues

On macOS/Linux, ensure npx is executable:

```bash
which npx
```

If not found, add Node.js to your shell profile.

### Configuration Not Loading

1. Check JSON syntax
2. Ensure file is in correct location
3. Look for typos in server name

## Tips

!!! example "Inline Documentation"
    Hover over F5XC resources in your Terraform files and ask:
    > "What are the valid options for this load balancer's advertise setting?"

### Code Generation

Select a comment describing what you need:

```terraform
# Create HTTP LB for api.example.com with WAF enabled
```

Then ask Claude to generate the resource.

## Next Steps

- [Authentication Configuration](../configuration/authentication.md)
- [Terraform Integration](../integrations/terraform.md)
- [Tools Reference](../tools/index.md)
