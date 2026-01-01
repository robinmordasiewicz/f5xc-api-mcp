---
page_title: f5xc_clone - f5xc-api-mcp
subcategory: Shape
description: Clone Alert Template.
---

# Clone

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Clone the BRM Alert Template.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-clone-create` | Clone Alert Template. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- clone

## Example Usage

Ask Claude to help you work with Clone resources:

### Create Clone

> "Create a clone named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create clone -n <namespace> -i clone.yaml

# Get
xcsh shape get clone <name> -n <namespace>

# List
xcsh shape list clone -n <namespace>

# Delete
xcsh shape delete clone <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_clone" "example" {
  name      = "example-clone"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
