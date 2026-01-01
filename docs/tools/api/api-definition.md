---
page_title: f5xc_api_definition - f5xc-api-mcp
subcategory: API
description: Create API Definition.
---

# API Definition

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of api_definition in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-definition-create` | Create API Definition. |
| `f5xc-api-api-api-definition-get` | GET API Definition. |
| `f5xc-api-api-api-definition-list` | List API Definition. |
| `f5xc-api-api-api-definition-update` | Replace API Definition. |
| `f5xc-api-api-api-definition-delete` | DELETE API Definition. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- api-definition

**Modifies:**

- api-definition

**Deletes:**

- api-definition
- contained_resources

## Example Usage

Ask Claude to help you work with API Definition resources:

### Create API Definition

> "Create a api-definition named 'example' in the 'production' namespace"

### List API Definitions

> "List all api-definitions in the 'production' namespace"

### Get API Definition Details

> "Get details of the api-definition named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create api_definition -n <namespace> -i api_definition.yaml

# Get
xcsh api get api_definition <name> -n <namespace>

# List
xcsh api list api_definition -n <namespace>

# Delete
xcsh api delete api_definition <name> -n <namespace>
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
