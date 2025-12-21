---
page_title: f5xc_dashboard - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Script Overview.
---

# Dashboard

GET script overview data for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-dashboard-get` | GET Script Overview. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | X-required |
| `start_time` | X-required |
| `type` | X-required |

## Example Usage

Ask Claude to help you work with Dashboard resources:

### Get Dashboard Details

> "Get details of the dashboard named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create dashboard -n <namespace> -i dashboard.yaml

# Get
f5xcctl shape_security get dashboard <name> -n <namespace>

# List
f5xcctl shape_security list dashboard -n <namespace>

# Delete
f5xcctl shape_security delete dashboard <name> -n <namespace>
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
