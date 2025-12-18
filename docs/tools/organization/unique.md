---
page_title: f5xc_unique - f5xc-api-mcp
subcategory: Organization
description: Get Devices by Unique Access
---

# Unique

Get devices unique access information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-unique-create` | Get Devices by Unique Access |

## Example Usage

Ask Claude to help you work with Unique resources:

### Create Unique

> "Create a unique named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f unique.yaml

# Get
f5xcctl get unique {name} -n {namespace}

# List
f5xcctl get uniques -n {namespace}

# Delete
f5xcctl delete unique {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_unique" "example" {
  name      = "example-unique"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
