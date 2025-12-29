---
page_title: f5xc_health_statu - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Discovered Service Health Status.
---

# Health Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Discovered Service Health status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-health-statu-get` | Discovered Service Health Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Vs1` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Health Statu resources:

### Get Health Statu Details

> "Get details of the health-statu named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl data health-statu get {name} --namespace {namespace}
```

Get specific health-statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create health_statu -n <namespace> -i health_statu.yaml

# Get
f5xcctl telemetry_and_insights get health_statu <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list health_statu -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete health_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_health_statu" "example" {
  name      = "example-health-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
