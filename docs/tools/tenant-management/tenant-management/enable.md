---
page_title: f5xc_enable - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Enable tenant level OTP.
---

# Enable

Enable tenant level OTP enables OTP on tenant-level. It enforces each user within a tenant to enable
OTP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-enable-update` | Enable tenant level OTP. |

## Example Usage

Ask Claude to help you work with Enable resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create enable -n <namespace> -i enable.yaml

# Get
f5xcctl configuration get enable -n <namespace> <name>

# List
f5xcctl configuration list enable -n <namespace>

# Delete
f5xcctl configuration delete enable -n <namespace> <name>
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
