---
page_title: f5xc_record_type_summary - f5xc-api-mcp
subcategory: Observability
description: GET Record Type Summary.
---

# Record Type Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns record type summary for DNS monitor including record type and count.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-record-type-summary-list` | GET Record Type Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

## Example Usage

Ask Claude to help you work with Record Type Summary resources:

### List Record Type Summarys

> "List all record-type-summarys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create record_type_summary -n <namespace> -i record_type_summary.yaml

# Get
xcsh observability get record_type_summary <name> -n <namespace>

# List
xcsh observability list record_type_summary -n <namespace>

# Delete
xcsh observability delete record_type_summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_record_type_summary" "example" {
  name      = "example-record-type-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
