---
page_title: f5xc_api_group_element - f5xc-api-mcp
subcategory: API
description: GET API Group Element.
---

# API Group Element

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET api_group_element reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-group-element-get` | GET API Group Element. |
| `f5xc-api-api-api-group-element-list` | List API Group Element. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with API Group Element resources:

### List API Group Elements

> "List all api-group-elements in the 'production' namespace"

### Get API Group Element Details

> "Get details of the api-group-element named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create api_group_element -n <namespace> -i api_group_element.yaml

# Get
xcsh api get api_group_element <name> -n <namespace>

# List
xcsh api list api_group_element -n <namespace>

# Delete
xcsh api delete api_group_element <name> -n <namespace>
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
