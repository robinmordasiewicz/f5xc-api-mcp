---
page_title: f5xc_api_crawler - f5xc-api-mcp
subcategory: API
description: Create API Crawler.
---

# API Crawler

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of api_crawler in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-crawler-create` | Create API Crawler. |
| `f5xc-api-api-api-crawler-get` | GET API crawler. |
| `f5xc-api-api-api-crawler-list` | List API Crawler. |
| `f5xc-api-api-api-crawler-update` | Replace API crawler. |
| `f5xc-api-api-api-crawler-delete` | DELETE API Crawler. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- api-crawler

**Modifies:**

- api-crawler

**Deletes:**

- api-crawler
- contained_resources

## Example Usage

Ask Claude to help you work with API Crawler resources:

### Create API Crawler

> "Create a api-crawler named 'example' in the 'production' namespace"

### List API Crawlers

> "List all api-crawlers in the 'production' namespace"

### Get API Crawler Details

> "Get details of the api-crawler named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create api_crawler -n <namespace> -i api_crawler.yaml

# Get
xcsh api get api_crawler <name> -n <namespace>

# List
xcsh api list api_crawler -n <namespace>

# Delete
xcsh api delete api_crawler <name> -n <namespace>
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
