---
page_title: f5xc_alert_template - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Create Domain to protect.
---

# Alert Template

List the set of alert_template in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-alert-template-create` | Create Domain to protect. |
| `f5xc-api-shapesecurity-alert-template-get` | GET Protected Domain. |
| `f5xc-api-shapesecurity-alert-template-list` | List BRM Alerts Alert Template. |
| `f5xc-api-shapesecurity-alert-template-delete` | DELETE BRM Alerts Alert Template. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
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

Ask Claude to help you work with Alert Template resources:

### Create Alert Template

> "Create a alert-template named 'example' in the 'production' namespace"

### List Alert Templates

> "List all alert-templates in the 'production' namespace"

### Get Alert Template Details

> "Get details of the alert-template named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create alert_template -n <namespace> -i alert_template.yaml

# Get
f5xcctl shape_security get alert_template <name> -n <namespace>

# List
f5xcctl shape_security list alert_template -n <namespace>

# Delete
f5xcctl shape_security delete alert_template <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_alert_template" "example" {
  name      = "example-alert-template"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
