---
page_title: f5xc_all_ns_alert - f5xc-api-mcp
subcategory: Organization
description: Get Alerts
---

# All Ns Alert

For system namespace, all the alerts for the tenant matching the filter specified in the
request
will be returned in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-all-ns-alert-list` | Get Alerts |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `filter` | The filter parameter |
| `inactive` | The inactive parameter |
| `inhibited` | The inhibited parameter |
| `namespace` | The namespace parameter |
| `silenced` | The silenced parameter |
| `unprocessed` | The unprocessed parameter |

## Example Usage

Ask Claude to help you work with All Ns Alert resources:

### List All Ns Alerts

> "List all all-ns-alerts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f all_ns_alert.yaml

# Get
f5xcctl get all_ns_alert {name} -n {namespace}

# List
f5xcctl get all_ns_alerts -n {namespace}

# Delete
f5xcctl delete all_ns_alert {name} -n {namespace}
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
