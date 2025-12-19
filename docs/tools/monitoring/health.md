---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Monitoring
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
f5xcctl configuration create health -n <namespace> -i health.yaml

# Get
f5xcctl configuration get health -n <namespace> <name>

# List
f5xcctl configuration list health -n <namespace>

# Delete
f5xcctl configuration delete health -n <namespace> <name>
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
