---
page_title: f5xc_api_group - f5xc-api-mcp
subcategory: API
description: GET API Group.
---

# API Group

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET api_group reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-group-get` | GET API Group. |
| `f5xc-api-api-api-group-list` | List API Group. |

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

Ask Claude to help you work with API Group resources:

### List API Groups

> "List all api-groups in the 'production' namespace"

### Get API Group Details

> "Get details of the api-group named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create api_group -n <namespace> -i api_group.yaml

# Get
xcsh api get api_group <name> -n <namespace>

# List
xcsh api list api_group -n <namespace>

# Delete
xcsh api delete api_group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_api_group" "example" {
  name      = "example-api-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
