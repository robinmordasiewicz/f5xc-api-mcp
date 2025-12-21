---
page_title: f5xc_catalog - f5xc-api-mcp
subcategory: Observability
description: List
---

# Catalog

Retrieves service catalog tailor for the currently logged-in user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-catalog-update` | List |

## Example Usage

Ask Claude to help you work with Catalog resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create catalog -n <namespace> -i catalog.yaml

# Get
f5xcctl configuration get catalog -n <namespace> <name>

# List
f5xcctl configuration list catalog -n <namespace>

# Delete
f5xcctl configuration delete catalog -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_catalog" "example" {
  name      = "example-catalog"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
