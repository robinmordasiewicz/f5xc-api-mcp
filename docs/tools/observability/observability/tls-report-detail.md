---
page_title: f5xc_tls_report_detail - f5xc-api-mcp
subcategory: Observability
description: GET TLS Report Detail.
---

# TLS Report Detail

Returns the HTML encoding of the generated TLS report.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-tls-report-detail-list` | GET TLS Report Detail. |

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

Ask Claude to help you work with TLS Report Detail resources:

### List TLS Report Details

> "List all tls-report-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create tls_report_detail -n <namespace> -i tls_report_detail.yaml

# Get
f5xcctl observability get tls_report_detail <name> -n <namespace>

# List
f5xcctl observability list tls_report_detail -n <namespace>

# Delete
f5xcctl observability delete tls_report_detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tls_report_detail" "example" {
  name      = "example-tls-report-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
