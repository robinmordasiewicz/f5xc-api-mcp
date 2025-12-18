---
page_title: f5xc_favicon - f5xc-api-mcp
subcategory: Organization
description: Tenant favicon
---

# Favicon

Receive current tenant favicon.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-favicon-list` | Tenant favicon |

## Example Usage

Ask Claude to help you work with Favicon resources:

### List Favicons

> "List all favicons in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f favicon.yaml

# Get
f5xcctl get favicon {name} -n {namespace}

# List
f5xcctl get favicons -n {namespace}

# Delete
f5xcctl delete favicon {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_favicon" "example" {
  name      = "example-favicon"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
