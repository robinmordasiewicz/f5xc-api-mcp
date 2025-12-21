---
page_title: f5xc_app_type - f5xc-api-mcp
subcategory: Observability
description: Application Types.
---

# App Type

Request to GET list of application types for a given namespace.
For system namespace, all the
application types for the tenant
will be returned in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-app-type-list` | Application Types. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | End time of metric collection from which data will be considered to build graph. |
| `start_time` | Start time of metric collection from which data will be considered to build graph. |

## Example Usage

Ask Claude to help you work with App Type resources:

### List App Types

> "List all app-types in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create app_type -n <namespace> -i app_type.yaml

# Get
f5xcctl observability get app_type <name> -n <namespace>

# List
f5xcctl observability list app_type -n <namespace>

# Delete
f5xcctl observability delete app_type <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app_type" "example" {
  name      = "example-app-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
