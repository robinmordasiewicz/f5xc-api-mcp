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
f5xcctl tenant_management create enable -n <namespace> -i enable.yaml

# Get
f5xcctl tenant_management get enable <name> -n <namespace>

# List
f5xcctl tenant_management list enable -n <namespace>

# Delete
f5xcctl tenant_management delete enable <name> -n <namespace>
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
