---
page_title: f5xc_pool_members_health_statu - f5xc-api-mcp
subcategory: DNS
description: DNS Load Balancer Pool Members Health Status List.
---

# Pool Members Health Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Health Status of all DNS Load Balancer Pool Members in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-pool-members-health-statu-list` | DNS Load Balancer Pool Members Health Status List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Pool Members Health Statu resources:

### List Pool Members Health Status

> "List all pool-members-health-status in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create pool_members_health_statu -n <namespace> -i pool_members_health_statu.yaml

# Get
xcsh dns get pool_members_health_statu <name> -n <namespace>

# List
xcsh dns list pool_members_health_statu -n <namespace>

# Delete
xcsh dns delete pool_members_health_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_pool_members_health_statu" "example" {
  name      = "example-pool-members-health-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
