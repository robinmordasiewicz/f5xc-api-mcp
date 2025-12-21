---
page_title: f5xc_transactions_csv - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET SAFE Analyst Transactions as a CSV file.
---

# Transactions Csv

GET Safe transactions as CSV file.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-transactions-csv-create` | GET SAFE Analyst Transactions as a CSV file. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transactions Csv resources:

### Create Transactions Csv

> "Create a transactions-csv named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create transactions_csv -n <namespace> -i transactions_csv.yaml

# Get
f5xcctl shape_security get transactions_csv <name> -n <namespace>

# List
f5xcctl shape_security list transactions_csv -n <namespace>

# Delete
f5xcctl shape_security delete transactions_csv <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transactions_csv" "example" {
  name      = "example-transactions-csv"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
