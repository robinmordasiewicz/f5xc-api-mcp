---
page_title: f5xc_record_type_summary - f5xc-api-mcp
subcategory: Organization
description: Get Record Type Summary
---

# Record Type Summary

Returns record type summary for DNS monitor including record type and count

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-record-type-summary-list` | Get Record Type Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Record Type Summary resources:

### List Record Type Summarys

> "List all record-type-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f record_type_summary.yaml

# Get
f5xcctl get record_type_summary {name} -n {namespace}

# List
f5xcctl get record_type_summarys -n {namespace}

# Delete
f5xcctl delete record_type_summary {name} -n {namespace}
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
