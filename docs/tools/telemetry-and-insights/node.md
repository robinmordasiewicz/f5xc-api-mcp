---
page_title: f5xc_node - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Connectivity Node Query.
---

# Node

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET Connectivity data for a site.
This query is used to GET time-series data for a given
site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-node-create` | Connectivity Node Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- node

## Example Usage

Ask Claude to help you work with Node resources:

### Create Node

> "Create a node named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create node -n <namespace> -i node.yaml

# Get
xcsh telemetry_and_insights get node <name> -n <namespace>

# List
xcsh telemetry_and_insights list node -n <namespace>

# Delete
xcsh telemetry_and_insights delete node <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_node" "example" {
  name      = "example-node"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
