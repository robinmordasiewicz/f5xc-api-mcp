---
page_title: f5xc_signup - f5xc-api-mcp
subcategory: Marketplace
description: Signup AWS Account.
---

# Signup

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Use this API to signup AWS account for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-signup-create` | Signup AWS Account. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- signup

## Example Usage

Ask Claude to help you work with Signup resources:

### Create Signup

> "Create a signup named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create signup -n <namespace> -i signup.yaml

# Get
xcsh marketplace get signup <name> -n <namespace>

# List
xcsh marketplace list signup -n <namespace>

# Delete
xcsh marketplace delete signup <name> -n <namespace>
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
