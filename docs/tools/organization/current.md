---
page_title: f5xc_current - f5xc-api-mcp
subcategory: Organization
description: Get current usage plan
---

# Current

Endpoint to get current usage plan

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-current-list` | Get current usage plan |

## Example Usage

Ask Claude to help you work with Current resources:

### List Currents

> "List all currents in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f current.yaml

# Get
f5xcctl get current {name} -n {namespace}

# List
f5xcctl get currents -n {namespace}

# Delete
f5xcctl delete current {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_current" "example" {
  name      = "example-current"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
