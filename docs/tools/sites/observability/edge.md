---
page_title: f5xc_edge - f5xc-api-mcp
subcategory: Sites
description: Site Edge Query.
---

# Edge

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series data for an edge returned in the site traffic graph.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-edge-create` | Site Edge Query. |

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

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create edge -n <namespace> -i edge.yaml

# Get
xcsh sites get edge <name> -n <namespace>

# List
xcsh sites list edge -n <namespace>

# Delete
xcsh sites delete edge <name> -n <namespace>
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
