---
page_title: f5xc_geolocation - f5xc-api-mcp
subcategory: Shape
description: Top Human Geolocation.
---

# Geolocation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top human geolocation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-geolocation-create` | Top Human Geolocation. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- geolocation

## Example Usage

Ask Claude to help you work with Geolocation resources:

### Create Geolocation

> "Create a geolocation named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create geolocation -n <namespace> -i geolocation.yaml

# Get
xcsh shape get geolocation <name> -n <namespace>

# List
xcsh shape list geolocation -n <namespace>

# Delete
xcsh shape delete geolocation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_geolocation" "example" {
  name      = "example-geolocation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
