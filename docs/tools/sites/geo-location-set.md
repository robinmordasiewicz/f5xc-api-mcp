---
page_title: f5xc_geo_location_set - f5xc-api-mcp
subcategory: Sites
description: Create Geolocation
---

# Geo Location Set

List the set of geo_location_set in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-geo-location-set-create` | Create Geolocation |
| `f5xc-api-core-geo-location-set-get` | Get Geolocation Set |
| `f5xc-api-core-geo-location-set-list` | List Geolocation Set |
| `f5xc-api-core-geo-location-set-update` | Replace Geolocation Set |
| `f5xc-api-core-geo-location-set-delete` | Delete Geolocation Set |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Geo Location Set resources:

### Create Geo Location Set

> "Create a geo-location-set named 'example' in the 'production' namespace"

### List Geo Location Sets

> "List all geo-location-sets in the 'production' namespace"

### Get Geo Location Set Details

> "Get details of the geo-location-set named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f geo_location_set.yaml

# Get
f5xcctl get geo_location_set {name} -n {namespace}

# List
f5xcctl get geo_location_sets -n {namespace}

# Delete
f5xcctl delete geo_location_set {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_geo_location_set" "example" {
  name      = "example-geo-location-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
