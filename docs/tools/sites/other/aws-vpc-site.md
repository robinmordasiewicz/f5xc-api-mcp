---
page_title: f5xc_aws_vpc_site - f5xc-api-mcp
subcategory: Sites
description: Create AWS VPC site.
---

# AWS VPC Site

Shape of the AWS VPC site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-aws-vpc-site-create` | Create AWS VPC site. |
| `f5xc-api-sites-aws-vpc-site-get` | GET AWS VPC site. |
| `f5xc-api-sites-aws-vpc-site-list` | List Configure AWS VPC Site. |
| `f5xc-api-sites-aws-vpc-site-update` | Replace AWS VPC site. |
| `f5xc-api-sites-aws-vpc-site-delete` | DELETE Configure AWS VPC Site. |

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

## Example Usage

Ask Claude to help you work with AWS VPC Site resources:

### Create AWS VPC Site

> "Create a aws-vpc-site named 'example' in the 'production' namespace"

### List AWS VPC Sites

> "List all aws-vpc-sites in the 'production' namespace"

### Get AWS VPC Site Details

> "Get details of the aws-vpc-site named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_vpc_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_vpc_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_vpc_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @aws_vpc_site.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aws_vpc_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
