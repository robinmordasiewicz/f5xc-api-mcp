---
page_title: f5xc_top_reason_code - f5xc-api-mcp
subcategory: Organization
description: Peergroup Top Reason Codes
---

# Top Reason Code

Get Top Reason Codes

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-reason-code-create` | Peergroup Top Reason Codes |

## Example Usage

Ask Claude to help you work with Top Reason Code resources:

### Create Top Reason Code

> "Create a top-reason-code named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create top_reason_code -n <namespace> -i top_reason_code.yaml

# Get
f5xcctl configuration get top_reason_code -n <namespace> <name>

# List
f5xcctl configuration list top_reason_code -n <namespace>

# Delete
f5xcctl configuration delete top_reason_code -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_top_reason_code" "example" {
  name      = "example-top-reason-code"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
