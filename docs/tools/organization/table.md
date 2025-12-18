---
page_title: f5xc_table - f5xc-api-mcp
subcategory: Organization
description: Get SAFE Analyst Block Table as a CSV file
---

# Table

Get Safe block table as csv file

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-table-list` | Get SAFE Analyst Block Table as a CSV file |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `action` | The action parameter |
| `from` | The from parameter |
| `to` | The to parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with Table resources:

### List Tables

> "List all tables in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f table.yaml

# Get
f5xcctl get table {name} -n {namespace}

# List
f5xcctl get tables -n {namespace}

# Delete
f5xcctl delete table {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_table" "example" {
  name      = "example-table"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
