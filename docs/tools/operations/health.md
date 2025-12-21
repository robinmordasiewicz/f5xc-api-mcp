---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Operations
description: Health
---

# Health

GET VPM health information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-health-list` | Health |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `console_user` | Name of the console user who runs this command. |

## Example Usage

Ask Claude to help you work with Health resources:

### List Healths

> "List all healths in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create health -n <namespace> -i health.yaml

# Get
f5xcctl operations get health <name> -n <namespace>

# List
f5xcctl operations list health -n <namespace>

# Delete
f5xcctl operations delete health <name> -n <namespace>
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
