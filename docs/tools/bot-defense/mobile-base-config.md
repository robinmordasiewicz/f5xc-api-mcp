---
page_title: f5xc_mobile_base_config - f5xc-api-mcp
subcategory: Bot Defense
description: Create Mobile SDK Base Configuration
---

# Mobile Base Config

List the set of mobile_base_config in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-mobile-base-config-create` | Create Mobile SDK Base Configuration |
| `f5xc-api-core-mobile-base-config-get` | Get Mobile SDK Base Configuration |
| `f5xc-api-core-mobile-base-config-list` | List Mobile SDK Base Configuration |
| `f5xc-api-core-mobile-base-config-update` | Replace Mobile SDK Base Configuration |
| `f5xc-api-core-mobile-base-config-delete` | Delete Mobile SDK Base Configuration |

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

Ask Claude to help you work with Mobile Base Config resources:

### Create Mobile Base Config

> "Create a mobile-base-config named 'example' in the 'production' namespace"

### List Mobile Base Configs

> "List all mobile-base-configs in the 'production' namespace"

### Get Mobile Base Config Details

> "Get details of the mobile-base-config named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f mobile_base_config.yaml

# Get
f5xcctl get mobile_base_config {name} -n {namespace}

# List
f5xcctl get mobile_base_configs -n {namespace}

# Delete
f5xcctl delete mobile_base_config {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_mobile_base_config" "example" {
  name      = "example-mobile-base-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
