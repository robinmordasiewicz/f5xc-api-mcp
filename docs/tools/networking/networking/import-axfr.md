---
page_title: f5xc_import_axfr - f5xc-api-mcp
subcategory: Networking
description: Import DNS Zone.
---

# Import Axfr

Import DNS Zone via AXFR.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-import-axfr-create` | Import DNS Zone. |

## Example Usage

Ask Claude to help you work with Import Axfr resources:

### Create Import Axfr

> "Create a import-axfr named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create import_axfr -n <namespace> -i import_axfr.yaml

# Get
f5xcctl configuration get import_axfr -n <namespace> <name>

# List
f5xcctl configuration list import_axfr -n <namespace>

# Delete
f5xcctl configuration delete import_axfr -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_import_axfr" "example" {
  name      = "example-import-axfr"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
