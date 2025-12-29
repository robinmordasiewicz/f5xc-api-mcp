---
page_title: f5xc_dashboard - f5xc-api-mcp
subcategory: Shape
description: GET Script Overview.
---

# Dashboard

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET script overview data for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-dashboard-get` | GET Script Overview. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `S-1234567` |
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | X-required | `1570194300.` |
| `start_time` | X-required | `1570194000.` |
| `type` | X-required | `NEW` |

## Example Usage

Ask Claude to help you work with Dashboard resources:

### Get Dashboard Details

> "Get details of the dashboard named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape dashboard get {name} --namespace {namespace}
```

Get specific dashboard

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create dashboard -n <namespace> -i dashboard.yaml

# Get
f5xcctl shape get dashboard <name> -n <namespace>

# List
f5xcctl shape list dashboard -n <namespace>

# Delete
f5xcctl shape delete dashboard <name> -n <namespace>
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
