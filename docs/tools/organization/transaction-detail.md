---
page_title: f5xc_transaction_detail - f5xc-api-mcp
subcategory: Organization
description: PostSafeTransactionDetails
---

# Transaction Detail

Get a detailed information about the requested transaction

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-transaction-detail-create` | PostSafeTransactionDetails |
| `f5xc-api-core-transaction-detail-list` | Get SAFE Anayst Transaction Details |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `transaction_id` | The transaction_id parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with Transaction Detail resources:

### Create Transaction Detail

> "Create a transaction-detail named 'example' in the 'production' namespace"

### List Transaction Details

> "List all transaction-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f transaction_detail.yaml

# Get
f5xcctl get transaction_detail {name} -n {namespace}

# List
f5xcctl get transaction_details -n {namespace}

# Delete
f5xcctl delete transaction_detail {name} -n {namespace}
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
