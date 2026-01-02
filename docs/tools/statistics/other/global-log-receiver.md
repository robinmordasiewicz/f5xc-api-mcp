---
page_title: f5xc_global_log_receiver - f5xc-api-mcp
subcategory: Statistics
description: Create Global Log Receiver.
---

# Global Log Receiver

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Global Log Receiver object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-global-log-receiver-create` | Create Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-get` | GET Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-list` | List Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-update` | Replace Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-delete` | DELETE Global Log Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

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

- global-log-receiver

**Modifies:**

- global-log-receiver

**Deletes:**

- global-log-receiver
- contained_resources

## Example Usage

Ask Claude to help you work with Global Log Receiver resources:

### Create Global Log Receiver

> "Create a global-log-receiver named 'example' in the 'production' namespace"

### List Global Log Receivers

> "List all global-log-receivers in the 'production' namespace"

### Get Global Log Receiver Details

> "Get details of the global-log-receiver named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create global_log_receiver -n <namespace> -i global_log_receiver.yaml

# Get
xcsh statistics get global_log_receiver <name> -n <namespace>

# List
xcsh statistics list global_log_receiver -n <namespace>

# Delete
xcsh statistics delete global_log_receiver <name> -n <namespace>
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
