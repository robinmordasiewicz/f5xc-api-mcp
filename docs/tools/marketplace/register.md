---
page_title: f5xc_register - f5xc-api-mcp
subcategory: Marketplace
description: Register New AWS Account.
---

# Register

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Use this API to register F5XC AWS marketplace product for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-register-create` | Register New AWS Account. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- register

## Example Usage

Ask Claude to help you work with Register resources:

### Create Register

> "Create a register named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create register -n <namespace> -i register.yaml

# Get
xcsh marketplace get register <name> -n <namespace>

# List
xcsh marketplace list register -n <namespace>

# Delete
xcsh marketplace delete register <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_register" "example" {
  name      = "example-register"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
