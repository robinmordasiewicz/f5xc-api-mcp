---
page_title: f5xc_app_type - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Application Types.
---

# App Type

!!! info "Low Risk"
    Operations on this resource are generally safe.

Request to GET list of application types for a given namespace.
For system namespace, all the
application types for the tenant
will be returned in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-app-type-list` | Application Types. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End time of metric collection from which data will be considered to build graph. | `1570197600.` |
| `start_time` | Start time of metric collection from which data will be considered to build graph. | `1570194000.` |

## Example Usage

Ask Claude to help you work with App Type resources:

### List App Types

> "List all app-types in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data app-type list --namespace {namespace}
```

List all app-types

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create app_type -n <namespace> -i app_type.yaml

# Get
f5xcctl telemetry_and_insights get app_type <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list app_type -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete app_type <name> -n <namespace>
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
