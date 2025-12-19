---
page_title: f5xc_cloud_region - f5xc-api-mcp
subcategory: Cloud Resources
description: Get Cloud Region
---

# Cloud Region

List the set of cloud_region in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cloud-region-get` | Get Cloud Region |
| `f5xc-api-core-cloud-region-list` | List Cloud Region |
| `f5xc-api-core-cloud-region-update` | Replace Cloud Region |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |
| `metadata.namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Cloud Region resources:

### List Cloud Regions

> "List all cloud-regions in the 'production' namespace"

### Get Cloud Region Details

> "Get details of the cloud-region named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create cloud_region -n <namespace> -i cloud_region.yaml

# Get
f5xcctl configuration get cloud_region -n <namespace> <name>

# List
f5xcctl configuration list cloud_region -n <namespace>

# Delete
f5xcctl configuration delete cloud_region -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_cloud_region" "example" {
  name      = "example-cloud-region"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
