---
page_title: f5xc_alert_policy - f5xc-api-mcp
subcategory: Monitoring
description: Create Alert Policy
---

# Alert Policy

Replaces the content of the Alert Policy Object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-alert-policy-create` | Create Alert Policy |
| `f5xc-api-core-alert-policy-get` | Get Alert Policy |
| `f5xc-api-core-alert-policy-list` | List Alert Policy |
| `f5xc-api-core-alert-policy-update` | Replace Alert Policy |
| `f5xc-api-core-alert-policy-delete` | Delete Alert Policy |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl apply -f alert_policy.yaml

# Get
f5xcctl get alert_policy {name} -n {namespace}

# List
f5xcctl get alert_policys -n {namespace}

# Delete
f5xcctl delete alert_policy {name} -n {namespace}
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
