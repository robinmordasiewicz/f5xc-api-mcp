---
page_title: f5xc_assign - f5xc-api-mcp
subcategory: Virtual
description: Assign API Definition.
---

# Assign

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Set a reference to the API Definition, with an option to create an empty one if not
exists.
DEPRECATED. Instead use virtual host public custom API - AssignAPIDefinition.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-assign-create` | Assign API Definition. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- assign

## Example Usage

Ask Claude to help you work with Assign resources:

### Create Assign

> "Create a assign named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create assign -n <namespace> -i assign.yaml

# Get
xcsh virtual get assign <name> -n <namespace>

# List
xcsh virtual list assign -n <namespace>

# Delete
xcsh virtual delete assign <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_assign" "example" {
  name      = "example-assign"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
