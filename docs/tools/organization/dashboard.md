---
page_title: f5xc_dashboard - f5xc-api-mcp
subcategory: Organization
description: Get Script Overview
---

# Dashboard

Get script overview data for a script depending on start time and end time

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dashboard-get` | Get Script Overview |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | id |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | The end_time parameter |
| `start_time` | The start_time parameter |
| `type` | The type parameter |

## Example Usage

Ask Claude to help you work with Dashboard resources:

### Get Dashboard Details

> "Get details of the dashboard named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f dashboard.yaml

# Get
f5xcctl get dashboard {name} -n {namespace}

# List
f5xcctl get dashboards -n {namespace}

# Delete
f5xcctl delete dashboard {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_dashboard" "example" {
  name      = "example-dashboard"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
