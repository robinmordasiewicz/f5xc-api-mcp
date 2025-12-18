---
page_title: f5xc_alert_receiver - f5xc-api-mcp
subcategory: Monitoring
description: Create Alert Receiver
---

# Alert Receiver

Replaces the content of an Alert Receiver object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-alert-receiver-create` | Create Alert Receiver |
| `f5xc-api-core-alert-receiver-get` | Get Alert Receiver |
| `f5xc-api-core-alert-receiver-list` | List Alert Receiver |
| `f5xc-api-core-alert-receiver-update` | Replace Alert Receiver |
| `f5xc-api-core-alert-receiver-delete` | Delete Alert Receiver |

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

Ask Claude to help you work with Alert Receiver resources:

### Create Alert Receiver

> "Create a alert-receiver named 'example' in the 'production' namespace"

### List Alert Receivers

> "List all alert-receivers in the 'production' namespace"

### Get Alert Receiver Details

> "Get details of the alert-receiver named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f alert_receiver.yaml

# Get
f5xcctl get alert_receiver {name} -n {namespace}

# List
f5xcctl get alert_receivers -n {namespace}

# Delete
f5xcctl delete alert_receiver {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_alert_receiver" "example" {
  name      = "example-alert-receiver"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
