---
page_title: f5xc_transaction_detail - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionDetails.
---

# Transaction Detail

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET a detailed information about the requested transaction.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-detail-create` | PostSafeTransactionDetails. |
| `f5xc-api-shape-transaction-detail-list` | GET SAFE Anayst Transaction Details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `transaction_id` | Transaction identifier. | `Value` |
| `version` | The API version to use. | `V2` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-detail

## Example Usage

Ask Claude to help you work with Transaction Detail resources:

### Create Transaction Detail

> "Create a transaction-detail named 'example' in the 'production' namespace"

### List Transaction Details

> "List all transaction-details in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create transaction_detail -n <namespace> -i transaction_detail.yaml

# Get
xcsh shape get transaction_detail <name> -n <namespace>

# List
xcsh shape list transaction_detail -n <namespace>

# Delete
xcsh shape delete transaction_detail <name> -n <namespace>
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
