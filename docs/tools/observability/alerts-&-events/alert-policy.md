---
page_title: f5xc_alert_policy - f5xc-api-mcp
subcategory: Observability
description: Create Alert Policy.
---

# Alert Policy

Replaces the content of the Alert Policy Object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-alert-policy-create` | Create Alert Policy. |
| `f5xc-api-observability-alert-policy-get` | GET Alert Policy. |
| `f5xc-api-observability-alert-policy-list` | List Alert Policy. |
| `f5xc-api-observability-alert-policy-update` | Replace Alert Policy. |
| `f5xc-api-observability-alert-policy-delete` | DELETE Alert Policy. |

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

Ask Claude to help you work with Alert Policy resources:

### Create Alert Policy

> "Create a alert-policy named 'example' in the 'production' namespace"

### List Alert Policys

> "List all alert-policys in the 'production' namespace"

### Get Alert Policy Details

> "Get details of the alert-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create alert_policy -n <namespace> -i alert_policy.yaml

# Get
f5xcctl observability get alert_policy <name> -n <namespace>

# List
f5xcctl observability list alert_policy -n <namespace>

# Delete
f5xcctl observability delete alert_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_alert_policy" "example" {
  name      = "example-alert-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
