---
page_title: f5xc_api_definition - f5xc-api-mcp
subcategory: Security
description: Create API Definition.
---

# API Definition

List the set of api_definition in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-api-definition-create` | Create API Definition. |
| `f5xc-api-security-api-definition-get` | GET API Definition. |
| `f5xc-api-security-api-definition-list` | List API Definition. |
| `f5xc-api-security-api-definition-update` | Replace API Definition. |
| `f5xc-api-security-api-definition-delete` | DELETE API Definition. |

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

Ask Claude to help you work with API Definition resources:

### Create API Definition

> "Create a api-definition named 'example' in the 'production' namespace"

### List API Definitions

> "List all api-definitions in the 'production' namespace"

### Get API Definition Details

> "Get details of the api-definition named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create api_definition -n <namespace> -i api_definition.yaml

# Get
f5xcctl configuration get api_definition -n <namespace> <name>

# List
f5xcctl configuration list api_definition -n <namespace>

# Delete
f5xcctl configuration delete api_definition -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_api_definition" "example" {
  name      = "example-api-definition"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
