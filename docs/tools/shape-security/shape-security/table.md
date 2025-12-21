---
page_title: f5xc_table - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET SAFE Analyst Block Table as a CSV file.
---

# Table

GET Safe block table as CSV file.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-table-list` | GET SAFE Analyst Block Table as a CSV file. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `action` | The action type - can be block or allow. |
| `from` | Timestamp representing start date of the requested period in millieseconds. |
| `to` | Timestamp representing end date of the requested period in millieseconds. |
| `version` | The API version to use. |

## Example Usage

Ask Claude to help you work with Table resources:

### List Tables

> "List all tables in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create table -n <namespace> -i table.yaml

# Get
f5xcctl shape_security get table <name> -n <namespace>

# List
f5xcctl shape_security list table -n <namespace>

# Delete
f5xcctl shape_security delete table <name> -n <namespace>
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
