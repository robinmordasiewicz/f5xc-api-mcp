---
page_title: f5xc_provision - f5xc-api-mcp
subcategory: Integrations
description: Provision
---

# Provision

Provision CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-provision-create` | Provision |

## Example Usage

Ask Claude to help you work with Provision resources:

### Create Provision

> "Create a provision named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create provision -n <namespace> -i provision.yaml

# Get
f5xcctl configuration get provision -n <namespace> <name>

# List
f5xcctl configuration list provision -n <namespace>

# Delete
f5xcctl configuration delete provision -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_provision" "example" {
  name      = "example-provision"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
