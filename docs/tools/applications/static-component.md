---
page_title: f5xc_static_component - f5xc-api-mcp
subcategory: Applications
description: GET UI static component.
---

# Static Component

List the set of static_component in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-static-component-get` | GET UI static component. |
| `f5xc-api-applications-static-component-list` | List UI Static Component. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
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
f5xcctl applications create static_component -n <namespace> -i static_component.yaml

# Get
f5xcctl applications get static_component <name> -n <namespace>

# List
f5xcctl applications list static_component -n <namespace>

# Delete
f5xcctl applications delete static_component <name> -n <namespace>
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
