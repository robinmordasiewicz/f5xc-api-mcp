---
page_title: f5xc_signup - f5xc-api-mcp
subcategory: Subscriptions
description: Signup AWS Account.
---

# Signup

Use this API to signup AWS account for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-signup-create` | Signup AWS Account. |

## Example Usage

Ask Claude to help you work with Signup resources:

### Create Signup

> "Create a signup named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create signup -n <namespace> -i signup.yaml

# Get
f5xcctl configuration get signup -n <namespace> <name>

# List
f5xcctl configuration list signup -n <namespace>

# Delete
f5xcctl configuration delete signup -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_signup" "example" {
  name      = "example-signup"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
