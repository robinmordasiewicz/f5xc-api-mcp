---
page_title: f5xc_transaction_location - f5xc-api-mcp
subcategory: Organization
description: PostSafeTransactionLocations
---

# Transaction Location

Post Safe Analyst Station specific transaction locations

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-transaction-location-create` | PostSafeTransactionLocations |

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
f5xcctl configuration create transaction_location -n <namespace> -i transaction_location.yaml

# Get
f5xcctl configuration get transaction_location -n <namespace> <name>

# List
f5xcctl configuration list transaction_location -n <namespace>

# Delete
f5xcctl configuration delete transaction_location -n <namespace> <name>
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
