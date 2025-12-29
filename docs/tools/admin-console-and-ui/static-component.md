---
page_title: f5xc_static_component - f5xc-api-mcp
subcategory: Admin Console And Ui
description: GET UI static component.
---

# Static Component

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of static_component in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-adminconsoleandui-static-component-get` | GET UI static component. |
| `f5xc-api-adminconsoleandui-static-component-list` | List UI Static Component. |

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

Ask Claude to help you work with Static Component resources:

### List Static Components

> "List all static-components in the 'production' namespace"

### Get Static Component Details

> "Get details of the static-component named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl web static-component get {name} --namespace {namespace}
```

Get specific static-component

### list_all

```bash
f5xcctl web static-component list --namespace {namespace}
```

List all static-components

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl admin_console_and_ui create static_component -n <namespace> -i static_component.yaml

# Get
f5xcctl admin_console_and_ui get static_component <name> -n <namespace>

# List
f5xcctl admin_console_and_ui list static_component -n <namespace>

# Delete
f5xcctl admin_console_and_ui delete static_component <name> -n <namespace>
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
