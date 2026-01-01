---
page_title: f5xc_certificate_report_detail - f5xc-api-mcp
subcategory: Observability
description: GET Certificate Report Detail.
---

# Certificate Report Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the certificate report detail.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-certificate-report-detail-list` | GET Certificate Report Detail. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

## Example Usage

Ask Claude to help you work with Certificate Report Detail resources:

### List Certificate Report Details

> "List all certificate-report-details in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create certificate_report_detail -n <namespace> -i certificate_report_detail.yaml

# Get
xcsh observability get certificate_report_detail <name> -n <namespace>

# List
xcsh observability list certificate_report_detail -n <namespace>

# Delete
xcsh observability delete certificate_report_detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_certificate_report_detail" "example" {
  name      = "example-certificate-report-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
