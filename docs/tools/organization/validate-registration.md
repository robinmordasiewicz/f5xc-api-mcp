---
page_title: f5xc_validate_registration - f5xc-api-mcp
subcategory: Organization
description: Validate Registration
---

# Validate Registration

ValidateRegistration validates if the signup registration request is valid when a new customer
attempts to signup

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-validate-registration-create` | Validate Registration |

## Example Usage

Ask Claude to help you work with Validate Registration resources:

### Create Validate Registration

> "Create a validate-registration named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create validate_registration -n <namespace> -i validate_registration.yaml

# Get
f5xcctl configuration get validate_registration -n <namespace> <name>

# List
f5xcctl configuration list validate_registration -n <namespace>

# Delete
f5xcctl configuration delete validate_registration -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_validate_registration" "example" {
  name      = "example-validate-registration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
