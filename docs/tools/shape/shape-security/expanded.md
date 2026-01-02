---
page_title: f5xc_expanded - f5xc-api-mcp
subcategory: Shape
description: Expanded Traffic Overview.
---

# Expanded

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET expanded traffic overview.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-expanded-create` | Expanded Traffic Overview. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- expanded

## Example Usage

Ask Claude to help you work with Expanded resources:

### Create Expanded

> "Create a expanded named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create expanded -n <namespace> -i expanded.yaml

# Get
xcsh shape get expanded <name> -n <namespace>

# List
xcsh shape list expanded -n <namespace>

# Delete
xcsh shape delete expanded <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_expanded" "example" {
  name      = "example-expanded"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
