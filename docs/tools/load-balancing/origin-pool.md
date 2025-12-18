---
page_title: f5xc_origin_pool - f5xc-api-mcp
subcategory: Load Balancing
description: Create Origin Pool
---

# Origin Pool

Shape of the origin pool create specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-origin-pool-create` | Create Origin Pool |
| `f5xc-api-waap-origin-pool-get` | Get Origin Pool |
| `f5xc-api-waap-origin-pool-list` | List Origin Pool |
| `f5xc-api-waap-origin-pool-update` | Replace Origin Pool |
| `f5xc-api-waap-origin-pool-delete` | Delete Origin Pool |

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

Ask Claude to help you work with Origin Pool resources:

### Create Origin Pool

> "Create a origin-pool named 'example' in the 'production' namespace"

### List Origin Pools

> "List all origin-pools in the 'production' namespace"

### Get Origin Pool Details

> "Get details of the origin-pool named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f origin_pool.yaml

# Get
f5xcctl get origin_pool {name} -n {namespace}

# List
f5xcctl get origin_pools -n {namespace}

# Delete
f5xcctl delete origin_pool {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_origin_pool" "example" {
  name      = "example-origin-pool"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
