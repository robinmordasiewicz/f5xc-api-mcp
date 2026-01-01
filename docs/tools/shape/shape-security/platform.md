---
page_title: f5xc_platform - f5xc-api-mcp
subcategory: Shape
description: Top Human Platform.
---

# Platform

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top human platform.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-platform-create` | Top Human Platform. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- platform

## Example Usage

Ask Claude to help you work with Platform resources:

### Create Platform

> "Create a platform named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create platform -n <namespace> -i platform.yaml

# Get
xcsh shape get platform <name> -n <namespace>

# List
xcsh shape list platform -n <namespace>

# Delete
xcsh shape delete platform <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_platform" "example" {
  name      = "example-platform"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
