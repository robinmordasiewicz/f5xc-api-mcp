---
page_title: f5xc_register - f5xc-api-mcp
subcategory: Subscriptions
description: Register New AWS Account.
---

# Register

Use this API to register F5XC AWS marketplace product for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-register-create` | Register New AWS Account. |

## Example Usage

Ask Claude to help you work with Register resources:

### Create Register

> "Create a register named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl subscriptions create register -n <namespace> -i register.yaml

# Get
f5xcctl subscriptions get register <name> -n <namespace>

# List
f5xcctl subscriptions list register -n <namespace>

# Delete
f5xcctl subscriptions delete register <name> -n <namespace>
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
