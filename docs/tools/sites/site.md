---
page_title: f5xc_site - f5xc-api-mcp
subcategory: Sites
description: Site Graph Query
---

# Site

Request to get inter-site traffic graph for an application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-site-create` | Site Graph Query |
| `f5xc-api-core-site-get` | Get Site |
| `f5xc-api-core-site-list` | List Site |
| `f5xc-api-core-site-update` | Replace Site |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `name` | name |
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

Ask Claude to help you work with Site resources:

### Create Site

> "Create a site named 'example' in the 'production' namespace"

### List Sites

> "List all sites in the 'production' namespace"

### Get Site Details

> "Get details of the site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create site -n <namespace> -i site.yaml

# Get
f5xcctl configuration get site -n <namespace> <name>

# List
f5xcctl configuration list site -n <namespace>

# Delete
f5xcctl configuration delete site -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_site" "example" {
  name      = "example-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
