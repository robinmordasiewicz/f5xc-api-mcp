---
page_title: f5xc_tls_report_summary - f5xc-api-mcp
subcategory: Observability
description: GET TLS Report Summary.
---

# TLS Report Summary

Returns the TLS report summary including grade, score, and protocol names.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-tls-report-summary-list` | GET TLS Report Summary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `monitor_name` | Monitor_name. X-required |

## Example Usage

Ask Claude to help you work with TLS Report Summary resources:

### List TLS Report Summarys

> "List all tls-report-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create tls_report_summary -n <namespace> -i tls_report_summary.yaml

# Get
f5xcctl observability get tls_report_summary <name> -n <namespace>

# List
f5xcctl observability list tls_report_summary -n <namespace>

# Delete
f5xcctl observability delete tls_report_summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tls_report_summary" "example" {
  name      = "example-tls-report-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
