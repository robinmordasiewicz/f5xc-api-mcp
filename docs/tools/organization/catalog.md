---
page_title: f5xc_catalog - f5xc-api-mcp
subcategory: Organization
description: List
---

# Catalog

Retrieves service catalog tailor for the currently logged-in user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-catalog-update` | List |

## Example Usage

Ask Claude to help you work with Catalog resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f catalog.yaml

# Get
f5xcctl get catalog {name} -n {namespace}

# List
f5xcctl get catalogs -n {namespace}

# Delete
f5xcctl delete catalog {name} -n {namespace}
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
