---
page_title: f5xc_alert_template - f5xc-api-mcp
subcategory: Monitoring
description: Create Domain to protect
---

# Alert Template

List the set of alert_template in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-alert-template-create` | Create Domain to protect |
| `f5xc-api-core-alert-template-get` | Get Protected Domain |
| `f5xc-api-core-alert-template-list` | List BRM Alerts Alert Template |
| `f5xc-api-core-alert-template-delete` | Delete BRM Alerts Alert Template |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
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
f5xcctl apply -f alert_template.yaml

# Get
f5xcctl get alert_template {name} -n {namespace}

# List
f5xcctl get alert_templates -n {namespace}

# Delete
f5xcctl delete alert_template {name} -n {namespace}
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
