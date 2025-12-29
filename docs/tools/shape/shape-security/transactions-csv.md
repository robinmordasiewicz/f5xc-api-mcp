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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape transactions-csv create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape transactions-csv create {name} --namespace {namespace}
```

Create transactions-csv

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create transactions_csv -n <namespace> -i transactions_csv.yaml

# Get
f5xcctl shape get transactions_csv <name> -n <namespace>

# List
f5xcctl shape list transactions_csv -n <namespace>

# Delete
f5xcctl shape delete transactions_csv <name> -n <namespace>
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
