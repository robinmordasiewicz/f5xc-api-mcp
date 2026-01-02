---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Support
description: Health
---

# Health

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET VPM health information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-health-list` | Health |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site Name | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `console_user` | Name of the console user who runs this command. | `Console-user.` |

## Example Usage

Ask Claude to help you work with Health resources:

### List Healths

> "List all healths in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create health -n <namespace> -i health.yaml

# Get
xcsh support get health <name> -n <namespace>

# List
xcsh support list health -n <namespace>

# Delete
xcsh support delete health <name> -n <namespace>
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
