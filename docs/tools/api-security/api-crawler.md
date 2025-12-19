---
page_title: f5xc_api_crawler - f5xc-api-mcp
subcategory: API Security
description: Create API Crawler
---

# API Crawler

List the set of api_crawler in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-api-crawler-create` | Create API Crawler |
| `f5xc-api-core-api-crawler-get` | Get API crawler |
| `f5xc-api-core-api-crawler-list` | List API Crawler |
| `f5xc-api-core-api-crawler-update` | Replace API crawler |
| `f5xc-api-core-api-crawler-delete` | Delete API Crawler |

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

Ask Claude to help you work with API Crawler resources:

### Create API Crawler

> "Create a api-crawler named 'example' in the 'production' namespace"

### List API Crawlers

> "List all api-crawlers in the 'production' namespace"

### Get API Crawler Details

> "Get details of the api-crawler named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create api_crawler -n <namespace> -i api_crawler.yaml

# Get
f5xcctl configuration get api_crawler -n <namespace> <name>

# List
f5xcctl configuration list api_crawler -n <namespace>

# Delete
f5xcctl configuration delete api_crawler -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_api_crawler" "example" {
  name      = "example-api-crawler"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
