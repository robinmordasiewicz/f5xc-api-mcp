---
page_title: f5xc_geo_config - f5xc-api-mcp
subcategory: Networking
description: GET Geo Config.
---

# Geo Config

Shape of the geo config specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-geo-config-get` | GET Geo Config. |

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

## Example Usage

Ask Claude to help you work with Geo Config resources:

### Get Geo Config Details

> "Get details of the geo-config named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create geo_config -n <namespace> -i geo_config.yaml

# Get
f5xcctl networking get geo_config <name> -n <namespace>

# List
f5xcctl networking list geo_config -n <namespace>

# Delete
f5xcctl networking delete geo_config <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_geo_config" "example" {
  name      = "example-geo-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
