---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Tenant And Identity
description: Summary
---

# Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

This API returns tenant summary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-summary-list` | Summary |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tenant` | Tenant ID | `-` |

## Example Usage

Ask Claude to help you work with Summary resources:

### List Summarys

> "List all summarys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create summary -n <namespace> -i summary.yaml

# Get
xcsh tenant_and_identity get summary <name> -n <namespace>

# List
xcsh tenant_and_identity list summary -n <namespace>

# Delete
xcsh tenant_and_identity delete summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_summary" "example" {
  name      = "example-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
