---
page_title: f5xc_gcp_vpc_site - f5xc-api-mcp
subcategory: Sites
description: Create GCP VPC site.
---

# GCP VPC Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the GCP VPC site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-gcp-vpc-site-create` | Create GCP VPC site. |
| `f5xc-api-sites-gcp-vpc-site-get` | GET GCP VPC site. |
| `f5xc-api-sites-gcp-vpc-site-list` | List Configure GCP VPC Site. |
| `f5xc-api-sites-gcp-vpc-site-update` | Replace GCP VPC site. |
| `f5xc-api-sites-gcp-vpc-site-delete` | DELETE Configure GCP VPC Site. |

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

- gcp-vpc-site

**Modifies:**

- gcp-vpc-site

**Deletes:**

- gcp-vpc-site
- contained_resources

## Example Usage

Ask Claude to help you work with GCP VPC Site resources:

### Create GCP VPC Site

> "Create a gcp-vpc-site named 'example' in the 'production' namespace"

### List GCP VPC Sites

> "List all gcp-vpc-sites in the 'production' namespace"

### Get GCP VPC Site Details

> "Get details of the gcp-vpc-site named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gcp_vpc_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gcp_vpc_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gcp_vpc_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @gcp_vpc_site.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gcp_vpc_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
