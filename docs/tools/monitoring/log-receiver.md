---
page_title: f5xc_log_receiver - f5xc-api-mcp
subcategory: Monitoring
description: Create Log Receiver
---

# Log Receiver

Replaces the content of an Log Receiver object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-log-receiver-create` | Create Log Receiver |
| `f5xc-api-core-log-receiver-get` | Get Log Receiver |
| `f5xc-api-core-log-receiver-list` | List Log Receiver |
| `f5xc-api-core-log-receiver-update` | Replace Log Receiver |
| `f5xc-api-core-log-receiver-delete` | Delete Log Receiver |

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

Ask Claude to help you work with Log Receiver resources:

### Create Log Receiver

> "Create a log-receiver named 'example' in the 'production' namespace"

### List Log Receivers

> "List all log-receivers in the 'production' namespace"

### Get Log Receiver Details

> "Get details of the log-receiver named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create log_receiver -n <namespace> -i log_receiver.yaml

# Get
f5xcctl configuration get log_receiver -n <namespace> <name>

# List
f5xcctl configuration list log_receiver -n <namespace>

# Delete
f5xcctl configuration delete log_receiver -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_log_receiver" "example" {
  name      = "example-log-receiver"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
