---
page_title: f5xc_pool_members_health_statu - f5xc-api-mcp
subcategory: DNS
description: DNS Load Balancer Pool Members Health Status List
---

# Pool Members Health Statu

Get Health Status of all DNS Load Balancer Pool Members in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-pool-members-health-statu-list` | DNS Load Balancer Pool Members Health Status List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Pool Members Health Statu resources:

### List Pool Members Health Status

> "List all pool-members-health-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f pool_members_health_statu.yaml

# Get
f5xcctl get pool_members_health_statu {name} -n {namespace}

# List
f5xcctl get pool_members_health_status -n {namespace}

# Delete
f5xcctl delete pool_members_health_statu {name} -n {namespace}
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
