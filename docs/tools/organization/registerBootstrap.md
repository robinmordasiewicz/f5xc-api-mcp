---
page_title: f5xc_registerBootstrap - f5xc-api-mcp
subcategory: Organization
description: Registration Create
---

# RegisterBootstrap

Registration request to create registration is sent by the node on first boot. User never creates
registration on her own.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-registerbootstrap-create` | Registration Create |

## Example Usage

Ask Claude to help you work with RegisterBootstrap resources:

### Create RegisterBootstrap

> "Create a registerBootstrap named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create registerBootstrap -n <namespace> -i registerBootstrap.yaml

# Get
f5xcctl configuration get registerBootstrap -n <namespace> <name>

# List
f5xcctl configuration list registerBootstrap -n <namespace>

# Delete
f5xcctl configuration delete registerBootstrap -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_registerBootstrap" "example" {
  name      = "example-registerBootstrap"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
