---
page_title: f5xc_api_testing - f5xc-api-mcp
subcategory: API Security
description: Create API Testing.
---

# API Testing

List the set of api_testing in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-apisecurity-api-testing-create` | Create API Testing. |
| `f5xc-api-apisecurity-api-testing-get` | GET API testing. |
| `f5xc-api-apisecurity-api-testing-list` | List API Testing. |
| `f5xc-api-apisecurity-api-testing-update` | Replace API testing. |
| `f5xc-api-apisecurity-api-testing-delete` | DELETE API Testing. |

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

Ask Claude to help you work with API Testing resources:

### Create API Testing

> "Create a api-testing named 'example' in the 'production' namespace"

### List API Testings

> "List all api-testings in the 'production' namespace"

### Get API Testing Details

> "Get details of the api-testing named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create api_testing -n <namespace> -i api_testing.yaml

# Get
f5xcctl configuration get api_testing -n <namespace> <name>

# List
f5xcctl configuration list api_testing -n <namespace>

# Delete
f5xcctl configuration delete api_testing -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_api_testing" "example" {
  name      = "example-api-testing"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
