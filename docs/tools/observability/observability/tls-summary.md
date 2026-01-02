---
page_title: f5xc_tls_summary - f5xc-api-mcp
subcategory: Observability
description: GET TLS Summary.
---

# TLS Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns TLS summary of all HTTPS monitors running in namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-tls-summary-list` | GET TLS Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

## Example Usage

Ask Claude to help you work with TLS Summary resources:

### List TLS Summarys

> "List all tls-summarys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create tls_summary -n <namespace> -i tls_summary.yaml

# Get
xcsh observability get tls_summary <name> -n <namespace>

# List
xcsh observability list tls_summary -n <namespace>

# Delete
xcsh observability delete tls_summary <name> -n <namespace>
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
