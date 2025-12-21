---
page_title: f5xc_top_location - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: POST SAFE Top Locations.
---

# Top Location

POST SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-top-location-create` | POST SAFE Top Locations. |
| `f5xc-api-shapesecurity-top-location-list` | GET SAFE Top Locations. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `from` | Timestamp representing start date of the requested period in millieseconds. |
| `limit` | Limited number of records. |
| `to` | Timestamp representing end date of the requested period in millieseconds. |
| `version` | The API version to use. |

## Example Usage

Ask Claude to help you work with Top Location resources:

### Create Top Location

> "Create a top-location named 'example' in the 'production' namespace"

### List Top Locations

> "List all top-locations in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create top_location -n <namespace> -i top_location.yaml

# Get
f5xcctl configuration get top_location -n <namespace> <name>

# List
f5xcctl configuration list top_location -n <namespace>

# Delete
f5xcctl configuration delete top_location -n <namespace> <name>
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
