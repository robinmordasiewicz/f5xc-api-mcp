---
page_title: f5xc_lma_region - f5xc-api-mcp
subcategory: Sites
description: Get LMA Region
---

# Lma Region

List the set of lma_region in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-lma-region-get` | Get LMA Region |
| `f5xc-api-core-lma-region-list` | List LMA Region |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Lma Region resources:

### List Lma Regions

> "List all lma-regions in the 'production' namespace"

### Get Lma Region Details

> "Get details of the lma-region named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create lma_region -n <namespace> -i lma_region.yaml

# Get
f5xcctl configuration get lma_region -n <namespace> <name>

# List
f5xcctl configuration list lma_region -n <namespace>

# Delete
f5xcctl configuration delete lma_region -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_lma_region" "example" {
  name      = "example-lma-region"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
