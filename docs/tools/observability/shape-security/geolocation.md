---
page_title: f5xc_geolocation - f5xc-api-mcp
subcategory: Observability
description: Top Human Geolocation.
---

# Geolocation

GET top human geolocation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-geolocation-create` | Top Human Geolocation. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Geolocation resources:

### Create Geolocation

> "Create a geolocation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create geolocation -n <namespace> -i geolocation.yaml

# Get
f5xcctl observability get geolocation <name> -n <namespace>

# List
f5xcctl observability list geolocation -n <namespace>

# Delete
f5xcctl observability delete geolocation <name> -n <namespace>
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
