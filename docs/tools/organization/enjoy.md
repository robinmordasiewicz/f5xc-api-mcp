---
page_title: f5xc_enjoy - f5xc-api-mcp
subcategory: Organization
description: Enjoy Dashboard
---

# Enjoy

Get enjoy chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-enjoy-create` | Enjoy Dashboard |

## Example Usage

Ask Claude to help you work with Enjoy resources:

### Create Enjoy

> "Create a enjoy named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f enjoy.yaml

# Get
f5xcctl get enjoy {name} -n {namespace}

# List
f5xcctl get enjoys -n {namespace}

# Delete
f5xcctl delete enjoy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_enjoy" "example" {
  name      = "example-enjoy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
