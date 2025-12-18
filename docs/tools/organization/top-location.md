---
page_title: f5xc_top_location - f5xc-api-mcp
subcategory: Organization
description: Post SAFE Top Locations
---

# Top Location

Post SAFE Analyst Station Dashboard Transaction Breakdown request

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-location-create` | Post SAFE Top Locations |
| `f5xc-api-core-top-location-list` | Get SAFE Top Locations |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `from` | The from parameter |
| `limit` | The limit parameter |
| `to` | The to parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with Top Location resources:

### Create Top Location

> "Create a top-location named 'example' in the 'production' namespace"

### List Top Locations

> "List all top-locations in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f top_location.yaml

# Get
f5xcctl get top_location {name} -n {namespace}

# List
f5xcctl get top_locations -n {namespace}

# Delete
f5xcctl delete top_location {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_top_location" "example" {
  name      = "example-top-location"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
