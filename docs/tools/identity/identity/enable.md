---
page_title: f5xc_enable - f5xc-api-mcp
subcategory: Identity
description: EnableUserInIDM.
---

# Enable

Enables user in Identity. Use this to enable a user which is disabled.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-enable-update` | EnableUserInIDM. |

## Example Usage

Ask Claude to help you work with Enable resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create enable -n <namespace> -i enable.yaml

# Get
f5xcctl identity get enable <name> -n <namespace>

# List
f5xcctl identity list enable -n <namespace>

# Delete
f5xcctl identity delete enable <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enable" "example" {
  name      = "example-enable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
