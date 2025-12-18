---
page_title: f5xc_register - f5xc-api-mcp
subcategory: Organization
description: Register New AWS Account
---

# Register

Use this API to register F5XC AWS marketplace product for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-register-create` | Register New AWS Account |

## Example Usage

Ask Claude to help you work with Register resources:

### Create Register

> "Create a register named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f register.yaml

# Get
f5xcctl get register {name} -n {namespace}

# List
f5xcctl get registers -n {namespace}

# Delete
f5xcctl delete register {name} -n {namespace}
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
