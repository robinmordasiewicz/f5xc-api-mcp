---
page_title: f5xc_acces - f5xc-api-mcp
subcategory: Ddos
description: Customer access.
---

# Acces

!!! info "Low Risk"
    Operations on this resource are generally safe.

RPC to GET customer access and availability info.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-acces-list` | Customer access. |

## Example Usage

Ask Claude to help you work with Acces resources:

### List Access

> "List all access in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create acces -n <namespace> -i acces.yaml

# Get
xcsh ddos get acces <name> -n <namespace>

# List
xcsh ddos list acces -n <namespace>

# Delete
xcsh ddos delete acces <name> -n <namespace>
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
