---
page_title: f5xc_navigation_tile - f5xc-api-mcp
subcategory: Subscriptions
description: GET Navigation Tile.
---

# Navigation Tile

GET navigation_tile reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-navigation-tile-get` | GET Navigation Tile. |
| `f5xc-api-subscriptions-navigation-tile-list` | List Navigation Tile. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Navigation Tile resources:

### List Navigation Tiles

> "List all navigation-tiles in the 'production' namespace"

### Get Navigation Tile Details

> "Get details of the navigation-tile named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl subscriptions create navigation_tile -n <namespace> -i navigation_tile.yaml

# Get
f5xcctl subscriptions get navigation_tile <name> -n <namespace>

# List
f5xcctl subscriptions list navigation_tile -n <namespace>

# Delete
f5xcctl subscriptions delete navigation_tile <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_navigation_tile" "example" {
  name      = "example-navigation-tile"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
