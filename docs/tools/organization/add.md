---
page_title: f5xc_add - f5xc-api-mcp
subcategory: Organization
description: Add USB Enablement Rules
---

# Add

Add USB Enablement Rules

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-add-create` | Add USB Enablement Rules |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Add resources:

### Create Add

> "Create a add named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f add.yaml

# Get
f5xcctl get add {name} -n {namespace}

# List
f5xcctl get adds -n {namespace}

# Delete
f5xcctl delete add {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_add" "example" {
  name      = "example-add"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
