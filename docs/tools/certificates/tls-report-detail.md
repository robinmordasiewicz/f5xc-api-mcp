---
page_title: f5xc_tls_report_detail - f5xc-api-mcp
subcategory: Certificates
description: Get TLS Report Detail
---

# TLS Report Detail

Returns the HTML encoding of the generated TLS report

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tls-report-detail-list` | Get TLS Report Detail |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `monitor_name` | monitor_name. x-required |

## Example Usage

Ask Claude to help you work with TLS Report Detail resources:

### List TLS Report Details

> "List all tls-report-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f tls_report_detail.yaml

# Get
f5xcctl get tls_report_detail {name} -n {namespace}

# List
f5xcctl get tls_report_details -n {namespace}

# Delete
f5xcctl delete tls_report_detail {name} -n {namespace}
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
