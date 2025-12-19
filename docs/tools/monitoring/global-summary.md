---
page_title: f5xc_global_summary - f5xc-api-mcp
subcategory: Monitoring
description: Get Global Summary
---

# Global Summary

Returns a healthy and critical count of all monitors in namespace, based on monitor type

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-global-summary-list` | Get Global Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `monitor_type` | monitor_type. |

## Example Usage

Ask Claude to help you work with Global Summary resources:

### List Global Summarys

> "List all global-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create global_summary -n <namespace> -i global_summary.yaml

# Get
f5xcctl configuration get global_summary -n <namespace> <name>

# List
f5xcctl configuration list global_summary -n <namespace>

# Delete
f5xcctl configuration delete global_summary -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_global_summary" "example" {
  name      = "example-global-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
