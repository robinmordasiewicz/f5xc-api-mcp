# Namespace

Namespaces provide logical isolation for F5XC resources, enabling multi-tenant deployments and
organized resource management.

!!! info "Subscription Tier"
    **NO_TIER** - Available with all F5XC subscriptions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-namespace-create` | Create a new namespace |
| `f5xc-api-core-namespace-get` | Get namespace details |
| `f5xc-api-core-namespace-list` | List all namespaces |
| `f5xc-api-core-namespace-update` | Update namespace configuration |
| `f5xc-api-core-namespace-delete` | Delete namespace |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Namespace name (lowercase, alphanumeric, hyphens) |

## Optional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| description | string | Human-readable description |
| labels | object | Key-value labels for organization |

## Example Usage

### Create Namespace

Ask Claude:

> "Create a namespace named 'production' with description 'Production environment resources'"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: namespace
metadata:
  name: production
  labels:
    environment: production
    team: platform
spec:
  description: "Production environment resources"
EOF
```

### Terraform Resource

```hcl
resource "volterra_namespace" "production" {
  name = "production"

  labels = {
    environment = "production"
    team        = "platform"
  }
}
```

## Common Configurations

### Basic Namespace

```json
{
  "name": "production",
  "description": "Production environment"
}
```

### With Labels

```json
{
  "name": "development",
  "description": "Development environment",
  "labels": {
    "environment": "dev",
    "team": "engineering",
    "cost-center": "12345"
  }
}
```

## Environment Patterns

!!! tip "Namespace Organization"
    Use consistent naming patterns across environments for easier management.

### By Environment

```text
production
staging
development
testing
```

### By Team

```text
platform-production
frontend-production
backend-production
```

### By Application

```text
app1-prod
app1-staging
app2-prod
app2-staging
```

## Special Namespaces

### System Namespace

!!! warning "System Namespace"
    The `system` namespace is reserved and contains global resources.
    Do not create resources here unless specifically required.

### Shared Namespace

Use a shared namespace for cross-application resources:

```json
{
  "name": "shared",
  "description": "Shared resources used across applications",
  "labels": {
    "scope": "global"
  }
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Requires namespace
- [Origin Pool](origin-pool.md) - Requires namespace
- [Certificate](certificate.md) - Requires namespace

## Troubleshooting

### "Namespace already exists"

Namespace names must be unique across your tenant. Check existing namespaces:

> "List all namespaces in my F5XC tenant"

### "Cannot delete namespace"

Namespaces with active resources cannot be deleted. Delete all resources first:

> "List all resources in namespace 'production'"

### Invalid Name

Namespace names must:

- Be lowercase
- Start with a letter
- Contain only letters, numbers, and hyphens
- Be between 1-63 characters
