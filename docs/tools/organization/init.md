---
page_title: f5xc_init - f5xc-api-mcp
subcategory: Organization
description: Enable Client-Side Defense
---

# Init

Enable Client-Side Defense feature for the tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-init-create` | Enable Client-Side Defense |

## Example Usage

Ask Claude to help you work with Init resources:

### Create Init

> "Create a init named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f init.yaml

# Get
f5xcctl get init {name} -n {namespace}

# List
f5xcctl get inits -n {namespace}

# Delete
f5xcctl delete init {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_init" "example" {
  name      = "example-init"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
