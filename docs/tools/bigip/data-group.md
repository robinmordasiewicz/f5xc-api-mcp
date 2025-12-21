---
page_title: f5xc_data_group - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Create Data group.
---

# Data Group

Create data group in a given namespace. If one already exists it will give an error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-data-group-create` | Create Data group. |
| `f5xc-api-bigip-data-group-get` | GET Data Group. |
| `f5xc-api-bigip-data-group-list` | List Data Group. |
| `f5xc-api-bigip-data-group-update` | Replace Data Group. |
| `f5xc-api-bigip-data-group-delete` | DELETE Data Group. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Data Group resources:

### Create Data Group

> "Create a data-group named 'example' in the 'production' namespace"

### List Data Groups

> "List all data-groups in the 'production' namespace"

### Get Data Group Details

> "Get details of the data-group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create data_group -n <namespace> -i data_group.yaml

# Get
f5xcctl configuration get data_group -n <namespace> <name>

# List
f5xcctl configuration list data_group -n <namespace>

# Delete
f5xcctl configuration delete data_group -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_data_group" "example" {
  name      = "example-data-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
