---
page_title: f5xc_api_group_element - f5xc-api-mcp
subcategory: API Security
description: Get API Group Element
---

# API Group Element

Get api_group_element reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-api-group-element-get` | Get API Group Element |
| `f5xc-api-core-api-group-element-list` | List API Group Element |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with API Group Element resources:

### List API Group Elements

> "List all api-group-elements in the 'production' namespace"

### Get API Group Element Details

> "Get details of the api-group-element named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create api_group_element -n <namespace> -i api_group_element.yaml

# Get
f5xcctl configuration get api_group_element -n <namespace> <name>

# List
f5xcctl configuration list api_group_element -n <namespace>

# Delete
f5xcctl configuration delete api_group_element -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_api_group_element" "example" {
  name      = "example-api-group-element"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
