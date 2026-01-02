---
page_title: f5xc_top_location - f5xc-api-mcp
subcategory: Shape
description: POST SAFE Top Locations.
---

# Top Location

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-location-create` | POST SAFE Top Locations. |
| `f5xc-api-shape-top-location-list` | GET SAFE Top Locations. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `from` | Timestamp representing start date of the requested period in millieseconds. | `1638320400000.` |
| `limit` | Limited number of records. | `3` |
| `to` | Timestamp representing end date of the requested period in millieseconds. | `1638320400000.` |
| `version` | The API version to use. | `V3` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-location

## Example Usage

Ask Claude to help you work with Top Location resources:

### Create Top Location

> "Create a top-location named 'example' in the 'production' namespace"

### List Top Locations

> "List all top-locations in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create top_location -n <namespace> -i top_location.yaml

# Get
xcsh shape get top_location <name> -n <namespace>

# List
xcsh shape list top_location -n <namespace>

# Delete
xcsh shape delete top_location <name> -n <namespace>
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
