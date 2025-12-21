---
page_title: f5xc_import - f5xc-api-mcp
subcategory: Networking
description: Import F5 Cloud Services DNS Zone.
---

# Import

Import F5 Cloud Services DNS Zone.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-import-create` | Import F5 Cloud Services DNS Zone. |

## Example Usage

Ask Claude to help you work with Import resources:

### Create Import

> "Create a import named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create import -n <namespace> -i import.yaml

# Get
f5xcctl networking get import <name> -n <namespace>

# List
f5xcctl networking list import -n <namespace>

# Delete
f5xcctl networking delete import <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_import" "example" {
  name      = "example-import"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
