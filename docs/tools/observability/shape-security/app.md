---
page_title: f5xc_app - f5xc-api-mcp
subcategory: Observability
description: Top Latency Overview Apps.
---

# App

GET top latency overview apps.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-app-create` | Top Latency Overview Apps. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with App resources:

### Create App

> "Create a app named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create app -n <namespace> -i app.yaml

# Get
f5xcctl observability get app <name> -n <namespace>

# List
f5xcctl observability list app -n <namespace>

# Delete
f5xcctl observability delete app <name> -n <namespace>
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
