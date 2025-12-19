---
page_title: f5xc_age - f5xc-api-mcp
subcategory: Organization
description: Get Devices By Age
---

# Age

Get device age information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-age-create` | Get Devices By Age |

## Example Usage

Ask Claude to help you work with Age resources:

### Create Age

> "Create a age named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create age -n <namespace> -i age.yaml

# Get
f5xcctl configuration get age -n <namespace> <name>

# List
f5xcctl configuration list age -n <namespace>

# Delete
f5xcctl configuration delete age -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_age" "example" {
  name      = "example-age"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
