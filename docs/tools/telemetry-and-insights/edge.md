---
page_title: f5xc_edge - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Connectivity Edge Query.
---

# Edge

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET Connectivity data for an edge.
This query is used to GET time-series data for a given
edge.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-edge-create` | Connectivity Edge Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- edge

## Example Usage

Ask Claude to help you work with Edge resources:

### Create Edge

> "Create a edge named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data edge create {name} --namespace {namespace}
```

Create edge

### file_based

```bash
f5xcctl data edge create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create edge -n <namespace> -i edge.yaml

# Get
f5xcctl telemetry_and_insights get edge <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list edge -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete edge <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_edge" "example" {
  name      = "example-edge"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
