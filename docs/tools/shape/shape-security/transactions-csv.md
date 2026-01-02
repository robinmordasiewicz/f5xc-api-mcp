---
page_title: f5xc_transactions_csv - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Analyst Transactions as a CSV file.
---

# Transactions Csv

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Safe transactions as CSV file.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transactions-csv-create` | GET SAFE Analyst Transactions as a CSV file. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transactions-csv

## Example Usage

Ask Claude to help you work with Transactions Csv resources:

### Create Transactions Csv

> "Create a transactions-csv named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create transactions_csv -n <namespace> -i transactions_csv.yaml

# Get
xcsh shape get transactions_csv <name> -n <namespace>

# List
xcsh shape list transactions_csv -n <namespace>

# Delete
xcsh shape delete transactions_csv <name> -n <namespace>
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
