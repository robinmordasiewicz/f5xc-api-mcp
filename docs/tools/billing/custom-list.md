---
page_title: f5xc_custom_list - f5xc-api-mcp
subcategory: Billing
description: List Usage Plans.
---

# Custom List

Endpoint to GET usage plans.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-custom-list-list` | List Usage Plans. |

## Example Usage

Ask Claude to help you work with Custom List resources:

### List Custom Lists

> "List all custom-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing create custom_list -n <namespace> -i custom_list.yaml

# Get
f5xcctl billing get custom_list <name> -n <namespace>

# List
f5xcctl billing list custom_list -n <namespace>

# Delete
f5xcctl billing delete custom_list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_custom_list" "example" {
  name      = "example-custom-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
