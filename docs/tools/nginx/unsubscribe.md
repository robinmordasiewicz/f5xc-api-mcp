---
page_title: f5xc_unsubscribe - f5xc-api-mcp
subcategory: Nginx
description: Unsubscribe to NGINX One.
---

# Unsubscribe

Unsubscribe to NGINX One.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginx-unsubscribe-create` | Unsubscribe to NGINX One. |

## Example Usage

Ask Claude to help you work with Unsubscribe resources:

### Create Unsubscribe

> "Create a unsubscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create unsubscribe -n <namespace> -i unsubscribe.yaml

# Get
f5xcctl configuration get unsubscribe -n <namespace> <name>

# List
f5xcctl configuration list unsubscribe -n <namespace>

# Delete
f5xcctl configuration delete unsubscribe -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_unsubscribe" "example" {
  name      = "example-unsubscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
