---
page_title: f5xc_data_type - f5xc-api-mcp
subcategory: Security
description: Create Data Type
---

# Data Type

Replace data_type replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-data-type-create` | Create Data Type |
| `f5xc-api-core-data-type-get` | Get Data Type |
| `f5xc-api-core-data-type-list` | List Data Type |
| `f5xc-api-core-data-type-update` | Replace Data Type |
| `f5xc-api-core-data-type-delete` | Delete Data Type |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Data Type resources:

### Create Data Type

> "Create a data-type named 'example' in the 'production' namespace"

### List Data Types

> "List all data-types in the 'production' namespace"

### Get Data Type Details

> "Get details of the data-type named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create data_type -n <namespace> -i data_type.yaml

# Get
f5xcctl configuration get data_type -n <namespace> <name>

# List
f5xcctl configuration list data_type -n <namespace>

# Delete
f5xcctl configuration delete data_type -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_data_type" "example" {
  name      = "example-data-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
