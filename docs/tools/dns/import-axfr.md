---
page_title: f5xc_import_axfr - f5xc-api-mcp
subcategory: DNS
description: Import DNS Zone
---

# Import Axfr

Import DNS Zone via AXFR

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-axfr-create` | Import DNS Zone |

## Example Usage

Ask Claude to help you work with Import Axfr resources:

### Create Import Axfr

> "Create a import-axfr named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f import_axfr.yaml

# Get
f5xcctl get import_axfr {name} -n {namespace}

# List
f5xcctl get import_axfrs -n {namespace}

# Delete
f5xcctl delete import_axfr {name} -n {namespace}
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
