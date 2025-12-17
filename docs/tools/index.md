# Tools Reference

The F5XC API MCP Server provides 270+ tools covering all F5 Distributed Cloud API operations.

## Tool Naming Convention

```
f5xc-api-{domain}-{resource}-{operation}
```

Examples:

- `f5xc-api-waap-http-loadbalancer-create`
- `f5xc-api-waap-origin-pool-list`
- `f5xc-api-dns-zone-get`

## Domains

### WAAP (Web App & API Protection)

| Resource | Operations |
|----------|------------|
| HTTP Load Balancer | create, get, list, update, delete |
| Origin Pool | create, get, list, update, delete |
| App Firewall | create, get, list, update, delete |
| Rate Limiter | create, get, list, update, delete |
| Service Policy | create, get, list, update, delete |

### DNS

| Resource | Operations |
|----------|------------|
| DNS Zone | create, get, list, update, delete |
| DNS Load Balancer | create, get, list, update, delete |
| DNS LB Pool | create, get, list, update, delete |

### Network

| Resource | Operations |
|----------|------------|
| Network Connector | create, get, list, update, delete |
| Network Firewall | create, get, list, update, delete |
| Enhanced Firewall Policy | create, get, list, update, delete |

### Site

| Resource | Operations |
|----------|------------|
| AWS VPC Site | create, get, list, update, delete |
| Azure VNet Site | create, get, list, update, delete |
| GCP VPC Site | create, get, list, update, delete |
| Customer Edge | create, get, list, update, delete |

### AppStack

| Resource | Operations |
|----------|------------|
| K8s Cluster | create, get, list, update, delete |
| Virtual K8s | create, get, list, update, delete |
| Workload | create, get, list, update, delete |

### Core

| Resource | Operations |
|----------|------------|
| Namespace | create, get, list, update, delete |
| Certificate | create, get, list, update, delete |
| Cloud Credentials | create, get, list, update, delete |
| Secret | create, get, list, update, delete |

## Built-in Tools

### f5xc-api-server-info

Get server status and authentication information.

**Parameters:** None

**Example Response:**

```json
{
  "server": "f5xc-api-mcp",
  "version": "1.0.0",
  "mode": "execution",
  "authenticated": true,
  "authMethod": "token",
  "capabilities": {
    "documentation": true,
    "f5xcctl_equivalents": true,
    "terraform_examples": true,
    "api_execution": true
  }
}
```

## Tool Response Format

### Documentation Mode

When unauthenticated, tools return documentation:

```json
{
  "mode": "documentation",
  "tool": "f5xc-api-waap-http-loadbalancer-create",
  "description": "Creates an HTTP Load Balancer",
  "parameters": { "..." },
  "example_request": { "..." },
  "f5xcctl_command": "f5xcctl apply -f http_lb.yaml",
  "terraform_resource": "volterra_http_loadbalancer",
  "terraform_example": "resource \"volterra_http_loadbalancer\" {...}",
  "prerequisites": ["namespace must exist", "origin_pool required"],
  "subscription_tier": "STANDARD"
}
```

### Execution Mode

When authenticated, tools execute and return results:

```json
{
  "mode": "execution",
  "tool": "f5xc-api-waap-http-loadbalancer-create",
  "status": "success",
  "response": { "..." },
  "resource_url": "https://tenant.console.ves.volterra.io/..."
}
```

## Prompts {#prompts}

Pre-built workflow prompts for common multi-step operations.

### deploy-http-loadbalancer

Deploy a complete HTTP Load Balancer with origin pool.

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| namespace | Yes | Target namespace |
| name | Yes | Load balancer name |
| domain | Yes | Domain name (e.g., app.example.com) |
| backend_ip | Yes | Backend server IP |
| backend_port | No | Backend port (default: 80) |
| enable_waf | No | Enable WAF (default: false) |

**Example:**

> "Use the deploy-http-loadbalancer prompt with namespace=production, name=my-app, domain=app.example.com, backend_ip=10.0.0.1"

### configure-waf

Configure Web Application Firewall protection.

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| namespace | Yes | Target namespace |
| name | Yes | WAF policy name |
| loadbalancer | Yes | HTTP Load Balancer to protect |
| mode | No | blocking or monitoring (default: blocking) |

### create-multicloud-site

Deploy an F5XC site in AWS, Azure, or GCP.

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| namespace | Yes | Target namespace |
| name | Yes | Site name |
| cloud | Yes | aws, azure, or gcp |
| region | Yes | Cloud region |
| vpc_id | Yes | VPC/VNet ID |

### generate-terraform

Export F5XC resources as Terraform configuration.

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| namespace | Yes | Namespace to export |
| resource_type | No | Specific resource type |
| name | No | Specific resource name |

## Resources

MCP resources for direct access to F5XC objects.

### URI Scheme

```
f5xc://{tenant}/{namespace}/{resource-type}/{name}
```

### Examples

```
f5xc://mytenant/production/http_loadbalancer/my-app
f5xc://mytenant/shared/origin_pool/backend-pool
f5xc://mytenant/system/namespace/production
```

### Supported Resource Types

- `http_loadbalancer`
- `origin_pool`
- `app_firewall`
- `dns_zone`
- `namespace`
- `certificate`
- And 20+ more...

## Subscription Tiers

Tools indicate their subscription tier requirements:

| Tier | Resources |
|------|-----------|
| NO_TIER | namespace, certificate, secret, cloud_credentials |
| STANDARD | http_loadbalancer, origin_pool, dns_zone, health_check |
| ADVANCED | app_firewall, bot_defense, api_discovery, malicious_user_detection |

## Next Steps

- [HTTP Load Balancer](http-loadbalancer.md)
- [Origin Pool](origin-pool.md)
- [App Firewall](app-firewall.md)
- [f5xcctl Integration](../integrations/f5xcctl.md)
- [Terraform Integration](../integrations/terraform.md)
