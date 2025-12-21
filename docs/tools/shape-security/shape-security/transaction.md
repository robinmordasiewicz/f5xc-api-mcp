---
page_title: f5xc_transaction - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Bot Assessment for Transactions.
---

# Transaction

GET Bot Transactions Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transaction-create` | GET Bot Assessment for Transactions. |

## Example Usage

Ask Claude to help you work with Transaction resources:

### Create Transaction

> "Create a transaction named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create transaction -n <namespace> -i transaction.yaml

# Get
f5xcctl shape_security get transaction <name> -n <namespace>

# List
f5xcctl shape_security list transaction -n <namespace>

# Delete
f5xcctl shape_security delete transaction <name> -n <namespace>
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
