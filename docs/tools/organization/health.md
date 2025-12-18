---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Organization
description: Health
---

# Health

Get VPM health information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-health-list` | Health |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `console_user` | The console_user parameter |

## Example Usage

Ask Claude to help you work with Health resources:

### List Healths

> "List all healths in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f health.yaml

# Get
f5xcctl get health {name} -n {namespace}

# List
f5xcctl get healths -n {namespace}

# Delete
f5xcctl delete health {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_health" "example" {
  name      = "example-health"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
