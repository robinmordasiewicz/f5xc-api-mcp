---
page_title: f5xc_geo_config - f5xc-api-mcp
subcategory: Data And Privacy Security
description: GET Geo Config.
---

# Geo Config

!!! info "Low Risk"
    Operations on this resource are generally safe.

Shape of the geo config specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataandprivacysecurity-geo-config-get` | GET Geo Config. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |

## Example Usage

Ask Claude to help you work with Geo Config resources:

### Get Geo Config Details

> "Get details of the geo-config named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh data_and_privacy_security create geo_config -n <namespace> -i geo_config.yaml

# Get
xcsh data_and_privacy_security get geo_config <name> -n <namespace>

# List
xcsh data_and_privacy_security list geo_config -n <namespace>

# Delete
xcsh data_and_privacy_security delete geo_config <name> -n <namespace>
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
