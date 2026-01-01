---
page_title: f5xc_alert_template - f5xc-api-mcp
subcategory: Shape
description: Create Domain to protect.
---

# Alert Template

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of alert_template in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-alert-template-create` | Create Domain to protect. |
| `f5xc-api-shape-alert-template-get` | GET Protected Domain. |
| `f5xc-api-shape-alert-template-list` | List BRM Alerts Alert Template. |
| `f5xc-api-shape-alert-template-delete` | DELETE BRM Alerts Alert Template. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

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

- alert-template

**Deletes:**

- alert-template
- contained_resources

## Example Usage

Ask Claude to help you work with Alert Template resources:

### Create Alert Template

> "Create a alert-template named 'example' in the 'production' namespace"

### List Alert Templates

> "List all alert-templates in the 'production' namespace"

### Get Alert Template Details

> "Get details of the alert-template named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create alert_template -n <namespace> -i alert_template.yaml

# Get
xcsh shape get alert_template <name> -n <namespace>

# List
xcsh shape list alert_template -n <namespace>

# Delete
xcsh shape delete alert_template <name> -n <namespace>
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
