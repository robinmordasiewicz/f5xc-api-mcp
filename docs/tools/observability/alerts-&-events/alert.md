---
page_title: f5xc_alert - f5xc-api-mcp
subcategory: Observability
description: GET Alerts.
---

# Alert

GET alerts matching the filter for the given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-alert-list` | GET Alerts. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `filter` | HighDiskUsage\", severity=\"critical\"}" |
| `inactive` | If set to true, active alerts will not be returned in the response. |
| `inhibited` | Show inhibited alerts - alerts that are suppressed if certain other alerts are firing. |
| `silenced` | Show silenced alerts - alerts that are muted based on the matchers configured in the alert manager. |
| `unprocessed` | Show unprocessed alerts. |

## Example Usage

Ask Claude to help you work with Alert resources:

### List Alerts

> "List all alerts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create alert -n <namespace> -i alert.yaml

# Get
f5xcctl observability get alert <name> -n <namespace>

# List
f5xcctl observability list alert -n <namespace>

# Delete
f5xcctl observability delete alert <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_alert" "example" {
  name      = "example-alert"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
