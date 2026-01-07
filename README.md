# F5 Distributed Cloud API MCP Server

[![npm version](https://badge.fury.io/js/%40robinmordasiewicz%2Ff5xc-api-mcp.svg)](https://www.npmjs.com/package/@robinmordasiewicz/f5xc-api-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An MCP (Model Context Protocol) server that exposes F5 Distributed Cloud APIs to AI assistants.
Enables natural language interaction with F5XC infrastructure through Claude, VS Code, and
other MCP-compatible tools.

## Features

- **1500+ API Tools** - Complete coverage of F5XC API operations across 23 enriched domains
- **Domain-Based Documentation** - Tools organized by domains with intelligent 2-level and
  3-level hierarchical navigation
- **Dual-Mode Operation** - Works without authentication (documentation mode) AND with authentication (execution mode)
- **CURL Examples** - API documentation with curl commands for authenticated and unauthenticated modes
- **Multiple Auth Methods** - API token and P12 certificate (mTLS) support
- **URL Normalization** - Automatically handles various F5XC URL formats
- **Pre-enriched Specs** - Uses optimized OpenAPI 3.0.3 specifications with domain metadata

## Quick Start

### Using npx (Recommended)

```bash
npx @robinmordasiewicz/f5xc-api-mcp
```

### Using npm

```bash
npm install -g @robinmordasiewicz/f5xc-api-mcp
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
      "args": ["@robinmordasiewicz/f5xc-api-mcp"],
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
claude mcp add f5xc-api -- npx @robinmordasiewicz/f5xc-api-mcp
```

### VS Code (with Cline/Continue)

Add to your MCP settings:

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

### OpenCode

Add to `opencode.json` (project root or `~/.config/opencode/opencode.json`):

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

> **Note:** OpenCode uses different schema: `"mcp"` key (not `"mcpServers"`), array-based
> `"command"`, `"environment"` (not `"env"`), and requires `"type": "local"`.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `F5XC_API_URL` | For execution | Tenant URL (auto-normalized) |
| `F5XC_API_TOKEN` | For token auth | API token from XC Console |
| `F5XC_P12_BUNDLE` | For cert auth | Path to P12 certificate bundle |
| `F5XC_P12_PASSWORD` | For cert auth | Password for P12 certificate |
| `F5XC_PROFILE` | No | Profile name to use (default: active profile from config) |
| `F5XC_TLS_INSECURE` | No | Disable SSL verification (staging only, set to `true`) |
| `F5XC_CA_BUNDLE` | No | Path to custom CA certificate bundle |
| `LOG_LEVEL` | No | Logging verbosity (debug, info, warn, error) |

## Profile-Based Configuration

Manage multiple F5XC tenant credentials with named profiles stored in `~/.config/f5xc/profiles/`.

### Profile Management via MCP Tool

Use the `f5xc-api-configure-auth` MCP tool through your AI assistant:

| Action | Description |
|--------|-------------|
| `status` | Check current authentication state and active profile |
| `configure` | Save new credentials to a named profile |
| `list-profiles` | List all available profiles |
| `set-active` | Switch the active profile |

**Example interactions:**

```text
"Check my F5XC authentication status"
→ Uses f5xc-api-configure-auth with action: status

"Configure a new F5XC profile called production"
→ Uses f5xc-api-configure-auth with action: configure

"Switch to the staging profile"
→ Uses f5xc-api-configure-auth with action: set-active
```

### Using Profiles

```bash
# Use active profile (from ~/.config/f5xc/active_profile)
f5xc-api-mcp

# Use specific profile via environment variable
F5XC_PROFILE=staging f5xc-api-mcp

# Override profile credentials with environment variables
F5XC_PROFILE=production F5XC_API_TOKEN=temporary-token f5xc-api-mcp
```

### Configuration Directory Structure

Profiles are stored in `~/.config/f5xc/` (XDG Base Directory compliant):

```text
~/.config/f5xc/
├── active_profile       # Contains the name of the active profile
└── profiles/
    ├── production.json  # Individual profile files
    └── staging.json
```

**Profile file format** (`~/.config/f5xc/profiles/production.json`):

```json
{
  "name": "production",
  "tenant_url": "https://mytenant.console.ves.volterra.io",
  "api_token": "your-api-token",
  "created_at": "2025-12-21T10:00:00Z",
  "last_used_at": "2025-12-21T15:30:00Z"
}
```

### Credential Priority

Credentials are loaded in this order (highest to lowest priority):

1. **Environment Variables** - `F5XC_API_URL`, `F5XC_API_TOKEN`, etc.
2. **Active Profile** - Selected by `F5XC_PROFILE` or from `~/.config/f5xc/active_profile`
3. **Documentation Mode** - No credentials (read-only API documentation)

Environment variables always override profile settings, enabling temporary overrides.

### Backward Compatibility

Existing setups using environment variables continue to work unchanged:

```bash
export F5XC_API_URL=https://mytenant.console.ves.volterra.io
export F5XC_API_TOKEN=your-api-token
f5xc-api-mcp
```

No changes needed - profiles are optional.

## Dual-Mode Operation

### Documentation Mode (No Authentication)

When no credentials are provided, the server provides:

- OpenAPI specification documentation
- API operation explanations
- Parameter descriptions and validation
- CURL command examples
- JSON request templates

This mode is ideal for exploring the API and understanding available operations.

### Execution Mode (With Authentication)

When credentials are provided, the server additionally:

- Executes actual API calls against your tenant
- Lists and retrieves resources
- Creates, updates, and deletes configurations
- Returns real-time resource status

## Available Tools

Tools follow the naming pattern: `f5xc-api-{domain}-{resource}-{operation}`

### Domains (23 Total)

| Domain | Path Count | Structure | Description |
|--------|-----------|-----------|-------------|
| AI Intelligence | 11 | 2-level | AI assistant, BFDP |
| API Security | 45 | 2-level | API discovery, protection, definitions |
| BIG-IP Integration | 28 | 2-level | BIG-IP virtual servers, iRules, APM |
| Billing | 19 | 2-level | Invoices, payment methods, subscriptions |
| CDN | 31 | 2-level | CDN load balancers, cache rules |
| DNS | 42 | 2-level | DNS zones, DNS load balancers, DNS pools |
| Infrastructure | 134 | 3-level | AWS/Azure/GCP VPC sites, customer edge sites |
| Infrastructure Protection | 72 | 2-level | DDoS protection, firewall rules |
| Integrations | 26 | 2-level | Third-party apps, ticket systems |
| Identity | 137 | 3-level | Authentication, users, roles, RBAC |
| Load Balancing | 89 | 2-level | HTTP/TCP/UDP load balancers, origin pools, forward proxy |
| Monitoring & Observability | 235 | 3-level | Alerts, logs, synthetic monitors, metrics |
| NGINX Integration | 34 | 2-level | NGINX One instances, servers, service discovery |
| Networking | 220 | 3-level | Network connectors, firewalls, interfaces, policies |
| Operations | 22 | 2-level | Debug, DHCP, ping, traceroute |
| Regional Edge Configuration | 18 | 2-level | Regional edge settings, policies |
| Security | 210 | 3-level | Service policies, WAF, malicious user mitigation |
| Service Mesh | 31 | 2-level | Virtual K8s, workloads, K8s clusters |
| Shape Security (Bot Defense) | 124 | 3-level | Bot defense, client-side defense |
| System Configuration | 23 | 2-level | Namespaces, certificates, credentials |
| Tenant Management | 28 | 2-level | Multi-tenant management, profiles |
| VPN | 20 | 2-level | VPN tunnels, IKE profiles |
| Workflows & Automation | 15 | 2-level | Workflow templates, automations |

### Example Tools

- `f5xc-api-virtual-http-loadbalancer-create`
- `f5xc-api-virtual-origin-pool-list`
- `f5xc-api-cemanagement-network-interface-get`
- `f5xc-api-server-info`

## Documentation Structure

The documentation site is automatically generated from enriched OpenAPI specifications
and organized by domain with intelligent hierarchical navigation:

### Two-Level Navigation (Small Domains < 50 paths)

Small domains use a simple 2-level structure: Domain → Resource

```yaml
docs/tools/
├── vpn/
│   ├── ipsec-gateway.md
│   └── vpn-connection.md
├── cdn/
│   ├── cdn-loadbalancer.md
│   └── cdn-pool.md
```

Example: [VPN Tools](https://robinmordasiewicz.github.io/f5xc-api-mcp/tools/vpn/)

### Three-Level Navigation (Large Domains ≥ 50 paths)

Large domains use a 3-level structure: Domain → Category (by OpenAPI tag) → Resource

```yaml
docs/tools/
├── observability/
│   ├── alerts-events/
│   │   ├── alert-policy.md
│   │   └── event-manager.md
│   ├── logging/
│   │   ├── access-log.md
│   │   └── audit-log.md
│   └── metrics-statistics/
│       └── metric-collector.md
```

**Large domains (>50 paths) using 3-level navigation:**

- Monitoring & Observability (235 paths)
- Networking (220 paths)
- Security (210 paths)
- Infrastructure (134 paths)
- Identity (137 paths)
- Shape Security (124 paths)

### Automatic Generation

Documentation is automatically generated by the build system:

```bash
# Generate/regenerate documentation
npm run generate-docs

# Build documentation site
mkdocs build

# Preview site locally
mkdocs serve
```

The generator automatically:

- Converts domain titles from snake_case to display format (e.g., `load_balancer` → "Load Balancing")
- Updates `mkdocs.yml` navigation without manual changes
- Creates markdown files with API operation details and examples
- Subdivides large domains based on OpenAPI operation tags
- Maintains consistent directory structure and naming conventions

## Workflow Prompts

The server includes guided workflow prompts sourced from upstream enriched specs:

- `deploy_http_loadbalancer` - Create a fully configured HTTP load balancer with backend origin pool
- `deploy_https_loadbalancer` - Create HTTPS load balancer with SSL/TLS termination
- `enable_waf_protection` - Add web application firewall to existing load balancer
- `configure_origin_pool` - Set up backend server pool with health checks
- `configure_dns_zone` - Set up authoritative DNS zone with records
- `enable_cdn_distribution` - Configure CDN for content delivery
- `register_site` - Register and configure a CE site

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

## SSL/TLS Configuration

### Staging Environment Certificate Issue

F5 XC staging environments use URLs like `tenant.staging.console.ves.volterra.io`, but the SSL
certificate only covers `*.console.ves.volterra.io`. This causes SSL validation failures because
wildcards only match a single subdomain level, not two levels (`tenant.staging`).

**Error Example:**

```text
Hostname/IP does not match certificate's altnames:
Host: tenant.staging.console.ves.volterra.io
Cert covers: DNS:*.console.ves.volterra.io, DNS:console.ves.volterra.io
```

### Solutions

#### Option 1: Custom CA Bundle (Recommended)

If your organization uses a custom CA:

```bash
export F5XC_CA_BUNDLE=/path/to/your/ca-bundle.crt
```

#### Option 2: Disable Verification (Development Only)

**WARNING: Never use in production!**

```bash
export F5XC_TLS_INSECURE=true
```

### Troubleshooting SSL Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Hostname/IP does not match certificate's altnames` | Staging URL mismatch | Use `F5XC_TLS_INSECURE=true` or custom CA |
| `self signed certificate` | Custom CA not trusted | Set `F5XC_CA_BUNDLE` |
| `certificate has expired` | Expired certificate | Contact F5 XC admin |
| `unable to verify the first certificate` | Missing intermediate CA | Add intermediates to CA bundle |

### Security Best Practices

1. **Prefer `F5XC_CA_BUNDLE` over `F5XC_TLS_INSECURE`**: Using a custom CA bundle maintains
   certificate validation while trusting your organization's certificates.

2. **Contact F5 Support**: For staging environments, contact F5 Support to request the official
   staging environment CA certificate. This is the most secure long-term solution.

3. **Never use `F5XC_TLS_INSECURE=true` in production**: This setting disables all certificate
   validation and should only be used for development and testing.

4. **Rotate credentials regularly**: API tokens and certificates should be rotated according to
   your organization's security policies.

## Development

### Prerequisites

- Node.js 24+
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
