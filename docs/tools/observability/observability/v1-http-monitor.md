---
page_title: f5xc_v1_http_monitor - f5xc-api-mcp
subcategory: Observability
description: Create HTTP Monitor.
---

# V1 HTTP Monitor

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of v1_http_monitor in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-v1-http-monitor-create` | Create HTTP Monitor. |
| `f5xc-api-observability-v1-http-monitor-get` | GET HTTP Monitor. |
| `f5xc-api-observability-v1-http-monitor-list` | List HTTP Monitor. |
| `f5xc-api-observability-v1-http-monitor-update` | Update HTTP Monitor. |
| `f5xc-api-observability-v1-http-monitor-delete` | DELETE HTTP Monitor. |

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

- v1-http-monitor

**Modifies:**

- v1-http-monitor

**Deletes:**

- v1-http-monitor
- contained_resources

## Example Usage

Ask Claude to help you work with V1 HTTP Monitor resources:

### Create V1 HTTP Monitor

> "Create a v1-http-monitor named 'example' in the 'production' namespace"

### List V1 HTTP Monitors

> "List all v1-http-monitors in the 'production' namespace"

### Get V1 HTTP Monitor Details

> "Get details of the v1-http-monitor named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create v1_http_monitor -n <namespace> -i v1_http_monitor.yaml

# Get
xcsh observability get v1_http_monitor <name> -n <namespace>

# List
xcsh observability list v1_http_monitor -n <namespace>

# Delete
xcsh observability delete v1_http_monitor <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_v1_http_monitor" "example" {
  name      = "example-v1-http-monitor"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
