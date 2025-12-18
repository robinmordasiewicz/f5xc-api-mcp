---
page_title: f5xc_field - f5xc-api-mcp
subcategory: Organization
description: Forensic Fields
---

# Field

Get

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-field-create` | Forensic Fields |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Field resources:

### Create Field

> "Create a field named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f field.yaml

# Get
f5xcctl get field {name} -n {namespace}

# List
f5xcctl get fields -n {namespace}

# Delete
f5xcctl delete field {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_field" "example" {
  name      = "example-field"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
