---
page_title: f5xc_transaction - f5xc-api-mcp
subcategory: Organization
description: Get Bot Assessment for Transactions
---

# Transaction

Get Bot Transactions Information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-transaction-create` | Get Bot Assessment for Transactions |

## Example Usage

Ask Claude to help you work with Transaction resources:

### Create Transaction

> "Create a transaction named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create transaction -n <namespace> -i transaction.yaml

# Get
f5xcctl configuration get transaction -n <namespace> <name>

# List
f5xcctl configuration list transaction -n <namespace>

# Delete
f5xcctl configuration delete transaction -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_transaction" "example" {
  name      = "example-transaction"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
