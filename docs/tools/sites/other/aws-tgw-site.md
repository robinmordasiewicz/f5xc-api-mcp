---
page_title: f5xc_aws_tgw_site - f5xc-api-mcp
subcategory: Sites
description: Create AWS TGW site.
---

# AWS Tgw Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the AWS TGW site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-aws-tgw-site-create` | Create AWS TGW site. |
| `f5xc-api-sites-aws-tgw-site-get` | GET AWS TGW site. |
| `f5xc-api-sites-aws-tgw-site-list` | List Configure AWS TGW Site. |
| `f5xc-api-sites-aws-tgw-site-update` | Replace AWS TGW site. |
| `f5xc-api-sites-aws-tgw-site-delete` | DELETE Configure AWS TGW Site. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- aws-tgw-site

**Modifies:**

- aws-tgw-site

**Deletes:**

- aws-tgw-site
- contained_resources

## Example Usage

Ask Claude to help you work with AWS Tgw Site resources:

### Create AWS Tgw Site

> "Create a aws-tgw-site named 'example' in the 'production' namespace"

### List AWS Tgw Sites

> "List all aws-tgw-sites in the 'production' namespace"

### Get AWS Tgw Site Details

> "Get details of the aws-tgw-site named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_tgw_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_tgw_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_tgw_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @aws_tgw_site.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_tgw_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
