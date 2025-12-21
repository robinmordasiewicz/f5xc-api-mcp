---
page_title: f5xc_global_log_receiver - f5xc-api-mcp
subcategory: Observability
description: Create Global Log Receiver.
---

# Global Log Receiver

Replaces the content of an Global Log Receiver object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-global-log-receiver-create` | Create Global Log Receiver. |
| `f5xc-api-observability-global-log-receiver-get` | GET Global Log Receiver. |
| `f5xc-api-observability-global-log-receiver-list` | List Global Log Receiver. |
| `f5xc-api-observability-global-log-receiver-update` | Replace Global Log Receiver. |
| `f5xc-api-observability-global-log-receiver-delete` | DELETE Global Log Receiver. |

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

Ask Claude to help you work with Global Log Receiver resources:

### Create Global Log Receiver

> "Create a global-log-receiver named 'example' in the 'production' namespace"

### List Global Log Receivers

> "List all global-log-receivers in the 'production' namespace"

### Get Global Log Receiver Details

> "Get details of the global-log-receiver named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create global_log_receiver -n <namespace> -i global_log_receiver.yaml

# Get
f5xcctl configuration get global_log_receiver -n <namespace> <name>

# List
f5xcctl configuration list global_log_receiver -n <namespace>

# Delete
f5xcctl configuration delete global_log_receiver -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_global_log_receiver" "example" {
  name      = "example-global-log-receiver"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
