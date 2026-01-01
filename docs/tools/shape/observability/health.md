---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Shape
description: Health Check.
---

# Health

!!! info "Low Risk"
    Operations on this resource are generally safe.

Health Check.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-health-list` | Health Check. |

## Example Usage

Ask Claude to help you work with Health resources:

### List Healths

> "List all healths in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create health -n <namespace> -i health.yaml

# Get
xcsh shape get health <name> -n <namespace>

# List
xcsh shape list health -n <namespace>

# Delete
xcsh shape delete health <name> -n <namespace>
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
