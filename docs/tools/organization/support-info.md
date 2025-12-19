---
page_title: f5xc_support_info - f5xc-api-mcp
subcategory: Organization
description: Support Info
---

# Support Info

Receive support information for tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-support-info-list` | Support Info |

## Example Usage

Ask Claude to help you work with Support Info resources:

### List Support Infos

> "List all support-infos in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create support_info -n <namespace> -i support_info.yaml

# Get
f5xcctl configuration get support_info -n <namespace> <name>

# List
f5xcctl configuration list support_info -n <namespace>

# Delete
f5xcctl configuration delete support_info -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_support_info" "example" {
  name      = "example-support-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
