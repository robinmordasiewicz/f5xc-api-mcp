---
page_title: f5xc_table - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Analyst Block Table as a CSV file.
---

# Table

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Safe block table as CSV file.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-table-list` | GET SAFE Analyst Block Table as a CSV file. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `action` | The action type - can be block or allow. | `Block` |
| `from` | Timestamp representing start date of the requested period in millieseconds. | `1638320400000.` |
| `to` | Timestamp representing end date of the requested period in millieseconds. | `1639382940000.` |
| `version` | The API version to use. | `V2` |

## Example Usage

Ask Claude to help you work with Table resources:

### List Tables

> "List all tables in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl shape table list --namespace {namespace}
```

List all tables

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create table -n <namespace> -i table.yaml

# Get
f5xcctl shape get table <name> -n <namespace>

# List
f5xcctl shape list table -n <namespace>

# Delete
f5xcctl shape delete table <name> -n <namespace>
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
