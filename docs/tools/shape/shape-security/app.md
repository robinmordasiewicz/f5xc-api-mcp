---
page_title: f5xc_app - f5xc-api-mcp
subcategory: Shape
description: Top Latency Overview Apps.
---

# App

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top latency overview apps.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-app-create` | Top Latency Overview Apps. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- app

## Example Usage

Ask Claude to help you work with App resources:

### Create App

> "Create a app named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create app -n <namespace> -i app.yaml

# Get
xcsh shape get app <name> -n <namespace>

# List
xcsh shape list app -n <namespace>

# Delete
xcsh shape delete app <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app" "example" {
  name      = "example-app"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
