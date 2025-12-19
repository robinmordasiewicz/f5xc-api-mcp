---
page_title: f5xc_tls_summary - f5xc-api-mcp
subcategory: Certificates
description: Get TLS Summary
---

# TLS Summary

Returns TLS summary of all HTTPs monitors running in namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tls-summary-list` | Get TLS Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with TLS Summary resources:

### List TLS Summarys

> "List all tls-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tls_summary -n <namespace> -i tls_summary.yaml

# Get
f5xcctl configuration get tls_summary -n <namespace> <name>

# List
f5xcctl configuration list tls_summary -n <namespace>

# Delete
f5xcctl configuration delete tls_summary -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tls_summary" "example" {
  name      = "example-tls-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
