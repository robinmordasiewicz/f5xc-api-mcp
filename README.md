# F5 Distributed Cloud API MCP Server

[![npm version](https://badge.fury.io/js/f5xc-api-mcp.svg)](https://www.npmjs.com/package/f5xc-api-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An MCP (Model Context Protocol) server that exposes F5 Distributed Cloud APIs to AI assistants.
Enables natural language interaction with F5XC infrastructure through Claude, VS Code, and
other MCP-compatible tools.

## Features

- **270+ API Tools** - Complete coverage of F5XC API operations (CRUD for all resources)
- **Dual-Mode Operation** - Works without authentication (documentation mode) AND with authentication (execution mode)
- **f5xcctl Integration** - Every response includes equivalent CLI commands
- **Terraform Examples** - Every response includes Terraform HCL examples
- **Multiple Auth Methods** - API token and P12 certificate (mTLS) support
- **URL Normalization** - Automatically handles various F5XC URL formats

## Quick Start

### Using npx (Recommended)

```bash
npx f5xc-api-mcp
```

### Using npm

```bash
npm install -g f5xc-api-mcp
f5xc-api-mcp
```

### Using Docker

```bash
docker run -i --rm ghcr.io/robinmordasiewicz/f5xc-api-mcp
```

## Configuration

### Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

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

### Claude Code CLI

```bash
claude mcp add f5xc-api -- npx f5xc-api-mcp
```

### VS Code (with Cline/Continue)

Add to your MCP settings:

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

| Variable | Required | Description |
|----------|----------|-------------|
| `F5XC_API_URL` | For execution | Tenant URL (auto-normalized) |
| `F5XC_API_TOKEN` | For token auth | API token from XC Console |
| `F5XC_P12_FILE` | For cert auth | Path to P12 certificate file |
| `F5XC_P12_PASSWORD` | For cert auth | Password for P12 certificate |
| `LOG_LEVEL` | No | Logging verbosity (debug, info, warn, error) |

## Dual-Mode Operation

### Documentation Mode (No Authentication)

When no credentials are provided, the server provides:

- OpenAPI specification documentation
- API operation explanations
- Parameter descriptions and validation
- f5xcctl command equivalents
- Terraform HCL examples
- JSON request templates

This mode is ideal for users who authenticate via f5xcctl or Terraform.

### Execution Mode (With Authentication)

When credentials are provided, the server additionally:

- Executes actual API calls against your tenant
- Lists and retrieves resources
- Creates, updates, and deletes configurations
- Returns real-time resource status

## Available Tools

Tools follow the naming pattern: `f5xc-api-{domain}-{resource}-{operation}`

### Domains

| Domain | Resources |
|--------|-----------|
| `waap` | http_loadbalancer, origin_pool, app_firewall, rate_limiter |
| `dns` | dns_zone, dns_load_balancer, dns_lb_pool |
| `network` | network_connector, network_firewall, enhanced_firewall_policy |
| `site` | aws_vpc_site, azure_vnet_site, gcp_vpc_site, customer_edge |
| `appstack` | k8s_cluster, virtual_k8s, workload |
| `security` | service_policy, waf, malicious_user_detection |
| `core` | namespace, certificate, cloud_credentials |

### Example Tools

- `f5xc-api-waap-http-loadbalancer-create`
- `f5xc-api-waap-origin-pool-list`
- `f5xc-api-dns-zone-get`
- `f5xc-api-server-info`

## Workflow Prompts

The server includes guided workflow prompts:

- `deploy-http-loadbalancer` - Deploy HTTP LB with origin pool
- `configure-waf` - Configure Web Application Firewall
- `create-multicloud-site` - Deploy F5XC site in AWS/Azure/GCP
- `generate-terraform` - Export resources as Terraform

## Resource URIs

Access F5XC resources via URI scheme:

```text
f5xc://{tenant}/{namespace}/{resource-type}/{name}
```

Examples:

- `f5xc://mytenant/production/http_loadbalancer/my-app`
- `f5xc://mytenant/system/namespace/default`

## URL Normalization

The server automatically normalizes various URL formats:

| User Input | Normalized |
|------------|------------|
| `tenant.volterra.us` | `tenant.console.ves.volterra.io/api` |
| `tenant.console.ves.volterra.io` | `tenant.console.ves.volterra.io/api` |
| `https://tenant.volterra.us/` | `https://tenant.console.ves.volterra.io/api` |

## Development

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
git clone https://github.com/robinmordasiewicz/f5xc-api-mcp.git
cd f5xc-api-mcp
npm install
npm run build
```

### Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Linting

```bash
npm run lint          # Check linting
npm run lint:fix      # Fix linting issues
npm run format        # Format code
```

## Documentation

Full documentation is available at: <https://robinmordasiewicz.github.io/f5xc-api-mcp>

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- [GitHub Issues](https://github.com/robinmordasiewicz/f5xc-api-mcp/issues)
- [GitHub Discussions](https://github.com/robinmordasiewicz/f5xc-api-mcp/discussions)
