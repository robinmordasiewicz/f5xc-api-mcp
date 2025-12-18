# Cursor Setup

Configure the F5XC API MCP Server with Cursor IDE.

## Prerequisites

- [Cursor](https://cursor.sh/) installed
- Node.js 18+ installed (for npx)

## Configuration

Cursor supports MCP servers through its settings.

### Step 1: Open Cursor Settings

1. Open Cursor
2. Go to Settings (`Cmd/Ctrl + ,`)
3. Navigate to the MCP section

### Step 2: Add MCP Server

Add the F5XC API server configuration:

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

=== "With Authentication"

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

### Step 3: Restart Cursor

Restart Cursor for the changes to take effect.

## Usage

### Chat Panel

Open the chat panel and ask about F5XC:

> "What F5XC load balancer options are available?"

### Inline Assistance

While editing Terraform files:

> "Generate an F5XC origin pool resource for this backend"

### Code Generation

Select code and ask:

> "Add WAF protection to this HTTP load balancer"

## Project Configuration

For project-specific settings, create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
        "F5XC_API_TOKEN": "${env:F5XC_API_TOKEN}"
      }
    }
  }
}
```

## Composer Integration

Use Cursor's Composer feature with F5XC tools:

1. Open Composer (`Cmd/Ctrl + I`)
2. Describe your infrastructure needs:

> "Create a complete F5XC setup with:
>
> - HTTP load balancer at app.example.com
> - Origin pool with 3 backend servers
> - WAF protection with default rules"

Cursor will use the MCP tools to generate the appropriate Terraform or API configurations.

## Tips

### Context Awareness

Cursor's AI is aware of your project context. Open your Terraform files and ask:

> "What F5XC resources would complement this existing configuration?"

### Multi-File Generation

Use Composer to generate multiple related resources:

> "Generate Terraform modules for a full F5XC deployment including networking, load balancing, and security"

### Documentation Lookup

> "What are all the required fields for an F5XC HTTP load balancer?"

## Troubleshooting

### MCP Server Not Starting

1. Check Node.js is installed: `node --version`
2. Verify npx works: `npx --version`
3. Check Cursor's developer tools for errors

### Configuration Not Applied

1. Ensure JSON is valid
2. Restart Cursor completely (quit and reopen)
3. Check settings are in the correct location

### Authentication Errors

1. Verify API URL format
2. Check token hasn't expired
3. Test credentials with curl:

```bash
curl -H "Authorization: APIToken $F5XC_API_TOKEN" \
  https://your-tenant.console.ves.volterra.io/api/web/namespaces
```

## Next Steps

- [Authentication Configuration](../configuration/authentication.md)
- [Terraform Integration](../integrations/terraform.md)
- [Tools Reference](../tools/index.md)
