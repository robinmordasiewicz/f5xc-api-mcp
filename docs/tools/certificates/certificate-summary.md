---
page_title: f5xc_certificate_summary - f5xc-api-mcp
subcategory: Certificates
description: Get Certificate Summary
---

# Certificate Summary

Returns list of TLS certificate expirations in specified time window for HTTPs monitors running in
namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-certificate-summary-list` | Get Certificate Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `period_in_days` | period_in_days. |

## Example Usage

Ask Claude to help you work with Certificate Summary resources:

### List Certificate Summarys

> "List all certificate-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create certificate_summary -n <namespace> -i certificate_summary.yaml

# Get
f5xcctl configuration get certificate_summary -n <namespace> <name>

# List
f5xcctl configuration list certificate_summary -n <namespace>

# Delete
f5xcctl configuration delete certificate_summary -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_certificate_summary" "example" {
  name      = "example-certificate-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
