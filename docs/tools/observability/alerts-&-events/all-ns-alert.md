---
page_title: f5xc_all_ns_alert - f5xc-api-mcp
subcategory: Observability
description: GET Alerts.
---

# All Ns Alert

For system namespace, all the alerts for the tenant matching the filter specified in the
request
will be returned in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-all-ns-alert-list` | GET Alerts. |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `filter` | HighDiskUsage\", severity=\"critical\"}" |
| `inactive` | If set to true, active alerts will not be returned in the response. |
| `inhibited` | Show inhibited alerts - alerts that are suppressed if certain other alerts are firing. |
| `namespace` | Namespace to scope the listing of alerts. |
| `silenced` | Show silenced alerts - alerts that are muted based on the matchers configured in the alert manager. |
| `unprocessed` | Show unprocessed alerts. |

## Example Usage

Ask Claude to help you work with All Ns Alert resources:

### List All Ns Alerts

> "List all all-ns-alerts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create all_ns_alert -n <namespace> -i all_ns_alert.yaml

# Get
f5xcctl observability get all_ns_alert <name> -n <namespace>

# List
f5xcctl observability list all_ns_alert -n <namespace>

# Delete
f5xcctl observability delete all_ns_alert <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_all_ns_alert" "example" {
  name      = "example-all-ns-alert"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
