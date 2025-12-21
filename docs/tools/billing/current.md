---
page_title: f5xc_current - f5xc-api-mcp
subcategory: Billing
description: GET current usage plan.
---

# Current

Endpoint to GET current usage plan.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-current-list` | GET current usage plan. |

## Example Usage

Ask Claude to help you work with Current resources:

### List Currents

> "List all currents in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing create current -n <namespace> -i current.yaml

# Get
f5xcctl billing get current <name> -n <namespace>

# List
f5xcctl billing list current -n <namespace>

# Delete
f5xcctl billing delete current <name> -n <namespace>
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
