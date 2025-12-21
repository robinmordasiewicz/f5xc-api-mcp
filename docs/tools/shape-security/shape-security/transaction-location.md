---
page_title: f5xc_transaction_location - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeTransactionLocations.
---

# Transaction Location

POST Safe Analyst Station specific transaction locations.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transaction-location-create` | PostSafeTransactionLocations. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transaction Location resources:

### Create Transaction Location

> "Create a transaction-location named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create transaction_location -n <namespace> -i transaction_location.yaml

# Get
f5xcctl shape_security get transaction_location <name> -n <namespace>

# List
f5xcctl shape_security list transaction_location -n <namespace>

# Delete
f5xcctl shape_security delete transaction_location <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transaction_location" "example" {
  name      = "example-transaction-location"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
