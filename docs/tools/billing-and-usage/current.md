---
page_title: f5xc_current - f5xc-api-mcp
subcategory: Billing And Usage
description: GET current usage plan.
---

# Current

!!! info "Low Risk"
    Operations on this resource are generally safe.

Endpoint to GET current usage plan.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-current-list` | GET current usage plan. |

## Example Usage

Ask Claude to help you work with Current resources:

### List Currents

> "List all currents in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create current -n <namespace> -i current.yaml

# Get
xcsh billing_and_usage get current <name> -n <namespace>

# List
xcsh billing_and_usage list current -n <namespace>

# Delete
xcsh billing_and_usage delete current <name> -n <namespace>
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
