---
page_title: f5xc_static_component - f5xc-api-mcp
subcategory: Organization
description: Get Ui static component
---

# Static Component

List the set of static_component in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-static-component-get` | Get Ui static component |
| `f5xc-api-core-static-component-list` | List Ui Static Component |

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

Ask Claude to help you work with Static Component resources:

### List Static Components

> "List all static-components in the 'production' namespace"

### Get Static Component Details

> "Get details of the static-component named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create static_component -n <namespace> -i static_component.yaml

# Get
f5xcctl configuration get static_component -n <namespace> <name>

# List
f5xcctl configuration list static_component -n <namespace>

# Delete
f5xcctl configuration delete static_component -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_static_component" "example" {
  name      = "example-static-component"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
