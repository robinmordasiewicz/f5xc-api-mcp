---
page_title: f5xc_transactions_csv - f5xc-api-mcp
subcategory: Organization
description: Get SAFE Analyst Transactions as a CSV file
---

# Transactions Csv

Get Safe transactions as csv file

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-transactions-csv-create` | Get SAFE Analyst Transactions as a CSV file |

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
f5xcctl apply -f transactions_csv.yaml

# Get
f5xcctl get transactions_csv {name} -n {namespace}

# List
f5xcctl get transactions_csvs -n {namespace}

# Delete
f5xcctl delete transactions_csv {name} -n {namespace}
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
