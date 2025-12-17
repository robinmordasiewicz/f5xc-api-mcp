# F5XC API MCP Server

An MCP (Model Context Protocol) server that exposes F5 Distributed Cloud APIs to AI assistants like Claude.

## Features

- **270+ API Operations** - Full coverage of F5XC API as MCP tools
- **Dual-Mode Operation** - Works with OR without authentication
- **f5xcctl Integration** - Every response includes CLI equivalents
- **Terraform Examples** - HCL snippets for infrastructure-as-code
- **Workflow Prompts** - Guided workflows for common tasks

## Quick Install

=== "npx (Recommended)"

    ```bash
    npx f5xc-api-mcp
    ```

=== "Docker"

    ```bash
    docker run -it ghcr.io/robinmordasiewicz/f5xc-api-mcp
    ```

=== "npm Global"

    ```bash
    npm install -g f5xc-api-mcp
    f5xc-api-mcp
    ```

## Operating Modes

### Documentation Mode (Default)

Works **without any credentials**. Perfect for users who authenticate via f5xcctl or Terraform.

- OpenAPI spec documentation and schema information
- API operation explanations and parameter descriptions
- Request payload validation against schemas
- f5xcctl command equivalents for operations
- Terraform HCL resource examples
- Dependency graphs and prerequisite guidance

### Execution Mode (Authenticated)

Enabled when F5XC credentials are provided. Direct API execution.

- All documentation mode features PLUS
- Direct API CRUD operations against your tenant
- Resource listing and retrieval
- Configuration deployment
- Real-time resource status queries

## Supported Resources

| Domain | Resources |
|--------|-----------|
| **WAAP** | HTTP Load Balancer, Origin Pool, App Firewall, Rate Limiter |
| **DNS** | DNS Zone, DNS Load Balancer, DNS LB Pool |
| **Network** | Network Connector, Network Firewall, Enhanced Firewall Policy |
| **Site** | AWS VPC Site, Azure VNet Site, GCP VPC Site, Customer Edge |
| **AppStack** | K8s Cluster, Virtual K8s, Workload |
| **Security** | Service Policy, WAF, Malicious User Detection |
| **Core** | Namespace, Certificate, Cloud Credentials |

## IDE Support

Works with any MCP-compatible AI assistant:

<div class="grid cards" markdown>

-   :material-message-processing:{ .lg .middle } **Claude Desktop**

    ---

    Native MCP support in Claude Desktop app

    [:octicons-arrow-right-24: Setup Guide](getting-started/claude-desktop.md)

-   :material-console:{ .lg .middle } **Claude Code**

    ---

    CLI-based Claude with full MCP capabilities

    [:octicons-arrow-right-24: Setup Guide](getting-started/claude-code.md)

-   :material-microsoft-visual-studio-code:{ .lg .middle } **VS Code**

    ---

    Via Cline or Continue extensions

    [:octicons-arrow-right-24: Setup Guide](getting-started/vscode.md)

-   :material-cursor-default:{ .lg .middle } **Cursor**

    ---

    AI-first code editor with MCP support

    [:octicons-arrow-right-24: Setup Guide](getting-started/cursor.md)

</div>

## Example Usage

Ask Claude to help with F5XC infrastructure:

> "Create an HTTP load balancer for my app at app.example.com with origin at 10.0.0.1:8080"

Claude will use the MCP tools to:

1. Show you the required configuration
2. Provide f5xcctl commands you can run
3. Generate Terraform HCL for infrastructure-as-code
4. Execute the API calls (if authenticated)

## Next Steps

- [Quick Start Guide](quickstart.md) - Get running in 5 minutes
- [Installation](getting-started/installation.md) - Detailed installation options
- [Authentication](configuration/authentication.md) - Configure API credentials
- [Tools Reference](tools/index.md) - Browse available tools
