---
page_title: f5xc_transaction_detail - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeTransactionDetails.
---

# Transaction Detail

GET a detailed information about the requested transaction.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transaction-detail-create` | PostSafeTransactionDetails. |
| `f5xc-api-shapesecurity-transaction-detail-list` | GET SAFE Anayst Transaction Details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `transaction_id` | Transaction identifier. |
| `version` | The API version to use. |

## Example Usage

Ask Claude to help you work with Transaction Detail resources:

### Create Transaction Detail

> "Create a transaction-detail named 'example' in the 'production' namespace"

### List Transaction Details

> "List all transaction-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create transaction_detail -n <namespace> -i transaction_detail.yaml

# Get
f5xcctl configuration get transaction_detail -n <namespace> <name>

# List
f5xcctl configuration list transaction_detail -n <namespace>

# Delete
f5xcctl configuration delete transaction_detail -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_transaction_detail" "example" {
  name      = "example-transaction-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
