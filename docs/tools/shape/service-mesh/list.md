---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Shape
description: All Protected Endpoints.
---

# List

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET All Protected Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-list-create` | All Protected Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list

## Example Usage

Ask Claude to help you work with List resources:

### Create List

> "Create a list named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create list -n <namespace> -i list.yaml

# Get
xcsh shape get list <name> -n <namespace>

# List
xcsh shape list list -n <namespace>

# Delete
xcsh shape delete list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list" "example" {
  name      = "example-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
