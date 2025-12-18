---
page_title: f5xc_disable - f5xc-api-mcp
subcategory: Organization
description: Disable tenant level OTP
---

# Disable

Disable tenant level OTP disables OTP on tenant-level. After it's disabled it's up to user whether
to enable OTP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-disable-update` | Disable tenant level OTP |

## Example Usage

Ask Claude to help you work with Disable resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f disable.yaml

# Get
f5xcctl get disable {name} -n {namespace}

# List
f5xcctl get disables -n {namespace}

# Delete
f5xcctl delete disable {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_disable" "example" {
  name      = "example-disable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
