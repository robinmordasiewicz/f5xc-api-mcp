---
page_title: f5xc_source_summary - f5xc-api-mcp
subcategory: Observability
description: GET Source Summary.
---

# Source Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the healthy and critical status count, latency, and coordinates for each source region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-source-summary-list` | GET Source Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `label_filter` | Label_filter. | `F5 XC/country in (VES-I/O-usa), F5 XC/siteType=VES-I/O-RE.` |
| `monitor_name` | Monitor_name. | `Monitor1` |
| `monitor_type` | Monitor_type. X-required | `HTTP` |

## Example Usage

Ask Claude to help you work with Source Summary resources:

### List Source Summarys

> "List all source-summarys in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl observability source-summary list --namespace {namespace}
```

List all source-summarys

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create source_summary -n <namespace> -i source_summary.yaml

# Get
f5xcctl observability get source_summary <name> -n <namespace>

# List
f5xcctl observability list source_summary -n <namespace>

# Delete
f5xcctl observability delete source_summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_source_summary" "example" {
  name      = "example-source-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
