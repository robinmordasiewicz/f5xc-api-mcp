---
page_title: f5xc_acces - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Customer access.
---

# Acces

RPC to GET customer access and availability info.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-acces-list` | Customer access. |

## Example Usage

Ask Claude to help you work with Acces resources:

### List Access

> "List all access in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create acces -n <namespace> -i acces.yaml

# Get
f5xcctl configuration get acces -n <namespace> <name>

# List
f5xcctl configuration list acces -n <namespace>

# Delete
f5xcctl configuration delete acces -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_acces" "example" {
  name      = "example-acces"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
