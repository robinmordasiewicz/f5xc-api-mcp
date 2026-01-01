---
page_title: f5xc_field - f5xc-api-mcp
subcategory: Shape
description: Forensic Fields.
---

# Field

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-field-create` | Forensic Fields. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Namespace1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- field

## Example Usage

Ask Claude to help you work with Field resources:

### Create Field

> "Create a field named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create field -n <namespace> -i field.yaml

# Get
xcsh shape get field <name> -n <namespace>

# List
xcsh shape list field -n <namespace>

# Delete
xcsh shape delete field <name> -n <namespace>
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
